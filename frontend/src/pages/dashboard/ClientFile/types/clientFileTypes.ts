// Client File API Schema Types
export interface LabResult {
  id: number;
  test_name: string;
  result: string;
  reference_range?: string;
  interpretation?: string;
  file?: string | File | null;
  date: string;
}

export interface Medication {
  id?: string | number;
  name: string;
  dosage: string;
  notes: string;
  frequency?: string;
  route?: string;
  startDate?: string;
  endDate?: string;
  prescribedBy?: string;
  indication?: string;
  status?: string;
}

export interface ClientFileData {
  name: string;
  gender: "male" | "female";
  age: number;
  date_of_birth: string;
  weight: number;
  height: number;
  physical_activity: "sedentary" | "light" | "moderate" | "very_active" | "extra";
  ward_type: "outpatient" | "icu" | "medical" | "cardiac" | "others";
  stress_factor: "minor_surgery" | "major_surgery" | "skeletal_trauma" | "blunt_trauma" | "closed_head_injury" | string;
  feeding_type: "oral" | "enteral_parenteral" | "tpn";
  lab_results: LabResult[];
  medications: Medication[];
  is_finished?: boolean;
}

// Form validation types
export interface AssessmentFormData {
  name: string;
  gender: string;
  dateOfBirth: string;
  weight: string;
  height: string;
  weightTypeSelection: string;
  physicalActivity: string;
  wardType: string;
  stressFactor: string;
  feedingType: string;
}

export interface BiochemicalFormData {
  labResults: LabResult[];
}

export interface MedicationFormData {
  medications: Medication[];
}

export interface MealPlanFormData {
  // Add meal plan specific fields when ready
  notes?: string;
}

// Combined form data for validation
export interface ClientFileFormData {
  assessment: AssessmentFormData;
  biochemical: BiochemicalFormData;
  medication: MedicationFormData;
  mealPlan: MealPlanFormData;
  isComplete?: boolean;
}

