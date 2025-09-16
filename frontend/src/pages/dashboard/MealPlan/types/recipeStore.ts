export interface MacroNutrient {
  name: string;
  amount: number;
  unit: string;
  dailyValue?: number;
}

export interface MicroNutrient {
  name: string;
  amount: number;
  unit: string;
  dailyValue?: number;
  category?: 'vitamin' | 'mineral' | 'other';
}

export interface Recipe {
  id: string;
  recipeName: string;
  creatorName: string;
  image?: string;
  description: string;
  finalWeight: string;
  numberOfPortions: string;
  weightOfPortions: string;
  tags: string[];
  ingredients: Array<{
    id: string;
    name: string;
    quantity: string;
    unit: string;
  }>;
  cookingMethod: string;
  nutritionData: {
    energy: number;
    fat: number;
    carbohydrates: number;
    protein: number;
    fiber: number;
    macronutrients?: MacroNutrient[];
    micronutrients?: MicroNutrient[];
  };
  isPublic: boolean;
  createdAt: Date;
}

export interface RecipeStore {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  getRecipes: () => Recipe[];
  getRecipeById: (id: string) => Recipe | undefined;
}