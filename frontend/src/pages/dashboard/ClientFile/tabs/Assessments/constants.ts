import { AssessmentData, CalculationResults, AdimeNote } from './types';

export const defaultAssessmentData: AssessmentData = {
  name: '',
  gender: '',
  dateOfBirth: '',
  weight: '',
  height: '',
  weightTypeSelection: '',
  physicalActivity: '',
  stressFactor: '',
  ward: '',
  diagnosis: '',
  typeOfFeeding: ''
};

export const defaultCalculations: CalculationResults = {
  bmi: 22.2,
  adjustedBodyWeight: 22.2,
  ibw: 23,
  bmr: 1272,
  mifflinEquation: 22.2,
  tdee: 1970,
  fluidRequirement: 4,
  macronutrients: {
    carbs: 10,
    proteins: 10,
    fats: 10
  }
};

export const defaultAdimeNote: AdimeNote = {
  assessment: "The Client Presents With A History Of Type 2 Diabetes And Hypertension, Currently Managed With Medication. Recent Labs Indicate Elevated Fasting Glucose (130 Mg/DL) And Borderline Cholesterol Levels, Requiring Ongoing Dietary Monitoring.",
  clientHistory: {
    clientName: "Ayesha Malik",
    ageGender: "32-Year-Old Female",
    primaryDiagnosis: "Type 2 Diabetes Mellitus",
    nutritionRelatedComplaints: "Frequent Fatigue, Sugar Cravings, Occasional Bloating",
    currentDietPattern: "Following A High-Carbohydrate, Low-Fiber Diet With Fair Appetite",
    knownAllergies: "Allergic To Shellfish",
    nrsScore: "NRS-2002 Score: 3 (At Risk Of Malnutrition)"
  }
};

export const weightTypeOptions = [
  { value: 'actual', label: 'Actual Weight' },
  { value: 'ideal', label: 'Ideal Weight' },
  { value: 'adjusted', label: 'Adjusted Weight' }
];

export const physicalActivityOptions = [
  { value: 'sedentary', label: 'Sedentary' },
  { value: 'light', label: 'Light Activity' },
  { value: 'moderate', label: 'Moderate Activity' },
  { value: 'active', label: 'Active' },
  { value: 'very-active', label: 'Very Active' }
];

export const stressFactorOptions = [
  { value: 'none', label: 'None' },
  { value: 'mild', label: 'Mild Stress' },
  { value: 'moderate', label: 'Moderate Stress' },
  { value: 'severe', label: 'Severe Stress' }
];

export const wardOptions = [
  { value: 'general', label: 'General Ward' },
  { value: 'icu', label: 'ICU' },
  { value: 'cardiac', label: 'Cardiac Unit' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'pediatric', label: 'Pediatric' }
];

export const diagnosisOptions = [
  { value: 'diabetes', label: 'Type 2 Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'obesity', label: 'Obesity' },
  { value: 'malnutrition', label: 'Malnutrition' },
  { value: 'renal', label: 'Renal Disease' }
];

export const typeOfFeedingOptions = [
  { value: 'oral', label: 'Oral' },
  { value: 'external-parenteral', label: 'External and Parenteral' },
  { value: 'tpn', label: 'TPN' },
  { value: 'npo', label: 'NPO' }
];