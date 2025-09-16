import React from 'react';
import { Box, Typography, TextField, useTheme } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { RecipeFormData } from '../types/recipeTypes';
import { FORM_STYLES } from '../constants/recipeConstants';

interface CookingMethodSectionProps {
  control: Control<RecipeFormData>;
}

const CookingMethodSection: React.FC<CookingMethodSectionProps> = ({ control }) => {
  const theme = useTheme();
  
  return (
    <Box>
      <Typography sx={{ 
        ...FORM_STYLES.sectionTitle,
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#1F2937'
      }}>
        Cooking Method
      </Typography>
      
      <Box>
        <Typography sx={{ 
          ...FORM_STYLES.formLabel,
          color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#374151'
        }}>
          Write method
        </Typography>
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
                '& .MuiFormHelperText-root': {
                  color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#000000',
                },
                '& textarea': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
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