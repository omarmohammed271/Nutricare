from django.core.management.base import BaseCommand
from nutrition.models import Equation

EQUATIONS = [
    {
        "name": "Body Mass Index",
        "code": "bmi",
        "function_path": "nutrition.utils.bmi",
        "description": "BMI: weight/height² (metric or imperial), with risk categories."
    },
    {
        "name": "Hamwi IBW",
        "code": "ibw_hamwi",
        "function_path": "nutrition.utils.ibw_hamwi",
        "description": "Ideal Body Weight using Hamwi formula, based on gender and height."
    },
    {
        "name": "Lemmens IBW",
        "code": "ibw_lemmens",
        "function_path": "nutrition.utils.ibw_lemmens",
        "description": "Ideal Body Weight using Lemmens equation: factor × height²."
    },
    {
        "name": "Percent IBW",
        "code": "percent_ibw",
        "function_path": "nutrition.utils.percent_ibw",
        "description": "Current weight as % of IBW with nutritional interpretation."
    },
    {
        "name": "Adjusted Body Weight",
        "code": "adjusted_body_weight",
        "function_path": "nutrition.utils.adjusted_body_weight",
        "description": "Adjusted body weight for obese patients: IBW + 0.4 × (ABW-IBW)."
    },
    {
        "name": "Dry Weight",
        "code": "dry_weight",
        "function_path": "nutrition.utils.dry_weight",
        "description": "Dry weight estimation accounting for edema or ascites."
    },
    {
        "name": "IBW with Amputation",
        "code": "ibw_amputation",
        "function_path": "nutrition.utils.ibw_amputation",
        "description": "IBW adjusted for amputation percentage."
    },
    {
        "name": "Waist to Height Ratio",
        "code": "waist_height_ratio",
        "function_path": "nutrition.utils.waist_height_ratio",
        "description": "Waist circumference / height, with gender-based risk interpretation."
    },
    {
        "name": "Percent Usual Body Weight",
        "code": "percent_ubw",
        "function_path": "nutrition.utils.percent_ubw",
        "description": "Current weight as % of usual body weight."
    },
    {
        "name": "Percent Weight Change",
        "code": "percent_weight_change",
        "function_path": "nutrition.utils.percent_weight_change",
        "description": "Percentage weight loss from usual weight."
    },
    {
        "name": "Ideal Body Weight (IBW) For Spinal Cord Injury",
        "code": "ibw_sci",
        "function_path": "nutrition.utils.ibw_spinal_cord_injury",
        "description": "Mueller, C. M. (Ed.). (2024). The essential pocket guide for clinical nutrition (4th ed., p. 9). Academy of Nutrition and Dietetics."
    },
    {
        "name": "Demi-span Height Estimate",
        "code": "demi_span_height",
        "function_path": "nutrition.utils.demi_span_height",
        "description": "Height estimation from demi-span and gender."
    },
    {
        "name": "Knee Height Estimate",
        "code": "knee_height_estimate",
        "function_path": "nutrition.utils.knee_height_estimate",
        "description": "Height estimation using knee height and age."
    },
    {
        "name": "Harris-Benedict Equation",
        "code": "harris_benedict",
        "function_path": "nutrition.utils.harris_benedict",
        "description": "Basal metabolic rate based on gender, weight, height, and age."
    },
    {
        "name": "Mifflin-St Jeor Equation",
        "code": "mifflin_st_jeor",
        "function_path": "nutrition.utils.mifflin_st_jeor",
        "description": "BMR calculation widely used in clinical practice."
    },
    {
        "name": "Total Energy Expenditure",
        "code": "total_energy_expenditure",
        "function_path": "nutrition.utils.total_energy_expenditure",
        "description": "TDEE = BMR × physical factor × stress factor."
    },
    {
        "name": "Penn State Equation",
        "code": "penn_state",
        "function_path": "nutrition.utils.penn_state",
        "description": "Energy expenditure equation for ventilated patients (two variants)."
    },
    {
        "name": "Cunningham Equation",
        "code": "cunningham",
        "function_path": "nutrition.utils.cunningham",
        "description": "Energy expenditure using lean body mass."
    },
    {
        "name": "Baseline Fluid (BSA method)",
        "code": "baseline_fluid_bsa",
        "function_path": "nutrition.utils.baseline_fluid_bsa",
        "description": "Fluid needs estimation using body surface area rules."
    },
    {
        "name": "Baseline Fluid (Standard method)",
        "code": "baseline_fluid_standard",
        "function_path": "nutrition.utils.baseline_fluid_standard",
        "description": "Fluid needs estimation using standard pediatric/adult rules."
    },
    {
        "name": "Insulin-to-Carb Ratio",
        "code": "insulin_to_carb_ratio",
        "function_path": "nutrition.utils.insulin_to_carb_ratio",
        "description": "Rule of 500 (rapid) or 450 (short) to calculate carb ratio."
    },
    {
        "name": "Insulin Sensitivity Factor",
        "code": "insulin_sensitivity",
        "function_path": "nutrition.utils.insulin_sensitivity",
        "description": "Rule of 1800 (rapid) or 1500 (short) to calculate sensitivity."
    },
    {
        "name": "Initial Insulin Dose",
        "code": "insulin_initial_dose",
        "function_path": "nutrition.utils.insulin_initial_dose",
        "description": "Initial insulin dose estimate based on body weight."
    },
    {
        "name": "Free Water Deficit",
        "code": "free_water_deficit",
        "function_path": "nutrition.utils.free_water_deficit",
        "description": "Estimate water deficit based on sodium and TBW fraction."
    },
    {
        "name": "Nitrogen Balance",
        "code": "nitrogen_balance",
        "function_path": "nutrition.utils.nitrogen_balance",
        "description": "Protein metabolism status: anabolic or catabolic."
    },
    {
        "name": "Nutrition Risk Index",
        "code": "nutrition_risk_index",
        "function_path": "nutrition.utils.nutrition_risk_index",
        "description": "Nutritional risk assessment using albumin and IBW %."
    },
    {
        "name": "Total Lymphocyte Count",
        "code": "total_lymphocyte_count",
        "function_path": "nutrition.utils.total_lymphocyte_count",
        "description": "Immune function indicator based on WBC and lymphocyte %."
    },
    {
        "name": "Growth Velocity",
        "code": "growth_velocity",
        "function_path": "nutrition.utils.growth_velocity",
        "description": "Mueller, C. M. (Ed.). (2024). The essential pocket guide for clinical nutrition (4th ed., p. 62). Academy of Nutrition and Dietetics."
    },
    {
        "name": "Harris–Benedict (HBE)",
        "code": "HBE",
        "function_path": "nutrition.utils.harris_benedict",
        "description": ""
    },
    {
        "name": "Mifflin-St Jeor",
        "code": "BMR",
        "function_path": "nutrition.utils.mifflin_st_jeor",
        "description": ""
    },
    {
        "name": "Quick Method for Macronutrients & Fluid",
        "code": "Quick Method for Macronutrients & Fluid",
        "function_path": "nutrition.utils.quick_method",
        "description": ""
    },
    {
        "name": "Macronutrients Distribution",
        "code": "Macronutrients Distribution",
        "function_path": "nutrition.utils.macronutrient_distribution",
        "description": ""
    },
    {
        "name": "Recommended Dietary Allowance for Calories",
        "code": "RDA Calorie needs",
        "function_path": "nutrition.utils.rda_calories",
        "description": ""
    },
    {
        "name": "Recommended Dietary Allowance for Protein",
        "code": "RDA Protein needs",
        "function_path": "nutrition.utils.rda_protein",
        "description": ""
    },
    {
        "name": "Schofield ",
        "code": "schofield_bmr",
        "function_path": "nutrition.utils.schofield_bmr",
        "description": ""
    },
    {
        "name": "Catch-up Growth",
        "code": "catchup_growth",
        "function_path": "nutrition.utils.catchup_growth",
        "description": ""
    },
    {
        "name": "Gestation-Adjusted Age (Correction Age)",
        "code": "gestation_adjusted_age",
        "function_path": "nutrition.utils.gestation_adjusted_age",
        "description": ""
    },
    {
        "name": "Preterm Estimated Requirment ",
        "code": "preterm_estimated_requirement",
        "function_path": "nutrition.utils.preterm_estimated_requirement",
        "description": ""
    },
    {
        "name": " Ireton-Jones (Ventilator-Dependent)",
        "code": "ireton_jones_ventilator",
        "function_path": "nutrition.utils.ireton_jones_ventilator",
        "description": ""
    },
    {
        "name": "Ireton-Jones (Spontaneously Breathing)",
        "code": "ireton_jones_spontaneous",
        "function_path": "nutrition.utils.ireton_jones_spontaneous",
        "description": ""
    },
    {
        "name": "Curreri",
        "code": "curreri_burn",
        "function_path": "nutrition.utils.curreri_burn",
        "description": ""
    },
    {
        "name": "Energy Needs in Pregnancy by Age & BMI group",
        "code": "pregnancy_energy_needs",
        "function_path": "nutrition.utils.pregnancy_energy_needs",
        "description": ""
    },
    {
        "name": "Energy Needs in Pregnancy",
        "code": "pregnancy_simple_addition",
        "function_path": "nutrition.utils.pregnancy_simple_addition",
        "description": ""
    },
    {
        "name": "Energy needs in lactation",
        "code": "lactation_energy_needs",
        "function_path": "nutrition.utils.lactation_energy_needs",
        "description": ""
    },
    {
        "name": "Down Syndrome Calorie Requirement (Ages 5–12)",
        "code": "down_syndrome_calorie",
        "function_path": "nutrition.utils.down_syndrome_calorie",
        "description": ""
    },
    {
        "name": "Cerebral Palsy Calorie Requirement (Ages 5–12)",
        "code": "cerebral_palsy_calorie",
        "function_path": "nutrition.utils.cerebral_palsy_calorie",
        "description": ""
    },
    {
        "name": "Prader-willi Syndrome Calorie Requirement (Ages 5–12)",
        "code": "prader_willi_calorie",
        "function_path": "nutrition.utils.prader_willi_calorie",
        "description": ""
    },
    {
        "name": "Prognostic Nutrition Index",
        "code": "prognostic_nutrition_index",
        "function_path": "nutrition.utils.prognostic_nutrition_index",
        "description": ""
    },
    {
        "name": "Prognostic Inflammatory and Nutrition Index",
        "code": "prognostic_inflammatory_nutrition_index",
        "function_path": "nutrition.utils.prognostic_inflammatory_nutrition_index",
        "description": ""
    },
]

class Command(BaseCommand):
    help = "Seed all predefined equations into the database"

    def handle(self, *args, **kwargs):
        for eq in EQUATIONS:
            Equation.objects.update_or_create(
                code=eq["code"],
                defaults=eq
            )
        self.stdout.write(self.style.SUCCESS("✅ Equations seeded successfully"))
