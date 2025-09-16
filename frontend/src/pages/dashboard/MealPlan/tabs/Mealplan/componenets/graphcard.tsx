import React from 'react';
import { Box, Card, CardContent, Typography, Grid, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { donutOptions, micronutrients } from '../constants/const';
import { NutritionSummary, MealData } from '../types';
import { calculateMacroPercentages, generateMacronutrientsTableData } from '../utils/nutritionCalculator';

interface GraphCardProps {
  nutritionSummary: NutritionSummary;
  targetCalories: number;
}


const GraphCard: React.FC<GraphCardProps> = ({ nutritionSummary, targetCalories = 2200 }) => {
  const theme = useTheme();
  const macroPercentages = calculateMacroPercentages(nutritionSummary);
  const macronutrientsTable = generateMacronutrientsTableData(nutritionSummary);
  
  // Nutrition data for donut chart
  const nutritionData = [
    macroPercentages.carbsPercent,
    macroPercentages.proteinPercent,
    macroPercentages.fatPercent,
    macroPercentages.fiberPercent
  ];
  const nutritionLabels = ['Carbs', 'Protein', 'Fat', 'Fiber'];
  const nutritionColors = [theme.palette.info.main, theme.palette.warning.main, theme.palette.success.main, theme.palette.secondary.main];
  
  const chartOptions = {
    ...donutOptions,
    labels: nutritionLabels,
    colors: nutritionColors,
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: false
          }
        }
      }
    }
  };

  // Macro data with actual values - using theme colors
  const macroData = [
    { 
      name: 'Carbs', 
      value: macroPercentages.carbsPercent, 
      calories: `${Math.round(nutritionSummary.totalCarbs * 4)} kcal`, 
      color: theme.palette.info.main 
    },
    { 
      name: 'Protein', 
      value: macroPercentages.proteinPercent, 
      calories: `${Math.round(nutritionSummary.totalProtein * 4)} kcal`, 
      color: theme.palette.warning.main 
    },
    { 
      name: 'Fat', 
      value: macroPercentages.fatPercent, 
      calories: `${Math.round(nutritionSummary.totalFat * 9)} kcal`, 
      color: theme.palette.success.main 
    },
    { 
      name: 'Fiber', 
      value: macroPercentages.fiberPercent, 
      calories: `${Math.round(nutritionSummary.totalFiber)} g`, 
      color: theme.palette.secondary.main 
    }
  ];

  // Calculate meal data for smaller charts
  const mealData = Object.entries(nutritionSummary.mealBreakdown).map(([mealType, nutrition]) => {
    const mealTotal = nutrition.calories;
    if (mealTotal === 0) {
      return { name: mealType.charAt(0).toUpperCase() + mealType.slice(1), data: [0, 0, 0, 0] };
    }
    
    const carbsCalories = nutrition.carbs * 4;
    const proteinCalories = nutrition.protein * 4;
    const fatCalories = nutrition.fat * 9;
    const totalMacroCalories = carbsCalories + proteinCalories + fatCalories;
    
    if (totalMacroCalories === 0) {
      return { name: mealType.charAt(0).toUpperCase() + mealType.slice(1), data: [0, 0, 0, 0] };
    }
    
    return {
      name: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      data: [
        Math.round((carbsCalories / totalMacroCalories) * 100),
        Math.round((proteinCalories / totalMacroCalories) * 100),
        Math.round((fatCalories / totalMacroCalories) * 100),
        Math.round((nutrition.fiber / (nutrition.carbs + nutrition.protein + nutrition.fat)) * 100) || 0
      ]
    };
  });

  const calorieProgress = Math.min((nutritionSummary.totalCalories / targetCalories) * 100, 100);
 

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        height: 'fit-content',
        backgroundColor: theme.palette.background.paper
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          Caloric & Macro Summary
        </Typography>
        
        {/* Energy Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: theme.palette.text.primary }}>
            Energy
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'right', fontWeight: 600, color: theme.palette.text.primary }}>
            {Math.round(nutritionSummary.totalCalories)}/{targetCalories} kcal
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={calorieProgress} 
            sx={{ 
              height: 12, 
              borderRadius: 6,
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#E0E0E0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: calorieProgress > 100 ? theme.palette.error.main : theme.palette.success.main
              }
            }} 
          />
        </Box>

        <Grid container spacing={3}>
          {/* Main Chart */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <ReactApexChart
                className="apex-charts"
                options={chartOptions}
                series={nutritionData}
                type="donut"
                height={200}
              />
            </Box>
          </Grid>

          {/* Macro Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pl: 2 }}>
              {macroData.map((macro, index) => (
                <Box key={macro.name} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 12, 
                          height: 12, 
                          borderRadius: '50%', 
                          backgroundColor: macro.color,
                          mr: 1
                        }} 
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                        {macro.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {macro.calories}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(macro.value * 2.5, 100)} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#E0E0E0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: macro.color
                      }
                    }} 
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Meals Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
            Meals
          </Typography>
          <Grid container spacing={2}>
            {mealData.map((meal, index) => (
              <Grid item xs={4} key={meal.name}>
                <Box sx={{ textAlign: 'center' }}>
                  <ReactApexChart
                    options={{
                      ...chartOptions,
                      legend: { show: false },
                      dataLabels: { enabled: false }
                    }}
                    series={meal.data}
                    type="donut"
                    height={120}
                  />
                  <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: theme.palette.text.primary }}>
                    {meal.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Micronutrients Distribution */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
            Micronutrients distribution
          </Typography>
          {micronutrients.map((micro, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                  {micro.name}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {micro.value} {micro.unit}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={micro.progress} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#E0E0E0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.success.main
                  }
                }} 
              />
            </Box>
          ))}
        </Box>

        {/* Macronutrients Table */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
            Macronutrients
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 1, borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.success.main }}>
                  <TableCell sx={{ color: theme.palette.success.contrastText, fontWeight: 600 }}>Meal</TableCell>
                  <TableCell sx={{ color: theme.palette.success.contrastText, fontWeight: 600 }}>Calories</TableCell>
                  <TableCell sx={{ color: theme.palette.success.contrastText, fontWeight: 600 }}>Protein</TableCell>
                  <TableCell sx={{ color: theme.palette.success.contrastText, fontWeight: 600 }}>Carbs</TableCell>
                  <TableCell sx={{ color: theme.palette.success.contrastText, fontWeight: 600 }}>Fats</TableCell>
                  <TableCell sx={{ color: theme.palette.success.contrastText, fontWeight: 600 }}>Supplements</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {macronutrientsTable.map((row, index) => (
                  <TableRow 
                    key={row.meal} 
                    sx={{ 
                      backgroundColor: index === macronutrientsTable.length - 1 
                        ? (theme.palette.mode === 'dark' ? theme.palette.success.dark + '30' : theme.palette.success.light + '40') 
                        : theme.palette.background.paper,
                      '&:nth-of-type(even)': {
                        backgroundColor: index === macronutrientsTable.length - 1 
                          ? (theme.palette.mode === 'dark' ? theme.palette.success.dark + '30' : theme.palette.success.light + '40') 
                          : (theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[50])
                      }
                    }}
                  >
                    <TableCell sx={{ fontWeight: index === macronutrientsTable.length - 1 ? 600 : 400, color: theme.palette.text.primary }}>
                      {row.meal}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{row.calories}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{row.protein}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{row.carbs}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{row.fats}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{row.supplements}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraphCard;