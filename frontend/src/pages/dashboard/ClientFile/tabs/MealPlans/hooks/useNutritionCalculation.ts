import { useState, useCallback, useMemo } from 'react';
import { SelectedFood, NutritionSummary } from '../../../../MealPlan/tabs/Mealplan/types';

interface UseNutritionCalculationReturn {
  nutritionSummary: NutritionSummary;
  updateNutrition: (basketItems: SelectedFood[]) => void;
}

export const useNutritionCalculation = (): UseNutritionCalculationReturn => {
  const [nutritionSummary, setNutritionSummary] = useState<NutritionSummary>({
    totalCalories: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
    totalFiber: 0,
    mealBreakdown: {}
  });

  // Memoized calculation function for better performance
  const calculateNutrition = useCallback((basketItems: SelectedFood[]): NutritionSummary => {
    // Input validation
    if (!basketItems || !Array.isArray(basketItems) || basketItems.length === 0) {
      return {
        totalCalories: 0,
        totalCarbs: 0,
        totalProtein: 0,
        totalFat: 0,
        totalFiber: 0,
        mealBreakdown: {}
      };
    }

    // Calculate totals with safe number handling
    const totals = basketItems.reduce(
      (acc, item) => {
        // Ensure all values are numbers and handle potential undefined/null values
        const calories = Number(item?.calories) || 0;
        const carbs = Number(item?.carbs) || 0;
        const protein = Number(item?.protein) || 0;
        const fat = Number(item?.fat) || 0;
        const fiber = Number(item?.fiber) || 0;

        return {
          calories: acc.calories + calories,
          carbs: acc.carbs + carbs,
          protein: acc.protein + protein,
          fat: acc.fat + fat,
          fiber: acc.fiber + fiber
        };
      },
      { calories: 0, carbs: 0, protein: 0, fat: 0, fiber: 0 }
    );

    // Group items by meal for breakdown
    const mealBreakdown: { [mealType: string]: { calories: number; carbs: number; protein: number; fat: number; fiber: number } } = {};
    
    basketItems.forEach(item => {
      const mealType = item?.mealId || 'General';
      const calories = Number(item?.calories) || 0;
      const carbs = Number(item?.carbs) || 0;
      const protein = Number(item?.protein) || 0;
      const fat = Number(item?.fat) || 0;
      const fiber = Number(item?.fiber) || 0;

      if (!mealBreakdown[mealType]) {
        mealBreakdown[mealType] = {
          calories: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0
        };
      }

      mealBreakdown[mealType].calories += calories;
      mealBreakdown[mealType].carbs += carbs;
      mealBreakdown[mealType].protein += protein;
      mealBreakdown[mealType].fat += fat;
      mealBreakdown[mealType].fiber += fiber;
    });

    return {
      totalCalories: Math.round(totals.calories * 100) / 100, // Round to 2 decimal places
      totalCarbs: Math.round(totals.carbs * 100) / 100,
      totalProtein: Math.round(totals.protein * 100) / 100,
      totalFat: Math.round(totals.fat * 100) / 100,
      totalFiber: Math.round(totals.fiber * 100) / 100,
      mealBreakdown
    };
  }, []);

  const updateNutrition = useCallback((basketItems: SelectedFood[]) => {
    const newSummary = calculateNutrition(basketItems);
    setNutritionSummary(newSummary);
  }, [calculateNutrition]);

  // Memoized nutrition summary to prevent unnecessary re-renders
  const memoizedNutritionSummary = useMemo(() => nutritionSummary, [nutritionSummary]);

  return {
    nutritionSummary: memoizedNutritionSummary,
    updateNutrition
  };
};