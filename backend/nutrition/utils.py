# app/utils.py
from typing import Optional, Dict
import math

# ---------- Weight & Body ----------

def bmi(weight_kg: Optional[float]=None, height_m: Optional[float]=None, weight_lb: Optional[float]=None, height_in: Optional[float]=None) -> Dict:
    """
    BMI:
    - metric: weight_kg / height_m**2
    - imperial: weight_lb / (height_in**2) * 703
    """
    if height_m and weight_kg:
        val = weight_kg / (height_m**2) if height_m > 0 else None
    elif height_in and weight_lb:
        val = (weight_lb / (height_in**2)) * 703
    else:
        raise ValueError("Provide either (weight_kg & height_m) or (weight_lb & height_in)")
    interp = ""
    if val is not None:
        if val < 18.5:
            interp = "Underweight"
        elif 18.5 <= val < 25:
            interp = "Healthy weight"
        elif 25 <= val < 30:
            interp = "Overweight"
        elif 30 <= val < 35:
            interp = "Obese class I"
        elif 35 <= val < 40:
            interp = "Obese class II"
        else:
            interp = "Obese class III"
    return {"value": round(val,2), "unit":"kg/m^2", "interpretation": interp}

def ibw_hamwi(gender: str, height_cm: float) -> Dict:
    """Hamwi: base for 5 ft then + per inch > 60 in.
       Using cm input. 5 ft = 152.4 cm, 1 inch = 2.54 cm
       Returns kg.
    """
    if height_cm <= 0:
        raise ValueError("Invalid height")
    base_in = 60  # inches
    height_in = height_cm / 2.54
    if gender.lower().startswith('f'):
        base_lb = 100
        per_in = 5
    else:
        base_lb = 106
        per_in = 6
    extra = 0
    if height_in > base_in:
        extra = (height_in - base_in) * per_in
    ibw_lb = base_lb + extra
    ibw_kg = ibw_lb * 0.45359237
    return {"value": round(ibw_kg,2), "unit":"kg"}

def ibw_lemmens(height_m: float, factor: float) -> Dict:
    """IBW = factor * height_m^2"""
    if height_m <= 0 or factor <= 0:
        raise ValueError("Invalid inputs")
    val = factor * (height_m**2)
    return {"value": round(val,2), "unit":"kg"}

def percent_ibw(weight_kg: float, gender: str, height_cm: float) -> Dict:
    ibw = ibw_hamwi(gender, height_cm)["value"]
    pct = (weight_kg / ibw) * 100 if ibw>0 else None
    # interpretation per user table
    if pct is None:
        interp = ""
    else:
        if pct > 120:
            interp = "Obesity"
        elif 110 <= pct <= 120:
            interp = "Overweight"
        elif 90 <= pct <= 109:
            interp = "Adequate"
        elif 80 <= pct <= 89:
            interp = "Underweight"
        elif 70 <= pct <= 79:
            interp = "Moderately underweight"
        else:
            interp = "Severely underweight"
    return {"value": round(pct,1), "unit":"%", "interpretation": interp, "ibw_kg": ibw}

def adjusted_body_weight(weight_kg: float, gender: str, height_cm: float) -> Dict:
    ibw = ibw_hamwi(gender, height_cm)["value"]
    adj = ibw + 0.4 * (weight_kg - ibw)
    return {"value": round(adj,2), "unit":"kg", "ibw_kg": ibw}

def dry_weight(weight_kg: float, edema_or_ascites: str) -> Dict:
    """
    edema_or_ascites: choices e.g. 'ascites_minimal', 'ascites_moderate', 'ascites_severe',
                      'edema_minimal', 'edema_moderate', 'edema_severe'
    """
    mapping = {
        "ascites_minimal": 2.2, "ascites_moderate": 6, "ascites_severe": 14,
        "edema_minimal": 1, "edema_moderate": 5, "edema_severe": 10
    }
    drop = mapping.get(edema_or_ascites.lower(), 0)
    return {"value": round(max(0, weight_kg - drop),2), "unit":"kg", "assumed_drop_kg": drop}

def ibw_amputation(gender: str, height_cm: float, percent_amputation: float) -> Dict:
    ibw = ibw_hamwi(gender, height_cm)["value"]
    val = ((100 - percent_amputation) / 100.0) * ibw
    return {"value": round(val,2), "unit":"kg", "ibw_kg": ibw, "percent_amputation": percent_amputation}

def waist_height_ratio(waist_cm: float, height_cm: float, gender:str) -> Dict:
    if height_cm <= 0:
        raise ValueError("Invalid height")
    ratio = waist_cm / height_cm
    if gender.lower().startswith('m'):
        if ratio <= 0.95:
            interp = "Low risk"
        elif 0.96 <= ratio < 1.0:
            interp = "Moderate risk"
        else:
            interp = "High risk"
    else:
        if ratio <= 0.80:
            interp = "Low risk"
        elif 0.81 <= ratio < 0.85:
            interp = "Moderate risk"
        else:
            interp = "High risk"
    return {"value": round(ratio,3), "unit":"ratio", "interpretation": interp}

def percent_ubw(weight_kg: float, usual_weight_kg: float) -> Dict:
    val = (weight_kg / usual_weight_kg) * 100 if usual_weight_kg>0 else None
    return {"value": round(val,1), "unit":"%", "interpretation": ""}

def percent_weight_change(current_weight_kg: float, usual_weight_kg: float) -> Dict:
    if usual_weight_kg<=0:
        raise ValueError("Invalid usual weight")
    val = ((usual_weight_kg - current_weight_kg) / usual_weight_kg) * 100
    # interpretation guidance not tied to timeframe here
    return {"value": round(val,1), "unit":"%", "interpretation": "See timeframe-specific thresholds"}


# ---------- Height estimation ----------
def demi_span_height(gender:str, demi_span_cm: float) -> Dict:
    if gender.lower().startswith('m'):
        val = (1.4 * demi_span_cm) + 57.8
    else:
        val = (1.35 * demi_span_cm) + 60.1
    return {"value": round(val,1), "unit":"cm"}

def knee_height_estimate(gender:str, knee_height_cm: float, age_years: float) -> Dict:
    if gender.lower().startswith('m'):
        val = 64.19 - (0.04 * age_years) + (2.02 * knee_height_cm)
    else:
        val = 84.88 - (0.24 * age_years) + (1.83 * knee_height_cm)
    return {"value": round(val,1), "unit":"cm"}

# ---------- Energy & BMR ----------

def harris_benedict(gender:str, weight_kg:float, height_m:float, age:float) -> Dict:
    if gender.lower().startswith('f'):
        kcal = 655.1 + (9.6 * weight_kg) + (1.9 * (height_m*100)) - (4.7 * age)
    else:
        kcal = 66.5 + (13.8 * weight_kg) + (5.0 * (height_m*100)) - (6.8 * age)
    return {"value": round(kcal,1), "unit":"kcal/day"}

def mifflin_st_jeor(gender:str, weight_kg:float, height_cm:float, age:int) -> Dict:
    if gender.lower().startswith('f'):
        val = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161
    else:
        val = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5
    return {"value": round(val,1), "unit":"kcal/day"}

def total_energy_expenditure(hbe_kcal:float, physical_factor:Optional[float]=1.0, stress_factor:Optional[float]=1.0) -> Dict:
    val = hbe_kcal * physical_factor * stress_factor
    return {"value": round(val,1), "unit":"kcal/day", "p_factor": physical_factor, "s_factor": stress_factor}

def penn_state(mifflin_kcal:float, tmax_c:float, ve_l_min:float, older_and_obese:bool=False) -> Dict:
    # two variants per spec
    if older_and_obese:
        val = (mifflin_kcal * 0.71) + (tmax_c * 85) + (ve_l_min * 64) - 3085
    else:
        val = (mifflin_kcal * 0.96) + (tmax_c * 167) + (ve_l_min * 31) - 6212
    return {"value": round(val,1), "unit":"kcal/day"}

def cunningham(weight_kg:float, percent_body_fat:float) -> Dict:
    fat_weight = weight_kg * (percent_body_fat/100.0)
    lbm = weight_kg - fat_weight
    val = 500 + 22 * lbm
    return {"value": round(val,1), "unit":"kcal/day", "lean_body_mass_kg": round(lbm,2)}

# ---------- Fluids ----------

def baseline_fluid_bsa(weight_kg:float) -> Dict:
    # per BSA-style rules in the sheet
    if weight_kg < 5:
        val = (weight_kg * 0.05 + 0.05) * 1500
    elif 5 <= weight_kg <= 10:
        val = (weight_kg * 0.04 + 0.1) * 1500
    elif 10 < weight_kg <= 20:
        val = (weight_kg * 0.03 + 0.2) * 1500
    elif 20 < weight_kg <= 40:
        val = (weight_kg * 0.02 + 0.4) * 1500
    else:
        val = (weight_kg * 0.01 + 0.8) * 1500
    return {"value": round(val,1), "unit":"mL/day"}

def baseline_fluid_standard(weight_kg:float) -> Dict:
    if 1 <= weight_kg <= 10:
        val = 100 * weight_kg
    elif 11 <= weight_kg <= 20:
        val = 1000 + 50 * (weight_kg - 10)
    elif weight_kg > 20:
        val = 1500 + 20 * (weight_kg - 20)
    else:
        raise ValueError("Weight must be >=1 kg")
    return {"value": round(val,1), "unit":"mL/day"}

# ---------- Diabetes ----------

def insulin_to_carb_ratio(total_daily_dose_iu:float, insulin_type:str="rapid") -> Dict:
    # rapid -> 500 / TDD ; short -> 450 / TDD
    if insulin_type.lower() == "short":
        val = 450 / total_daily_dose_iu
    else:
        val = 500 / total_daily_dose_iu
    return {"value": round(val,1), "unit":"g_carbs_per_1U"}

def insulin_sensitivity(total_daily_dose_iu:float, insulin_type:str="rapid") -> Dict:
    # rapid -> 1800 / TDD ; short -> 1500 / TDD
    if insulin_type.lower() == "short":
        val = 1500 / total_daily_dose_iu
    else:
        val = 1800 / total_daily_dose_iu
    return {"value": round(val,1), "unit":"mg/dL_drop_per_1U"}

def insulin_initial_dose(weight_kg:float, by_kg:bool=True) -> Dict:
    # either lb/4 or kg*0.55
    val = weight_kg * 0.55
    return {"value": round(val,1), "unit":"U"}

# ---------- Water & Nitrogen ----------

def free_water_deficit(weight_kg:float, sodium_mmol_l:float, gender:str, age_years:int) -> Dict:
    # TBW fraction:
    if age_years > 65 and gender.lower().startswith('f'):
        tbw = 0.45
    elif gender.lower().startswith('f') and age_years <= 65:
        tbw = 0.5
    elif not gender.lower().startswith('f') and age_years <= 65:
        tbw = 0.6
    else:
        tbw = 0.5
    deficit_L = tbw * weight_kg * ((sodium_mmol_l - 140) / 140.0)
    return {"value": round(deficit_L,2), "unit":"L", "tbw_fraction": tbw}

def nitrogen_balance(protein_intake_g:float, urine_urea_n_g:float) -> Dict:
    val = (protein_intake_g / 6.25) - urine_urea_n_g + 3
    interp = "Anabolic" if val>0 else "Catabolic"
    return {"value": round(val,2), "unit":"gN/day", "interpretation": interp}

# ---------- Nutrition Risk & Immune ----------

def nutrition_risk_index(albumin_g_dl:float, weight_kg:float, gender:str, height_cm:float) -> Dict:
    ibw = ibw_hamwi(gender, height_cm)["value"]
    pct_ibw = (weight_kg / ibw) * 100 if ibw>0 else 0
    nri = (1.519 * albumin_g_dl) + (41.7 * (pct_ibw/100.0))
    # interpretation
    if nri > 100:
        interp = "No risk"
    elif 97.5 <= nri <= 100:
        interp = "Mild risk"
    elif 83.5 <= nri < 97.5:
        interp = "Moderate risk"
    else:
        interp = "Severe risk"
    return {"value": round(nri,2), "unit":"index", "interpretation": interp, "pct_ibw": round(pct_ibw,1), "ibw_kg": ibw}

def total_lymphocyte_count(percent_lymphocytes:float, wbc_10e3:float) -> Dict:
    val = (percent_lymphocytes/100.0) * (wbc_10e3 * 1000)  # cells/uL
    # interpretation thresholds
    if val > 1500:
        interp = "Normal"
    elif 1200 <= val <= 1500:
        interp = "Mild depletion"
    elif 800 <= val < 1200:
        interp = "Moderate depletion"
    else:
        interp = "Severe depletion"
    return {"value": int(val), "unit":"cells/uL", "interpretation": interp}


## Nutrition Risk in Critically Ill (NUTRIC) Score
def calculate_nutric_score(age, apache_ii, sofa, comorbidities, days_hospitalized, il_6=None):
    """Calculate NUTRIC score with or without IL-6"""
    score = 0
    
    # Age scoring
    if age < 50:
        score += 0
    elif age < 75:
        score += 1
    else:
        score += 2
    
    # Apache II scoring
    if apache_ii < 15:
        score += 0
    elif apache_ii < 20:
        score += 1
    elif apache_ii < 28:
        score += 2
    else:
        score += 3
    
    # SOFA scoring
    if sofa < 6:
        score += 0
    else:
        score += 1
    
    # Comorbidities scoring
    score += comorbidities
    
    # Days hospitalized scoring
    if days_hospitalized < 1:
        score += 0
    else:
        score += 1
    
    # IL-6 scoring if available
    if il_6 is not None:
        if il_6 < 400:
            score += 0
        else:
            score += 1
    
    return score

def interpret_nutric_score(score, has_il_6=False):
    """Interpret NUTRIC score based on whether IL-6 was available"""
    if has_il_6:
        if score <= 5:
            return "Low risk"
        else:
            return "High risk - benefit from aggressive nutrition therapy"
    else:
        if score <= 4:
            return "Low risk"
        else:
            return "High risk - benefit from aggressive nutrition therapy"





# Updated Equations list in management/commands/equations.py
def ibw_spinal_cord_injury(gender: str, height_in_inches: float, classification: str = None):
    """
    حساب Ideal Body Weight (IBW) لمرضى Spinal Cord Injury

    Parameters:
        gender (str): "male" or "female"
        height_in_inches (float): الطول بالبوصة (inch)
        classification (str): None, "paraplegia", "tetraplegia" or "quadriplegia"

    Returns:
        dict: { "ibw_lb": ..., "ibw_kg": ... }
    """
    if height_in_inches <= 0:
        return {"error": "Height must be positive"}

    if gender.lower() == "female":
        # base 100 lb for 5 ft + 5 lb لكل بوصة زيادة فوق 60 inch
        if height_in_inches > 60:
            ibw = 100 + 5 * (height_in_inches - 60)
        else:
            ibw = 100
    elif gender.lower() == "male":
        # base 106 lb for 5 ft + 6 lb لكل بوصة زيادة فوق 60 inch
        if height_in_inches > 60:
            ibw = 106 + 6 * (height_in_inches - 60)
        else:
            ibw = 106
    else:
        return {"error": "Gender must be 'male' or 'female'"}

    # تعديل حسب classification
    if classification:
        classification = classification.lower()
        if classification == "paraplegia":
            ibw *= 0.90  # subtract 10–15%, نبدأ بالـ 10% كقيمة default
        elif classification in ["tetraplegia", "quadriplegia"]:
            ibw *= 0.85  # subtract 15–20%, نبدأ بالـ 15% كقيمة default

    # تحويل من lb → kg
    ibw_kg = ibw * 0.453592

    return {
        "ibw_lb": round(ibw, 2),
        "ibw_kg": round(ibw_kg, 2)
    }




def growth_velocity(
    weight_t1: float = None, weight_t2: float = None,
    height_t1: float = None, height_t2: float = None,
    time1_day: int = None, time2_day: int = None,
    time1_week: int = None, time2_week: int = None,
    preterm: bool = False, weight_current: float = None, age_months: int = None
):
    """
    حساب Growth Velocity للوزن والطول
    
    Parameters:
        weight_t1, weight_t2 (float): الوزن بالكيلو عند الوقت1 والوقت2
        height_t1, height_t2 (float): الطول بالسم عند الوقت1 والوقت2
        time1_day, time2_day (int): الزمن باليوم
        time1_week, time2_week (int): الزمن بالأسبوع
        preterm (bool): هل الطفل مبتسر
        weight_current (float): الوزن الحالي (لتفسير preterm <2kg أو >2kg)
        age_months (int): عمر الطفل بالشهور (لتحديد رينج التفسير)

    Returns:
        dict: { "weight_velocity_g_d": ..., "height_velocity_cm_wk": ..., "interpretation": ... }
    """

    result = {}

    # وزن
    if weight_t1 is not None and weight_t2 is not None and time1_day is not None and time2_day is not None:
        delta_weight = (weight_t2 - weight_t1) * 1000  # حول من kg إلى g
        delta_days = time2_day - time1_day
        if delta_days > 0:
            result["weight_velocity_g_d"] = round(delta_weight / delta_days, 2)

    # طول
    if height_t1 is not None and height_t2 is not None and time1_week is not None and time2_week is not None:
        delta_height = height_t2 - height_t1
        delta_weeks = time2_week - time1_week
        if delta_weeks > 0:
            result["height_velocity_cm_wk"] = round(delta_height / delta_weeks, 2)

    # التفسير حسب العمر
    interpretation = None
    if age_months is not None:
        if preterm and weight_current is not None:
            if weight_current < 2:
                interpretation = {
                    "weight": "15–20 g/kg/d",
                    "height": "0.8–1.1 cm/week"
                }
            else:
                interpretation = {
                    "weight": "20–30 g/d",
                    "height": "0.8–1.1 cm/week"
                }
        elif age_months < 4:
            interpretation = {"weight": "23–34 g/d", "height": "0.8–0.93 cm/week"}
        elif 4 <= age_months < 8:
            interpretation = {"weight": "10–16 g/d", "height": "0.37–0.47 cm/week"}
        elif 8 <= age_months < 12:
            interpretation = {"weight": "6–11 g/d", "height": "0.28–0.37 cm/week"}
        elif 12 <= age_months < 16:
            interpretation = {"weight": "5–9 g/d", "height": "0.24–0.33 cm/week"}
        elif 16 <= age_months < 20:
            interpretation = {"weight": "4–9 g/d", "height": "0.21–0.29 cm/week"}
        elif 20 <= age_months <= 24:
            interpretation = {"weight": "4–9 g/d", "height": "0.19–0.26 cm/week"}

    if interpretation:
        result["interpretation"] = interpretation

    return result



def harris_benedict(gender, weight_kg, height_cm, age):
    """
    Harris-Benedict Equation
    height_cm in cm, weight_kg in kg, age in years
    """
    if gender.lower() == "female":
        return f"{ 655.1 + (9.6 * weight_kg) + (1.9 * height_cm) - (4.7 * age)} Kcal/d"
    elif gender.lower() == "male":
        return F"{66.5 + (13.8 * weight_kg) + (5.0 * height_cm) - (6.8 * age)} Kcal/d"
    else:
        raise ValueError("Gender must be 'male' or 'female'.")


def mifflin_st_jeor(gender, weight_kg, height_cm, age):
    """
    Mifflin-St Jeor Equation
    height_cm in cm, weight_kg in kg, age in years
    """
    if gender.lower() == "male":
        return f"{(10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5} Kcal/d"
    elif gender.lower() == "female":
        return f"{(10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161} Kcal/d"
    else:
        raise ValueError("Gender must be 'male' or 'female'.")


def quick_method(weight_kg, min_factor=None, max_factor=None):
    """
    Quick method for kcal needs
    """
    if min_factor and max_factor:
        min_kcal = min_factor * weight_kg
        max_kcal = max_factor * weight_kg
        return f'{{"min": {min_kcal}, "max": {max_kcal}}} Kcal/d'
    elif min_factor:
        min_kcal = min_factor * weight_kg
        return f'{{"min": {min_kcal}}} Kcal/d'
    elif max_factor:
        max_kcal = max_factor * weight_kg
        return f'{{"max": {max_kcal}}} Kcal/d'
    else:
        return None


def macronutrient_distribution(calories, carb_pct, protein_pct, fat_pct):
    """
    Macronutrients distribution in grams
    """
    carbs = (calories * carb_pct / 100) / 4
    protein = (calories * protein_pct / 100) / 4
    fat = (calories * fat_pct / 100) / 9
    return {"carbs_g": round(carbs, 2), "protein_g": round(protein, 2), "fat_g": round(fat, 2)}


def rda_calories(age, weight, gender):
    """
    RDA Calorie needs (simplified based on table)
    """
    if age <= 0.5:
        return weight * 108
    elif 0.5 < age <= 1:
        return weight * 98
    elif 1 < age <= 3:
        return weight * 102
    elif 4 <= age <= 6:
        return weight * 90
    elif 7 <= age <= 10:
        return weight * 70
    elif 11 <= age <= 14:
        return weight * (55 if gender.lower() == "male" else 47)
    elif 15 <= age <= 18:
        return weight * (45 if gender.lower() == "male" else 40)
    else:
        return None


def rda_protein(age, weight, gender):
    """
    RDA Protein needs
    """
    if age <= 0.5:
        return weight * 2.2
    elif 0.5 < age <= 1:
        return weight * 1.6
    elif 1 < age <= 3:
        return weight * 1.2
    elif 4 <= age <= 6:
        return weight * 1.1
    elif 7 <= age <= 10:
        return weight * 1.0
    elif 11 <= age <= 14:
        return weight * 1.0
    elif 15 <= age <= 18:
        return weight * (0.9 if gender.lower() == "male" else 0.8)
    else:
        return None

STRESS_FACTORS = {
    'minor_surgery': 1.1,
    'major_surgery': 1.2,
    'skeletal_trauma': 1.2,
    'blunt_trauma': 1.35,
    'closed_head_injury': 1.4,
    'mild_infection': 1.2,
    'moderate_infection': 1.4,
    'severe_infection': 1.8,
    'starvation': 0.85,
    'burns_lt_20': 1.5,
    'burns_20_40': 1.8,
    'burns_gt_40': 1.9  # Using 1.9 as midpoint for >40%
}

# Physical activity factors mapping
ACTIVITY_FACTORS = {
    'sedentary': 1.2,
    'lightly_active': 1.375,
    'moderately_active': 1.55,
    'very_active': 1.725,
    'extra_active': 1.9
}

def schofield_bmr(age, gender, weight_kg, height_cm, 
                 physical_activity=None, stress_factor=None):
    """
    Schofield BMR calculation based on age and gender
    """
    # Default factors if not provided
    pa_factor = ACTIVITY_FACTORS.get(physical_activity, 1.2) if physical_activity else 1.2
    stress_factor_val = STRESS_FACTORS.get(stress_factor, 1.0) if stress_factor else 1.0
    
    if age <= 3:  # 0-3 years
        if gender.lower() == 'male':
            bmr = (0.167 * weight_kg) + (15.174 * height_cm) - 617.6
        else:  # female
            bmr = (16.252 * weight_kg) + (10.23 * height_cm) - 413.5
            
    elif age <= 10:  # 3-10 years
        if gender.lower() == 'male':
            bmr = (19.59 * weight_kg) + (1.303 * height_cm) + 414.9
        else:  # female
            bmr = (16.969 * weight_kg) + (1.618 * height_cm) + 371.2
            
    elif age <= 13:  # 10-13 years
        if gender.lower() == 'male':
            bmr = (16.25 * weight_kg) + (1.372 * height_cm) + 515.5
        else:  # female
            bmr = (8.365 * weight_kg) + (4.65 * height_cm) + 200
            
    elif age <= 18:  # 14-18 years
        if gender.lower() == 'male':
            bmr = (16.25 * weight_kg) + (1.372 * height_cm) + 515.5
        else:  # female
            bmr = (8.365 * weight_kg) + (4.65 * height_cm) + 200
            
    else:  # >18 years
        if gender.lower() == 'male':
            bmr = (15.057 * weight_kg) - (1.004 * height_cm) + 705.8
        else:  # female
            bmr = (13.623 * weight_kg) + (2.83 * height_cm) + 98.2
    
    # Apply activity and stress factors
    total_calories = bmr * pa_factor * stress_factor_val
    
    return {
        'bmr': round(bmr, 2),
        'total_calories': round(total_calories, 2),
        'physical_activity_factor': pa_factor,
        'stress_factor': stress_factor_val,
        'unit': 'kcal/d'
    }

def catchup_growth(age, gender, weight_kg, height_cm):
    """
    Catch-up Growth calculation
    This is a simplified version - in practice, you'd need growth chart data
    """
    # For demonstration - in real implementation, you'd query growth chart data
    # This returns kcal/kg/day based on age and gender
    
    if age < 2:  # 0-24 months
        # Simplified calculation - would normally use WHO growth charts
        if gender.lower() == 'male':
            kcal_per_kg = 100 if age < 1 else 90
        else:
            kcal_per_kg = 95 if age < 1 else 85
    else:  # 2-20 years
        # Simplified calculation - would normally use CDC BMI charts
        if gender.lower() == 'male':
            kcal_per_kg = 80 if age < 10 else 70
        else:
            kcal_per_kg = 75 if age < 10 else 65
    
    return {
        'kcal_per_kg': kcal_per_kg,
        'estimated_needs': round(kcal_per_kg * weight_kg, 2),
        'unit': 'kcal/kg/day'
    }


def gestation_adjusted_age(gestational_age_weeks, chronological_age_weeks):
    """
    Calculate Gestation-Adjusted Age (Correction Age)
    Step 1: 40 weeks - gestational age at birth (in weeks) = age in week
    Step 2: chronological age (age Now) in weeks - previous result = actual age
    """
    step1 = 40 - gestational_age_weeks
    actual_age_weeks = chronological_age_weeks - step1
    
    # Convert weeks to months for better readability
    actual_age_months = round(actual_age_weeks / 4.345, 1)  # 4.345 weeks per month
    
    return {
        'gestation_adjusted_age_weeks': round(actual_age_weeks, 1),
        'gestation_adjusted_age_months': actual_age_months,
        'unit': 'months'
    }

def preterm_estimated_requirement(weight_kg):
    """
    Preterm Estimated Requirement calculation
    Returns ranges for calories, carbohydrates, protein, and fat
    """
    calorie_range = {
        'min': round(105 * weight_kg, 2),
        'max': round(130 * weight_kg, 2),
        'unit': 'kcal/d'
    }
    
    carb_range = {
        'min': round(10 * weight_kg, 2),
        'max': round(14 * weight_kg, 2),
        'unit': 'g/d'
    }
    
    protein_range = {
        'min': round(3.5 * weight_kg, 2),
        'max': round(4.5 * weight_kg, 2),
        'unit': 'g/d'
    }
    
    fat_range = {
        'min': round(5 * weight_kg, 2),
        'max': round(7 * weight_kg, 2),
        'unit': 'g/d'
    }
    
    return {
        'calories': calorie_range,
        'carbohydrates': carb_range,
        'protein': protein_range,
        'fat': fat_range,
        'weight_kg': weight_kg
    }

def ireton_jones_ventilator(age, gender, weight_kg, trauma, burn):
    """
    Ireton-Jones (Ventilator-Dependent) equation
    1784 - (11 x Age) + (5 x Weight) + (244 x Gender) + (239 x Trauma) - (804 x Burn)
    Gender: male=1, female=0
    Trauma: present=1, absent=0
    Burn: present=1, absent=0
    """
    gender_factor = 1 if gender.lower() == 'male' else 0
    trauma_factor = 1 if trauma.lower() == 'present' else 0
    burn_factor = 1 if burn.lower() == 'present' else 0
    
    result = 1784 - (11 * age) + (5 * weight_kg) + (244 * gender_factor) + (239 * trauma_factor) - (804 * burn_factor)
    
    return {
        'energy_expenditure': round(result, 2),
        'gender_factor': gender_factor,
        'trauma_factor': trauma_factor,
        'burn_factor': burn_factor,
        'unit': 'kcal/d'
    }

def ireton_jones_spontaneous(age, weight_kg, height_cm):
    """
    Ireton-Jones (Spontaneously Breathing) equation
    629 - (11 x Age) + (25 x Weight) - (609 x Obesity)
    Obesity: BMI > 30 = 1, BMI <= 30 = 0
    """
    # Calculate BMI first
    height_m = height_cm / 100
    bmi = weight_kg / (height_m ** 2)
    obesity_factor = 1 if bmi > 30 else 0
    
    result = 629 - (11 * age) + (25 * weight_kg) - (609 * obesity_factor)
    
    return {
        'energy_expenditure': round(result, 2),
        'bmi': round(bmi, 2),
        'obesity_factor': obesity_factor,
        'unit': 'kcal/d'
    }

def curreri_burn(age, gender, weight_kg, tbsa_percentage):
    """
    Curreri Burn Equation for burn patients
    """
    if age < 1:  # <1 year
        rda = rda_calories(age=age, gender=gender, weight=weight_kg)
        if rda is None:
            return {'error': 'RDA not defined for this age group'}
        result = rda + (15 * tbsa_percentage)
        
    elif age <= 3:  # 1-3 years
        rda = rda_calories(age=age, gender=gender, weight=weight_kg)
        result = rda + (25 * tbsa_percentage)
        
    elif age <= 13:  # 4-13 years
        rda = rda_calories(age=age, gender=gender, weight=weight_kg)
        result = rda + (40 * tbsa_percentage)
        
    elif age == 14:  # 14 years
        if gender.lower() == 'male':
            result = (weight_kg * 55) + (40 * tbsa_percentage)
        else:  # female
            result = (weight_kg * 47) + (40 * tbsa_percentage)
            
    elif age == 15:  # 15 years
        if gender.lower() == 'male':
            result = (weight_kg * 45) + (40 * tbsa_percentage)
        else:  # female
            result = (weight_kg * 40) + (40 * tbsa_percentage)
            
    elif age <= 59:  # 16-59 years
        result = (weight_kg * 25) + (40 * tbsa_percentage)
        
    else:  # >60 years
        result = (weight_kg * 20) + (65 * tbsa_percentage)
    
    return {
        'energy_needs': round(result, 2),
        'tbsa_percentage': tbsa_percentage,
        'weight_kg': weight_kg,
        'unit': 'kcal/d'
    }

def pregnancy_energy_needs(age, prepregnancy_weight_kg, height_cm, 
                          trimester, physical_activity, gestation_week=None):
    """
    Energy Needs in Pregnancy by Age & BMI group
    Only for 19 years and more
    """
    if age < 19:
        return {'error': 'Equation only valid for age 19 and above'}
    
    # Calculate prepregnancy BMI
    height_m = height_cm / 100
    prepregnancy_bmi = prepregnancy_weight_kg / (height_m ** 2)
    
    # Determine energy deposition based on prepregnancy BMI
    if prepregnancy_bmi < 18.5:  # underweight
        energy_deposition = 300
    elif prepregnancy_bmi < 25:  # normal weight
        energy_deposition = 200
    elif prepregnancy_bmi < 30:  # overweight
        energy_deposition = 150
    else:  # obese
        energy_deposition = -50
    
    if trimester.lower() == 'first':
        if physical_activity.lower() == 'inactive':
            result = 584.90 - (7.01 * age) + (5.72 * height_cm) + (11.71 * prepregnancy_weight_kg)
        elif physical_activity.lower() == 'low_active':
            result = 575.77 - (7.01 * age) + (6.60 * height_cm) + (12.14 * prepregnancy_weight_kg)
        elif physical_activity.lower() == 'active':
            result = 710.25 - (7.01 * age) + (6.54 * height_cm) + (12.34 * prepregnancy_weight_kg)
        elif physical_activity.lower() == 'very_active':
            result = 511.83 - (7.01 * age) + (9.07 * height_cm) + (12.56 * prepregnancy_weight_kg)
        else:
            return {'error': 'Invalid physical activity level'}
            
    else:  # second or third trimester
        if gestation_week is None:
            return {'error': 'Gestation week required for second/third trimester'}
            
        if physical_activity.lower() == 'inactive':
            result = 1131.20 - (2.04 * age) + (0.34 * height_cm) + (12.15 * prepregnancy_weight_kg) + (9.16 * gestation_week)
        elif physical_activity.lower() == 'low_active':
            result = 693.35 - (2.04 * age) + (5.73 * height_cm) + (10.20 * prepregnancy_weight_kg) + (9.16 * gestation_week)
        elif physical_activity.lower() == 'active':
            result = -223.84 - (2.04 * age) + (13.23 * height_cm) + (8.15 * prepregnancy_weight_kg) + (9.16 * gestation_week)
        elif physical_activity.lower() == 'very_active':
            result = -779.72 - (2.04 * age) + (18.45 * height_cm) + (8.73 * prepregnancy_weight_kg) + (9.16 * gestation_week)
        else:
            return {'error': 'Invalid physical activity level'}
        
        # Add energy deposition for second/third trimester
        result += energy_deposition
    
    return {
        'energy_needs': round(result, 2),
        'prepregnancy_bmi': round(prepregnancy_bmi, 2),
        'energy_deposition': energy_deposition,
        'unit': 'kcal/d'
    }

def pregnancy_simple_addition(calorie_requirement, trimester):
    """
    Simple pregnancy calorie addition
    Calorie Requirement + (Second trimester= +340, Third trimester= +452)
    """
    if trimester.lower() == 'first':
        addition = 0
    elif trimester.lower() == 'second':
        addition = 340
    elif trimester.lower() == 'third':
        addition = 452
    else:
        return {'error': 'Invalid trimester'}
    
    result = calorie_requirement + addition
    
    return {
        'energy_needs': round(result, 2),
        'base_calories': calorie_requirement,
        'trimester_addition': addition,
        'unit': 'kcal/d'
    }

def lactation_energy_needs(calorie_requirement, lactation_period):
    """
    Energy needs in lactation
    Calorie Requirement + (First 6 months= +330, Second 6 months= +400)
    """
    if lactation_period.lower() == 'first_6_months':
        addition = 330
    elif lactation_period.lower() == 'second_6_months':
        addition = 400
    else:
        return {'error': 'Invalid lactation period'}
    
    result = calorie_requirement + addition
    
    return {
        'energy_needs': round(result, 2),
        'base_calories': calorie_requirement,
        'lactation_addition': addition,
        'unit': 'kcal/d'
    }

def down_syndrome_calorie(age, gender, height_cm):
    """
    Down Syndrome Calorie Requirement (Ages 5–12)
    Age 5-12 years + Male: Height (in cm) × 16.1
    Age 5-12 years + Female: Height (in cm) × 14.3
    """
    if age < 5 or age > 12:
        return {'error': 'Equation only valid for ages 5-12 years'}
    
    if gender.lower() == 'male':
        result = height_cm * 16.1
    elif gender.lower() == 'female':
        result = height_cm * 14.3
    else:
        return {'error': 'Invalid gender'}
    
    return {
        'energy_needs': round(result, 2),
        'height_cm': height_cm,
        'gender': gender,
        'age': age,
        'unit': 'kcal/d'
    }

def cerebral_palsy_calorie(age, height_cm, physical_activity):
    """
    Cerebral Palsy Calorie Requirement (Ages 5–12)
    Age 5-12 years + Mild to moderate activity: Height (in cm) × 13.9
    Age 5-12 years + Severe physical restriction: Height (in cm) × 11.1
    Age 5-12 years + Severe restricted activity: Height (in cm) × 10
    Age 5-12 years + Athetoid cerebral palsy: Up to 6000 kcal/day
    """
    if age < 5 or age > 12:
        return {'error': 'Equation only valid for ages 5-12 years'}
    
    activity_level = physical_activity.lower()
    
    if activity_level == 'mild_to_moderate':
        result = height_cm * 13.9
        description = "Mild to moderate activity"
    elif activity_level == 'severe_physical_restriction':
        result = height_cm * 11.1
        description = "Severe physical restriction"
    elif activity_level == 'severe_restricted_activity':
        result = height_cm * 10
        description = "Severe restricted activity"
    elif activity_level == 'athetoid_cerebral_palsy':
        result = 6000  # Maximum value
        description = "Athetoid cerebral palsy (up to 6000 kcal/day)"
    else:
        return {'error': 'Invalid physical activity level'}
    
    return {
        'energy_needs': round(result, 2),
        'height_cm': height_cm,
        'physical_activity': description,
        'age': age,
        'unit': 'kcal/d'
    }

def prader_willi_calorie(height_cm, goal):
    """
    Prader-Willi Syndrome Calorie Requirement
    Weight Maintenance: Height (in cm) × Range (10-11)
    Weight Loss: Height (in cm) × 8.5
    """
    goal_type = goal.lower()
    
    if goal_type == 'weight_maintenance':
        min_result = height_cm * 10
        max_result = height_cm * 11
        description = "Weight Maintenance (range 10-11 × height)"
        return {
            'energy_needs_min': round(min_result, 2),
            'energy_needs_max': round(max_result, 2),
            'height_cm': height_cm,
            'goal': description,
            'unit': 'kcal/d'
        }
    elif goal_type == 'weight_loss':
        result = height_cm * 8.5
        description = "Weight Loss (8.5 × height)"
        return {
            'energy_needs': round(result, 2),
            'height_cm': height_cm,
            'goal': description,
            'unit': 'kcal/d'
        }
    else:
        return {'error': 'Invalid goal type'}


def prognostic_nutrition_index(albumin, triceps_skin_fold, transferrin, delayed_skin_hypersensitivity):
    """
    Prognostic Nutrition Index (PNI)
    158 - (16.6 x albumin) - (0.78 x triceps skin fold (in mm)) - 
    (0.2 x transferrin) - (5.8 x delayed skin hypersensitivity)
    """
    try:
        pni = 158 - (16.6 * float(albumin)) - (0.78 * float(triceps_skin_fold)) - (0.2 * float(transferrin)) - (5.8 * float(delayed_skin_hypersensitivity))
        
        # Interpretation
        if pni < 40:
            interpretation = "Normal"
            risk_level = "normal"
        else:
            interpretation = "Compromised"
            risk_level = "compromised"
        
        return {
            'pni_score': round(pni, 2),
            'interpretation': interpretation,
            'risk_level': risk_level,
            'parameters': {
                'albumin': albumin,
                'triceps_skin_fold_mm': triceps_skin_fold,
                'transferrin': transferrin,
                'delayed_skin_hypersensitivity': delayed_skin_hypersensitivity
            },
            'cutoff_values': {
                'normal': '<40',
                'compromised': '≥40'
            }
        }
    except (ValueError, TypeError) as e:
        return {'error': f'Invalid input values: {str(e)}'}

def prognostic_inflammatory_nutrition_index(c_reactive_protein, alpha_1_acid_glycoprotein, prealbumin, albumin):
    """
    Prognostic Inflammatory and Nutrition Index (PINI)
    (C-reactive protein × alpha 1-acid-glycoprotein) / (prealbumin × albumin)
    """
    try:
        # Convert to float and handle potential zero division
        crp = float(c_reactive_protein)
        a1ag = float(alpha_1_acid_glycoprotein)
        prealb = float(prealbumin)
        alb = float(albumin)
        
        if prealb == 0 or alb == 0:
            return {'error': 'Prealbumin and albumin values cannot be zero'}
        
        pini = (crp * a1ag) / (prealb * alb)
        
        # Interpretation
        if pini <= 1:
            interpretation = "No risk"
            risk_level = "no_risk"
        elif pini <= 10:
            interpretation = "Low risk"
            risk_level = "low_risk"
        elif pini <= 20:
            interpretation = "Moderate risk"
            risk_level = "moderate_risk"
        elif pini <= 30:
            interpretation = "Severe risk"
            risk_level = "severe_risk"
        else:
            interpretation = "Very severe risk (above 30)"
            risk_level = "very_severe_risk"
        
        return {
            'pini_score': round(pini, 2),
            'interpretation': interpretation,
            'risk_level': risk_level,
            'parameters': {
                'c_reactive_protein': crp,
                'alpha_1_acid_glycoprotein': a1ag,
                'prealbumin': prealb,
                'albumin': alb
            },
            'risk_categories': {
                'no_risk': '≤1',
                'low_risk': '1–10',
                'moderate_risk': '11–20',
                'severe_risk': '21–30',
                'very_severe_risk': '>30'
            }
        }
    except (ValueError, TypeError) as e:
        return {'error': f'Invalid input values: {str(e)}'}

