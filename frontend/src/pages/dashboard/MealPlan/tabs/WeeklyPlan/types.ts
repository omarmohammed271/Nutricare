export type FilterCategory = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealPlanTemplate {
  id: number;
  templateName: string;
  category: string;
  calories: string;
  carbohydrates: string;
  protein: string;
  fat: string;
  status: string;
}