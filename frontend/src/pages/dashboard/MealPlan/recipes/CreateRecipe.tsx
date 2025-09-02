import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LuArrowLeft } from 'react-icons/lu';

// Import custom components
import PublishRecipeSection from './components/PublishRecipeSection';
import ImageUploadSection from './components/ImageUploadSection';
import BasicInformationSection from './components/BasicInformationSection';
import IngredientsSection from './components/IngredientsSection';
import CookingMethodSection from './components/CookingMethodSection';
import NutritionAnalysisPanel from './components/NutritionAnalysisPanel';

// Import types and constants
import { RecipeFormData } from './types/recipeTypes';
import { INITIAL_NUTRITION_DATA } from './constants/recipeConstants';
import { recipeStore } from '../utils/recipeStore';

const recipeSchema = yup.object({
  recipeName: yup.string().required('Recipe name is required'),
  tags: yup.array().of(yup.string().required()).required().min(1, 'At least one tag is required'),
  finalWeight: yup.string().required('Final weight is required'),
  description: yup.string().required('Description is required'),
  numberOfPortions: yup.string().required('Number of portions is required'),
  weightOfPortions: yup.string().required('Weight of portions is required'),
  ingredients: yup.array().of(
    yup.object({
      id: yup.string().required(),
      name: yup.string().required('Ingredient name is required'),
    })
  ).required().min(1, 'At least one ingredient is required'),
  cookingMethod: yup.string().required('Cooking method is required'),
});

interface CreateRecipePageProps {
  onBack?: () => void;
  onRecipeCreated?: () => void;
}

const CreateRecipePage: React.FC<CreateRecipePageProps> = ({ onBack, onRecipeCreated }) => {
  const [isPublic, setIsPublic] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [nutritionData, setNutritionData] = useState(INITIAL_NUTRITION_DATA);

  const { control, handleSubmit, reset, watch } = useForm<RecipeFormData>({
    resolver: yupResolver(recipeSchema),
    defaultValues: {
      recipeName: '',
      tags: [],
      finalWeight: '',
      description: '',
      numberOfPortions: '',
      weightOfPortions: '',
      ingredients: [{ id: '1', name: '', quantity: '', unit: 'g' }],
      cookingMethod: '',
      image: null,
    },
  });

  const ingredients = watch('ingredients');

  // Nutrition database per 100g
  const nutritionDB = {
    chicken: { energy: 165, fat: 20, carbohydrates: 5, protein: 60, fiber: 0 },
    beef: { energy: 250, fat: 35, carbohydrates: 0, protein: 55, fiber: 0 },
    rice: { energy: 130, fat: 2, carbohydrates: 75, protein: 15, fiber: 8 },
    vegetables: { energy: 25, fat: 1, carbohydrates: 70, protein: 10, fiber: 19 },
    'olive-oil': { energy: 884, fat: 95, carbohydrates: 0, protein: 0, fiber: 0 },
    onion: { energy: 40, fat: 1, carbohydrates: 85, protein: 9, fiber: 5 },
    garlic: { energy: 149, fat: 2, carbohydrates: 75, protein: 18, fiber: 5 },
    tomato: { energy: 18, fat: 1, carbohydrates: 75, protein: 15, fiber: 9 },
  };

  // Calculate nutrition based on ingredients
  useEffect(() => {
    let totalEnergy = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFiber = 0;
    let totalWeight = 0;

    ingredients.forEach((ingredient) => {
      if (ingredient.name && ingredient.quantity) {
        const nutrition = nutritionDB[ingredient.name as keyof typeof nutritionDB];
        if (nutrition) {
          const quantity = parseFloat(ingredient.quantity) || 0;
          let weightInGrams = quantity;
          
          // Convert to grams if needed
          if (ingredient.unit === 'kg') weightInGrams = quantity * 1000;
          else if (ingredient.unit === 'ml') weightInGrams = quantity; // Assume 1ml = 1g for simplicity
          else if (ingredient.unit === 'l') weightInGrams = quantity * 1000;
          else if (ingredient.unit === 'cup') weightInGrams = quantity * 240;
          else if (ingredient.unit === 'tbsp') weightInGrams = quantity * 15;
          else if (ingredient.unit === 'tsp') weightInGrams = quantity * 5;
          
          totalWeight += weightInGrams;
          const factor = weightInGrams / 100; // per 100g
          
          totalEnergy += nutrition.energy * factor;
          totalFat += nutrition.fat * factor;
          totalCarbs += nutrition.carbohydrates * factor;
          totalProtein += nutrition.protein * factor;
          totalFiber += nutrition.fiber * factor;
        }
      }
    });

    // Calculate percentages
    const total = totalFat + totalCarbs + totalProtein + totalFiber;
    setNutritionData({
      energy: Math.round(totalEnergy),
      fat: total > 0 ? Math.round((totalFat / total) * 100) : 0,
      carbohydrates: total > 0 ? Math.round((totalCarbs / total) * 100) : 0,
      protein: total > 0 ? Math.round((totalProtein / total) * 100) : 0,
      fiber: total > 0 ? Math.round((totalFiber / total) * 100) : 0,
      macronutrients: [],
      micronutrients: [],
    });
  }, [ingredients]);

  const handleFormSubmit = (data: RecipeFormData) => {
    // Filter out ingredients without quantity and ensure unit has a default value
    const validIngredients = data.ingredients
      .filter(ingredient => ingredient.name && ingredient.quantity)
      .map(ingredient => ({
        id: ingredient.id,
        name: ingredient.name,
        quantity: ingredient.quantity || '',
        unit: ingredient.unit || 'g'
      }));

    const formData = {
      ...data,
      ingredients: validIngredients,
      image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      isPublic,
      nutritionData,
      creatorName: 'Dr Saba', // You can make this dynamic
    };
    
    // Save to recipe store
    recipeStore.addRecipe(formData);
    
    console.log('Recipe submitted:', formData);
    
    // Notify parent component that recipe was created
    onRecipeCreated?.();
    
    // Reset form
    reset();
    setSelectedImage(null);
    setIsPublic(false);
    setNutritionData(INITIAL_NUTRITION_DATA);
  };

  const handlePublish = () => {
    handleSubmit(handleFormSubmit)();
  };

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
  };

  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Header with back button */}
      {onBack && (
        <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB' }}>
          <IconButton
            onClick={onBack}
            sx={{
              color: '#6B7280',
              '&:hover': {
                backgroundColor: '#F3F4F6',
              },
            }}
          >
            <LuArrowLeft size={20} />
          </IconButton>
        </Box>
      )}

      {/* Main Content */}
      <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
        {/* Main Content Layout */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Top Section: Image (left) + Basic Info (right) */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '30% 70%', gap: 4 }}>
            
            {/* Left: Image Upload Area (30% width, 600px height) */}
            <Box sx={{ height: '400px' }}>
              <ImageUploadSection onImageSelect={handleImageSelect} />
            </Box>

            {/* Right: Publish Recipe + Basic Information (70% width) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Publish Recipe Card */}
              <Box 
                sx={{ 
                  backgroundColor: '#F9F4F2', 
                  borderRadius: 3, 
                  p: 3 
                }}
              >
                <PublishRecipeSection
                  isPublic={isPublic}
                  onPublicChange={setIsPublic}
                  onPublish={handlePublish}
                />
              </Box>

              {/* Basic Information Card */}
              <Box 
                sx={{ 
                  backgroundColor: '#F9F4F2', 
                  borderRadius: 3, 
                  p: 3,
                  height: 'fit-content'
                }}
              >
                <BasicInformationSection control={control} />
              </Box>
            </Box>
          </Box>

          {/* Bottom Section: Ingredients & Cooking (left) + Nutrition Analysis (right) */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: 4 }}>
            {/* Left: Ingredients + Cooking Method (stacked vertically) */}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box 
                sx={{ 
                  backgroundColor: '#F9F4F2', 
                  borderRadius: 3, 
                  p: 3 
                }}
              >
                <IngredientsSection control={control} />
              </Box>
              
              <Box 
                sx={{ 
                  backgroundColor: '#F9F4F2', 
                  borderRadius: 3, 
                  p: 3 
                }}
              >
                <CookingMethodSection control={control} />
              </Box>
            </Box>

            {/* Right: Nutrition Analysis Graph Card */}
            <Box 
              sx={{ 
                backgroundColor: '#F9F4F2', 
                borderRadius: 3, 
                p: 3 
              }}
            >
              <NutritionAnalysisPanel nutritionData={nutritionData} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRecipePage;