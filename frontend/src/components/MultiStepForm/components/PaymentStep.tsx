
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  Chip,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
} from '@mui/material';
import { Business, CheckCircle } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledTextField } from './StyledComponents';
import { paymentInfoSchema } from '../validation/schemas';
import { StepProps, PAYMENT_PLANS } from '../types';
import type { PaymentInfoData } from '../validation/schemas';

interface PaymentStepProps extends StepProps {
  data: PaymentInfoData;
  onDataChange: (data: Partial<PaymentInfoData>) => void;
  onSubmit: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  data,
  onDataChange,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
  onSubmit,
}) => {
  const [showBillingForm, setShowBillingForm] = useState(false);
  
  const {
    control,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<PaymentInfoData>({
    resolver: yupResolver(paymentInfoSchema),
    defaultValues: data,
    mode: 'onBlur',
  });

  const billingPeriod = watch('billingPeriod');
  const membershipType = watch('membershipType');

  const handleFieldChange = (field: keyof PaymentInfoData, value: string) => {
    onDataChange({ [field]: value });
    setTimeout(() => trigger(field), 100);
  };

  const handleGetStarted = () => {
    setShowBillingForm(true);
  };

  const handleSubmit = () => {
    if (isValid) {
      onSubmit();
    } else {
      trigger();
    }
  };

  const businessPlan = PAYMENT_PLANS[0];
  const currentPrice = billingPeriod === 'yearly' ? businessPlan.yearlyPrice : businessPlan.monthlyPrice;

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      {!showBillingForm ? (
        // Show pricing selection
        <>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#4CAF50' }}>
            Last Step To Start Using Nutricare!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
            You Can Cancel Anytime Before The Trial Ends, No Payment Will Be Processed.
          </Typography>

          {/* Billing Period Toggle */}
          <Box sx={{ mb: 4 }}>
            <Controller
              name="billingPeriod"
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  {...field}
                  exclusive
                  onChange={(e, value) => {
                    if (value) {
                      field.onChange(value);
                      handleFieldChange('billingPeriod', value);
                      // Also update membershipType to match billingPeriod
                      handleFieldChange('membershipType', value);
                    }
                  }}
                  sx={{
                    '& .MuiToggleButton-root': {
                      borderColor: '#e0e0e0',
                      color: '#666',
                      '&.Mui-selected': {
                        backgroundColor: '#f5f5f5',
                        color: '#333',
                      },
                    },
                  }}
                >
                  <ToggleButton value="monthly">Monthly</ToggleButton>
                  <ToggleButton value="yearly">
                    Yearly
                    <Chip
                      label="Save 20%"
                      size="small"
                      sx={{ ml: 1, backgroundColor: '#E3F2FD', color: '#1976D2' }}
                    />
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            />
          </Box>

          {/* Pricing Card */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, #81C784 0%, #4CAF50 100%)',
              color: 'white',
              borderRadius: 2,
              p: 3,
              maxWidth: 400,
              mx: 'auto',
              mb: 4,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Business sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {businessPlan.name}
              </Typography>
              {businessPlan.recommended && (
                <Chip
                  label="Best Offer"
                  size="small"
                  sx={{
                    ml: 1,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                  }}
                />
              )}
            </Box>

            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Take Your Business to the Next Level with Business Plan.
            </Typography>

            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              ${currentPrice}
              <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                {billingPeriod === 'yearly' ? 'per month (billed annually)' : 'per month'}
              </Typography>
            </Typography>

            <Box sx={{ textAlign: 'left', mb: 3 }}>
              {businessPlan.features.slice(0, 6).map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <CheckCircle sx={{ fontSize: 16, mr: 1, opacity: 0.8 }} />
                  <Typography variant="body2" sx={{ fontSize: '14px' }}>
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={handleGetStarted}
              sx={{
                backgroundColor: 'white',
                color: '#4CAF50',
                fontWeight: 600,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              Get Started
            </Button>
          </Card>
        </>
      ) : (
        // Show billing form
        <>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#4CAF50' }}>
            Complete Your {billingPeriod === 'yearly' ? 'Annual' : 'Monthly'} Subscription
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
            Add your payment details to start your 7-day free trial
          </Typography>

      {/* Payment Form */}
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textDecoration: 'line-through' }}>
          ${billingPeriod === 'yearly' ? '$67.20' : '$56.00'} / {billingPeriod === 'yearly' ? 'Month' : 'Month'} / User
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: '#4CAF50', fontWeight: 500 }}>
          Get 7 Days of free trial for now, we will charge you {billingPeriod === 'yearly' ? 'annually' : 'monthly'} later.
        </Typography>

        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
          Add your card details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, color: '#666', fontWeight: 500 }}>
              Billed to *
            </Typography>
            <Controller
              name="billedTo"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  size="small"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('billedTo', e.target.value);
                  }}
                  error={!!errors.billedTo}
                  helperText={errors.billedTo?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, color: '#666', fontWeight: 500 }}>
              Selected Plan
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#4CAF50' }}>
              {billingPeriod === 'yearly' ? 'Annual Plan' : 'Monthly Plan'} - ${currentPrice}/month
              {billingPeriod === 'yearly' && ' (billed annually)'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="Card Number *"
                  placeholder="1234 5678 9012 3456"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('cardNumber', e.target.value);
                  }}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Box sx={{ width: 24, height: 16, backgroundColor: '#1976D2', borderRadius: 0.5 }} />
                          <Box sx={{ width: 24, height: 16, backgroundColor: '#f44336', borderRadius: 0.5 }} />
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="expiryDate"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="MM / YY *"
                  placeholder="12/34"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('expiryDate', e.target.value);
                  }}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="cvv"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="CVV *"
                  placeholder="123"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('cvv', e.target.value);
                  }}
                  error={!!errors.cvv}
                  helperText={errors.cvv?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 1, color: '#666', fontWeight: 500 }}>
              Country *
            </Typography>
            <Controller
              name="billingCountry"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  placeholder="United States"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('billingCountry', e.target.value);
                  }}
                  error={!!errors.billingCountry}
                  helperText={errors.billingCountry?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="Zip Code *"
                  placeholder="12345"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('zipCode', e.target.value);
                  }}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={onBack}
                sx={{
                  borderColor: '#4CAF50',
                  color: '#4CAF50',
                  fontWeight: 600,
                  py: 1.5,
                  px: 4,
                  '&:hover': {
                    borderColor: '#45a049',
                    backgroundColor: 'rgba(76, 175, 80, 0.04)',
                  },
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  fontWeight: 600,
                  py: 1.5,
                  px: 4,
                  '&:hover': {
                    backgroundColor: '#45a049',
                  },
                }}
              >
                Complete Registration
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 3, color: '#999', fontSize: '12px' }}>
          By clicking "Complete Registration", you agree to our Terms of Service and Privacy Policy.
          You will be charged after your 7-day free trial ends.
        </Typography>
      </Box>
        </>
      )}
    </Box>
  );
};