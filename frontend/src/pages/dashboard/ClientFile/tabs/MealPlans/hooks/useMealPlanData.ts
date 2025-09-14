import { useState } from 'react';
import { MealPlanTemplate, MealType } from '../types';
import { sampleTemplates, defaultMealTypes } from '../constants';

interface UseMealPlanDataReturn {
  templates: MealPlanTemplate[];
  mealTypes: MealType[];
  calorieNeed: string;
  foodExcluded: string;
  setCalorieNeed: (value: string) => void;
  setFoodExcluded: (value: string) => void;
  updateMealTypeCount: (mealName: string, increment: boolean) => void;
  handleEditTemplate: (template: MealPlanTemplate) => void;
  handleDownloadTemplate: (template: MealPlanTemplate) => void;
  handleViewTemplate: (template: MealPlanTemplate) => void;
}

export const useMealPlanData = (): UseMealPlanDataReturn => {
  const [templates] = useState<MealPlanTemplate[]>(sampleTemplates);
  const [mealTypes, setMealTypes] = useState<MealType[]>(defaultMealTypes);
  const [calorieNeed, setCalorieNeed] = useState('');
  const [foodExcluded, setFoodExcluded] = useState('');

  const updateMealTypeCount = (mealName: string, increment: boolean) => {
    setMealTypes(prev => prev.map(meal => 
      meal.name === mealName 
        ? { ...meal, count: Math.max(0, meal.count + (increment ? 1 : -1)) }
        : meal
    ));
  };

  const handleEditTemplate = (template: MealPlanTemplate) => {
    console.log('Edit template:', template);
    // Implement edit functionality
  };

  const handleDownloadTemplate = (template: MealPlanTemplate) => {
    console.log('Download template:', template);
    // Implement download functionality
  };

  const handleViewTemplate = (template: MealPlanTemplate) => {
    console.log('View template:', template);
    // Implement view functionality
  };

  return {
    templates,
    mealTypes,
    calorieNeed,
    foodExcluded,
    setCalorieNeed,
    setFoodExcluded,
    updateMealTypeCount,
    handleEditTemplate,
    handleDownloadTemplate,
    handleViewTemplate
  };
};