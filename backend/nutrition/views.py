from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# ========== Registry ==========

EQUATIONS = {}

def register(key, title, schema):
    def decorator(func):
        EQUATIONS[key] = {
            "title": title,
            "schema": schema,
            "fn": func,
        }
        return func
    return decorator

def _require(inputs, key, typ):
    if key not in inputs:
        raise ValueError(f"Missing input: {key}")
    val = inputs[key]
    if typ == "number":
        return float(val)
    return val

# ========== Equations ==========

@register("bmi", "Body Mass Index", {"weight_kg": "Weight (kg)", "height_m": "Height (m)"})
def bmi(inputs):
    w = _require(inputs, "weight_kg", "number")
    h = _require(inputs, "height_m", "number")
    val = w / (h * h)
    interp = ("Underweight" if val < 18.5 else
              "Normal" if val < 25 else
              "Overweight" if val < 30 else "Obese")
    return {"bmi": round(val, 2), "interpretation": interp}

@register("ibw_hamwi", "Ideal Body Weight (Hamwi)", {"height_cm": "Height (cm)", "sex": "male/female"})
def ibw_hamwi(inputs):
    h = _require(inputs, "height_cm", "number")
    sex = _require(inputs, "sex", "string")
    inches_over_5ft = max(0, (h/2.54) - 60)
    if sex.lower() == "male":
        val = 48 + 2.7 * inches_over_5ft
    else:
        val = 45.5 + 2.2 * inches_over_5ft
    return {"ibw": round(val, 1), "units": "kg"}

@register("ibw_lemmens", "IBW (Lemmens)", {"height_m": "Height (m)"})
def ibw_lemmens(inputs):
    h = _require(inputs, "height_m", "number")
    return {"ibw": round(22 * (h ** 2), 1), "units": "kg"}

@register("percent_ibw", "%IBW", {"actual_wt": "kg", "ibw": "kg"})
def percent_ibw(inputs):
    a = _require(inputs, "actual_wt", "number")
    i = _require(inputs, "ibw", "number")
    return {"%ibw": round((a / i) * 100, 1)}

@register("abw", "Adjusted Body Weight", {"actual_wt": "kg", "ibw": "kg"})
def abw(inputs):
    a = _require(inputs, "actual_wt", "number")
    i = _require(inputs, "ibw", "number")
    return {"abw": round(i + 0.25 * (a - i), 1)}

@register("waist_height", "Waist-to-Height Ratio", {"waist_cm": "Waist (cm)", "height_cm": "Height (cm)"})
def waist_height(inputs):
    w = _require(inputs, "waist_cm", "number")
    h = _require(inputs, "height_cm", "number")
    ratio = w / h
    return {"ratio": round(ratio, 2), "risk": "High" if ratio >= 0.5 else "Normal"}

@register("percent_ubw", "%UBW", {"current_wt": "kg", "usual_wt": "kg"})
def percent_ubw(inputs):
    c = _require(inputs, "current_wt", "number")
    u = _require(inputs, "usual_wt", "number")
    return {"%ubw": round((c/u)*100, 1)}

@register("percent_weight_change", "%Weight Change", {"current_wt": "kg", "previous_wt": "kg"})
def percent_weight_change(inputs):
    c = _require(inputs, "current_wt", "number")
    p = _require(inputs, "previous_wt", "number")
    return {"%change": round(((c - p)/p)*100, 1)}

@register("harris_benedict", "BMR (Harris-Benedict)", {"sex": "male/female", "age": "years", "weight_kg": "kg", "height_cm": "cm"})
def harris_benedict(inputs):
    sex = _require(inputs, "sex", "string").lower()
    age = _require(inputs, "age", "number")
    w = _require(inputs, "weight_kg", "number")
    h = _require(inputs, "height_cm", "number")
    if sex == "male":
        bmr = 66.47 + (13.75*w) + (5*h) - (6.76*age)
    else:
        bmr = 655.1 + (9.56*w) + (1.85*h) - (4.68*age)
    return {"bmr": round(bmr, 1)}

@register("tee", "Total Energy Expenditure", {"bmr": "kcal", "activity": "sedentary/light/moderate/active", "stress": "none/mild_infection/major_burn"})
def tee(inputs):
    bmr = _require(inputs, "bmr", "number")
    act = inputs.get("activity", "sedentary").lower()
    stress = inputs.get("stress", "none").lower()
    af = {"sedentary":1.2,"light":1.375,"moderate":1.55,"active":1.725}.get(act,1.2)
    sf = {"none":1.0,"mild_infection":1.2,"major_burn":2.0}.get(stress,1.0)
    val = bmr * af * sf
    return {"tee": round(val, 1)}

@register("mifflin_stjeor", "BMR (Mifflin-St Jeor)", {"sex": "male/female", "age": "years", "weight_kg": "kg", "height_cm": "cm"})
def mifflin(inputs):
    sex = _require(inputs, "sex", "string").lower()
    age = _require(inputs, "age", "number")
    w = _require(inputs, "weight_kg", "number")
    h = _require(inputs, "height_cm", "number")
    val = (10*w) + (6.25*h) - (5*age) + (5 if sex=="male" else -161)
    return {"bmr": round(val, 1)}

@register("macros", "Macronutrient Distribution", {"calories": "kcal"})
def macros(inputs):
    cals = _require(inputs, "calories", "number")
    return {
        "carbs_g": round((0.55*cals)/4,1),
        "protein_g": round((0.2*cals)/4,1),
        "fat_g": round((0.25*cals)/9,1)
    }

@register("fluids_holliday", "Fluid Needs (Holliday–Segar)", {"weight_kg": "kg"})
def fluids(inputs):
    w = _require(inputs, "weight_kg", "number")
    if w <= 10:
        ml = 100*w
    elif w <= 20:
        ml = 100*10 + 50*(w-10)
    else:
        ml = 100*10 + 50*10 + 20*(w-20)
    return {"fluids_ml": ml}

@register("water_deficit", "Water Deficit", {"weight_kg": "kg", "na_measured": "mmol/L"})
def water_deficit(inputs):
    w = _require(inputs, "weight_kg", "number")
    na = _require(inputs, "na_measured", "number")
    tbw = 0.6 * w
    deficit = tbw * ((na/140)-1)
    return {"deficit_L": round(deficit,1)}

@register("nutrition_risk_index", "Nutrition Risk Index", {"albumin_g_dL": "Albumin (g/dL)", "percent_ibw": "%IBW"})
def nri(inputs):
    alb = _require(inputs, "albumin_g_dL", "number")
    pibw = _require(inputs, "percent_ibw", "number")
    score = (1.519*alb*10) + (41.7*(pibw/100))
    return {"nri": round(score,1)}

@register("nitrogen_balance", "Nitrogen Balance", {"protein_g": "Protein Intake (g)", "uun_g": "Urinary Urea Nitrogen (g)"})
def nitrogen_balance(inputs):
    p = _require(inputs, "protein_g", "number")
    u = _require(inputs, "uun_g", "number")
    nb = (p/6.25) - (u+4)
    return {"nitrogen_balance": round(nb,1)}

@register("tlc", "Total Lymphocyte Count", {"wbc": "White blood cells (/mm3)", "lymphocyte_percent": "%"})
def tlc(inputs):
    w = _require(inputs, "wbc", "number")
    lp = _require(inputs, "lymphocyte_percent", "number")
    return {"tlc": int((w*lp)/100)}

# ========== API Views ==========

class EquationsView(APIView):
    def get(self, request):
        data = {k: {"title": v["title"], "schema": v["schema"]} for k,v in EQUATIONS.items()}
        return Response(data)

class ComputeView(APIView):
    def post(self, request):
        eq = request.data.get("equation")
        inputs = request.data.get("inputs", {})
        if eq not in EQUATIONS:
            return Response({"error": "Equation not found"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            fn = EQUATIONS[eq]["fn"]
            result = fn(inputs)
            return Response({"equation": eq, "result": result})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
