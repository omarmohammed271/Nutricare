import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { RecipeFormData } from '../types/recipeTypes';
import { FORM_STYLES } from '../constants/recipeConstants';

interface CookingMethodSectionProps {
  control: Control<RecipeFormData>;
}

const CookingMethodSection: React.FC<CookingMethodSectionProps> = ({ control }) => {
  return (
    <Box>
      <Typography sx={FORM_STYLES.sectionTitle}>
        Cooking Method
      </Typography>
      
      <Box>
        <Typography sx={FORM_STYLES.formLabel}>Write method</Typography>
        <Controller
          name="cookingMethod"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              placeholder="Write cooking method here..."
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{
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
      </Box>
    </Box>
  );
};

export default CookingMethodSection;