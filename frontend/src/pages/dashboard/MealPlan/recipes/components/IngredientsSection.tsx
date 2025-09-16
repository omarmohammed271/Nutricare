import React from 'react';
import { Box, Typography, TextField, Button, IconButton, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import { LuPlus, LuX } from 'react-icons/lu';
import { RecipeFormData } from '../types/recipeTypes';
import { FORM_STYLES } from '../constants/recipeConstants';

interface IngredientsSectionProps {
  control: Control<RecipeFormData>;
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ control }) => {
  const theme = useTheme();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const addIngredient = () => {
    append({ id: Date.now().toString(), name: '', quantity: '', unit: 'g' });
  };

  return (
    <Box>
      <Typography sx={{ 
        ...FORM_STYLES.sectionTitle,
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#1F2937'
      }}>
        Ingredients
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {/* Ingredient Name */}
            <Controller
              name={`ingredients.${index}.name`}
              control={control}
              render={({ field: inputField }) => (
                <FormControl sx={{ minWidth: 200, flex: 2 }}>
                  <InputLabel 
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#000000',
                      '&.Mui-focused': {
                        color: '#22C55E',
                      }
                    }}
                  >
                    Ingredient Name
                  </InputLabel>
                  <Select
                    {...inputField}
                    label="Ingredient Name"
                    displayEmpty
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : 'white',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'dark' ? '#404040' : '#E5E7EB',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                      '& .MuiSvgIcon-root': {
                        color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#000000',
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                   
                    </MenuItem>
                    <MenuItem 
                      value="chicken"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      Chicken
                    </MenuItem>
                    <MenuItem 
                      value="beef"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      Beef
                    </MenuItem>
                    <MenuItem 
                      value="rice"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      Rice
                    </MenuItem>
                    <MenuItem 
                      value="vegetables"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      Vegetables
                    </MenuItem>
                    <MenuItem 
                      value="olive-oil"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      Olive Oil
                    </MenuItem>
                    <MenuItem 
                      value="onion"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      Onion
                    </MenuItem>
                    <MenuItem 
                      value="garlic"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      Garlic
                    </MenuItem>
                    <MenuItem 
                      value="tomato"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      Tomato
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            
            {/* Quantity Input */}
            <Controller
              name={`ingredients.${index}.quantity`}
              control={control}
              render={({ field: inputField }) => (
                <TextField
                  {...inputField}
                  placeholder="100"
                  type="number"
                  size="small"
                  sx={{
                    flex: 1,
                    minWidth: 80,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : 'white',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'dark' ? '#404040' : '#E5E7EB',
                      },
                    },
                    '& input': {
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                  }}
                />
              )}
            />
            
            {/* Unit Selector */}
            <Controller
              name={`ingredients.${index}.unit`}
              control={control}
              render={({ field: inputField }) => (
                <FormControl sx={{ minWidth: 80 }}>
                  <Select
                    {...inputField}
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : 'white',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'dark' ? '#404040' : '#E5E7EB',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                      '& .MuiSvgIcon-root': {
                        color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#000000',
                      },
                    }}
                  >
                    <MenuItem 
                      value="g"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      g
                    </MenuItem>
                    <MenuItem 
                      value="kg"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      kg
                    </MenuItem>
                    <MenuItem 
                      value="ml"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      ml
                    </MenuItem>
                    <MenuItem 
                      value="l"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      l
                    </MenuItem>
                    <MenuItem 
                      value="cup"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      cup
                    </MenuItem>
                    <MenuItem 
                      value="tbsp"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      tbsp
                    </MenuItem>
                    <MenuItem 
                      value="tsp"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
                        },
                      }}
                    >
                      tsp
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            
            {fields.length > 1 && (
              <IconButton
                onClick={() => remove(index)}
                sx={{
                  color: '#EF4444',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#FEE2E2',
                  },
                }}
              >
                <LuX size={20} />
              </IconButton>
            )}
          </Box>
        ))}
        
        <Button
          variant="contained"
          startIcon={<LuPlus size={20} />}
          onClick={addIngredient}
          sx={FORM_STYLES.addButton}
        >
          <LuPlus size={20} />
        </Button>
      </Box>
    </Box>
  );
};

export default IngredientsSection;