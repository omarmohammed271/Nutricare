// ---------- Weight & Body ----------

interface BmiEquation {
    name: "bmi";
    inputs: {
      weight_kg?: { value: number; detail: "Weight in kilograms (used with height_m)" };
      height_m?: { value: number; detail: "Height in meters (used with weight_kg)" };
      weight_lb?: { value: number; detail: "Weight in pounds (used with height_in)" };
      height_in?: { value: number; detail: "Height in inches (used with weight_lb)" };
    };
  }
  
  interface IbwHamwiEquation {
    name: "ibw_hamwi";
    inputs: {
      gender: { value: string; detail: "Biological sex, male or female" };
      height_cm: { value: number; detail: "Height in centimeters" };
    };
  }
  
  interface IbwLemmensEquation {
    name: "ibw_lemmens";
    inputs: {
      height_m: { value: number; detail: "Height in meters" };
      factor: { value: number; detail: "Scaling factor for IBW" };
    };
  }
  
  interface PercentIbwEquation {
    name: "percent_ibw";
    inputs: {
      weight_kg: { value: number; detail: "Current body weight in kilograms" };
      gender: { value: string; detail: "Biological sex" };
      height_cm: { value: number; detail: "Height in centimeters" };
    };
  }
  
  interface AdjustedBodyWeightEquation {
    name: "adjusted_body_weight";
    inputs: {
      weight_kg: { value: number; detail: "Actual body weight in kilograms" };
      gender: { value: string; detail: "Biological sex" };
      height_cm: { value: number; detail: "Height in centimeters" };
    };
  }
  
  interface DryWeightEquation {
    name: "dry_weight";
    inputs: {
      weight_kg: { value: number; detail: "Measured body weight in kilograms" };
      edema_or_ascites: { value: string; detail: "Condition type (ascites_minimal, ascites_moderate, ascites_severe, edema_minimal, edema_moderate, edema_severe)" };
    };
  }
  
  interface IbwAmputationEquation {
    name: "ibw_amputation";
    inputs: {
      gender: { value: string; detail: "Biological sex" };
      height_cm: { value: number; detail: "Height in centimeters" };
      percent_amputation: { value: number; detail: "Percent of body amputated" };
    };
  }
  
  interface WaistHeightRatioEquation {
    name: "waist_height_ratio";
    inputs: {
      waist_cm: { value: number; detail: "Waist circumference in centimeters" };
      height_cm: { value: number; detail: "Height in centimeters" };
      gender: { value: string; detail: "Biological sex" };
    };
  }
  
  interface PercentUbwEquation {
    name: "percent_ubw";
    inputs: {
      weight_kg: { value: number; detail: "Current weight in kilograms" };
      usual_weight_kg: { value: number; detail: "Usual (baseline) weight in kilograms" };
    };
  }
  
  interface PercentWeightChangeEquation {
    name: "percent_weight_change";
    inputs: {
      current_weight_kg: { value: number; detail: "Current body weight in kilograms" };
      usual_weight_kg: { value: number; detail: "Usual (baseline) body weight in kilograms" };
    };
  }
  
  // ---------- Height estimation ----------
  
  interface DemiSpanHeightEquation {
    name: "demi_span_height";
    inputs: {
      gender: { value: string; detail: "Biological sex" };
      demi_span_cm: { value: number; detail: "Demi-span length in centimeters" };
    };
  }
  
  interface KneeHeightEstimateEquation {
    name: "knee_height_estimate";
    inputs: {
      gender: { value: string; detail: "Biological sex" };
      knee_height_cm: { value: number; detail: "Knee height in centimeters" };
      age_years: { value: number; detail: "Age in years" };
    };
  }
  
  // ---------- Energy & BMR ----------
  
  interface HarrisBenedictEquation {
    name: "harris_benedict";
    inputs: {
      gender: { value: string; detail: "Biological sex" };
      weight_kg: { value: number; detail: "Body weight in kilograms" };
      height_m: { value: number; detail: "Height in meters" };
      age: { value: number; detail: "Age in years" };
    };
  }
  
  interface MifflinStJeorEquation {
    name: "mifflin_st_jeor";
    inputs: {
      gender: { value: string; detail: "Biological sex" };
      weight_kg: { value: number; detail: "Body weight in kilograms" };
      height_cm: { value: number; detail: "Height in centimeters" };
      age: { value: number; detail: "Age in years" };
    };
  }
  
  interface TotalEnergyExpenditureEquation {
    name: "total_energy_expenditure";
    inputs: {
      hbe_kcal: { value: number; detail: "Harris-Benedict energy expenditure in kcal/day" };
      physical_factor?: { value: number; detail: "Physical activity factor (default 1.0)" };
      stress_factor?: { value: number; detail: "Stress factor (default 1.0)" };
    };
  }
  
  interface PennStateEquation {
    name: "penn_state";
    inputs: {
      mifflin_kcal: { value: number; detail: "Mifflin-St Jeor kcal/day result" };
      tmax_c: { value: number; detail: "Maximum body temperature in °C" };
      ve_l_min: { value: number; detail: "Minute ventilation in liters per minute" };
      older_and_obese?: { value: boolean; detail: "Whether the patient is older and obese (true/false)" };
    };
  }
  
  interface CunninghamEquation {
    name: "cunningham";
    inputs: {
      weight_kg: { value: number; detail: "Body weight in kilograms" };
      percent_body_fat: { value: number; detail: "Body fat percentage" };
    };
  }
  
  // ---------- Fluids ----------
  
  interface BaselineFluidBsaEquation {
    name: "baseline_fluid_bsa";
    inputs: {
      weight_kg: { value: number; detail: "Body weight in kilograms" };
    };
  }
  
  interface BaselineFluidStandardEquation {
    name: "baseline_fluid_standard";
    inputs: {
      weight_kg: { value: number; detail: "Body weight in kilograms" };
    };
  }
  
  // ---------- Diabetes ----------
  
  interface InsulinToCarbRatioEquation {
    name: "insulin_to_carb_ratio";
    inputs: {
      total_daily_dose_iu: { value: number; detail: "Total daily insulin dose in IU" };
      insulin_type?: { value: string; detail: "Insulin type: rapid or short (default rapid)" };
    };
  }
  
  interface InsulinSensitivityEquation {
    name: "insulin_sensitivity";
    inputs: {
      total_daily_dose_iu: { value: number; detail: "Total daily insulin dose in IU" };
      insulin_type?: { value: string; detail: "Insulin type: rapid or short (default rapid)" };
    };
  }
  
  interface InsulinInitialDoseEquation {
    name: "insulin_initial_dose";
    inputs: {
      weight_kg: { value: number; detail: "Body weight in kilograms" };
      by_kg?: { value: boolean; detail: "Whether to calculate dose by kg (default true)" };
    };
  }
  
  // ---------- Water & Nitrogen ----------
  
  interface FreeWaterDeficitEquation {
    name: "free_water_deficit";
    inputs: {
      weight_kg: { value: number; detail: "Body weight in kilograms" };
      sodium_mmol_l: { value: number; detail: "Serum sodium concentration in mmol/L" };
      gender: { value: string; detail: "Biological sex" };
      age_years: { value: number; detail: "Age in years" };
    };
  }
  
  interface NitrogenBalanceEquation {
    name: "nitrogen_balance";
    inputs: {
      protein_intake_g: { value: number; detail: "Protein intake in grams" };
      urine_urea_n_g: { value: number; detail: "Urinary urea nitrogen in grams" };
    };
  }
  
  // ---------- Nutrition Risk & Immune ----------
  
  interface NutritionRiskIndexEquation {
    name: "nutrition_risk_index";
    inputs: {
      albumin_g_dl: { value: number; detail: "Serum albumin in g/dL" };
      weight_kg: { value: number; detail: "Current body weight in kilograms" };
      gender: { value: string; detail: "Biological sex" };
      height_cm: { value: number; detail: "Height in centimeters" };
    };
  }
  
  interface TotalLymphocyteCountEquation {
    name: "total_lymphocyte_count";
    inputs: {
      percent_lymphocytes: { value: number; detail: "Percentage of lymphocytes (%)" };
      wbc_10e3: { value: number; detail: "White blood cell count (×10^3/μL)" };
    };
  }
  