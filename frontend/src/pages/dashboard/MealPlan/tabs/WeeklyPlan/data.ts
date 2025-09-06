import { MealPlanTemplate, FilterCategory } from './types';

export const filterCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
];

export const myTemplatesData: MealPlanTemplate[] = [
  {
    id: 1,
    templateName: 'Keto Diet',
    category: 'breakfast',
    calories: '1200 kcal',
    carbohydrates: '100 g',
    protein: '100 g',
    fat: '100 g',
    status: 'Active',
  },
  {
    id: 2,
    templateName: 'Mediterranean',
    category: 'lunch',
    calories: '1500 kcal',
    carbohydrates: '150 g',
    protein: '120 g',
    fat: '80 g',
    status: 'Active',
  },
  {
    id: 3,
    templateName: 'Vegan Power',
    category: 'dinner',
    calories: '1800 kcal',
    carbohydrates: '200 g',
    protein: '100 g',
    fat: '70 g',
    status: 'Draft',
  },
];

export const readyToUseData: MealPlanTemplate[] = [
  {
    id: 4,
    templateName: 'Quick Breakfast',
    category: 'breakfast',
    calories: '800 kcal',
    carbohydrates: '80 g',
    protein: '40 g',
    fat: '30 g',
    status: 'Available',
  },
  {
    id: 5,
    templateName: 'Protein Lunch',
    category: 'lunch',
    calories: '1200 kcal',
    carbohydrates: '100 g',
    protein: '150 g',
    fat: '50 g',
    status: 'Available',
  },
];