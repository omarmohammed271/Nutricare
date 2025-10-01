import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  useTheme,
  CircularProgress,
  Alert
} from '@mui/material';
import { AssessmentData } from '../types';
import { useClientChoices } from '@src/hooks';
import {
  weightTypeOptions,
  physicalActivityOptions,
  stressFactorOptions,
  wardOptions,
  diagnosisOptions,
  typeOfFeedingOptions
} from '../constants';

interface AssessmentFormProps {
  formData: AssessmentData;
  onInputChange: (field: keyof AssessmentData) => (event: any) => void;
  validationErrors?: Record<string, string>;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ formData, onInputChange, validationErrors = {} }) => {
  const theme = useTheme();
  const { choices, loading, error } = useClientChoices();

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading choices...</Typography>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Failed to load choices: {error}
      </Alert>
    );
  }

  // Use API choices if available, fallback to constants
  const weightTypeOptionsToUse = weightTypeOptions; // Keep static for now since API doesn't include this
  const physicalActivityOptionsToUse = choices?.physical_activity || physicalActivityOptions;
  const stressFactorOptionsToUse = choices?.stress_factor || stressFactorOptions;
  const wardOptionsToUse = choices?.ward_type || wardOptions;
  const typeOfFeedingOptionsToUse = choices?.feeding_type || typeOfFeedingOptions;
  const genderOptionsToUse = choices?.gender || [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }];

  return (
    <Grid container spacing={3}>
      {/* Name Field */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, minWidth: '20%' }}>
            Name *
          </Typography>
          <TextField
            placeholder="Enter Name"
            value={formData.name}
            onChange={onInputChange('name')}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }
            }}
          />
        </Box>
      </Grid>

      {/* Gender Field */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, minWidth: '20%' }}>
            Gender*
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Select Gender</InputLabel>
            <Select
              value={formData.gender || ''}
              onChange={onInputChange('gender')}
              error={!!validationErrors.gender}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }}
            >
              {genderOptionsToUse.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {validationErrors.gender && (
          <Typography variant="caption" color="error" sx={{ ml: '20%', mt: 0.5, display: 'block' }}>
            {validationErrors.gender}
          </Typography>
        )}
      </Grid>

      {/* Date of Birth */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, minWidth: '20%' }}>
            Date of Birth*
          </Typography>
          <TextField
            type="date"
            placeholder="Date of birth"
            value={formData.dateOfBirth}
            onChange={onInputChange('dateOfBirth')}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }
            }}
          />
        </Box>
      </Grid>

      {/* Weight */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, minWidth: '20%' }}>
            Weight *
          </Typography>
          <TextField
            placeholder="Enter your Weight kg"
            value={formData.weight}
            onChange={onInputChange('weight')}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }
            }}
            InputProps={{
              endAdornment: <Typography sx={{ color: '#02BE6A', fontWeight: 600 }}>kg ↔ lbs</Typography>
            }}
          />
        </Box>
      </Grid>

      {/* Height */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, minWidth: '20%' }}>
            Height
          </Typography>
          <TextField
            placeholder="Enter your Height cm"
            value={formData.height}
            onChange={onInputChange('height')}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }
            }}
            InputProps={{
              endAdornment: <Typography sx={{ color: '#02BE6A', fontWeight: 600 }}>cm ↔ inch</Typography>
            }}
          />
        </Box>
      </Grid>

      {/* Weight Type Selection */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, minWidth: '20%' }}>
            Weight Type Selection
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Which weight type do you want to use on the equation?</InputLabel>
            <Select
              value={formData.weightTypeSelection || ''}
              onChange={onInputChange('weightTypeSelection')}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }}
            >
              {weightTypeOptionsToUse.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>

      {/* BMI Display */}
      <Grid item xs={12}>
        <Box sx={{ 
          p: 2, 
          border: '2px solid #02BE6A', 
          borderRadius: 2, 
          textAlign: 'center',
          bgcolor: 'rgba(2, 190, 106, 0.1)'
        }}>
          <Typography variant="body1" sx={{ color: '#02BE6A', fontWeight: 600 }}>
            BMI: 22.4 kg/m² — Normal
          </Typography>
        </Box>
      </Grid>

      {/* Dropdown Fields */}
      {[
        { label: 'Physical Activity', field: 'physicalActivity', options: physicalActivityOptionsToUse },
        { label: 'Stress Factor', field: 'stressFactor', options: stressFactorOptionsToUse },
        { label: 'Ward Type', field: 'wardType', options: wardOptionsToUse },
        { label: 'Type of Feeding', field: 'feedingType', options: typeOfFeedingOptionsToUse }
      ].map((item) => (
        <Grid item xs={12} key={item.field}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, minWidth: '20%' }}>
              {item.label}
            </Typography>
            <FormControl fullWidth size="small" error={!!validationErrors[item.field]}>
              <InputLabel>Write or select</InputLabel>
              <Select
                value={formData[item.field as keyof AssessmentData] || ''}
                onChange={onInputChange(item.field as keyof AssessmentData)}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF',
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                }}
              >
                {item.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors[item.field] && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {validationErrors[item.field]}
                </Typography>
              )}
            </FormControl>
          </Box>
        </Grid>
      ))}

    </Grid>
  );
};

export default AssessmentForm;