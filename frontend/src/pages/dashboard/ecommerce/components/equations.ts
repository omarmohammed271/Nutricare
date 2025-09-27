/**
 * Equations Configuration
 * ------------------------
 * Author: Saif Eldin Ayman
 * Version: 2.0.1
 * Last Updated: 2025-09-18
 * Description: This file contains the structured configuration
 * for nutrition- and health-related equations used in the calculators.
 * Each equation includes its id, code, name, input definitions,
 * and optional system variations.
 */

export const equationsConfig = [
  {
    "id": 1,
    "code": "bmi",
    "name": "Body Mass Index (BMI)",
    "system": { "name": "inputs_system", "label": "Inputs System", "type": "select", "options": ["Metric (kg, m)", "Imperial (lb, in)"] },
    "inputs": [
      [
        { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
        { "name": "height_m", "label": "Height (m)", "type": "number" }
      ],
      [
        { "name": "weight_lb", "label": "Weight (lb)", "type": "number" },
        { "name": "height_in", "label": "Height (in)", "type": "number" }
      ]
    ]
  },
  {
    "id": 2,
    "code": "ibw_hamwi",
    "name": "Ideal Body Weight (Hamwi)",
    "inputs": [
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" }
    ]
  },
  {
    "id": 3,
    "code": "ibw_lemmens",
    "name": "Ideal Body Weight (Lemmens)",
    "inputs": [
      { "name": "height_m", "label": "Height (m)", "type": "number" },
      { "name": "factor", "label": "Scaling Factor", "type": "number" }
    ]
  },
  {
    "id": 11,
    "code": "demi_span_height",
    "name": "Demi-Span Height Estimate",
    "inputs": [
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "demi_span_cm", "label": "Demi-Span (cm)", "type": "number" }
    ]
  },
  {
    "id": 12,
    "code": "knee_height_estimate",
    "name": "Knee Height Estimate",
    "inputs": [
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "knee_height_cm", "label": "Knee Height (cm)", "type": "number" },
      { "name": "age_years", "label": "Age (years)", "type": "number" }
    ]
  },
  {
    "id": 4,
    "code": "percent_ibw",
    "name": "Percent of Ideal Body Weight",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" }
    ]
  },
  {
    "id": 5,
    "code": "adjusted_body_weight",
    "name": "Adjusted Body Weight",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" }
    ]
  },
  {
    "id": 6,
    "code": "dry_weight",
    "name": "Dry Weight",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      {
        "name": "edema_or_ascites",
        "label": "Condition",
        "type": "select",
        "options": [
          "ascites_minimal",
          "ascites_moderate",
          "ascites_severe",
          "edema_minimal",
          "edema_moderate",
          "edema_severe"
        ]
      }
    ]
  },
  {
    "id": 7,
    "code": "ibw_amputation",
    "name": "Ideal Body Weight (Amputation)",
    "inputs": [
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" },
      { "name": "percent_amputation", "label": "Percent Amputation (%)", "type": "number" }
    ]
  },
  {
    "id": 8,
    "code": "waist_height_ratio",
    "name": "Waist-to-Height Ratio",
    "inputs": [
      { "name": "waist_cm", "label": "Waist (cm)", "type": "number" },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] }
    ]
  },
  {
    "id": 9,
    "code": "percent_ubw",
    "name": "Percent of Usual Body Weight",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "usual_weight_kg", "label": "Usual Weight (kg)", "type": "number" }
    ]
  },
  {
    "id": 10,
    "code": "percent_weight_change",
    "name": "Percent Weight Change",
    "inputs": [
      { "name": "current_weight_kg", "label": "Current Weight (kg)", "type": "number" },
      { "name": "usual_weight_kg", "label": "Usual Weight (kg)", "type": "number" }
    ]
  },
  {
    "id": 13,
    "code": "harris_benedict",
    "name": "Harris-Benedict Equation",
    "inputs": [
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" },
      { "name": "age", "label": "Age (years)", "type": "number" }
    ]
  },
  {
    "id": 14,
    "code": "mifflin_st_jeor",
    "name": "Mifflin-St Jeor Equation",
    "inputs": [
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" },
      { "name": "age", "label": "Age (years)", "type": "number" }
    ]
  },
  {
    "id": 15,
    "code": "total_energy_expenditure",
    "name": "Total Energy Expenditure",
    "inputs": [
      { "name": "hbe_kcal", "label": "HBE kcal/day", "type": "number" },
      { "name": "physical_factor", "label": "Physical Factor", "type": "number" },
      { "name": "stress_factor", "label": "Stress Factor", "type": "number" }
    ]
  },
  {
    "id": 16,
    "code": "penn_state",
    "name": "Penn State Equation",
    "inputs": [
      { "name": "mifflin_kcal", "label": "Mifflin-St Jeor kcal/day", "type": "number" },
      { "name": "tmax_c", "label": "Max Temp (°C)", "type": "number" },
      { "name": "ve_l_min", "label": "Minute Ventilation (L/min)", "type": "number" },
      {
        "name": "older_and_obese",
        "label": "Older & Obese",
        "type": "select",
        "options": ["true", "false"]
      }
    ]
  },
  {
    "id": 17,
    "code": "cunningham",
    "name": "Cunningham Equation",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "percent_body_fat", "label": "Body Fat (%)", "type": "number" }
    ]
  },
  {
    "id": 18,
    "code": "baseline_fluid_bsa",
    "name": "Baseline Fluid (BSA Method)",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" }
    ]
  },
  {
    "id": 19,
    "code": "baseline_fluid_standard",
    "name": "Baseline Fluid (Standard)",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" }
    ]
  },
  {
    "id": 20,
    "code": "insulin_to_carb_ratio",
    "name": "Insulin-to-Carbohydrate Ratio",
    "inputs": [
      { "name": "total_daily_dose_iu", "label": "Total Daily Dose (IU)", "type": "number" },
      { "name": "insulin_type", "label": "Insulin Type", "type": "select", "options": ["rapid", "short"] }
    ]
  },
  {
    "id": 21,
    "code": "insulin_sensitivity",
    "name": "Insulin Sensitivity Factor",
    "inputs": [
      { "name": "total_daily_dose_iu", "label": "Total Daily Dose (IU)", "type": "number" },
      { "name": "insulin_type", "label": "Insulin Type", "type": "select", "options": ["rapid", "short"] }
    ]
  },
  {
    "id": 22,
    "code": "insulin_initial_dose",
    "name": "Initial Insulin Dose",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "by_kg", "label": "By kg?", "type": "select", "options": ["true", "false"] }
    ]
  },
  {
    "id": 23,
    "code": "free_water_deficit",
    "name": "Free Water Deficit",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "sodium_mmol_l", "label": "Sodium (mmol/L)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "age_years", "label": "Age (years)", "type": "number" }
    ]
  },
  {
    "id": 24,
    "code": "nitrogen_balance",
    "name": "Nitrogen Balance",
    "inputs": [
      { "name": "protein_intake_g", "label": "Protein Intake (g)", "type": "number" },
      { "name": "urine_urea_n_g", "label": "Urine Urea N (g)", "type": "number" }
    ]
  },
  {
    "id": 25,
    "code": "nutrition_risk_index",
    "name": "Nutrition Risk Index",
    "inputs": [
      { "name": "albumin_g_dl", "label": "Albumin (g/dL)", "type": "number" },
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" }
    ]
  },
  {
    "id": 26,
    "code": "total_lymphocyte_count",
    "name": "Total Lymphocyte Count",
    "inputs": [
      { "name": "percent_lymphocytes", "label": "Lymphocytes (%)", "type": "number" },
      { "name": "wbc_10e3", "label": "WBC (×10³/μL)", "type": "number" }
    ]
  },
  {
    "id": 27,
    "code": "ibw_sci",
    "name": "Ideal Body Weight (Spinal Cord Injury)",
    "inputs": [
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "height_in_inches", "label": "Height (inches)", "type": "number" },
      { "name": "classification", "label": "Classification", "type": "select", "options": ["none", "paraplegia", "tetraplegia", "quadriplegia"] }
    ]
  },
  {
    "id": 28,
    "code": "growth_velocity",
    "name": "Growth Velocity",
    "inputs": [
      { "name": "weight_t1", "label": "Weight at T1 (kg)", "type": "number" },
      { "name": "weight_t2", "label": "Weight at T2 (kg)", "type": "number" },
      { "name": "height_t1", "label": "Height at T1 (cm)", "type": "number" },
      { "name": "height_t2", "label": "Height at T2 (cm)", "type": "number" },
      { "name": "time1_day", "label": "Time 1 (days)", "type": "number" },
      { "name": "time2_day", "label": "Time 2 (days)", "type": "number" },
      { "name": "time1_week", "label": "Time 1 (weeks)", "type": "number" },
      { "name": "time2_week", "label": "Time 2 (weeks)", "type": "number" },
      { "name": "preterm", "label": "Preterm", "type": "boolean" },
      { "name": "weight_current", "label": "Current Weight (kg)", "type": "number" },
      { "name": "age_months", "label": "Age (months)", "type": "number" }
    ]
  },
  {
    "id": 29,
    "code": "harris_benedict",
    "name": "Harris–Benedict (HBE)",
    "inputs": [
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" },
      { "name": "age_years", "label": "Age (years)", "type": "number" }
    ]
  }
  ,
  {
    "id": 30,
    "code": "mifflin_st_jeor",
    "name": "Mifflin-St Jeor",
    "inputs": [
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" },
      { "name": "age_years", "label": "Age (years)", "type": "number" }
    ]
  },
  {
    "id": 31,
    "code": "quick_method",
    "name": "Quick Method",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "min_factor", "label": "Min Factor", "type": "number" },
      { "name": "max_factor", "label": "Max Factor", "type": "number" }
    ]
  },
  {
    "id": 32,
    "code": "macronutrient_distribution",
    "name": "Macronutrient Distribution",
    "inputs": [
      { "name": "calories", "label": "Calories (kcal)", "type": "number" },
      { "name": "carb_pct", "label": "Carbohydrates (%)", "type": "number" },
      { "name": "protein_pct", "label": "Protein (%)", "type": "number" },
      { "name": "fat_pct", "label": "Fat (%)", "type": "number" }
    ]
  },
  {
    "id": 33,
    "code": "rda_calories",
    "name": "RDA Calories",
    "inputs": [
      { "name": "age", "label": "Age (years)", "type": "number" },
      { "name": "weight", "label": "Weight (kg)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] }
    ]
  },
  {
    "id": 34,
    "code": "rda_protein",
    "name": "RDA Protein",
    "inputs": [
      { "name": "age", "label": "Age (years)", "type": "number" },
      { "name": "weight", "label": "Weight (kg)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] }
    ]
  },
  {
    "id": 35,
    "code": "schofield_bmr",
    "name": "Schofield BMR",
    "inputs": [
      { "name": "age", "label": "Age (years)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" },
      { "name": "physical_activity", "label": "Physical Activity", "type": "select", "options": ["sedentary", "lightly_active", "moderately_active", "very_active", "extra_active"] },
      { "name": "stress_factor", "label": "Stress Factor", "type": "select", "options": ["minor_surgery", "major_surgery", "skeletal_trauma", "blunt_trauma", "closed_head_injury", "mild_infection", "moderate_infection", "severe_infection", "starvation", "burns_lt_20", "burns_20_40", "burns_gt_40"] }
    ]
  },
  {
    "id": 36,
    "code": "catchup_growth",
    "name": "Catch-up Growth",
    "inputs": [
      { "name": "age", "label": "Age (years)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" }
    ]
  },
  {
    "id": 37,
    "code": "gestation_adjusted_age",
    "name": "Gestation-Adjusted Age",
    "inputs": [
      { "name": "gestational_age_weeks", "label": "Gestational Age (weeks)", "type": "number" },
      { "name": "chronological_age_weeks", "label": "Chronological Age (weeks)", "type": "number" }
    ]
  },
  {
    "id": 38,
    "code": "preterm_estimated_requirement",
    "name": "Preterm Estimated Requirement",
    "inputs": [
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" }
    ]
  },
  {
    "id": 39,
    "code": "ireton_jones_ventilator",
    "name": "Ireton-Jones (Ventilator-Dependent)",
    "inputs": [
      { "name": "age", "label": "Age (years)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "trauma", "label": "Trauma", "type": "select", "options": ["present", "absent"] },
      { "name": "burn", "label": "Burn", "type": "select", "options": ["present", "absent"] }
    ]
  },
  {
    "id": 40,
    "code": "ireton_jones_spontaneous",
    "name": "Ireton-Jones (Spontaneous)",
    "inputs": [
      { "name": "age", "label": "Age (years)", "type": "number" },
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" }
    ]
  },
  {
    "id": 41,
    "code": "curreri_burn",
    "name": "Curreri Burn",
    "inputs": [
      { "name": "age", "label": "Age (years)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "weight_kg", "label": "Weight (kg)", "type": "number" },
      { "name": "tbsa_percentage", "label": "TBSA Burn (%)", "type": "number" }
    ]
  },
  {
    "id": 42,
    "code": "pregnancy_energy_needs",
    "name": "Pregnancy Energy Needs",
    "inputs": [
      { "name": "age", "label": "Age (years)", "type": "number" },
      { "name": "prepregnancy_weight_kg", "label": "Pre-pregnancy Weight (kg)", "type": "number" },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" },
      { "name": "trimester", "label": "Trimester", "type": "select", "options": ["first", "second", "third"] },
      { "name": "physical_activity", "label": "Physical Activity", "type": "select", "options": ["inactive", "low_active", "active", "very_active"] },
      { "name": "gestation_week", "label": "Gestation Week", "type": "number" }
    ]
  },
  {
    "id": 43,
    "code": "pregnancy_simple_addition",
    "name": "Pregnancy Simple Addition",
    "inputs": [
      { "name": "calorie_requirement", "label": "Base Calorie Requirement", "type": "number" },
      { "name": "trimester", "label": "Trimester", "type": "select", "options": ["first", "second", "third"] }
    ]
  },
  {
    "id": 44,
    "code": "lactation_energy_needs",
    "name": "Energy Needs in Lactation",
    "inputs": [
      { "name": "calorie_requirement", "label": "Base Calorie Requirement (kcal/day)", "type": "number" },
      { "name": "lactation_period", "label": "Lactation Period", "type": "select", "options": ["first_6_months", "second_6_months"] }
    ]
  },
  {
    "id": 45,
    "code": "down_syndrome_calorie",
    "name": "Down Syndrome Calorie Needs",
    "inputs": [
      { "name": "age", "label": "Age (years)", "type": "number" },
      { "name": "gender", "label": "Gender", "type": "select", "options": ["male", "female"] },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" }
    ]
  },
  {
    "id": 46,
    "code": "cerebral_palsy_calorie",
    "name": "Cerebral Palsy Calorie Needs",
    "inputs": [
      { "name": "age", "label": "Age (years)", "type": "number" },
      { "name": "height_cm", "label": "Height (cm)", "type": "number" },
      { "name": "physical_activity", "label": "Physical Activity", "type": "select", "options": ["mild_to_moderate", "severe_physical_restriction", "severe_restricted_activity", "athetoid_cerebral_palsy"] }
    ]
  },
  {
    "id": 47,
    "code": "prader_willi_calorie",
    "name": "Prader-Willi Calorie Needs",
    "inputs": [
      { "name": "height_cm", "label": "Height (cm)", "type": "number" },
      { "name": "goal", "label": "Goal", "type": "select", "options": ["maintain", "weight_loss"] }
    ]
  },
  {
    "id": 48,
    "code": "prognostic_inflammatory_nutrition_index",
    "name": "Prognostic Inflammatory and Nutritional Index (PINI)",
    "inputs": [
      { "name": "c_reactive_protein", "label": "C-Reactive Protein (mg/L)", "type": "number" },
      { "name": "alpha_1_acid_glycoprotein", "label": "Alpha-1 Acid Glycoprotein (g/L)", "type": "number" },
      { "name": "prealbumin", "label": "Prealbumin (g/L)", "type": "number" },
      { "name": "albumin", "label": "Albumin (g/L)", "type": "number" }
    ]
  }
];
