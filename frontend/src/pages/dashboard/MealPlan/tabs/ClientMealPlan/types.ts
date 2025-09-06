export interface MealPlanTemplateRow {
  id: number | string;
  templateName: string;
  calories: string;
  carbohydrates: string;
  protein: string;
  fat: string;
  isNew?: boolean;
}