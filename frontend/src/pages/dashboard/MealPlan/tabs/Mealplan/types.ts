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

export interface FoodItem {
  id: number;
  name: string;
  icon: string;
  color: string;
  // Nutritional values per 100g
  caloriesPer100g: number;
  carbsPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  fiberPer100g: number;
}

export interface SelectedFood {
  foodId: number;
  name: string;
  grams: number;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  mealId: string;
}

export interface MealData {
  id: string;
  type: string;
  foods: SelectedFood[];
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

export interface FoodSelectionDialogState {
  open: boolean;
  mealId: string;
  selectedFood: FoodItem | null;
  grams: number;
}

export interface BasketItem extends SelectedFood {
  id: string;
}

export interface NutritionSummary {
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  totalFiber: number;
  mealBreakdown: {
    [mealType: string]: {
      calories: number;
      carbs: number;
      protein: number;
      fat: number;
      fiber: number;
    };
  };
}