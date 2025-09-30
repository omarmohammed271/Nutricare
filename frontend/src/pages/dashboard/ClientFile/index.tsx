import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, useTheme, Button, Snackbar, Alert, Stepper, Step, StepLabel } from '@mui/material';
import { PageBreadcrumb } from '@src/components';
import { Assessments, BiochemicalData, Medication, MealPlans } from './tabs';
import { ClientFileProvider, useClientFile } from './context/ClientFileContext';
import { submitClientFile } from './api/clientFileApi';
import { clientFileValidationSchema } from './validation/clientFileValidation';

function a11yProps(index: number) {
  return {
    id: `client-file-tab-${index}`,
    'aria-controls': `client-file-tabpanel-${index}`,
  };
}

const ClientFileContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { formData, getApiData, getFormData } = useClientFile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  // Define the tab routes and their corresponding components
  const tabRoutes = [
    { path: '/client-file', label: 'Assessments', component: <Assessments /> },
    { path: '/client-file/biochemical-data', label: 'Biochemical data', component: <BiochemicalData /> },
    { path: '/client-file/medication', label: 'Medication', component: <Medication /> },
    { path: '/client-file/meal-plans', label: 'Meal Plans', component: <MealPlans /> }
  ];

  // Determine current tab based on the URL
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const tabIndex = tabRoutes.findIndex(route => route.path === currentPath);
    return tabIndex >= 0 ? tabIndex : 0;
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(tabRoutes[newValue].path);
  };

  // Handle Next button click
  const handleNext = () => {
    const currentTabIndex = getCurrentTab();
    if (currentTabIndex < tabRoutes.length - 1) {
      navigate(tabRoutes[currentTabIndex + 1].path);
    }
  };

  // Handle Previous button click
  const handlePrevious = () => {
    const currentTabIndex = getCurrentTab();
    if (currentTabIndex > 0) {
      navigate(tabRoutes[currentTabIndex - 1].path);
    }
  };

  // Check if current tab is the last tab
  const isLastTab = () => {
    return getCurrentTab() === tabRoutes.length - 1;
  };

  // Check if current tab is the first tab
  const isFirstTab = () => {
    return getCurrentTab() === 0;
  };

  // Get the current component to render
  const getCurrentComponent = () => {
    const currentPath = location.pathname;
    const currentRoute = tabRoutes.find(route => route.path === currentPath);
    return currentRoute ? currentRoute.component : tabRoutes[0].component;
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate form data
      console.log('🔍 Validating form data:', formData);
      console.log('🔍 Assessment data:', formData.assessment);
      console.log('🔍 Assessment fields:', {
        name: formData.assessment.name,
        gender: formData.assessment.gender,
        dateOfBirth: formData.assessment.dateOfBirth,
        weight: formData.assessment.weight,
        height: formData.assessment.height
      });
      console.log('🔍 Biochemical data:', formData.biochemical);
      console.log('🔍 Medication data:', formData.medication);
      console.log('🔍 Meal plan data:', formData.mealPlan);
      const validation = await clientFileValidationSchema.validate(formData, { abortEarly: false });
      
            // Check if there are any files to upload
            const hasFiles = formData.biochemical.labResults.some(labResult => 
              labResult.file && typeof labResult.file === 'object' && labResult.file instanceof File
            );

            let submissionData;
            if (hasFiles) {
              // Use FormData for file uploads
              submissionData = getFormData();
              console.log('📤 Sending FormData with files:', submissionData);
            } else {
              // Use JSON for regular data
              submissionData = getApiData();
              console.log('📤 Sending JSON data:', submissionData);
            }

      await submitClientFile(submissionData);
      
      setSnackbar({
        open: true,
        message: 'Client file submitted successfully!',
        severity: 'success'
      });
    } catch (error: any) {
      console.error('Error submitting client file:', error);
      
      // Enhanced error logging for validation errors
      if (error.name === 'ValidationError') {
        console.error('📋 Validation errors:', error.errors);
        console.error('📋 Inner errors:', error.inner?.map((err: any) => ({
          path: err.path,
          message: err.message,
          value: err.value
        })));
        
        // Show detailed validation error message
        const errorMessages = error.inner?.map((err: any) => `${err.path}: ${err.message}`).join(', ') || error.message;
        setSnackbar({
          open: true,
          message: `Validation failed: ${errorMessages}`,
          severity: 'error'
        });
      } else {
        // Log API error response
        if (error.response) {
          console.error('❌ API Error Response:', error.response.data);
          console.error('❌ API Error Status:', error.response.status);
        }
        
        setSnackbar({
          open: true,
          message: error.response?.data?.message || error.message || 'Failed to submit client file',
          severity: 'error'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <PageBreadcrumb title="Client File" subName="Dashboard" />
      
      <Box sx={{}}>
        {/* Progress Stepper */}
        <Box sx={{ mb: 3, p: 2 }}>
          <Stepper activeStep={getCurrentTab()} alternativeLabel>
            {tabRoutes.map((route, index) => (
              <Step key={index}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontSize: '14px',
                      fontWeight: 600,
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                    '& .MuiStepLabel-label.Mui-active': {
                      color: '#02BE6A',
                    },
                    '& .MuiStepLabel-label.Mui-completed': {
                      color: '#02BE6A',
                    },
                  }}
                >
                  {route.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={getCurrentTab()} 
            onChange={handleTabChange} 
            aria-label="client file tabs"
            variant="fullWidth"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'none',
                borderBottom:'none',
                height:0,
                color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF'
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                minHeight: 15,
                color: theme.palette.mode === 'dark' ? '#cccccc' : '#666',
                backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f8f9fa',
                borderBottom:'0px',
                borderRadius: '12px',
                margin: 0,
                '&.Mui-selected': {
                  color: '#FFFFFF',
                  backgroundColor: '#02BE6A',
                  fontWeight: 700,
                },
                '&:not(:last-child)': {
                  borderRight: 'none',
                },
              },
            }}
          >
            <Tab label="Assessments" {...a11yProps(0)} />
            <Tab label="Biochemical data" {...a11yProps(1)} />
            <Tab label="Medication" {...a11yProps(2)} />
            <Tab label="Meal Plans" {...a11yProps(3)} />
          </Tabs>
        </Box>

        {/* Render current component based on route */}
        <Box sx={{ p: 3 }}>
          {getCurrentComponent()}
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mt: 4, 
          mb: 2,
          p: 3,
          borderTop: theme.palette.mode === 'dark' ? '1px solid #333333' : '1px solid #e0e0e0'
        }}>
          {/* Previous Button */}
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={isFirstTab()}
            sx={{
              borderColor: '#02BE6A',
              color: '#02BE6A',
              px: 4,
              py: 2,
              borderRadius: 3,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '16px',
              minWidth: '120px',
              '&:hover': {
                borderColor: '#01A85A',
                backgroundColor: '#02BE6A20',
              },
              '&:disabled': {
                borderColor: '#cccccc',
                color: '#cccccc',
              }
            }}
          >
            Previous
          </Button>

          {/* Next/Submit Button */}
          <Button
            variant="contained"
            onClick={isLastTab() ? handleSubmit : handleNext}
            disabled={isSubmitting}
            sx={{
              backgroundColor: '#02BE6A',
              color: 'white',
              px: 6,
              py: 2,
              borderRadius: 3,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '16px',
              minWidth: '200px',
              '&:hover': {
                backgroundColor: '#01A85A',
              },
              '&:disabled': {
                backgroundColor: '#cccccc',
                color: '#666666',
              }
            }}
          >
            {isSubmitting ? 'Submitting...' : isLastTab() ? 'Submit Client File' : 'Next'}
          </Button>
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const ClientFile = () => {
  return (
    <ClientFileProvider>
      <ClientFileContent />
    </ClientFileProvider>
  );
};

export default ClientFile;