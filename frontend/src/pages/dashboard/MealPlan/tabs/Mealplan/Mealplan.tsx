import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Grid,
  Chip,
  IconButton,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Tab,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  NoteAdd as NoteAddIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';

import { 
  MealCounter, 
  MealData, 
  FormData, 
  NoteDialogState,
  FoodSelectionDialogState,
  FoodItem,
  SelectedFood,
  NutritionSummary
} from './types';
import { 
  clientOptions,
  diagnosisOptions,
  foodExcludedOptions,
  mealTypes,
  defaultFormData,
  defaultMealCounters,
  foodDatabase
} from './data';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import GraphCard from './componenets/graphcard';
import FoodListingCard from './componenets/FoodListingCard';
import FoodSelectionDialog from './componenets/FoodSelectionDialog';
import FoodDropdownDialog from './componenets/FoodDropdownDialog';
import { calculateNutritionSummary } from './utils/nutritionCalculator';

const Mealplan = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [mealCounters, setMealCounters] = useState<MealCounter>(defaultMealCounters);
  const [generatedMeals, setGeneratedMeals] = useState<MealData[]>([]);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [noteDialog, setNoteDialog] = useState<NoteDialogState>({ 
    open: false, 
    mealId: '', 
    currentNote: '' 
  });
  const [foodDialog, setFoodDialog] = useState<FoodSelectionDialogState>({
    open: false,
    mealId: '',
    selectedFood: null,
    grams: 100
  });
  const [foodDropdownDialog, setFoodDropdownDialog] = useState({
    open: false,
    mealId: ''
  });
  const [basketItems, setBasketItems] = useState<SelectedFood[]>([]);
  const [nutritionSummary, setNutritionSummary] = useState<NutritionSummary>({
    totalCalories: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
    totalFiber: 0,
    mealBreakdown: {}
  });

  // Calculate nutrition summary when meals change
  React.useEffect(() => {
    const summary = calculateNutritionSummary(generatedMeals);
    setNutritionSummary(summary);
  }, [generatedMeals]);

  const handleSliderChange = (macroType: 'carbs' | 'protein' | 'fat') => (event: Event, newValue: number | number[]) => {
    const value = newValue as number;
    const otherTwo = 100 - value;
    const halfOther = otherTwo / 2;

    if (macroType === 'carbs') {
      setFormData(prev => ({ ...prev, carbs: value, protein: halfOther, fat: halfOther }));
    } else if (macroType === 'protein') {
      setFormData(prev => ({ ...prev, protein: value, carbs: halfOther, fat: halfOther }));
    } else {
      setFormData(prev => ({ ...prev, fat: value, carbs: halfOther, protein: halfOther }));
    }
  };

  const handleCounterChange = (mealType: keyof MealCounter, increment: boolean) => {
    setMealCounters(prev => ({
      ...prev,
      [mealType]: Math.max(0, prev[mealType] + (increment ? 1 : -1))
    }));
  };

  const generatePlan = () => {
    const meals: MealData[] = [];
    
    Object.entries(mealCounters).forEach(([type, count]) => {
      for (let i = 0; i < count; i++) {
        meals.push({
          id: `${type}-${i}`,
          type: mealTypes.find(m => m.key === type)?.label || type,
          foods: [],
          notes: ''
        });
      }
    });
    
    setGeneratedMeals(meals);
    setPlanGenerated(true);
  };

  const handleFoodSelect = (food: FoodItem, mealId?: string) => {
    if (generatedMeals.length === 0) {
      alert('Please generate a meal plan first!');
      return;
    }
    
    // If mealId is provided, use it; otherwise use the first meal
    const targetMealId = mealId || generatedMeals[0]?.id;
    
    setFoodDialog({
      open: true,
      mealId: targetMealId,
      selectedFood: food,
      grams: 100
    });
  };

  const handleAddFood = (selectedFood: SelectedFood) => {
    // Add to the specific meal
    setGeneratedMeals(prev => prev.map(meal => 
      meal.id === selectedFood.mealId 
        ? { ...meal, foods: [...meal.foods, selectedFood] }
        : meal
    ));
    
    // Add to basket
    setBasketItems(prev => [...prev, selectedFood]);
  };

  const handleRemoveFromBasket = (foodId: number, mealId: string) => {
    // Remove from basket
    setBasketItems(prev => {
      const index = prev.findIndex(item => item.foodId === foodId && item.mealId === mealId);
      if (index > -1) {
        const newBasket = [...prev];
        newBasket.splice(index, 1);
        return newBasket;
      }
      return prev;
    });
    
    // Remove from meal
    setGeneratedMeals(prev => prev.map(meal => 
      meal.id === mealId 
        ? { ...meal, foods: meal.foods.filter((food, index) => {
            const isMatch = food.foodId === foodId;
            if (isMatch) {
              // Remove only the first occurrence
              const updatedFoods = [...meal.foods];
              updatedFoods.splice(index, 1);
              return false;
            }
            return true;
          })}
        : meal
    ));
  };

  const handleAddFoodToMeal = (mealId: string) => {
    setFoodDropdownDialog({
      open: true,
      mealId: mealId // Specific meal selected
    });
  };

  const handleAddFoodFromDropdown = (selectedFood: SelectedFood) => {
    // Add to the specific meal
    setGeneratedMeals(prev => prev.map(meal => 
      meal.id === selectedFood.mealId 
        ? { ...meal, foods: [...meal.foods, selectedFood] }
        : meal
    ));
    
    // Add to basket
    setBasketItems(prev => [...prev, selectedFood]);
    
    // Close the dropdown dialog
    setFoodDropdownDialog({ open: false, mealId: '' });
  };

  const handleAddNote = (mealId: string) => {
    const meal = generatedMeals.find(m => m.id === mealId);
    setNoteDialog({
      open: true,
      mealId,
      currentNote: meal?.notes || ''
    });
  };

  const saveNote = () => {
    setGeneratedMeals(prev => prev.map(meal => 
      meal.id === noteDialog.mealId 
        ? { ...meal, notes: noteDialog.currentNote }
        : meal
    ));
    setNoteDialog({ open: false, mealId: '', currentNote: '' });
  };


    const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', p: 0.5 }}>
      {/* Main Layout with Form on Left and Chart on Right */}
      <Grid container spacing={3}>
        {/* Form Section - Left Side */}
        <Grid item xs={12} md={7}>
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 2, bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'left', color: theme.palette.text.primary }}>
                  Create New Plan
                </Typography>
    <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="meal plan tabs" 
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                color: theme.palette.text.secondary,
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                },
              },
            }}
          >
            <Tab label="Meal Planning" value="1" />
            <Tab label="Meal Templates" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{width:'100%', p: 0}}>
     
   
          
          <Grid container spacing={3} sx={{mt:2}}  >
            {/* Client Name */}
            <Grid item xs={12} md={12} sx={{display: 'flex', flexDirection:'row' ,gap:1, alignItems:'center'}}>
                <Typography variant="h6" sx={{fontWeight: 600 ,width:'20%', color: theme.palette.text.primary}}>
                  Client Name
                </Typography>
              <Autocomplete
              sx={{width:'100%'}}
                options={clientOptions}
                value={formData.clientName}
                onChange={(event, newValue) => setFormData(prev => ({ ...prev, clientName: newValue || '' }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Client Name"
                    placeholder="Write"
                    fullWidth
                    sx={{
                        minWidth: '100%',
                      '& .MuiOutlinedInput-root': {
                         backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.mode === 'dark' ? '#404040' : 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.mode === 'dark' ? '#737373' : '#02BE6A',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#02BE6A',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#000000',
                        '&.Mui-focused': {
                          color: '#02BE6A',
                        },
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* Diagnosis */}
            <Grid item xs={12} md={12} sx={{display: 'flex', flexDirection:'row' ,gap:1, alignItems:'center'}}>
            <Typography variant="h6" sx={{fontWeight: 600 ,width:'20%', color: theme.palette.text.primary}}>
                  Diagnosis
                </Typography>
              <FormControl sx={{width:'100%'}}>
                <InputLabel 
                  sx={{
                    
                    color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#000000',
                    '&.Mui-focused': {
                      color: '#02BE6A',
                    },
                  }}
                >Diagnosis</InputLabel>
                <Select
                  value={formData.diagnosis}
                  label="Diagnosis"
                  onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
                  sx={{
  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#404040' : 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#737373' : '#02BE6A',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#02BE6A',
                    },
                  }}
                >
                  {diagnosisOptions.map((option) => (
                    <MenuItem key={option} value={option} sx={{ 
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                      },
                    }}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Calorie Need */}
            <Grid item xs={12} md={12} sx={{display: 'flex', flexDirection:'row' ,gap:1, alignItems:'center'}}>
            <Typography variant="h6" sx={{fontWeight: 600 ,width:'20%', color: theme.palette.text.primary}}>
                  Calorie Need
                </Typography>
              <TextField
                label="Calorie need"
                placeholder="Write"
                type="number"
                value={formData.calorieNeed}
                onChange={(e) => setFormData(prev => ({ ...prev, calorieNeed: e.target.value }))}
                sx={{
                  width:'100%',
                  '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',   
                     color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    '& fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#404040' : 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#737373' : '#02BE6A',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#02BE6A',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#000000',
                    '&.Mui-focused': {
                      color: '#02BE6A',
                    },
                  },
                }}
              />
            </Grid>

            {/* Food Excluded */}
          
            {/* Macronutrient Distribution */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                Macronutrients Distribution %
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Typography gutterBottom sx={{ color: theme.palette.text.primary }}>Carbs</Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={formData.carbs}
                      onChange={handleSliderChange('carbs')}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ 
                        color: '#4CAF50',
                        '& .MuiSlider-thumb': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#4CAF50' : '#4CAF50',
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#4CAF50' : '#4CAF50',
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#404040' : '#bdbdbd',
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ color: theme.palette.text.secondary }}>
                    {Math.round(formData.carbs)}%
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography gutterBottom sx={{ color: theme.palette.text.primary }}>Proteins</Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={formData.protein}
                      onChange={handleSliderChange('protein')}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ 
                        color: '#4CAF50',
                        '& .MuiSlider-thumb': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#4CAF50' : '#4CAF50',
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#4CAF50' : '#4CAF50',
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#404040' : '#bdbdbd',
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ color: theme.palette.text.secondary }}>
                    {Math.round(formData.protein)}%
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography gutterBottom sx={{ color: theme.palette.text.primary }}>Fats</Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={formData.fat}
                      onChange={handleSliderChange('fat')}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ 
                        color: '#4CAF50',
                        '& .MuiSlider-thumb': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#4CAF50' : '#4CAF50',
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#4CAF50' : '#4CAF50',
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#404040' : '#bdbdbd',
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ color: theme.palette.text.secondary }}>
                    {Math.round(formData.fat)}%
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Food Excluded */}
            <Grid item xs={12} md={12} sx={{display: 'flex', flexDirection:'row' ,gap:1, alignItems:'center'}}>
                <Typography variant="h6" sx={{fontWeight: 600, color: theme.palette.text.primary }}>
                  Food Excluded
                </Typography>
              <FormControl sx={{width:'85%'}}>
                <InputLabel
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#000000',
                    '&.Mui-focused': {
                      color: '#02BE6A',
                    },
                  }}
                >Food Excluded</InputLabel>
                <Select
                  multiple
                  value={formData.foodExcluded}
                  onChange={(e) => setFormData(prev => ({ ...prev, foodExcluded: e.target.value as string[] }))}
                  input={<OutlinedInput label="Food Excluded" />}
                  sx={{
                    backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#404040' : 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? '#737373' : '#02BE6A',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#02BE6A',
                    },
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" sx={{ 
                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : undefined,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                        }} />
                      ))}
                    </Box>
                  )}
                >
                  {foodExcludedOptions.map((option) => (
                    <MenuItem key={option} value={option} sx={{ 
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                      },
                    }}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

    <Divider variant="middle" component="li" sx={{mt: 4, borderColor: theme.palette.divider}} />
          {/* Meal Counters */}
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              {mealTypes.map((meal) => (
                <Grid item xs={6} md={4} key={meal.key}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    bgcolor: theme.palette.background.paper
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                      {meal.label}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleCounterChange(meal.key as keyof MealCounter, false)}
                        sx={{ 
                          bgcolor: theme.palette.success.main, 
                          color: theme.palette.success.contrastText, 
                          width: 24, 
                          height: 24,
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light
                          }
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ minWidth: 20, textAlign: 'center', fontWeight: 600, color: theme.palette.text.primary }}>
                        {mealCounters[meal.key as keyof MealCounter]}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => handleCounterChange(meal.key as keyof MealCounter, true)}
                        sx={{ 
                          bgcolor: theme.palette.success.main, 
                          color: theme.palette.success.contrastText, 
                          width: 24, 
                          height: 24,
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light
                          }
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Generate Plan Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={generatePlan}
            sx={{
              mt: 4,
              py: 2,
              bgcolor: theme.palette.success.main,
              '&:hover': { bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light },
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1.1rem'
            }}
          >
            Generate Plan
          </Button>

            </TabPanel>

        <TabPanel value="2" sx={{width:'100%', p: 2}}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
            Meal Templates
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Browse and select from pre-made meal templates to quickly create meal plans.
          </Typography>
        </TabPanel>
      </TabContext>
             </Box>
        </CardContent>
      </Card>
        </Grid>

        {/* Chart Section - Right Side */}
        <Grid item xs={12} md={5}>
          <FoodListingCard 
            onFoodSelect={handleFoodSelect}
            basketItems={basketItems}
            onRemoveFromBasket={handleRemoveFromBasket}
          />
          <GraphCard 
            nutritionSummary={nutritionSummary}
            targetCalories={parseInt(formData.calorieNeed) || 2200}
          />
        </Grid>
      </Grid>

      {/* Generated Meals Section */}
      {planGenerated && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {generatedMeals.map((meal) => (
            <Grid item xs={12} md={12} key={meal.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 2, p: 1, bgcolor: theme.palette.background.paper }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1, color: theme.palette.text.primary }}>
                        {meal.type}
                      </Typography>
                      <Chip 
                        label={meal.id.split('-')[1] ? `#${parseInt(meal.id.split('-')[1]) + 1}` : '#1'}
                        size="small"
                        sx={{ 
                          bgcolor: theme.palette.success.main, 
                          color: theme.palette.success.contrastText,
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<RestaurantIcon />}
                        sx={{ 
                          flexGrow: 1,
                          color: theme.palette.success.main,
                          borderColor: theme.palette.success.main,
                          '&:hover': { bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark + '20' : theme.palette.success.light + '20' }
                        }}
                        onClick={() => handleAddFoodToMeal(meal.id)}
                      >
                        Add New Food
                      </Button>
                      
                      <IconButton
                        onClick={() => handleAddNote(meal.id)}
                        sx={{ 
                          bgcolor: theme.palette.success.main,
                          color: theme.palette.success.contrastText,
                          '&:hover': { 
                            bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light
                          }
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    
                    {/* Display foods in this meal */}
                    {meal.foods.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.primary }}>
                          Foods ({meal.foods.length}):
                        </Typography>
                        {meal.foods.map((food, index) => {
                          const foodItem = foodDatabase.find(f => f.id === food.foodId);
                          return (
                            <Box key={`${food.foodId}-${index}`} sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              p: 1, 
                              bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100], 
                              borderRadius: 1, 
                              mb: 1 
                            }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                                  {foodItem?.icon || '🍽️'}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                                  {food.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                  ({food.grams}g)
                                </Typography>
                              </Box>
                              <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                                {food.calories} kcal
                              </Typography>
                            </Box>
                          );
                        })}
                        
                        {/* Meal nutrition summary */}
                        <Box sx={{ mt: 1, p: 1, bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark + '20' : theme.palette.success.light + '20', borderRadius: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                            Meal Total: {Math.round(meal.foods.reduce((sum, food) => sum + food.calories, 0))} kcal
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    
                    <Button
                      variant="outlined"
                      startIcon={<NoteAddIcon />}
                      fullWidth
                      onClick={() => handleAddNote(meal.id)}
                      sx={{ 
                        mt: 1,
                        color: theme.palette.success.main,
                        borderColor: theme.palette.success.main,
                        '&:hover': { 
                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark + '20' : theme.palette.success.light + '20',
                          borderColor: theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.main
                        }
                      }}
                    >
                      Add Note
                    </Button>
                    
                    {meal.notes && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100], borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          <strong>Note:</strong> {meal.notes}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

      {/* Food Dropdown Dialog */}
      <FoodDropdownDialog
        open={foodDropdownDialog.open}
        mealId={foodDropdownDialog.mealId || undefined}
        availableMeals={generatedMeals.map(meal => ({ id: meal.id, type: meal.type }))}
        onClose={() => setFoodDropdownDialog({ open: false, mealId: '' })}
        onAddFood={handleAddFoodFromDropdown}
      />

      {/* Food Selection Dialog */}
      <FoodSelectionDialog
        open={foodDialog.open}
        mealId={foodDialog.mealId}
        selectedFood={foodDialog.selectedFood}
        onClose={() => setFoodDialog({ open: false, mealId: '', selectedFood: null, grams: 100 })}
        onAddFood={handleAddFood}
      />

      {/* Note Dialog */}
      <Dialog open={noteDialog.open} onClose={() => setNoteDialog({ open: false, mealId: '', currentNote: '' })} maxWidth="sm" fullWidth
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper
          }
        }}
      >
        <DialogTitle sx={{ color: theme.palette.text.primary }}>Add Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={noteDialog.currentNote}
            onChange={(e) => setNoteDialog(prev => ({ ...prev, currentNote: e.target.value }))}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialog({ open: false, mealId: '', currentNote: '' })} sx={{ color: theme.palette.text.primary }}>
            Cancel
          </Button>
          <Button onClick={saveNote} variant="contained" sx={{ 
            bgcolor: theme.palette.success.main,
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light
            }
          }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    
  );
};

export default Mealplan;