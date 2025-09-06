import { MealType } from './types';

// Mock data for the form
export const clientOptions = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];

export const diagnosisOptions = [
  'Diabetes', 
  'Obesity', 
  'Athlete', 
  'Hypertension', 
  'Heart Disease', 
  'Weight Loss'
];

export const foodExcludedOptions = [
  'Gluten', 
  'Lactose', 
  'Sugar', 
  'Nuts', 
  'Shellfish', 
  'Eggs', 
  'Soy'
];

export const mealTypes: MealType[] = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'brunch', label: 'Brunch' },
  { key: 'morningSnack', label: 'Morning snack' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'afternoonSnack', label: 'Afternoon snack' },
  { key: 'postWorkout', label: 'Post workout' },
  { key: 'dinner', label: 'Dinner' },
  { key: 'supplement', label: 'Supplement' },
];

export const defaultFormData = {
  clientName: '',
  diagnosis: '',
  calorieNeed: '',
  carbs: 33,
  protein: 33,
  fat: 34,
  foodExcluded: [],
};

export const defaultMealCounters = {
  breakfast: 1,
  brunch: 1,
  morningSnack: 1,
  lunch: 1,
  afternoonSnack: 1,
  postWorkout: 1,
  dinner: 1,
  supplement: 1,
};