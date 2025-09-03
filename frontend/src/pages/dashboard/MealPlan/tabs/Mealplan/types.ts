export interface MealCounter {
  breakfast: number;
  brunch: number;
  morningSnack: number;
  lunch: number;
  afternoonSnack: number;
  postWorkout: number;
  dinner: number;
  supplement: number;
}

export interface MealData {
  id: string;
  type: string;
  foods: string[];
  notes: string;
}

export interface FormData {
  clientName: string;
  diagnosis: string;
  calorieNeed: string;
  carbs: number;
  protein: number;
  fat: number;
  foodExcluded: string[];
}

export interface MealType {
  key: string;
  label: string;
}

export interface NoteDialogState {
  open: boolean;
  mealId: string;
  currentNote: string;
}