import React, { useCallback, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Close, CheckCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { HttpClient } from '@src/helpers';

import logo from '@src/assets/images/nutricare-logo.svg';
import {
  PersonalInfoStep,
  ProfessionalPreferencesStep,
  PaymentStep,
  StepNavigation,
} from './components';

// Simple working MultiStepForm Container with actual form logic
const MultiStepFormContainer: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  // Form state
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    gender: '',
    country: '',
    dateOfBirth: '',
    mobilePhone: '',
    workplace: '',
    profession: '',
    licenseNumber: '',
    
    // Step 2: Professional Preferences
    lookingFor: '',
    casesHandle: '',
    clientsPerMonth: '',
    
    // Step 3: Payment
    billingPeriod: 'yearly',
    billedTo: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingCountry: '',
    zipCode: '',
    membershipType: 'yearly',
  });

  const steps = ['Personal Info', 'Professional Details', 'Billing'];
  const totalSteps = steps.length;

  const handleClose = () => {
    navigate('/');
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (activeStep === 0 && !validateStep1()) {
      enqueueSnackbar('Please fill in all required fields in Personal Information', { variant: 'warning' });
      return;
    }
    
    if (activeStep === 1 && !validateStep2()) {
      enqueueSnackbar('Please fill in all required fields in Professional Preferences', { variant: 'warning' });
      return;
    }
    
    // If on step 2, submit registration data to backend before going to step 3
    if (activeStep === 1) {
      handleSubmit().then(() => {
        // Only proceed to next step if registration was successful
        if (activeStep < totalSteps - 1) {
          setActiveStep(prev => prev + 1);
        }
      }).catch(() => {
        // Don't proceed if registration failed
        console.log('Registration failed, staying on current step');
      });
    } else {
      // For step 1, just proceed normally
      if (activeStep < totalSteps - 1) {
        setActiveStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Submit user registration data (steps 1 & 2)
      const registrationData = {
        personalInfo: {
          gender: formData.gender,
          country: formData.country,
          dateOfBirth: formData.dateOfBirth,
          mobilePhone: formData.mobilePhone,
          workplace: formData.workplace,
          profession: formData.profession,
          licenseNumber: formData.licenseNumber,
        },
        preferences: {
          lookingFor: formData.lookingFor,
          casesHandle: formData.casesHandle,
          clientsPerMonth: formData.clientsPerMonth,
        }
      };
      
      console.log('User registration data:', registrationData);
      // TODO: Replace with actual API call
      // const response = await HttpClient.post('/api/register-user', registrationData);
      
      enqueueSnackbar('Registration data saved successfully!', { variant: 'success' });
      return Promise.resolve(); // Return resolved promise for the .then() in handleNext
    } catch (error) {
      enqueueSnackbar('Registration failed. Please try again.', { variant: 'error' });
      return Promise.reject(error); // Return rejected promise for the .catch() in handleNext
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      // Submit payment/billing data separately
      const paymentData = {
        billingPeriod: formData.billingPeriod,
        billedTo: formData.billedTo,
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        billingCountry: formData.billingCountry,
        zipCode: formData.zipCode,
        membershipType: formData.membershipType,
      };
      
      console.log('Payment data:', paymentData);
      // TODO: Replace with actual payment API call
      // const response = await HttpClient.post('/api/process-payment', paymentData);
      
      enqueueSnackbar('Payment processed successfully!', { variant: 'success' });
      navigate('/ecommerce');
    } catch (error) {
      enqueueSnackbar('Payment processing failed. Please try again.', { variant: 'error' });
    }
  };

  const handleGetStarted = () => {
    // This should not be used anymore since step 2 uses handleNext
    console.log('handleGetStarted called - this should not happen');
  };

  const handleSkipBilling = () => {
    // If billing form is completed, don't allow skipping - force payment
    if (validateBillingForm()) {
      enqueueSnackbar('Please complete your payment to continue', { variant: 'warning' });
      return;
    }
    
    // Allow user to skip billing and go directly to dashboard (like login)
    enqueueSnackbar('Welcome! You can add payment details later from your account.', { variant: 'success' });
    navigate('/ecommerce');
  };

  // Validation functions for each step
  const validateStep1 = () => {
    const requiredFields = ['gender', 'country', 'dateOfBirth', 'mobilePhone', 'workplace', 'profession'];
    return requiredFields.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const validateStep2 = () => {
    const requiredFields = ['lookingFor', 'casesHandle', 'clientsPerMonth'];
    return requiredFields.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const validateBillingForm = () => {
    const billingFields = ['billedTo', 'cardNumber', 'expiryDate', 'cvv', 'billingCountry', 'zipCode'];
    return billingFields.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const handleUpdateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Render step content using actual components
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfoStep
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={true}
            isLastStep={false}
            data={{
              gender: formData.gender,
              country: formData.country,
              dateOfBirth: formData.dateOfBirth,
              mobilePhone: formData.mobilePhone,
              workplace: formData.workplace,
              profession: formData.profession,
              licenseNumber: formData.licenseNumber,
            }}
            onDataChange={(data) => {
              Object.entries(data).forEach(([key, value]) => {
                handleUpdateFormData(key, value as string);
              });
            }}
          />
        );
      
      case 1:
        return (
          <ProfessionalPreferencesStep
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={false}
            isLastStep={false}
            data={{
              lookingFor: formData.lookingFor,
              casesHandle: formData.casesHandle,
              clientsPerMonth: formData.clientsPerMonth,
            }}
            onDataChange={(data) => {
              Object.entries(data).forEach(([key, value]) => {
                handleUpdateFormData(key, value as string);
              });
            }}
          />
        );
      
      case 2:
        return (
          <PaymentStep
            onNext={() => {}}
            onBack={handleBack}
            isFirstStep={false}
            isLastStep={true}
            data={{
              billingPeriod: formData.billingPeriod as 'monthly' | 'yearly',
              billedTo: formData.billedTo,
              cardNumber: formData.cardNumber,
              expiryDate: formData.expiryDate,
              cvv: formData.cvv,
              billingCountry: formData.billingCountry,
              zipCode: formData.zipCode,
              membershipType: formData.membershipType as 'monthly' | 'yearly',
            }}
            onDataChange={(data) => {
              Object.entries(data).forEach(([key, value]) => {
                handleUpdateFormData(key, value as string);
              });
            }}
            onSubmit={handlePaymentSubmit}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      py: 3,
    }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            backgroundColor: 'transparent',
          }}
        >
          {/* Header with Logo and Close */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <img 
                    src={logo} 
                    alt="NutriCare Logo" 
                    style={{ height: 65 }} 
                  />
                </Box>
              </Link>
            </Box>
            
            <IconButton 
              onClick={handleClose}
              disabled={activeStep < 2}
              sx={{
                opacity: activeStep < 2 ? 0.3 : 1,
                cursor: activeStep < 2 ? 'not-allowed' : 'pointer',
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Progress Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label} completed={activeStep > index}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: completed || active ? '#4CAF50' : '#e0e0e0',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                      }}
                    >
                      {completed ? <CheckCircle sx={{ fontSize: 20 }} /> : index + 1}
                    </Box>
                  )}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: activeStep >= index ? '#4CAF50' : '#999',
                      fontWeight: 500,
                      mt: 1,
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <Box sx={{ minHeight: 400 }}>
            {renderStepContent()}
          </Box>

          {/* Navigation Buttons - Hide on last step (billing) */}
          {activeStep < totalSteps - 1 && (
            <StepNavigation
              activeStep={activeStep}
              totalSteps={totalSteps}
              onNext={handleNext}
              onBack={handleBack}
              onComplete={handlePaymentSubmit}
              isNextDisabled={false}
              isBackDisabled={activeStep === 0}
              isSubmitting={false}
              showSkipOption={false}
              onSkip={handleSkipBilling}
              hideNextOnLastStep={true}
              billingFormCompleted={validateBillingForm()}
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
};


export default MultiStepFormContainer;