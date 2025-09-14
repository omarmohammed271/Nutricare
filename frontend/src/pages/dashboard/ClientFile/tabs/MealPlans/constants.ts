import { MealPlanEntry, MealPlanTemplate, MealType, MealPlan } from './types';
import { Theme } from '@mui/material/styles';

// Mock data for MealPlan interface (used in CurrentActivePlan and MealPlansTable)
export const mockMealPlans: MealPlan[] = [
  {
    id: '1',
    name: 'Weight Loss Plan - Week 1',
    type: 'Weekly',
    calories: '1800 kcal',
    startDate: '2024-01-15',
    endDate: '2024-01-22',
    progress: 75,
    status: 'Active',
    assignedBy: 'Dr. Sarah Johnson',
    notes: 'Focus on high protein and low carb meals. Increase water intake.',
    macros: {
      carbs: 35,
      protein: 40,
      fat: 25
    }
  },
  {
    id: '2',
    name: 'Diabetes Management Plan',
    type: 'Daily',
    calories: '2200 kcal',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    progress: 60,
    status: 'Active',
    assignedBy: 'Dr. Ahmed Hassan',
    notes: 'Monitor blood sugar levels after each meal. Low glycemic index foods preferred.',
    macros: {
      carbs: 45,
      protein: 30,
      fat: 25
    }
  },
  {
    id: '3',
    name: 'High Protein Athletic Diet',
    type: 'Custom',
    calories: '2500 kcal',
    startDate: '2024-01-12',
    endDate: '2024-02-12',
    progress: 30,
    status: 'Draft',
    assignedBy: 'Dr. Emily Chen',
    notes: 'Pre and post workout meals are crucial. Include protein shakes.',
    macros: {
      carbs: 30,
      protein: 45,
      fat: 25
    }
  },
  {
    id: '4',
    name: 'Heart Healthy Mediterranean',
    type: 'Weekly',
    calories: '2000 kcal',
    startDate: '2024-01-08',
    endDate: '2024-01-15',
    progress: 100,
    status: 'Completed',
    assignedBy: 'Dr. Maria Lopez',
    notes: 'Rich in omega-3 fatty acids and antioxidants. Olive oil based cooking.',
    macros: {
      carbs: 40,
      protein: 25,
      fat: 35
    }
  },
  {
    id: '5',
    name: 'Post-Surgery Recovery Plan',
    type: 'Daily',
    calories: '1600 kcal',
    startDate: '2024-01-20',
    endDate: '2024-02-20',
    progress: 10,
    status: 'On Hold',
    assignedBy: 'Dr. Robert Kim',
    notes: 'Soft foods only for first week. Gradually introduce solid foods.',
    macros: {
      carbs: 35,
      protein: 35,
      fat: 30
    }
  }
];

// Sample meal plans data
export const sampleMealPlans: MealPlanEntry[] = [
  {
    id: '1',
    planName: 'Weight Loss Plan - Week 1',
    client: 'Ayesha Malik',
    calories: 1800,
    protein: 135,
    carbs: 180,
    fat: 70,
    status: 'Active',
    createdDate: '2024-01-15',
    foods: []
  },
  {
    id: '2',
    planName: 'Diabetes Management Plan',
    client: 'Ahmed Hassan',
    calories: 2200,
    protein: 165,
    carbs: 220,
    fat: 85,
    status: 'Completed',
    createdDate: '2024-01-10',
    foods: []
  },
  {
    id: '3',
    planName: 'High Protein Diet',
    client: 'Sarah Wilson',
    calories: 2500,
    protein: 200,
    carbs: 250,
    fat: 100,
    status: 'Draft',
    createdDate: '2024-01-12',
    foods: []
  }
];

// Sample meal plan templates data
export const sampleTemplates: MealPlanTemplate[] = [
  {
    id: '1',
    templateName: 'Weight Loss Standard',
    caloriesNeeded: 1800,
    breakfast: 450,
    lunch: 550,
    dinner: 600,
    additionalMeals: 200
  },
  {
    id: '2',
    templateName: 'Diabetic Friendly',
    caloriesNeeded: 2000,
    breakfast: 500,
    lunch: 600,
    dinner: 650,
    additionalMeals: 250
  },
  {
    id: '3',
    templateName: 'High Protein Build',
    caloriesNeeded: 2500,
    breakfast: 600,
    lunch: 750,
    dinner: 800,
    additionalMeals: 350
  },
  {
    id: '4',
    templateName: 'Mediterranean Diet',
    caloriesNeeded: 2200,
    breakfast: 550,
    lunch: 650,
    dinner: 700,
    additionalMeals: 300
  }
];

// Default meal types
export const defaultMealTypes: MealType[] = [
  { name: 'Breakfast', count: 1 },
  { name: 'Brunch', count: 1 },
  { name: 'Morning snack', count: 1 },
  { name: 'Lunch', count: 1 },
  { name: 'Afternoon snack', count: 1 },
  { name: 'Post workout', count: 1 },
  { name: 'Dinner', count: 1 },
  { name: 'Supplement', count: 1 }
];

// Theme colors - now theme-aware
export const getThemeColors = (theme: Theme) => ({
  primary: theme.palette.primary.main,
  primaryHover: theme.palette.primary.dark,
  secondary: theme.palette.text.secondary,
  success: theme.palette.success.main,
  info: theme.palette.info.main,
  warning: theme.palette.warning.main,
  error: theme.palette.error.main,
  background: {
    default: theme.palette.background.default,
    paper: theme.palette.background.paper,
    tableHeader: theme.palette.primary.main,
    tableRow: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#f6f8fa',
    tableRowHover: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#f1f3f4'
  },
  text: {
    primary: theme.palette.text.primary,
    secondary: theme.palette.text.secondary
  },
  border: theme.palette.divider
});

// Legacy support - will be removed after migration
export const themeColors = {
  primary: '#24a865',
  primaryHover: '#1e8a57',
  secondary: '#666',
  success: '#24a865',
  info: '#1976d2',
  warning: '#ff9800',
  error: '#dc3545',
  background: {
    default: 'white',
    paper: '#F9F4F2',
    tableHeader: '#24a865',
    tableRow: '#f6f8fa',
    tableRowHover: '#f1f3f4'
  },
  text: {
    primary: '#2c2c2c',
    secondary: '#666'
  },
  border: '#e1e4e8'
};