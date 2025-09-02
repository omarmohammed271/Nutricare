export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface MealPlanTemplate {
  id: number;
  templateName: string;
  calories: string;
  carbohydrates: string;
  protein: string;
  fat: string;
  category: string;
}

export type FilterCategory = 'all' | 'weight-loss' | 'weight-gain' | 'maintenance' | 'keto' | 'vegan' | 'paleo';


export interface RecipePublished {
   title?: string;
   value?:number
   isMainSearch:boolean
}

