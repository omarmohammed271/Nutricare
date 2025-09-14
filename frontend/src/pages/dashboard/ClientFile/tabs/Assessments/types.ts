export interface AssessmentData {
  name: string;
  gender: string;
  dateOfBirth: string;
  weight: string;
  height: string;
  weightTypeSelection: string;
  physicalActivity: string;
  stressFactor: string;
  ward: string;
  diagnosis: string;
  typeOfFeeding: string;
}

export interface CalculationResults {
  bmi: number;
  adjustedBodyWeight: number;
  ibw: number;
  bmr: number;
  mifflinEquation: number;
  tdee: number;
  fluidRequirement: number;
  macronutrients: {
    carbs: number;
    proteins: number;
    fats: number;
  };
}

export interface AdimeNote {
  assessment: string;
  clientHistory: {
    clientName: string;
    ageGender: string;
    primaryDiagnosis: string;
    nutritionRelatedComplaints: string;
    currentDietPattern: string;
    knownAllergies: string;
    nrsScore: string;
  };
}