import { SelectedFood, NutritionSummary, MealData } from '../types';

export const calculateNutritionSummary = (meals: MealData[]): NutritionSummary => {
  const summary: NutritionSummary = {
    totalCalories: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
    totalFiber: 0,
    mealBreakdown: {}
  };

  meals.forEach(meal => {
    const mealNutrition = {
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fiber: 0
    };

    meal.foods.forEach(food => {
      mealNutrition.calories += food.calories;
      mealNutrition.carbs += food.carbs;
      mealNutrition.protein += food.protein;
      mealNutrition.fat += food.fat;
      mealNutrition.fiber += food.fiber;
    });

    summary.mealBreakdown[meal.type] = mealNutrition;
    
    summary.totalCalories += mealNutrition.calories;
    summary.totalCarbs += mealNutrition.carbs;
    summary.totalProtein += mealNutrition.protein;
    summary.totalFat += mealNutrition.fat;
    summary.totalFiber += mealNutrition.fiber;
  });

  return summary;
};

export const calculateMacroPercentages = (summary: NutritionSummary) => {
  const totalMacroCalories = (summary.totalCarbs * 4) + (summary.totalProtein * 4) + (summary.totalFat * 9);
  
  if (totalMacroCalories === 0) {
    return { carbsPercent: 0, proteinPercent: 0, fatPercent: 0, fiberPercent: 0 };
  }

  return {
    carbsPercent: Math.round(((summary.totalCarbs * 4) / totalMacroCalories) * 100),
    proteinPercent: Math.round(((summary.totalProtein * 4) / totalMacroCalories) * 100),
    fatPercent: Math.round(((summary.totalFat * 9) / totalMacroCalories) * 100),
    fiberPercent: Math.round((summary.totalFiber / (summary.totalCarbs + summary.totalProtein + summary.totalFat)) * 100)
  };
};

export const formatNutritionValue = (value: number, unit: string = ''): string => {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded}${unit}`;
};

export const generateMacronutrientsTableData = (summary: NutritionSummary) => {
  const tableData = [];
  
  // Add each meal's data
  Object.entries(summary.mealBreakdown).forEach(([mealType, nutrition]) => {
    tableData.push({
      meal: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      calories: `${Math.round(nutrition.calories)} kcal`,
      protein: `${formatNutritionValue(nutrition.protein)}g`,
      carbs: `${formatNutritionValue(nutrition.carbs)}g`,
      fats: `${formatNutritionValue(nutrition.fat)}g`,
      supplements: '0 kcal' // Placeholder - could be enhanced
    });
  });
  
  // Add total row
  tableData.push({
    meal: 'Total',
    calories: `${Math.round(summary.totalCalories)} kcal`,
    protein: `${formatNutritionValue(summary.totalProtein)}g`,
    carbs: `${formatNutritionValue(summary.totalCarbs)}g`,
    fats: `${formatNutritionValue(summary.totalFat)}g`,
    supplements: '0 kcal'
  });
  
  return tableData;
};