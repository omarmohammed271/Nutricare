
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSelect, ClientButton } from './StyledComponents';
import { professionalPreferencesSchema } from '../validation/schemas';
import { StepProps } from '../types';
import type { ProfessionalPreferencesData } from '../validation/schemas';

interface ProfessionalPreferencesStepProps extends StepProps {
  data: ProfessionalPreferencesData;
  onDataChange: (data: Partial<ProfessionalPreferencesData>) => void;
}

export const ProfessionalPreferencesStep: React.FC<ProfessionalPreferencesStepProps> = ({
  data,
  onDataChange,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}) => {
  const {
    control,
    formState: { errors, isValid },
    trigger,
  } = useForm<ProfessionalPreferencesData>({
    resolver: yupResolver(professionalPreferencesSchema),
    defaultValues: data,
    mode: 'onBlur',
  });

  const handleFieldChange = (field: keyof ProfessionalPreferencesData, value: string) => {
    onDataChange({ [field]: value });
    setTimeout(() => trigger(field), 100);
  };

  const handleNextStep = () => {
    if (isValid) {
      onNext();
    } else {
      trigger();
    }
  };

  const clientOptions = ['No clients', 'Up to 10', 'Up to 25', 'More than 25'];

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#666' }}>
        Let's Personalize Your NutriCare Experience
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
        You're one minute away from your free Nutricare Trail!
      </Typography>

      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.lookingFor}>
          <InputLabel sx={{ color: '#4CAF50', fontWeight: 500 }}>
            What are you looking for in Nutricare? *
          </InputLabel>
          <Controller
            name="lookingFor"
            control={control}
            render={({ field }) => (
              <StyledSelect
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleFieldChange('lookingFor', e.target.value as string);
                }}
                label="What are you looking for in Nutricare? *"
                error={!!errors.lookingFor}
              >
                <MenuItem value="assessment">Nutrition Assessment Tools</MenuItem>
                <MenuItem value="planning">Meal Planning</MenuItem>
                <MenuItem value="tracking">Progress Tracking</MenuItem>
                <MenuItem value="education">Client Education</MenuItem>
              </StyledSelect>
            )}
          />
          {errors.lookingFor && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
              {errors.lookingFor.message}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 4 }} error={!!errors.casesHandle}>
          <InputLabel sx={{ color: '#4CAF50', fontWeight: 500 }}>
            Which types of cases do you handle most often? *
          </InputLabel>
          <Controller
            name="casesHandle"
            control={control}
            render={({ field }) => (
              <StyledSelect
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleFieldChange('casesHandle', e.target.value as string);
                }}
                label="Which types of cases do you handle most often? *"
                error={!!errors.casesHandle}
              >
                <MenuItem value="weight-management">Weight Management</MenuItem>
                <MenuItem value="diabetes">Diabetes Management</MenuItem>
                <MenuItem value="sports-nutrition">Sports Nutrition</MenuItem>
                <MenuItem value="clinical-nutrition">Clinical Nutrition</MenuItem>
              </StyledSelect>
            )}
          />
          {errors.casesHandle && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
              {errors.casesHandle.message}
            </Typography>
          )}
        </FormControl>

        <Box sx={{ mb: 4 }}>
          <Typography sx={{ mb: 2, color: '#4CAF50', fontWeight: 500, textAlign: 'left' }}>
            Average number of clients per month: *
          </Typography>
          {errors.clientsPerMonth && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1, textAlign: 'left' }}>
              {errors.clientsPerMonth.message}
            </Typography>
          )}
          <Grid container spacing={2}>
            {clientOptions.map((option) => (
              <Grid item xs={6} sm={3} key={option}>
                <ClientButton
                  variant="outlined"
                  fullWidth
                  className={data.clientsPerMonth === option ? 'selected' : ''}
                  onClick={() => handleFieldChange('clientsPerMonth', option)}
                  sx={{
                    borderColor: errors.clientsPerMonth ? '#f44336' : '#4CAF50',
                  }}
                >
                  {option}
                </ClientButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};