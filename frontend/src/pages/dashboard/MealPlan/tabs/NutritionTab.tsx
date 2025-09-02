import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import FloatingLeaf from '../components/FloatingLeaf';
import RecipeOvenCard from '../components/RecipeOvenCard';
import CreateRecipePage from '../recipes/CreateRecipe';
import RecipeDetail from '../recipes/RecipeDetail';
import RecipeCard from '../recipes/components/RecipeCard';
import { MENU_PROPS, DEMO_NAMES, RECIPES_DATA } from '../constants/nutritionConstants';
import { recipeStore } from '../utils/recipeStore';
import { Recipe } from '../types/recipeStore';
import { addSampleRecipes } from '../utils/sampleData';

const NutritionTab = () => {
  const [personName, setPersonName] = useState([]);
  const [showCreateRecipePage, setShowCreateRecipePage] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(recipeStore.getRecipes());

  // Load sample data on first render
  useEffect(() => {
    if (recipes.length === 0) {
      addSampleRecipes();
      setRecipes(recipeStore.getRecipes());
    }
  }, []);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleCreateRecipe = () => {
    setShowCreateRecipePage(true);
  };

  const handleBackToRecipes = () => {
    setShowCreateRecipePage(false);
    setSelectedRecipe(null);
  };

  const handleRecipeCreated = () => {
    setRecipes(recipeStore.getRecipes());
    setShowCreateRecipePage(false);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  // If showing create recipe page, render it instead of the main content
  if (showCreateRecipePage) {
    return <CreateRecipePage onBack={handleBackToRecipes} onRecipeCreated={handleRecipeCreated} />;
  }

  // If showing recipe detail, render it instead of the main content
  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onBack={handleBackToRecipes} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Floating autumn leaves */}
      <FloatingLeaf top="10%" left="15%" delay="0s" size={15} />
      <FloatingLeaf top="25%" left="75%" delay="1s" size={18} />
      <FloatingLeaf top="60%" left="10%" delay="2s" size={12} />
      <FloatingLeaf top="15%" left="5%" delay="2.5s" size={20} />
      <FloatingLeaf top="70%" left="85%" delay="3s" size={13} />
      
      {/* Top controls */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'relative', zIndex: 3 }}>
        <Box sx={{ display: 'flex', width: '70%' }}>
          <FormControl sx={{ width: '80%' }}>
            <InputLabel id="demo-multiple-name-label">Community Recipes</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              placeholder="Community Recipes"
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Community Recipes" />}
              MenuProps={MENU_PROPS}
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#02BE6A',
                },
              }}
            >
              {DEMO_NAMES.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined"
            onClick={handleCreateRecipe} 
            sx={{ 
              px: 2,
              py: 1, 
              height: 56,
              bgcolor: 'transparent',
              borderRadius: '12px',
              borderColor: '#02BE6A',
              border: '2px solid #02BE6A',
              color: '#02BE6A',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#E8F5E8',
                borderColor: '#02BE6A',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Create New Recipe +
          </Button>
        </Box>
      </Box>
      
    
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        pt: 4,
        position: 'relative',
        zIndex: 2
      }}>
        {RECIPES_DATA.map((data, index) => (
          <RecipeOvenCard 
            key={index}
            title={data.title} 
            value={data.value} 
            isMainSearch={data.isMainSearch}
            subtitle={data.subtitle}
          />
        ))}
      </Box>
      
      {/* Created Recipes */}
      {recipes.length > 0 && (
        <Box sx={{ mt: 4, position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            width: '100%'
          }}>
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipeName={recipe.recipeName}
                creatorName={recipe.creatorName}
                image={recipe.image}
                energy={recipe.nutritionData.energy}
                weight={recipe.finalWeight}
                servings={recipe.numberOfPortions}
                tags={recipe.tags}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NutritionTab;