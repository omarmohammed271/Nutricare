import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  IconButton,
  useTheme
} from '@mui/material';
import { MealType } from '../types';
import { getThemeColors, defaultMealTypes } from '../constants';

interface MealPlanCreationFormProps {
  calorieNeed: string;
  foodExcluded: string;
  mealTypes: MealType[];
  onCalorieNeedChange: (value: string) => void;
  onFoodExcludedChange: (value: string) => void;
  onMealTypeCountChange: (mealName: string, increment: boolean) => void;
}

const MealPlanCreationForm: React.FC<MealPlanCreationFormProps> = ({
  calorieNeed,
  foodExcluded,
  mealTypes,
  onCalorieNeedChange,
  onFoodExcludedChange,
  onMealTypeCountChange
}) => {
  const theme = useTheme();
  const themeColors = getThemeColors(theme);
  return (
    <Card 
      sx={{ 
        borderRadius: 2, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: `1px solid ${themeColors.border}`,
        mb: 3,
        bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : themeColors.background.paper
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: themeColors.text.primary }}>
          Create New Plan
        </Typography>
        
        <Grid container spacing={3}>
          {/* Calorie Need */}
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: themeColors.text.secondary }}>
              Calorie need
            </Typography>
            <TextField
              placeholder="Write"
              type="number"
              fullWidth
              value={calorieNeed}
              onChange={(e) => onCalorieNeedChange(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#FFFFFF',
                  borderRadius: 1,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                }
              }}
            />
          </Grid>

          {/* Food Excluded */}
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: themeColors.text.secondary }}>
              Food Excluded
            </Typography>
            <TextField
              placeholder="Write or select"
              fullWidth
              value={foodExcluded}
              onChange={(e) => onFoodExcludedChange(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#FFFFFF',
                  borderRadius: 1,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                }
              }}
            />
          </Grid>

          {/* Macronutrients Distribution */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: themeColors.text.secondary }}>
              Macronutrients Distribution %
            </Typography>
            
            <Grid container spacing={4}>
              {['Carbs', 'Proteins', 'Fats'].map((macro) => (
                <Grid item xs={12} md={4} key={macro}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}>
                      {macro}
                    </Typography>
                    <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                      10 %
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    width: '100%', 
                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#e0e0e0', 
                    borderRadius: 1, 
                    height: 8 
                  }}>
                    <Box sx={{ 
                      width: '10%', 
                      bgcolor: themeColors.primary, 
                      borderRadius: 1, 
                      height: 8 
                    }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Meal Counters */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: themeColors.text.secondary }}>
              Meal Types
            </Typography>
            
            <Grid container spacing={2}>
              {mealTypes.map((meal) => (
                <Grid item xs={6} md={3} key={meal.name}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 1.5,
                    border: `1px solid ${theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0'}`,
                    borderRadius: 1,
                    bgcolor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f8f9fa'
                  }}>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 500, 
                      fontSize: '0.875rem',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                    }}>
                      {meal.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => onMealTypeCountChange(meal.name, false)}
                        sx={{ 
                          bgcolor: themeColors.primary, 
                          color: 'white', 
                          width: 20, 
                          height: 20,
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? '#01A85A' : '#02BE6A'
                          }
                        }}
                      >
                        <Typography sx={{ fontSize: '0.75rem' }}>-</Typography>
                      </IconButton>
                      <Typography sx={{ 
                        minWidth: 16, 
                        textAlign: 'center', 
                        fontWeight: 600, 
                        fontSize: '0.875rem',
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                      }}>
                        {meal.count}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => onMealTypeCountChange(meal.name, true)}
                        sx={{ 
                          bgcolor: themeColors.primary, 
                          color: 'white', 
                          width: 20, 
                          height: 20,
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? '#01A85A' : '#02BE6A'
                          }
                        }}
                      >
                        <Typography sx={{ fontSize: '0.75rem' }}>+</Typography>
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MealPlanCreationForm;