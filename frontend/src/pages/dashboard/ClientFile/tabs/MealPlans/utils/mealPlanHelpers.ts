import { SelectedFood } from '../../../../MealPlan/tabs/Mealplan/types';
import { MealPlanEntry, MealPlan } from '../types';

/**
 * Remove a food item from the basket
 */
export const removeFromBasket = (
  basketItems: SelectedFood[], 
  foodId: number, 
  mealId: string
): SelectedFood[] => {
  const index = basketItems.findIndex(item => item.foodId === foodId && item.mealId === mealId);
  if (index > -1) {
    const newBasket = [...basketItems];
    newBasket.splice(index, 1);
    return newBasket;
  }
  return basketItems;
};

/**
 * Add a food item to the basket
 */
export const addToBasket = (
  basketItems: SelectedFood[], 
  selectedFood: SelectedFood
): SelectedFood[] => {
  return [...basketItems, selectedFood];
};

/**
 * Find a meal plan by ID (legacy - for MealPlanEntry)
 */
export const findMealPlanById = (
  mealPlans: MealPlanEntry[], 
  planId: string
): MealPlanEntry | undefined => {
  return mealPlans.find(plan => plan.id === planId);
};

/**
 * Find a meal plan by ID (new - for MealPlan interface)
 */
export const findMealPlan = (
  mealPlans: MealPlan[], 
  planId: string
): MealPlan | undefined => {
  return mealPlans.find(plan => plan.id === planId);
};

/**
 * Get active meal plans
 */
export const getActiveMealPlans = (mealPlans: MealPlan[]): MealPlan[] => {
  return mealPlans.filter(plan => plan.status === 'Active');
};

/**
 * Get meal plans by status
 */
export const getMealPlansByStatus = (
  mealPlans: MealPlan[], 
  status: MealPlan['status']
): MealPlan[] => {
  return mealPlans.filter(plan => plan.status === status);
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

/**
 * Format date range for display
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

/**
 * Calculate total macros for a meal plan (legacy)
 */
export const calculateMealPlanTotals = (foods: SelectedFood[]) => {
  return foods.reduce(
    (totals, food) => ({
      calories: totals.calories + food.calories,
      protein: totals.protein + food.protein,
      carbs: totals.carbs + food.carbs,
      fat: totals.fat + food.fat,
      fiber: totals.fiber + food.fiber
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
};

/**
 * Calculate calories from macros
 */
export const calculateCaloriesFromMacros = (macros: MealPlan['macros']): number => {
  // Assuming 4 cal/g for carbs and protein, 9 cal/g for fat
  return (macros.carbs * 4) + (macros.protein * 4) + (macros.fat * 9);
};

/**
 * Generate meal plan ID
 */
export const generateMealPlanId = (): string => {
  return `mp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate meal plan data
 */
export const validateMealPlan = (mealPlan: Partial<MealPlan>): boolean => {
  return !!(mealPlan.name && 
           mealPlan.type && 
           mealPlan.calories && 
           mealPlan.startDate && 
           mealPlan.endDate && 
           mealPlan.assignedBy);
};