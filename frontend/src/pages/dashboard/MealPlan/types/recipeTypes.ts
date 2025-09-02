// Recipe-specific types for the Create Recipe interface

export interface RecipeFormData {
  recipeName: string;
  tags: string[];
  finalWeight: string;
  description: string;
  numberOfPortions: string;
  weightOfPortions: string;
  ingredients: Ingredient[];
  cookingMethod: string;
  image?: File | null;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity?: string;
  unit?: string;
}

export interface NutritionData {
  energy: number; // kcal
  fat: number; // percentage
  carbohydrates: number; // percentage
  protein: number; // percentage
  fiber: number; // percentage
  macronutrients: MacroNutrient[];
  micronutrients: MicroNutrient[];
}

export interface MacroNutrient {
  name: string;
  value: number;
  unit: string;
}

export interface MicroNutrient {
  name: string;
  value: number;
  unit: string;
}

export interface TagOption {
  label: string;
  value: string;
}