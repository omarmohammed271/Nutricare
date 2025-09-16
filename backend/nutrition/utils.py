# app/utils.py
from typing import Optional, Dict
import math

# ---------- Weight & Body ----------

def bmi(weight_kg: float, height_m: Optional[float]=None, weight_lb: Optional[float]=None, height_in: Optional[float]=None) -> Dict:
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
