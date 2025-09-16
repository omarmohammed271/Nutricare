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
  Chip
} from '@mui/material';
import { AssessmentData } from '../types';
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
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ formData, onInputChange }) => {
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
                backgroundColor: '#FFFFFF'
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
          <TextField
            placeholder="Enter Gender"
            value={formData.gender}
            onChange={onInputChange('gender')}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FFFFFF'
              }
            }}
          />
        </Box>
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
                backgroundColor: '#FFFFFF'
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
                backgroundColor: '#FFFFFF'
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
                backgroundColor: '#FFFFFF'
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
              value={formData.weightTypeSelection}
              onChange={onInputChange('weightTypeSelection')}
              sx={{
                backgroundColor: '#FFFFFF'
              }}
            >
              {weightTypeOptions.map((option) => (
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
        { label: 'Physical Activity', field: 'physicalActivity', options: physicalActivityOptions },
        { label: 'Stress Factor', field: 'stressFactor', options: stressFactorOptions },
        { label: 'Ward', field: 'ward', options: wardOptions },
        { label: 'Diagnosis', field: 'diagnosis', options: diagnosisOptions }
      ].map((item) => (
        <Grid item xs={12} key={item.field}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, minWidth: '20%' }}>
              {item.label}
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Write or select</InputLabel>
              <Select
                value={formData[item.field as keyof AssessmentData]}
                onChange={onInputChange(item.field as keyof AssessmentData)}
                sx={{
                  backgroundColor: '#FFFFFF'
                }}
              >
                {item.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      ))}

      {/* Type of Feeding */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
          Type of Feeding
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {typeOfFeedingOptions.map((type) => (
            <Chip
              key={type.value}
              label={type.label}
              clickable
              variant={formData.typeOfFeeding === type.value ? 'filled' : 'outlined'}
              onClick={() => onInputChange('typeOfFeeding')({ target: { value: type.value } })}
              sx={{
                backgroundColor: formData.typeOfFeeding === type.value ? '#02BE6A' : 'transparent',
                color: formData.typeOfFeeding === type.value ? 'white' : '#02BE6A',
                borderColor: '#02BE6A',
                '&:hover': {
                  backgroundColor: formData.typeOfFeeding === type.value ? '#01A85A' : 'rgba(2, 190, 106, 0.1)'
                }
              }}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AssessmentForm;