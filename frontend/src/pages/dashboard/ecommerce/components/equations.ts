export const equationsConfig = [
  // ---------- Weight & Body ----------
  {
    id: 1,
    code: "bmi",
    name: "Body Mass Index (BMI)",
    inputs: [
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      { name: "height_m", label: "Height (m)", type: "number" },
    ],
  },
  {
    id: 2,
    code: "ibw_hamwi",
    name: "Ideal Body Weight (Hamwi)",
    inputs: [
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
      { name: "height_cm", label: "Height (cm)", type: "number" },
    ],
  },
  {
    id: 3,
    code: "ibw_lemmens",
    name: "Ideal Body Weight (Lemmens)",
    inputs: [
      { name: "height_m", label: "Height (m)", type: "number" },
      { name: "factor", label: "Scaling Factor", type: "number" },
    ],
  },
  {
    id: 4,
    code: "percent_ibw",
    name: "Percent of Ideal Body Weight",
    inputs: [
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
      { name: "height_cm", label: "Height (cm)", type: "number" },
    ],
  },
  {
    id: 5,
    code: "adjusted_body_weight",
    name: "Adjusted Body Weight",
    inputs: [
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
      { name: "height_cm", label: "Height (cm)", type: "number" },
    ],
  },
  {
    id: 6,
    code: "dry_weight",
    name: "Dry Weight",
    inputs: [
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      {
        name: "edema_or_ascites",
        label: "Condition",
        type: "select",
        options: [
          "ascites_minimal",
          "ascites_moderate",
          "ascites_severe",
          "edema_minimal",
          "edema_moderate",
          "edema_severe",
        ],
      },
    ],
  },
  {
    id: 7,
    code: "ibw_amputation",
    name: "Ideal Body Weight (Amputation)",
    inputs: [
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
      { name: "height_cm", label: "Height (cm)", type: "number" },
      { name: "percent_amputation", label: "Percent Amputation (%)", type: "number" },
    ],
  },
  {
    id: 8,
    code: "waist_height_ratio",
    name: "Waist-to-Height Ratio",
    inputs: [
      { name: "waist_cm", label: "Waist (cm)", type: "number" },
      { name: "height_cm", label: "Height (cm)", type: "number" },
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
    ],
  },
  {
    id: 9,
    code: "percent_ubw",
    name: "Percent of Usual Body Weight",
    inputs: [
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      { name: "usual_weight_kg", label: "Usual Weight (kg)", type: "number" },
    ],
  },
  {
    id: 10,
    code: "percent_weight_change",
    name: "Percent Weight Change",
    inputs: [
      { name: "current_weight_kg", label: "Current Weight (kg)", type: "number" },
      { name: "usual_weight_kg", label: "Usual Weight (kg)", type: "number" },
    ],
  },

  // ---------- Height Estimation ----------
  {
    id: 11,
    code: "demi_span_height",
    name: "Demi-Span Height Estimate",
    inputs: [
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
      { name: "demi_span_cm", label: "Demi-Span (cm)", type: "number" },
    ],
  },
  {
    id: 12,
    code: "knee_height_estimate",
    name: "Knee Height Estimate",
    inputs: [
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
      { name: "knee_height_cm", label: "Knee Height (cm)", type: "number" },
      { name: "age_years", label: "Age (years)", type: "number" },
    ],
  },

  // ---------- Energy & BMR ----------
  {
    id: 13,
    code: "harris_benedict",
    name: "Harris-Benedict Equation",
    inputs: [
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      { name: "height_m", label: "Height (m)", type: "number" },
      { name: "age", label: "Age (years)", type: "number" },
    ],
  },
  {
    id: 14,
    code: "mifflin_st_jeor",
    name: "Mifflin-St Jeor Equation",
    inputs: [
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      { name: "height_cm", label: "Height (cm)", type: "number" },
      { name: "age", label: "Age (years)", type: "number" },
    ],
  },
  {
    id: 15,
    code: "total_energy_expenditure",
    name: "Total Energy Expenditure",
    inputs: [
      { name: "hbe_kcal", label: "HBE kcal/day", type: "number" },
      { name: "physical_factor", label: "Physical Factor", type: "number" },
      { name: "stress_factor", label: "Stress Factor", type: "number" },
    ],
  },
  {
    id: 16,
    code: "penn_state",
    name: "Penn State Equation",
    inputs: [
      { name: "mifflin_kcal", label: "Mifflin-St Jeor kcal/day", type: "number" },
      { name: "tmax_c", label: "Max Temp (°C)", type: "number" },
      { name: "ve_l_min", label: "Minute Ventilation (L/min)", type: "number" },
      {
        name: "older_and_obese",
        label: "Older & Obese",
        type: "select",
        options: ["true", "false"],
      },
    ],
  },
  {
    id: 17,
    code: "cunningham",
    name: "Cunningham Equation",
    inputs: [
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      { name: "percent_body_fat", label: "Body Fat (%)", type: "number" },
    ],
  },

  // ---------- Fluids ----------
  {
    id: 18,
    code: "baseline_fluid_bsa",
    name: "Baseline Fluid (BSA Method)",
    inputs: [{ name: "weight_kg", label: "Weight (kg)", type: "number" }],
  },
  {
    id: 19,
    code: "baseline_fluid_standard",
    name: "Baseline Fluid (Standard)",
    inputs: [{ name: "weight_kg", label: "Weight (kg)", type: "number" }],
  },

  // ---------- Diabetes ----------
  {
    id: 20,
    code: "insulin_to_carb_ratio",
    name: "Insulin-to-Carbohydrate Ratio",
    inputs: [
      { name: "total_daily_dose_iu", label: "Total Daily Dose (IU)", type: "number" },
      { name: "insulin_type", label: "Insulin Type", type: "select", options: ["rapid", "short"] },
    ],
  },
  {
    id: 21,
    code: "insulin_sensitivity",
    name: "Insulin Sensitivity Factor",
    inputs: [
      { name: "total_daily_dose_iu", label: "Total Daily Dose (IU)", type: "number" },
      { name: "insulin_type", label: "Insulin Type", type: "select", options: ["rapid", "short"] },
    ],
  },
  {
    id: 22,
    code: "insulin_initial_dose",
    name: "Initial Insulin Dose",
    inputs: [
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      { name: "by_kg", label: "By kg?", type: "select", options: ["true", "false"] },
    ],
  },

  // ---------- Water & Nitrogen ----------
  {
    id: 23,
    code: "free_water_deficit",
    name: "Free Water Deficit",
    inputs: [
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      { name: "sodium_mmol_l", label: "Sodium (mmol/L)", type: "number" },
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
      { name: "age_years", label: "Age (years)", type: "number" },
    ],
  },
  {
    id: 24,
    code: "nitrogen_balance",
    name: "Nitrogen Balance",
    inputs: [
      { name: "protein_intake_g", label: "Protein Intake (g)", type: "number" },
      { name: "urine_urea_n_g", label: "Urine Urea N (g)", type: "number" },
    ],
  },

  // ---------- Nutrition Risk & Immune ----------
  {
    id: 25,
    code: "nutrition_risk_index",
    name: "Nutrition Risk Index",
    inputs: [
      { name: "albumin_g_dl", label: "Albumin (g/dL)", type: "number" },
      { name: "weight_kg", label: "Weight (kg)", type: "number" },
      { name: "gender", label: "Gender", type: "select", options: ["male", "female"] },
      { name: "height_cm", label: "Height (cm)", type: "number" },
    ],
  },
  {
    id: 26,
    code: "total_lymphocyte_count",
    name: "Total Lymphocyte Count",
    inputs: [
      { name: "percent_lymphocytes", label: "Lymphocytes (%)", type: "number" },
      { name: "wbc_10e3", label: "WBC (×10³/μL)", type: "number" },
    ],
  },
];
