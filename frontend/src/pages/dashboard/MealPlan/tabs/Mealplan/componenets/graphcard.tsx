import React from 'react';
import { Box, Card, CardContent, Typography, Grid, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { donutOptions  ,  macronutrientsTable ,micronutrients ,mealData ,macroData} from '../constants/const';


const GraphCard = () => {
  // Nutrition data for donut chart
  const nutritionData = [35, 25, 30, 10]; // Carbs, Protein, Fat, Fiber percentages
  const nutritionLabels = ['Carbs', 'Protein', 'Fat', 'Fiber'];
  const nutritionColors = ['#FFAA7B', '#1BB394', '#3B82F6', '#6A7C92'];
  
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

  // Macro data with calories
 

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        height: 'fit-content',
        backgroundColor: '#F9F4F2'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: '#333',
          }}
        >
          Caloric & Macro Summary
        </Typography>
        
        {/* Energy Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Energy
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'right', fontWeight: 600 }}>
            1991/2228 kcal
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={89} 
            sx={{ 
              height: 12, 
              borderRadius: 6,
              backgroundColor: '#E0E0E0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#4CAF50'
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
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {macro.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {macro.calories}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={macro.value * 2.5} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      backgroundColor: '#E0E0E0',
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
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
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
                  <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                    {meal.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Micronutrients Distribution */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Micronutrients distribution
          </Typography>
          {micronutrients.map((micro, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {micro.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {micro.value} {micro.unit}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={micro.progress} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: '#E0E0E0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4CAF50'
                  }
                }} 
              />
            </Box>
          ))}
        </Box>

        {/* Macronutrients Table */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Macronutrients
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 1, borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#4CAF50' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Meal</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Calories</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Protein</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Carbs</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Fats</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Supplements</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {macronutrientsTable.map((row, index) => (
                  <TableRow 
                    key={row.meal} 
                    sx={{ 
                      backgroundColor: index === macronutrientsTable.length - 1 ? '#E8F5E8' : 'white',
                      '&:nth-of-type(even)': {
                        backgroundColor: index === macronutrientsTable.length - 1 ? '#E8F5E8' : '#F5F5F5'
                      }
                    }}
                  >
                    <TableCell sx={{ fontWeight: index === macronutrientsTable.length - 1 ? 600 : 400 }}>
                      {row.meal}
                    </TableCell>
                    <TableCell>{row.calories}</TableCell>
                    <TableCell>{row.protein}</TableCell>
                    <TableCell>{row.carbs}</TableCell>
                    <TableCell>{row.fats}</TableCell>
                    <TableCell>{row.supplements}</TableCell>
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