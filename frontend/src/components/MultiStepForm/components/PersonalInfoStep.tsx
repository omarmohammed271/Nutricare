
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
import { StyledTextField, StyledSelect } from './StyledComponents';
import { personalInfoSchema } from '../validation/schemas';
import { StepProps } from '../types';
import type { PersonalInfoData } from '../validation/schemas';

interface PersonalInfoStepProps extends StepProps {
  data: PersonalInfoData;
  onDataChange: (data: Partial<PersonalInfoData>) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  data,
  onDataChange,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<PersonalInfoData>({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: data,
    mode: 'onBlur',
  });

  const handleFieldChange = (field: keyof PersonalInfoData, value: string) => {
    onDataChange({ [field]: value });
    // Trigger validation for the field
    setTimeout(() => trigger(field), 100);
  };

  const handleNextStep = () => {
    if (isValid) {
      onNext();
    } else {
      trigger(); // Trigger validation for all fields
    }
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#666' }}>
        Let's Personalize Your NutriCare Experience
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
        Tell us a bit about yourself to tailor the platform to your needs
      </Typography>

      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel sx={{ color: '#4CAF50', fontWeight: 500 }}>
                Gender *
              </InputLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <StyledSelect
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange('gender', e.target.value as string);
                    }}
                    label="Gender *"
                    error={!!errors.gender}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                  </StyledSelect>
                )}
              />
              {errors.gender && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                  {errors.gender.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="Country *"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('country', e.target.value);
                  }}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="Date of birth *"
                  type="date"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('dateOfBirth', e.target.value);
                  }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="mobilePhone"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="Mobile Phone *"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('mobilePhone', e.target.value);
                  }}
                  error={!!errors.mobilePhone}
                  helperText={errors.mobilePhone?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="workplace"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="Workplace *"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('workplace', e.target.value);
                  }}
                  error={!!errors.workplace}
                  helperText={errors.workplace?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="profession"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="Profession *"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('profession', e.target.value);
                  }}
                  error={!!errors.profession}
                  helperText={errors.profession?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="licenseNumber"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="License Number"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('licenseNumber', e.target.value);
                  }}
                  error={!!errors.licenseNumber}
                  helperText={errors.licenseNumber?.message || 'Required for medical professionals'}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};