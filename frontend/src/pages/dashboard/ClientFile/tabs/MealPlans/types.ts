import { SelectedFood } from '../../../MealPlan/tabs/Mealplan/types';

// Main MealPlan interface used in components
export interface MealPlan {
  id: string;
  name: string;
  type: 'Weekly' | 'Daily' | 'Custom';
  calories: string | number;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Draft' | 'On Hold';
  assignedBy: string;
  notes?: string;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
}

// Meal plan entry interface (legacy - keep for compatibility)
export interface MealPlanEntry {
  id: string;
  planName: string;
  client: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  status: 'Active' | 'Completed' | 'Draft';
  createdDate: string;
  foods: SelectedFood[];
}

// Template interface
export interface MealPlanTemplate {
  id: string;
  templateName: string;
  caloriesNeeded: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  additionalMeals: number;
}

// Note dialog state
export interface NoteDialogState {
  open: boolean;
  planId: string;
  currentNote: string;
}

// Meal type interface
export interface MealType {
  name: string;
  count: number;
}

// Food dropdown dialog state
export interface FoodDropdownDialogState {
  open: boolean;
  mealId: string;
}

// Quick stats interface
export interface QuickStats {
  totalPlans: number;
  activePlans: number;
  completedPlans: number;
  avgCalories: number;
  adherenceRate: number;
}