import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { ProgressIndicatorProps } from '../types';

const StyledStepper = styled(Stepper)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiStepConnector-line': {
    borderColor: '#4CAF50',
    borderTopWidth: 2,
  },
  '& .MuiStepLabel-root .Mui-completed': {
    color: '#4CAF50',
  },
  '& .MuiStepLabel-root .Mui-active': {
    color: '#4CAF50',
  },
}));

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  activeStep,
  totalSteps,
  completedSteps,
  stepLabels,
}) => {
  return (
    <StyledStepper activeStep={activeStep} alternativeLabel>
      {stepLabels.map((label, index) => {
        const isCompleted = completedSteps.includes(index);
        const isActive = activeStep === index;
        
        return (
          <Step key={label} completed={isCompleted}>
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: isCompleted || isActive ? '#4CAF50' : '#e0e0e0',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle sx={{ fontSize: 20 }} />
                  ) : (
                    index + 1
                  )}
                </Box>
              )}
            >
              <Typography
                variant="body2"
                sx={{
                  color: activeStep >= index ? '#4CAF50' : '#999',
                  fontWeight: 500,
                  mt: 1,
                  transition: 'color 0.2s ease-in-out',
                }}
              >
                {label}
              </Typography>
            </StepLabel>
          </Step>
        );
      })}
    </StyledStepper>
  );
};