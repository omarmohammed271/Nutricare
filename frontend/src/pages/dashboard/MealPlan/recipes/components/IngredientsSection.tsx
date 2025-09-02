import React from 'react';
import { Box, Typography, TextField, Button, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import { LuPlus, LuX } from 'react-icons/lu';
import { RecipeFormData } from '../types/recipeTypes';
import { FORM_STYLES } from '../constants/recipeConstants';

interface IngredientsSectionProps {
  control: Control<RecipeFormData>;
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const addIngredient = () => {
    append({ id: Date.now().toString(), name: '', quantity: '', unit: 'g' });
  };

  return (
    <Box>
      <Typography sx={FORM_STYLES.sectionTitle}>
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
                  <InputLabel>Ingredient Name</InputLabel>
                  <Select
                    {...inputField}
                    label="Ingredient Name"
                    displayEmpty
                    sx={{
                      backgroundColor: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E7EB',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                   
                    </MenuItem>
                    <MenuItem value="chicken">Chicken</MenuItem>
                    <MenuItem value="beef">Beef</MenuItem>
                    <MenuItem value="rice">Rice</MenuItem>
                    <MenuItem value="vegetables">Vegetables</MenuItem>
                    <MenuItem value="olive-oil">Olive Oil</MenuItem>
                    <MenuItem value="onion">Onion</MenuItem>
                    <MenuItem value="garlic">Garlic</MenuItem>
                    <MenuItem value="tomato">Tomato</MenuItem>
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
                      backgroundColor: 'white',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
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
                      backgroundColor: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E7EB',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22C55E',
                      },
                    }}
                  >
                    <MenuItem value="g">g</MenuItem>
                    <MenuItem value="kg">kg</MenuItem>
                    <MenuItem value="ml">ml</MenuItem>
                    <MenuItem value="l">l</MenuItem>
                    <MenuItem value="cup">cup</MenuItem>
                    <MenuItem value="tbsp">tbsp</MenuItem>
                    <MenuItem value="tsp">tsp</MenuItem>
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
                    backgroundColor: '#FEE2E2',
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