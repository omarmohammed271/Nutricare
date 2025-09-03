import { recipeStore } from '../utils/recipeStore';

// Sample recipe data for demonstration
export const addSampleRecipes = () => {
  // Clear existing recipes first
  recipeStore.clearRecipes();
  
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

  // Sample Recipe 3
  recipeStore.addRecipe({
    recipeName: 'Mediterranean Grilled Chicken',
    creatorName: 'Chef Maria',
    description: 'Juicy grilled chicken with Mediterranean herbs and spices',
    finalWeight: '400',
    numberOfPortions: '2',
    weightOfPortions: '200',
    image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Community Recipes', 'Dinner', 'Mediterranean'],
    ingredients: [
      { id: '1', name: 'chicken', quantity: '300', unit: 'g' },
      { id: '2', name: 'olive-oil', quantity: '2', unit: 'tbsp' },
      { id: '3', name: 'garlic', quantity: '3', unit: 'cloves' },
      { id: '4', name: 'vegetables', quantity: '100', unit: 'g' },
    ],
    cookingMethod: 'STEP 1: Marinate chicken with olive oil and garlic. STEP 2: Preheat grill to medium-high heat. STEP 3: Grill chicken for 6-8 minutes per side. STEP 4: Serve with fresh vegetables.',
    nutritionData: {
      energy: 280,
      fat: 15,
      carbohydrates: 8,
      protein: 45,
      fiber: 3,
      macronutrients: [],
      micronutrients: [],
    },
    isPublic: true,
  });

  // Sample Recipe 4
  recipeStore.addRecipe({
    recipeName: 'Quinoa Power Bowl',
    creatorName: 'Dr Sarah',
    description: 'Nutritious quinoa bowl packed with vegetables and protein',
    finalWeight: '350',
    numberOfPortions: '1',
    weightOfPortions: '350',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Community Recipes', 'Lunch', 'Vegetarian'],
    ingredients: [
      { id: '1', name: 'quinoa', quantity: '80', unit: 'g' },
      { id: '2', name: 'vegetables', quantity: '200', unit: 'g' },
      { id: '3', name: 'olive-oil', quantity: '1', unit: 'tbsp' },
      { id: '4', name: 'chickpeas', quantity: '100', unit: 'g' },
    ],
    cookingMethod: 'STEP 1: Cook quinoa according to package instructions. STEP 2: Prepare and chop fresh vegetables. STEP 3: Mix quinoa with vegetables and chickpeas. STEP 4: Drizzle with olive oil and serve.',
    nutritionData: {
      energy: 300,
      fat: 12,
      carbohydrates: 40,
      protein: 20,
      fiber: 10,
      macronutrients: [],
      micronutrients: [],
    },
    isPublic: true,
  });

  // Sample Recipe 5
  recipeStore.addRecipe({
    recipeName: 'Protein Smoothie Bowl',
    creatorName: 'Fitness Coach Alex',
    description: 'High-protein breakfast smoothie bowl with fresh fruits',
    finalWeight: '250',
    numberOfPortions: '1',
    weightOfPortions: '250',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Community Recipes', 'Breakfast', 'High-Protein'],
    ingredients: [
      { id: '1', name: 'banana', quantity: '1', unit: 'piece' },
      { id: '2', name: 'protein-powder', quantity: '30', unit: 'g' },
      { id: '3', name: 'berries', quantity: '100', unit: 'g' },
      { id: '4', name: 'almond-milk', quantity: '200', unit: 'ml' },
    ],
    cookingMethod: 'STEP 1: Blend banana, protein powder, and almond milk until smooth. STEP 2: Pour into bowl. STEP 3: Top with fresh berries. STEP 4: Serve immediately.',
    nutritionData: {
      energy: 220,
      fat: 8,
      carbohydrates: 25,
      protein: 30,
      fiber: 6,
      macronutrients: [],
      micronutrients: [],
    },
    isPublic: true,
  });

  // Sample Recipe 6
  recipeStore.addRecipe({
    recipeName: 'Salmon with Roasted Vegetables',
    creatorName: 'Chef Roberto',
    description: 'Fresh salmon fillet with colorful roasted vegetables',
    finalWeight: '450',
    numberOfPortions: '2',
    weightOfPortions: '225',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Community Recipes', 'Dinner', 'Seafood'],
    ingredients: [
      { id: '1', name: 'salmon', quantity: '200', unit: 'g' },
      { id: '2', name: 'vegetables', quantity: '200', unit: 'g' },
      { id: '3', name: 'olive-oil', quantity: '2', unit: 'tbsp' },
      { id: '4', name: 'herbs', quantity: '10', unit: 'g' },
    ],
    cookingMethod: 'STEP 1: Preheat oven to 400°F. STEP 2: Season salmon with herbs. STEP 3: Roast vegetables with olive oil for 20 minutes. STEP 4: Bake salmon for 12-15 minutes. STEP 5: Serve together.',
    nutritionData: {
      energy: 340,
      fat: 20,
      carbohydrates: 15,
      protein: 40,
      fiber: 5,
      macronutrients: [],
      micronutrients: [],
    },
    isPublic: true,
  });
};