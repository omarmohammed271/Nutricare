import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Alert,
  Autocomplete,
  useTheme
} from '@mui/material';
import { FoodItem, SelectedFood } from '../types';
import { foodDatabase } from '../data';

interface FoodDropdownDialogProps {
  open: boolean;
  mealId?: string; // Optional - if not provided, user can select meal
  availableMeals?: Array<{ id: string; type: string }>; // List of generated meals
  onClose: () => void;
  onAddFood: (food: SelectedFood) => void;
}

const FoodDropdownDialog: React.FC<FoodDropdownDialogProps> = ({
  open,
  mealId,
  availableMeals = [],
  onClose,
  onAddFood
}) => {
  const theme = useTheme();
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedMealId, setSelectedMealId] = useState<string>(mealId || '');
  const [grams, setGrams] = useState<number>(100);
  const [calculatedNutrition, setCalculatedNutrition] = useState({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    fiber: 0
  });

  // Update selected meal when mealId prop changes
  React.useEffect(() => {
    if (mealId) {
      setSelectedMealId(mealId);
    } else if (availableMeals.length > 0) {
      setSelectedMealId(availableMeals[0].id);
    }
  }, [mealId, availableMeals]);

  React.useEffect(() => {
    if (selectedFood && grams > 0) {
      const ratio = grams / 100;
      setCalculatedNutrition({
        calories: Math.round(selectedFood.caloriesPer100g * ratio),
        carbs: Math.round((selectedFood.carbsPer100g * ratio) * 10) / 10,
        protein: Math.round((selectedFood.proteinPer100g * ratio) * 10) / 10,
        fat: Math.round((selectedFood.fatPer100g * ratio) * 10) / 10,
        fiber: Math.round((selectedFood.fiberPer100g * ratio) * 10) / 10
      });
    } else {
      setCalculatedNutrition({
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0
      });
    }
  }, [selectedFood, grams]);

  const handleAddFood = () => {
    if (!selectedFood || grams <= 0 || !selectedMealId) return;

    const foodToAdd: SelectedFood = {
      foodId: selectedFood.id,
      name: selectedFood.name,
      grams,
      calories: calculatedNutrition.calories,
      carbs: calculatedNutrition.carbs,
      protein: calculatedNutrition.protein,
      fat: calculatedNutrition.fat,
      fiber: calculatedNutrition.fiber,
      mealId: selectedMealId
    };

    onAddFood(foodToAdd);
    handleClose();
  };

  const handleClose = () => {
    setSelectedFood(null);
    setSelectedMealId(mealId || '');
    setGrams(100);
    onClose();
  };

  // Group foods by category for better organization
  const foodCategories = {
    'Proteins': foodDatabase.filter(f => f.proteinPer100g > 15),
    'Carbohydrates': foodDatabase.filter(f => f.carbsPer100g > 15 && f.proteinPer100g <= 15),
    'Healthy Fats': foodDatabase.filter(f => f.fatPer100g > 10 && f.proteinPer100g <= 15),
    'Vegetables': foodDatabase.filter(f => f.caloriesPer100g < 50 && f.fiberPer100g > 1),
    'Fruits': foodDatabase.filter(f => [15, 16, 17, 18].includes(f.id)),
    'Dairy': foodDatabase.filter(f => [5, 23, 24].includes(f.id)),
    'Legumes': foodDatabase.filter(f => [25, 26].includes(f.id))
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: theme.palette.background.paper
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          color: theme.palette.text.primary
        }}>
          Add Food to Meal
        </Typography>
        <Typography variant="body2" sx={{ 
          color: theme.palette.text.secondary 
        }}>
          Select a food item and specify the amount
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3}>
          {/* Meal Selection - only show if mealId is not provided */}
          {!mealId && availableMeals.length > 0 && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Meal</InputLabel>
                <Select
                  value={selectedMealId}
                  label="Select Meal"
                  onChange={(e) => setSelectedMealId(e.target.value as string)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary
                    },
                    '& .MuiFormLabel-root': {
                      color: theme.palette.mode === 'dark' ? '#cccccc' : '#666'
                    }
                  }}
                >
                  {availableMeals.map((meal) => (
                    <MenuItem key={meal.id} value={meal.id} sx={{ 
                      color: theme.palette.text.primary
                    }}>
                      {meal.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          
          {/* Food Selection */}
          <Grid item xs={12}>
            <Autocomplete
              options={foodDatabase}
              getOptionLabel={(option) => option.name}
              value={selectedFood}
              onChange={(event, newValue) => setSelectedFood(newValue)}
              groupBy={(option) => {
                // Find which category this food belongs to
                for (const [category, foods] of Object.entries(foodCategories)) {
                  if (foods.some(f => f.id === option.id)) {
                    return category;
                  }
                }
                return 'Other';
              }}
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1.5, 
                  py: 1,
                  color: theme.palette.text.primary
                }}>
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32,
                      backgroundColor: option.color + '20',
                      fontSize: '1rem'
                    }}
                  >
                    {option.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {option.name}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: theme.palette.text.secondary 
                    }}>
                      {option.caloriesPer100g} kcal/100g • {option.proteinPer100g}g protein
                    </Typography>
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Food Item"
                  placeholder="Search for a food..."
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary
                    },
                    '& .MuiFormLabel-root': {
                      color: theme.palette.mode === 'dark' ? '#cccccc' : '#666'
                    }
                  }}
                />
              )}
              noOptionsText="No foods found"
              filterOptions={(options, { inputValue }) => {
                return options.filter(option =>
                  option.name.toLowerCase().includes(inputValue.toLowerCase())
                );
              }}
            />
          </Grid>

          {selectedFood && (
            <>
              {/* Amount Input */}
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  bgcolor: theme.palette.background.paper, 
                  border: `1px solid ${theme.palette.divider}` 
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}>
                      Amount
                    </Typography>
                    <TextField
                      label="Grams"
                      type="number"
                      value={grams}
                      onChange={(e) => setGrams(Math.max(0, parseInt(e.target.value) || 0))}
                      fullWidth
                      InputProps={{
                        endAdornment: <InputAdornment position="end">g</InputAdornment>,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary
                        },
                        '& .MuiFormLabel-root': {
                          color: theme.palette.mode === 'dark' ? '#cccccc' : '#666'
                        }
                      }}
                    />
                    {grams <= 0 && (
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        Please enter a valid amount greater than 0 grams
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Nutritional Breakdown */}
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  bgcolor: theme.palette.background.paper, 
                  border: `1px solid ${theme.palette.divider}` 
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}>
                      Nutritional Values ({grams}g)
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 500,
                          color: theme.palette.text.primary
                        }}>
                          Calories
                        </Typography>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700, 
                          color: '#4CAF50' 
                        }}>
                          {calculatedNutrition.calories} kcal
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ 
                        borderColor: theme.palette.divider
                      }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ 
                          color: theme.palette.text.secondary 
                        }}>
                          Carbohydrates
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 600,
                          color: theme.palette.text.primary
                        }}>
                          {calculatedNutrition.carbs}g
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ 
                          color: theme.palette.text.secondary 
                        }}>
                          Protein
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 600,
                          color: theme.palette.text.primary
                        }}>
                          {calculatedNutrition.protein}g
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ 
                          color: theme.palette.text.secondary 
                        }}>
                          Fat
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 600,
                          color: theme.palette.text.primary
                        }}>
                          {calculatedNutrition.fat}g
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ 
                          color: theme.palette.text.secondary 
                        }}>
                          Fiber
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 600,
                          color: theme.palette.text.primary
                        }}>
                          {calculatedNutrition.fiber}g
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Food Details */}
              <Grid item xs={12}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  p: 2, 
                  bgcolor: theme.palette.background.paper, 
                  borderRadius: 2 
                }}>
                  <Avatar 
                    sx={{ 
                      width: 48, 
                      height: 48,
                      backgroundColor: selectedFood.color + '20',
                      fontSize: '1.5rem'
                    }}
                  >
                    {selectedFood.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}>
                      {selectedFood.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: theme.palette.text.secondary 
                    }}>
                      Reference values per 100g: {selectedFood.caloriesPer100g} kcal, 
                      {selectedFood.carbsPer100g}g carbs, {selectedFood.proteinPer100g}g protein, 
                      {selectedFood.fatPer100g}g fat, {selectedFood.fiberPer100g}g fiber
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} sx={{ 
          color: theme.palette.text.primary
        }}>
          Cancel
        </Button>
        <Button 
          onClick={handleAddFood} 
          variant="contained" 
          disabled={!selectedFood || grams <= 0 || !selectedMealId}
          sx={{ 
            bgcolor: theme.palette.success.main,
            '&:hover': { bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light },
            px: 3
          }}
        >
          Add to {availableMeals.find(m => m.id === selectedMealId)?.type || 'Meal'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FoodDropdownDialog;