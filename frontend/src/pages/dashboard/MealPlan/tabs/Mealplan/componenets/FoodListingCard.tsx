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
  Chip,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { 
  Add as AddIcon,
  Delete as DeleteIcon 
} from '@mui/icons-material';
import { FoodItem, SelectedFood } from '../types';
import { foodDatabase } from '../data';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface FoodListingCardProps {
  onFoodSelect: (food: FoodItem, mealId?: string) => void;
  basketItems: SelectedFood[];
  onRemoveFromBasket: (foodId: number, mealId: string) => void;
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

const FoodListingCard: React.FC<FoodListingCardProps> = ({
  onFoodSelect,
  basketItems,
  onRemoveFromBasket
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredFoods = foodDatabase;

  const foodCategories = [
    { name: 'All Foods', foods: filteredFoods },
    { name: 'Proteins', foods: filteredFoods.filter(f => f.proteinPer100g > 15) },
    { name: 'Carbs', foods: filteredFoods.filter(f => f.carbsPer100g > 15) },
    { name: 'Healthy Fats', foods: filteredFoods.filter(f => f.fatPer100g > 10) },
    { name: 'Vegetables', foods: filteredFoods.filter(f => f.caloriesPer100g < 50 && f.fiberPer100g > 1) },
    { name: 'Fruits', foods: filteredFoods.filter(f => [15, 16, 17, 18].includes(f.id)) }
  ];

  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        mb: 3,
        backgroundColor: theme.palette.background.paper
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
                color: theme.palette.text.secondary,
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
            {/* Food Category Chips */}
            <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>              
              {foodCategories.map((category, index) => (
                <Chip 
                  key={category.name}
                  label={`${category.name} (${category.foods.length})`}
                  onClick={() => setSelectedCategory(index)}
                  sx={{ 
                    backgroundColor: selectedCategory === index ? '#81C784' : theme.palette.background.paper, 
                    color: selectedCategory === index ? 'white' : theme.palette.text.primary,
                    fontWeight: 600,
                    px: 2,
                    border: selectedCategory === index ? 'none' : `1px solid ${theme.palette.divider}`,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: selectedCategory === index ? '#66BB6A' : theme.palette.mode === 'dark' ? '#2d2d2d' : '#F5F5F5'
                    }
                  }} 
                />
              ))}
            </Box>

            {/* Food Items Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      border: 'none', 
                      pb: 1, 
                      width: '35%',
                      color: theme.palette.text.primary
                    }}>
                      Food Item
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      fontWeight: 600, 
                      border: 'none', 
                      pb: 1, 
                      width: '15%',
                      color: theme.palette.text.primary
                    }}>
                      Calories
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      fontWeight: 600, 
                      border: 'none', 
                      pb: 1, 
                      width: '15%',
                      color: theme.palette.text.primary
                    }}>
                      Protein
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      fontWeight: 600, 
                      border: 'none', 
                      pb: 1, 
                      width: '15%',
                      color: theme.palette.text.primary
                    }}>
                      Carbs
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      fontWeight: 600, 
                      border: 'none', 
                      pb: 1, 
                      width: '15%',
                      color: theme.palette.text.primary
                    }}>
                      Fat
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      fontWeight: 600, 
                      border: 'none', 
                      pb: 1, 
                      width: '5%',
                      color: theme.palette.text.primary
                    }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foodCategories[selectedCategory].foods.map((food) => (
                    <TableRow 
                      key={food.id} 
                      sx={{ 
                        '&:last-child td': { border: 0 },
                        '&:hover': { backgroundColor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#f8f9fa' },
                        cursor: 'pointer',
                        backgroundColor: theme.palette.background.paper
                      }}
                      onClick={() => onFoodSelect(food)}
                    >
                      {/* Food Item Name */}
                      <TableCell sx={{ border: 'none', py: 1.5, verticalAlign: 'middle' }}>
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
                          <Typography variant="body2" sx={{ 
                            fontWeight: 500, 
                            color: theme.palette.text.primary
                          }}>
                            {food.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      
                      {/* Nutritional Values per 100g */}
                      <TableCell align="center" sx={{ border: 'none', py: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                          {food.caloriesPer100g}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: theme.palette.text.secondary 
                        }}>
                          kcal/100g
                        </Typography>
                      </TableCell>
                      
                      <TableCell align="center" sx={{ border: 'none', py: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                          {food.proteinPer100g}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: theme.palette.text.secondary 
                        }}>
                          g/100g
                        </Typography>
                      </TableCell>
                      
                      <TableCell align="center" sx={{ border: 'none', py: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                          {food.carbsPer100g}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: theme.palette.text.secondary 
                        }}>
                          g/100g
                        </Typography>
                      </TableCell>
                      
                      <TableCell align="center" sx={{ border: 'none', py: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                          {food.fatPer100g}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: theme.palette.text.secondary 
                        }}>
                          g/100g
                        </Typography>
                      </TableCell>
                      
                      <TableCell align="center" sx={{ border: 'none', py: 1.5 }}>
                        <Tooltip title="Add to meal">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              onFoodSelect(food);
                            }}
                            sx={{ 
                              bgcolor: theme.palette.success.main, 
                              color: theme.palette.success.contrastText,
                              '&:hover': { bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light }
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            {foodCategories[selectedCategory].foods.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" sx={{ 
                  color: theme.palette.text.secondary 
                }}>
                  No foods found in this category.
                </Typography>
              </Box>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              fontWeight: 600,
              color: theme.palette.text.primary
            }}>
              Food Basket ({basketItems.length} items)
            </Typography>
            
            {basketItems.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        fontWeight: 600, 
                        border: 'none', 
                        pb: 1,
                        color: theme.palette.text.primary
                      }}>
                        Food Item
                      </TableCell>
                      <TableCell align="center" sx={{ 
                        fontWeight: 600, 
                        border: 'none', 
                        pb: 1,
                        color: theme.palette.text.primary
                      }}>
                        Amount
                      </TableCell>
                      <TableCell align="center" sx={{ 
                        fontWeight: 600, 
                        border: 'none', 
                        pb: 1,
                        color: theme.palette.text.primary
                      }}>
                        Calories
                      </TableCell>
                      <TableCell align="center" sx={{ 
                        fontWeight: 600, 
                        border: 'none', 
                        pb: 1,
                        color: theme.palette.text.primary
                      }}>
                        Meal
                      </TableCell>
                      <TableCell align="center" sx={{ 
                        fontWeight: 600, 
                        border: 'none', 
                        pb: 1,
                        color: theme.palette.text.primary
                      }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {basketItems.map((item, index) => {
                      const food = foodDatabase.find(f => f.id === item.foodId);
                      return (
                        <TableRow 
                          key={`${item.foodId}-${item.mealId}-${index}`}
                          sx={{ 
                            backgroundColor: theme.palette.background.paper
                          }}
                        >
                          <TableCell sx={{ border: 'none', py: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar 
                                sx={{ 
                                  width: 32, 
                                  height: 32,
                                  backgroundColor: food?.color + '20' || '#e0e0e0',
                                  fontSize: '1rem'
                                }}
                              >
                                {food?.icon || '🍽️'}
                              </Avatar>
                              <Typography variant="body2" sx={{ 
                                fontWeight: 500,
                                color: theme.palette.text.primary
                              }}>
                                {item.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center" sx={{ border: 'none', py: 1.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                              {item.grams}g
                            </Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ border: 'none', py: 1.5 }}>
                            <Typography variant="body2" sx={{ 
                              fontWeight: 600, 
                              color: theme.palette.success.main 
                            }}>
                              {item.calories} kcal
                            </Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ border: 'none', py: 1.5 }}>
                            <Chip 
                              label={item.mealId.replace(/-.+/, '').replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^\w/, c => c.toUpperCase())}
                              size="small"
                              sx={{ 
                                bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark + '20' : theme.palette.success.light + '40',
                                color: theme.palette.success.main,
                                fontWeight: 500,
                                border: `1px solid ${theme.palette.success.main}`
                              }}
                            />
                          </TableCell>
                          <TableCell align="center" sx={{ border: 'none', py: 1.5 }}>
                            <Tooltip title="Remove from basket">
                              <IconButton
                                size="small"
                                onClick={() => onRemoveFromBasket(item.foodId, item.mealId)}
                                sx={{ 
                                  color: theme.palette.error.main,
                                  '&:hover': { 
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.error.dark + '20' : theme.palette.error.light + '40' 
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6" sx={{ 
                  mb: 1,
                  color: theme.palette.text.secondary
                }}>
                  Your basket is empty
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.text.secondary
                }}>
                  Add foods from the Food Listing tab to see them here
                </Typography>
              </Box>
            )}
          </Box>
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default FoodListingCard;