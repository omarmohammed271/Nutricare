import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Tabs, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Avatar,
  Chip
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface MealNutrition {
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
}

interface FoodItem {
  id: number;
  name: string;
  icon: string;
  color: string;
  breakfast: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  lunch: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  dinner: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`food-tabpanel-${index}`}
      aria-labelledby={`food-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const FoodListingCard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMealChange = (meal: 'breakfast' | 'lunch' | 'dinner') => {
    setSelectedMeal(meal);
  };

  // Food items data with different values for each meal
  const foodItems: FoodItem[] = [
    {
      id: 1,
      name: 'Red Meat',
      icon: '🥩',
      color: '#FF6B6B',
      breakfast: { calories: 350, carbs: 5, protein: 45, fat: 18 },
      lunch: { calories: 450, carbs: 8, protein: 52, fat: 22 },
      dinner: { calories: 380, carbs: 6, protein: 48, fat: 20 }
    },
    {
      id: 2,
      name: 'Eggs',
      icon: '🥚',
      color: '#FFD93D',
      breakfast: { calories: 280, carbs: 2, protein: 25, fat: 18 },
      lunch: { calories: 320, carbs: 3, protein: 28, fat: 20 },
      dinner: { calories: 300, carbs: 2, protein: 26, fat: 19 }
    },
    {
      id: 3,
      name: 'Fruits',
      icon: '🍎',
      color: '#FF8C42',
      breakfast: { calories: 180, carbs: 45, protein: 2, fat: 1 },
      lunch: { calories: 150, carbs: 38, protein: 1, fat: 0 },
      dinner: { calories: 120, carbs: 30, protein: 1, fat: 0 }
    },
    {
      id: 4,
      name: 'Bread',
      icon: '🍞',
      color: '#D2691E',
      breakfast: { calories: 320, carbs: 65, protein: 12, fat: 4 },
      lunch: { calories: 280, carbs: 55, protein: 10, fat: 3 },
      dinner: { calories: 200, carbs: 40, protein: 8, fat: 2 }
    },
    {
      id: 5,
      name: 'Vegetables',
      icon: '🥬',
      color: '#4ECDC4',
      breakfast: { calories: 80, carbs: 18, protein: 4, fat: 1 },
      lunch: { calories: 120, carbs: 25, protein: 6, fat: 2 },
      dinner: { calories: 150, carbs: 30, protein: 8, fat: 3 }
    },
    {
      id: 6,
      name: 'White Meat',
      icon: '🍗',
      color: '#F8E71C',
      breakfast: { calories: 250, carbs: 0, protein: 35, fat: 12 },
      lunch: { calories: 380, carbs: 2, protein: 48, fat: 18 },
      dinner: { calories: 420, carbs: 3, protein: 52, fat: 20 }
    }
  ];

  const macroColumns = [
    {key : 'calories' , label: 'calories' ,unit :'kcal'},
    { key: 'carbs', label: 'Carbs', unit: 'gm' },
    { key: 'protein', label: 'Protein', unit: 'gm' },
    { key: 'fat', label: 'Fat', unit: 'gm' }
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        mb: 3,
        backgroundColor: '#FAFAFA'
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minWidth: 'auto',
                px: 3,
                py: 1.5,
                borderRadius: '25px',
                mr: 1,
                color: '#666',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: '#4CAF50'
                }
              },
              '& .MuiTabs-indicator': {
                display: 'none'
              }
            }}
          >
            <Tab label="Food Listing" />
            <Tab label="Food Basket" />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3, pb: 3 }}>
            {/* Meal Type Chips */}
            <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
              <Chip 
                label="Breakfast" 
                onClick={() => handleMealChange('breakfast')}
                sx={{ 
                  backgroundColor: selectedMeal === 'breakfast' ? '#81C784' : 'transparent', 
                  color: selectedMeal === 'breakfast' ? 'white' : '#666',
                  fontWeight: 600,
                  px: 2,
                  border: selectedMeal === 'breakfast' ? 'none' : '1px solid #E0E0E0',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: selectedMeal === 'breakfast' ? '#66BB6A' : '#F5F5F5'
                  }
                }} 
              />
              <Chip 
                label="Lunch" 
                onClick={() => handleMealChange('lunch')}
                sx={{ 
                  backgroundColor: selectedMeal === 'lunch' ? '#81C784' : 'transparent', 
                  color: selectedMeal === 'lunch' ? 'white' : '#666',
                  fontWeight: 600,
                  px: 2,
                  border: selectedMeal === 'lunch' ? 'none' : '1px solid #E0E0E0',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: selectedMeal === 'lunch' ? '#66BB6A' : '#F5F5F5'
                  }
                }} 
              />
              <Chip 
                label="Dinner" 
                onClick={() => handleMealChange('dinner')}
                sx={{ 
                  backgroundColor: selectedMeal === 'dinner' ? '#81C784' : 'transparent', 
                  color: selectedMeal === 'dinner' ? 'white' : '#666',
                  fontWeight: 600,
                  px: 2,
                  border: selectedMeal === 'dinner' ? 'none' : '1px solid #E0E0E0',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: selectedMeal === 'dinner' ? '#66BB6A' : '#F5F5F5'
                  }
                }} 
              />
            </Box>

            {/* Food Items Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, border: 'none', pb: 1, width: '40%' }}>
                      {/* Empty header for food items */}
                    </TableCell>
                    {macroColumns.map((macro) => (
                      <TableCell 
                        key={macro.key} 
                        align="center" 
                        sx={{ fontWeight: 600, border: 'none', pb: 1, color: '#666', width: '20%' }}
                      >
                        {macro.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foodItems.map((food) => (
                    <TableRow key={food.id} sx={{ '&:last-child td': { border: 0 } }}>
                      {/* Food Item Name with Calories */}
                      <TableCell sx={{ border: 'none', py: 1.5, verticalAlign: 'middle' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar 
                              sx={{ 
                                width: 32, 
                                height: 32,
                                backgroundColor: food.color + '20',
                                fontSize: '1rem'
                              }}
                            >
                              {food.icon}
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                              {food.name}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 700, 
                                color: '#333',
                                fontSize: '1rem',
                                lineHeight: 1
                              }}
                            >
                              {food[selectedMeal].calories}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: '#999', 
                                fontSize: '0.7rem',
                                fontWeight: 500
                              }}
                            >
                              kcal
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      
                      {/* Macro Columns */}
                      {macroColumns.map((macro) => (
                        <TableCell key={macro.key} align="center" sx={{ border: 'none', py: 1.5, verticalAlign: 'middle' }}>
                          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Main Value */}
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 700, 
                                color: '#333',
                                fontSize: '1.1rem',
                                lineHeight: 1,
                                mb: 0.5
                              }}
                            >
                              {food[selectedMeal][macro.key as keyof typeof food[typeof selectedMeal]]}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: '#999', 
                                fontSize: '0.75rem',
                                fontWeight: 500
                              }}
                            >
                              {macro.unit}
                            </Typography>
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 3, textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              Food Basket content will be displayed here
            </Typography>
          </Box>
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default FoodListingCard;