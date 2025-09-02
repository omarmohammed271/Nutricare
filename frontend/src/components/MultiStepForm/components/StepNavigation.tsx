import React from 'react';
import { Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { BackButton, NextButton } from './StyledComponents';
import { StepNavigationProps } from '../types';

export const StepNavigation: React.FC<StepNavigationProps> = ({
  activeStep,
  totalSteps,
  onNext,
  onBack,
  onComplete,
  isNextDisabled,
  isBackDisabled,
  isSubmitting,
  showSkipOption = false,
  onSkip,
  hideNextOnLastStep = false,
  billingFormCompleted = false,
}) => {
  const isLastStep = activeStep === totalSteps - 1;

  const getButtonText = () => {
    if (isLastStep) return 'Process Payment';
    return 'Next';
  };

  // In the final billing step, hide skip button if billing form is completed
  const shouldShowSkipOption = showSkipOption && !billingFormCompleted;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
      {!isBackDisabled && (
        <BackButton
          variant="outlined"
          onClick={onBack}
          startIcon={<ArrowBack />}
          disabled={isSubmitting}
        >
          Back
        </BackButton>
      )}
      
      {isLastStep ? (
        <Box sx={{ display: 'flex', gap: 2 }}>
          {shouldShowSkipOption && onSkip && (
            <NextButton
              variant="outlined"
              onClick={onSkip}
              disabled={isSubmitting}
              sx={{
                borderColor: '#4CAF50',
                color: '#4CAF50',
                '&:hover': {
                  borderColor: '#4CAF50',
                  backgroundColor: 'rgba(76, 175, 80, 0.04)',
                },
              }}
            >
              Skip for Now
            </NextButton>
          )}
          <NextButton
            variant="contained"
            onClick={onComplete}
            disabled={isNextDisabled || isSubmitting}
          >
            {isSubmitting ? 'Processing...' : getButtonText()}
          </NextButton>
        </Box>
      ) : (
        // Hide Next button on last step if hideNextOnLastStep is true
        !hideNextOnLastStep && (
          <NextButton
            variant="contained"
            onClick={onNext}
            endIcon={<ArrowForward />}
            disabled={isNextDisabled || isSubmitting}
          >
            Next
          </NextButton>
        )
      )}
    </Box>
  );
};