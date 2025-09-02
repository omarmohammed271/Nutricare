import React from 'react';
import { Box, Typography, TextField, FormControl, Select, MenuItem, Chip, OutlinedInput } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { RecipeFormData } from '../types/recipeTypes';
import { TAG_OPTIONS, FORM_STYLES } from '../constants/recipeConstants';

interface BasicInformationSectionProps {
  control: Control<RecipeFormData>;
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({ control }) => {
  return (
    <Box>
      <Typography sx={FORM_STYLES.sectionTitle}>
        Basic Information
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Recipe Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ ...FORM_STYLES.formLabel, minWidth: '120px', mb: 0 }}>Recipe Name</Typography>
          <Controller
            name="recipeName"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="Enter the name of the recipe"
                fullWidth
                variant="outlined"
                size="small"
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

        {/* Select Tags */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ ...FORM_STYLES.formLabel, minWidth: '120px', mb: 0 }}>Select tags</Typography>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <Select
                  {...field}
                  multiple
                  displayEmpty
                  size="small"
                  input={<OutlinedInput />}
                  placeholder="Write or select"
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em style={{ color: '#9CA3AF' }}>Write or select</em>;
                    }
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={TAG_OPTIONS.find(tag => tag.value === value)?.label || value}
                            size="small"
                            sx={{
                              backgroundColor: '#E5F7ED',
                              color: '#22C55E',
                              '& .MuiChip-deleteIcon': {
                                color: '#22C55E',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    );
                  }}
                  sx={{
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
                  {TAG_OPTIONS.map((tag) => (
                    <MenuItem key={tag.value} value={tag.value}>
                      {tag.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Box>

        {/* Final Weight */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ ...FORM_STYLES.formLabel, minWidth: '120px', mb: 0 }}>Final Weight</Typography>
          <Controller
            name="finalWeight"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="Enter the final weight of the recipe"
                fullWidth
                variant="outlined"
                size="small"
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

        {/* Description */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 8}} >
          <Typography sx={FORM_STYLES.formLabel}>Description</Typography>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}

                placeholder="Right the description"
                fullWidth
                multiline
               
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
                    width:'100%',
                 
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Number of portions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ ...FORM_STYLES.formLabel, minWidth: '120px', mb: 0 }}>Number of portions</Typography>
          <Controller
            name="numberOfPortions"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="Enter number of portions"
                fullWidth
                variant="outlined"
                size="small"
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

        {/* Weight of portions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ ...FORM_STYLES.formLabel, minWidth: '120px', mb: 0 }}>Weight of portions</Typography>
          <Controller
            name="weightOfPortions"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="Enter weight of portions"
                fullWidth
                variant="outlined"
                size="small"
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
    </Box>
  );
};

export default BasicInformationSection;