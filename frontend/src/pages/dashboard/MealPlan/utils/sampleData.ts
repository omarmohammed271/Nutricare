import { recipeStore } from '../utils/recipeStore';

// Sample recipe data for demonstration
export const addSampleRecipes = () => {
  // Sample Recipe 1
  recipeStore.addRecipe({
    recipeName: 'Avocado Toast with Poached Egg',
    creatorName: 'Dr Saba',
    description: 'A healthy and delicious breakfast option with fresh avocado and perfectly poached egg',
    finalWeight: '300',
    numberOfPortions: '1',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cookingMethod: 'Preheat oven to 350°F. In a small bowl, whisk together eggs, milk, and salt. In a large skillet, heat olive oil over medium heat. Add avocado and cook until soft. Season with black pepper to taste.',
    weightOfPortions: '300',
    tags: ['Community Recipes', 'Breakfast', 'Healthy'],
    ingredients: [
      { id: '1', name: 'avocado', quantity: '1', unit: 'piece' },
      { id: '2', name: 'bread', quantity: '2', unit: 'slices' },
      { id: '3', name: 'egg', quantity: '1', unit: 'piece' },
      { id: '4', name: 'olive-oil', quantity: '1', unit: 'tbsp' },
      { id: '5', name: 'tomato', quantity: '50', unit: 'g' },
    ],
    
    nutritionData: {
      energy: 320,
      fat: 22,
      carbohydrates: 25,
      protein: 15,
      fiber: 8,
      macronutrients: [],
      micronutrients: [],
    },
    isPublic: true,
  });

  // Sample Recipe 2
  recipeStore.addRecipe({
    recipeName: 'Healthy Taco Salad',
    creatorName: 'Dr Octavius',
    description: 'This Healthy Taco Salad is the universal delight of taco night.',
    finalWeight: '500',
    numberOfPortions: '4',
    weightOfPortions: '125',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

    tags: ['Community Recipes', 'Lunch', 'Mexican'],
    ingredients: [
      { id: '1', name: 'chicken', quantity: '200', unit: 'g' },
      { id: '2', name: 'vegetables', quantity: '150', unit: 'g' },
      { id: '3', name: 'rice', quantity: '100', unit: 'g' },
      { id: '4', name: 'onion', quantity: '50', unit: 'g' },
    ],
    cookingMethod: 'STEP 1: Cook chicken breast until fully cooked. STEP 2: Prepare fresh vegetables and wash thoroughly. STEP 3: Cook rice according to package instructions. STEP 4: Combine all ingredients in a large bowl. STEP 5: Serve immediately with your favorite dressing.',
    nutritionData: {
      energy: 250,
      fat: 18,
      carbohydrates: 30,
      protein: 35,
      fiber: 12,
      macronutrients: [],
      micronutrients: [],
    },
    isPublic: true,
  });
};