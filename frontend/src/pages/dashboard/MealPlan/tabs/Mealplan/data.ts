import { MealType, FoodItem } from './types';

// Mock data for the form
export const clientOptions = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];

export const diagnosisOptions = [
  'Diabetes', 
  'Obesity', 
  'Athlete', 
  'Hypertension', 
  'Heart Disease', 
  'Weight Loss'
];

export const foodExcludedOptions = [
  'Gluten', 
  'Lactose', 
  'Sugar', 
  'Nuts', 
  'Shellfish', 
  'Eggs', 
  'Soy'
];

export const mealTypes: MealType[] = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'brunch', label: 'Brunch' },
  { key: 'morningSnack', label: 'Morning snack' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'afternoonSnack', label: 'Afternoon snack' },
  { key: 'postWorkout', label: 'Post workout' },
  { key: 'dinner', label: 'Dinner' },
  { key: 'supplement', label: 'Supplement' },
];

// Comprehensive food database with nutritional values per 100g
export const foodDatabase: FoodItem[] = [
  // Proteins
  {
    id: 1,
    name: 'Chicken Breast',
    icon: '🍗',
    color: '#F8E71C',
    caloriesPer100g: 165,
    carbsPer100g: 0,
    proteinPer100g: 31,
    fatPer100g: 3.6,
    fiberPer100g: 0
  },
  {
    id: 2,
    name: 'Salmon',
    icon: '🐟',
    color: '#FF8C94',
    caloriesPer100g: 208,
    carbsPer100g: 0,
    proteinPer100g: 25.4,
    fatPer100g: 12.4,
    fiberPer100g: 0
  },
  {
    id: 3,
    name: 'Beef Steak',
    icon: '🥩',
    color: '#FF6B6B',
    caloriesPer100g: 271,
    carbsPer100g: 0,
    proteinPer100g: 26,
    fatPer100g: 19,
    fiberPer100g: 0
  },
  {
    id: 4,
    name: 'Eggs',
    icon: '🥚',
    color: '#FFD93D',
    caloriesPer100g: 155,
    carbsPer100g: 1.1,
    proteinPer100g: 13,
    fatPer100g: 11,
    fiberPer100g: 0
  },
  {
    id: 5,
    name: 'Greek Yogurt',
    icon: '🥛',
    color: '#FFFFFF',
    caloriesPer100g: 59,
    carbsPer100g: 3.6,
    proteinPer100g: 10,
    fatPer100g: 0.4,
    fiberPer100g: 0
  },
  
  // Carbohydrates
  {
    id: 6,
    name: 'Brown Rice',
    icon: '🍚',
    color: '#D2B48C',
    caloriesPer100g: 111,
    carbsPer100g: 23,
    proteinPer100g: 2.6,
    fatPer100g: 0.9,
    fiberPer100g: 1.8
  },
  {
    id: 7,
    name: 'Oats',
    icon: '🌾',
    color: '#DEB887',
    caloriesPer100g: 389,
    carbsPer100g: 66,
    proteinPer100g: 17,
    fatPer100g: 6.9,
    fiberPer100g: 10.6
  },
  {
    id: 8,
    name: 'Sweet Potato',
    icon: '🍠',
    color: '#FF8C42',
    caloriesPer100g: 86,
    carbsPer100g: 20,
    proteinPer100g: 1.6,
    fatPer100g: 0.1,
    fiberPer100g: 3
  },
  {
    id: 9,
    name: 'Quinoa',
    icon: '🌾',
    color: '#F5DEB3',
    caloriesPer100g: 368,
    carbsPer100g: 64,
    proteinPer100g: 14,
    fatPer100g: 6,
    fiberPer100g: 7
  },
  {
    id: 10,
    name: 'Whole Wheat Bread',
    icon: '🍞',
    color: '#D2691E',
    caloriesPer100g: 247,
    carbsPer100g: 41,
    proteinPer100g: 13,
    fatPer100g: 4.2,
    fiberPer100g: 7
  },
  
  // Vegetables
  {
    id: 11,
    name: 'Broccoli',
    icon: '🥦',
    color: '#4ECDC4',
    caloriesPer100g: 34,
    carbsPer100g: 7,
    proteinPer100g: 2.8,
    fatPer100g: 0.4,
    fiberPer100g: 2.6
  },
  {
    id: 12,
    name: 'Spinach',
    icon: '🥬',
    color: '#90EE90',
    caloriesPer100g: 23,
    carbsPer100g: 3.6,
    proteinPer100g: 2.9,
    fatPer100g: 0.4,
    fiberPer100g: 2.2
  },
  {
    id: 13,
    name: 'Carrots',
    icon: '🥕',
    color: '#FFA500',
    caloriesPer100g: 41,
    carbsPer100g: 10,
    proteinPer100g: 0.9,
    fatPer100g: 0.2,
    fiberPer100g: 2.8
  },
  {
    id: 14,
    name: 'Bell Peppers',
    icon: '🫑',
    color: '#FF6347',
    caloriesPer100g: 31,
    carbsPer100g: 7,
    proteinPer100g: 1,
    fatPer100g: 0.3,
    fiberPer100g: 2.5
  },
  
  // Fruits
  {
    id: 15,
    name: 'Apple',
    icon: '🍎',
    color: '#FF0000',
    caloriesPer100g: 52,
    carbsPer100g: 14,
    proteinPer100g: 0.3,
    fatPer100g: 0.2,
    fiberPer100g: 2.4
  },
  {
    id: 16,
    name: 'Banana',
    icon: '🍌',
    color: '#FFFF00',
    caloriesPer100g: 89,
    carbsPer100g: 23,
    proteinPer100g: 1.1,
    fatPer100g: 0.3,
    fiberPer100g: 2.6
  },
  {
    id: 17,
    name: 'Blueberries',
    icon: '🫐',
    color: '#4169E1',
    caloriesPer100g: 57,
    carbsPer100g: 14,
    proteinPer100g: 0.7,
    fatPer100g: 0.3,
    fiberPer100g: 2.4
  },
  {
    id: 18,
    name: 'Orange',
    icon: '🍊',
    color: '#FFA500',
    caloriesPer100g: 47,
    carbsPer100g: 12,
    proteinPer100g: 0.9,
    fatPer100g: 0.1,
    fiberPer100g: 2.4
  },
  
  // Healthy Fats
  {
    id: 19,
    name: 'Avocado',
    icon: '🥑',
    color: '#90EE90',
    caloriesPer100g: 160,
    carbsPer100g: 9,
    proteinPer100g: 2,
    fatPer100g: 15,
    fiberPer100g: 7
  },
  {
    id: 20,
    name: 'Almonds',
    icon: '🌰',
    color: '#D2B48C',
    caloriesPer100g: 579,
    carbsPer100g: 22,
    proteinPer100g: 21,
    fatPer100g: 50,
    fiberPer100g: 12
  },
  {
    id: 21,
    name: 'Walnuts',
    icon: '🥜',
    color: '#8B4513',
    caloriesPer100g: 654,
    carbsPer100g: 14,
    proteinPer100g: 15,
    fatPer100g: 65,
    fiberPer100g: 7
  },
  {
    id: 22,
    name: 'Olive Oil',
    icon: '🫒',
    color: '#808000',
    caloriesPer100g: 884,
    carbsPer100g: 0,
    proteinPer100g: 0,
    fatPer100g: 100,
    fiberPer100g: 0
  },
  
  // Dairy
  {
    id: 23,
    name: 'Milk',
    icon: '🥛',
    color: '#FFFFFF',
    caloriesPer100g: 42,
    carbsPer100g: 5,
    proteinPer100g: 3.4,
    fatPer100g: 1,
    fiberPer100g: 0
  },
  {
    id: 24,
    name: 'Cheese',
    icon: '🧀',
    color: '#FFFF99',
    caloriesPer100g: 113,
    carbsPer100g: 1,
    proteinPer100g: 7,
    fatPer100g: 9,
    fiberPer100g: 0
  },
  
  // Legumes
  {
    id: 25,
    name: 'Lentils',
    icon: '🫘',
    color: '#A52A2A',
    caloriesPer100g: 116,
    carbsPer100g: 20,
    proteinPer100g: 9,
    fatPer100g: 0.4,
    fiberPer100g: 8
  },
  {
    id: 26,
    name: 'Chickpeas',
    icon: '🫛',
    color: '#DEB887',
    caloriesPer100g: 164,
    carbsPer100g: 27,
    proteinPer100g: 8,
    fatPer100g: 2.6,
    fiberPer100g: 8
  }
];

export const defaultFormData = {
  clientName: '',
  diagnosis: '',
  calorieNeed: '',
  carbs: 33,
  protein: 33,
  fat: 34,
  foodExcluded: [],
};

export const defaultMealCounters = {
  breakfast: 1,
  brunch: 1,
  morningSnack: 1,
  lunch: 1,
  afternoonSnack: 1,
  postWorkout: 1,
  dinner: 1,
  supplement: 1,
};