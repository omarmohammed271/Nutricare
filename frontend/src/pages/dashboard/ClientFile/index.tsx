import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, useTheme, Button, Snackbar, Alert, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { PageBreadcrumb } from '@src/components';
import { Assessments, BiochemicalData, Medication, MealPlans } from './tabs';
import { ClientFileProvider, useClientFile } from './context/ClientFileContext';
import { submitClientFile, updateClientFile, updateClientFileData } from './api/clientFileApi';
import { clientFileValidationSchema } from './validation/clientFileValidation';
import { createFollowUp } from '@src/api/endpoints';

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
  const { formData, clientId, getApiData, getFormData, isDataComplete, setCompletionStatus, setClientId, updateMedication, updateBiochemical, loadFromNavigationState, isEditMode: contextEditMode, setEditMode, exitEditMode } = useClientFile();
  
  // Debug logging
  console.log('🔍 ClientFileContent rendered');
  console.log('📍 Current path:', location.pathname);
  console.log('📊 Form data:', formData);
  console.log('🆔 Client ID:', clientId);
  
  // Check if we're in follow-up mode (persist from localStorage if location.state is lost)
  const isFollowUpMode = location.state?.isFollowUp || 
                        new URLSearchParams(location.search).get('mode') === 'followup' ||
                        localStorage.getItem('isFollowUpMode') === 'true';
  const followUpClientId = location.state?.clientId || 
                          new URLSearchParams(location.search).get('clientId') ||
                          localStorage.getItem('followUpClientId');
  
  // Check if we're in edit mode
  const isEditMode = localStorage.getItem('isEditMode') === 'true' || contextEditMode;
  const editClientId = localStorage.getItem('clientId') || clientId;
  
  console.log('🔄 Follow-up mode:', isFollowUpMode);
  console.log('🆔 Follow-up client ID:', followUpClientId);
  console.log('✏️ Edit mode (localStorage):', localStorage.getItem('isEditMode') === 'true');
  console.log('✏️ Edit mode (context):', contextEditMode);
  console.log('✏️ Edit mode (combined):', isEditMode);
  console.log('🆔 Edit client ID:', editClientId);
  console.log('📍 Location state:', location.state);
  console.log('🔍 URL search params:', new URLSearchParams(location.search).toString());
  
  // Track if we've already loaded follow-up data to prevent infinite loops
  const followUpDataLoaded = React.useRef(false);
  const editDataLoaded = React.useRef(false);
  
  // Load data from navigation state if in follow-up mode
  React.useEffect(() => {
    console.log('🔄 Follow-up useEffect triggered');
    console.log('🔄 isFollowUpMode:', isFollowUpMode);
    console.log('🔄 followUpDataLoaded.current:', followUpDataLoaded.current);
    
    // Store follow-up mode info in localStorage for persistence across navigation
    if (location.state?.isFollowUp && location.state?.clientId) {
      localStorage.setItem('isFollowUpMode', 'true');
      localStorage.setItem('followUpClientId', location.state.clientId.toString());
      console.log('💾 Stored follow-up mode info in localStorage');
    }
    
    if (isFollowUpMode && !followUpDataLoaded.current) {
      if (location.state?.clientData) {
        try {
          console.log('🔄 Loading follow-up data from navigation state');
          // Store client data in localStorage for persistence
          localStorage.setItem('followUpClientData', JSON.stringify(location.state.clientData));
          loadFromNavigationState(location.state.clientData);
          followUpDataLoaded.current = true;
        } catch (error) {
          console.error('❌ Error loading follow-up data:', error);
        }
      } else {
        // If we're in follow-up mode but lost location.state, try to load from localStorage
        const savedClientData = localStorage.getItem('followUpClientData');
        if (savedClientData) {
          try {
            console.log('🔄 Loading follow-up data from localStorage');
            loadFromNavigationState(JSON.parse(savedClientData));
            followUpDataLoaded.current = true;
          } catch (error) {
            console.error('❌ Error loading follow-up data from localStorage:', error);
          }
        }
      }
    } else if (!isFollowUpMode) {
      // Reset the flag when not in follow-up mode
      followUpDataLoaded.current = false;
    } else {
      console.log('ℹ️ Not loading follow-up data - already loaded or conditions not met');
    }
    
    // Handle edit mode data loading
    if (isEditMode && !editDataLoaded.current) {
      const savedClientData = localStorage.getItem('clientFileData');
      const savedClientId = localStorage.getItem('clientId');
      console.log('✏️ Edit mode detected, checking localStorage...');
      console.log('📋 savedClientData exists:', !!savedClientData);
      console.log('📋 savedClientId exists:', !!savedClientId);
      console.log('📋 savedClientId value:', savedClientId);
      
      if (savedClientData && savedClientId) {
        try {
          console.log('✏️ Loading edit data from localStorage');
          console.log('🆔 Saved client ID:', savedClientId);
          const clientData = JSON.parse(savedClientData);
          console.log('📋 Parsed client data:', clientData);
          console.log('📋 Assessment data:', clientData.assessment);
          console.log('📋 Medication data:', clientData.medication);
          console.log('📋 Biochemical data:', clientData.biochemical);
          
          loadFromNavigationState(clientData);
          setClientId(savedClientId);
          setEditMode(true); // Set edit mode in context
          editDataLoaded.current = true;
          
          console.log('✅ Edit data loaded successfully');
        } catch (error) {
          console.error('❌ Error loading edit data:', error);
        }
      } else {
        console.error('❌ Missing edit data or client ID');
        console.error('📋 savedClientData exists:', !!savedClientData);
        console.error('📋 savedClientId exists:', !!savedClientId);
        console.error('📋 savedClientId value:', savedClientId);
      }
    } else if (!isEditMode) {
      // Reset the flag when not in edit mode
      editDataLoaded.current = false;
      setEditMode(false); // Clear edit mode in context
    }
  }, [isFollowUpMode, location.state, isEditMode, editClientId, loadFromNavigationState, setClientId]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  // Auto-save to localStorage whenever formData changes
  React.useEffect(() => {
    const autoSaveToLocalStorage = () => {
      try {
        console.log('💾 Auto-saving form data to localStorage...');
        console.log('📊 Current formData:', formData);
        console.log('🆔 Current clientId:', clientId);
        console.log('✏️ Is edit mode:', isEditMode);
        
        // Only save if there's meaningful data
        const hasAssessmentData = formData.assessment && 
          Object.values(formData.assessment).some(value => value && value !== '');
        const hasBiochemicalData = formData.biochemical && 
          formData.biochemical.labResults && 
          formData.biochemical.labResults.length > 0;
        const hasMedicationData = formData.medication && 
          formData.medication.medications && 
          formData.medication.medications.length > 0;
        const hasMealPlanData = formData.mealPlan && 
          formData.mealPlan.notes && 
          formData.mealPlan.notes.trim() !== '';
        
        const hasAnyData = hasAssessmentData || hasBiochemicalData || hasMedicationData || hasMealPlanData;
        
        console.log('📋 Has assessment data:', hasAssessmentData);
        console.log('📋 Has biochemical data:', hasBiochemicalData);
        console.log('📋 Has medication data:', hasMedicationData);
        console.log('📋 Has meal plan data:', hasMealPlanData);
        console.log('📋 Has any data:', hasAnyData);
        
        if (hasAnyData) {
          localStorage.setItem('clientFileData', JSON.stringify(formData));
          console.log('✅ Form data auto-saved to localStorage');
        } else {
          console.log('⏭️ No meaningful form data to save');
        }
        
        // Always save clientId if it exists, regardless of form data
        if (clientId) {
          localStorage.setItem('clientId', clientId);
          console.log('✅ Client ID saved to localStorage:', clientId);
        }
      } catch (error) {
        console.error('❌ Auto-save to localStorage failed:', error);
      }
    };

    // Debounce auto-save to avoid too frequent saves
    const timeoutId = setTimeout(autoSaveToLocalStorage, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData, clientId, isEditMode]);

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

  const handleTabChange = async (event: React.SyntheticEvent, newValue: number) => {
    // Check if there's meaningful data to save before allowing navigation
    const hasAssessmentData = formData.assessment && 
      Object.values(formData.assessment).some(value => value && value !== '');
    const hasBiochemicalData = formData.biochemical && 
      formData.biochemical.labResults && 
      formData.biochemical.labResults.length > 0;
    const hasMedicationData = formData.medication && 
      formData.medication.medications && 
      formData.medication.medications.length > 0;
    const hasMealPlanData = formData.mealPlan && 
      formData.mealPlan.notes && 
      formData.mealPlan.notes.trim() !== '';
    
    const hasAnyData = hasAssessmentData || hasBiochemicalData || hasMedicationData || hasMealPlanData;
    
    // If there's data but no clientId, prevent navigation
    if (hasAnyData && !clientId) {
      console.log('⚠️ Cannot navigate: Data exists but no client ID found');
      setSnackbar({
        open: true,
        message: 'Please save your data first before navigating to another tab.',
        severity: 'warning'
      });
      return; // Prevent navigation
    }
    
    // Auto-save current step data to localStorage before switching tabs
    console.log('🔄 Tab change detected, auto-saving current step to localStorage...');
    setIsAutoSaving(true);
    try {
      if (hasAnyData) {
        localStorage.setItem('clientFileData', JSON.stringify(formData));
        console.log('✅ Form data auto-saved to localStorage, navigating to new tab');
      } else {
        console.log('⏭️ No meaningful form data to save, navigating to new tab');
      }
      
      // Always save clientId if it exists, regardless of form data
      if (clientId) {
        localStorage.setItem('clientId', clientId);
        console.log('✅ Client ID saved to localStorage:', clientId);
      }
    } catch (error) {
      console.error('❌ Auto-save failed:', error);
      // Still allow navigation even if auto-save fails
    } finally {
      setIsAutoSaving(false);
    }
    
    navigate(tabRoutes[newValue].path);
  };


  // Check if current tab is the last tab
  const isLastTab = () => {
    return getCurrentTab() === tabRoutes.length - 1;
  };

  // Check if current tab is the first tab
  const isFirstTab = () => {
    return getCurrentTab() === 0;
  };

  // Check if this is the first step (Assessments)
  const isFirstStep = () => {
    return getCurrentTab() === 0;
  };

  // Get the current component to render
  const getCurrentComponent = () => {
    const currentPath = location.pathname;
    const currentRoute = tabRoutes.find(route => route.path === currentPath);
    const component = currentRoute ? currentRoute.component : tabRoutes[0].component;
    return component;
  };

  // Handle step-by-step submission
  const handleStepSubmit = async (isComplete: boolean = false) => {
    try {
      console.log('🚀 handleStepSubmit called with isComplete:', isComplete);
      console.log('🔄 isFollowUpMode:', isFollowUpMode);
      console.log('🆔 followUpClientId:', followUpClientId);
      
      setIsSubmitting(true);
      
      // Set completion status
      setCompletionStatus(isComplete);
      
      let response;
      
      if (isFollowUpMode) {
        // Follow-up mode: Send to follow-up endpoint
        console.log('🔄 Follow-up mode: Sending to follow-up endpoint');
        console.log('📋 Current step:', getCurrentTab());
        console.log('📋 Step name:', tabRoutes[getCurrentTab()]?.label || 'Unknown');
        
        if (!followUpClientId) {
          throw new Error('Follow-up client ID not found. Cannot create follow-up.');
        }
        
        // Prepare follow-up data
        const followUpData = {
          notes: formData.mealPlan.notes || '',
          weight: formData.assessment.weight ? parseFloat(formData.assessment.weight) : undefined,
          height: formData.assessment.height ? parseFloat(formData.assessment.height) : undefined,
          blood_pressure: '',
          temperature: '',
          status: isComplete ? 'completed' : 'scheduled',
          date: new Date().toISOString().split('T')[0],
          // Complete client data
        name: formData.assessment.name,
        gender: formData.assessment.gender,
          date_of_birth: formData.assessment.dateOfBirth,
          physical_activity: formData.assessment.physicalActivity,
          ward_type: formData.assessment.wardType,
          stress_factor: formData.assessment.stressFactor,
          feeding_type: formData.assessment.feedingType,
          lab_results: formData.biochemical.labResults.map(lab => ({
            test_name: lab.test_name,
            result: lab.result,
            reference_range: lab.reference_range,
            interpretation: lab.interpretation,
            file: lab.file,
            date: lab.date
          })),
          medications: formData.medication.medications.map(med => ({
            name: med.name,
            dosage: med.dosage,
            notes: med.notes
          }))
        };
        
        console.log('📤 Sending follow-up data:', followUpData);
        response = await createFollowUp(parseInt(followUpClientId), followUpData);
        
        // Clear follow-up mode data from localStorage
        localStorage.removeItem('isFollowUpMode');
        localStorage.removeItem('followUpClientId');
        localStorage.removeItem('followUpClientData');
        
        // Redirect back to client onboarding after follow-up submission
        setTimeout(() => {
          console.log('🔄 Redirecting to Client Onboarding after follow-up...');
          // Clear localStorage data
          localStorage.removeItem('clientFileData');
          localStorage.removeItem('clientId');
          localStorage.removeItem('isEditMode');
          localStorage.removeItem('isFollowUpMode');
          localStorage.removeItem('followUpClientId');
          // Navigate back to Client Onboarding
          navigate('/clients/onboarding');
        }, 2000);
        
        setSnackbar({
          open: true,
          message: 'Follow-up data saved successfully! Redirecting to client onboarding...',
          severity: 'success'
        });
        
        return; // Exit early for follow-up mode
        
      } else if (isEditMode) {
        // Edit mode: Update existing client
        console.log('✏️ Edit mode: Updating existing client');
        console.log('📋 Current step:', getCurrentTab());
        console.log('📋 Step name:', tabRoutes[getCurrentTab()]?.label || 'Unknown');
        
        if (!editClientId) {
          console.error('❌ Edit client ID not found!');
          console.error('📋 localStorage clientId:', localStorage.getItem('clientId'));
          console.error('📋 context clientId:', clientId);
          console.error('📋 editClientId:', editClientId);
          console.error('📋 isEditMode:', isEditMode);
          console.error('📋 contextEditMode:', contextEditMode);
          throw new Error('Edit client ID not found. Cannot update client.');
        }
        
        // Prepare update data - split into basic info and nested data
        // Calculate age from date of birth
        const birthDate = new Date(formData.assessment.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        const basicUpdateData = {
          name: formData.assessment.name,
          gender: formData.assessment.gender as "male" | "female",
          age: age,
          date_of_birth: formData.assessment.dateOfBirth,
          weight: formData.assessment.weight ? parseFloat(formData.assessment.weight) : 0,
          height: formData.assessment.height ? parseFloat(formData.assessment.height) : 0,
          physical_activity: formData.assessment.physicalActivity as any,
          ward_type: formData.assessment.wardType as any,
          stress_factor: formData.assessment.stressFactor as any,
          feeding_type: formData.assessment.feedingType as any,
          is_finished: isComplete
        };

        const medicationsData = formData.medication.medications.map(med => ({
          id: med.id,
          name: med.name,
          dosage: med.dosage,
          notes: med.notes
        }));

        const labResultsData = formData.biochemical.labResults.map(lab => ({
          id: lab.id,
          test_name: lab.test_name,
          result: lab.result,
          reference_range: lab.reference_range,
          interpretation: lab.interpretation,
          file: lab.file,
          date: lab.date
        }));
        
        console.log('📤 Sending basic update data:', basicUpdateData);
        console.log('📤 Sending medications data:', medicationsData);
        console.log('📤 Sending lab results data:', labResultsData);
        console.log('🔍 Update data details:', {
          medications: medicationsData,
          medicationsCount: medicationsData.length,
          labResults: labResultsData,
          labResultsCount: labResultsData.length,
          clientId: editClientId
        });
        
        // Additional debugging for duplication check
        console.log('🔍 Duplication check:');
        console.log('📋 Form data medications:', formData.medication.medications);
        console.log('📋 Form data lab results:', formData.biochemical.labResults);
        console.log('📋 Medications data:', medicationsData);
        console.log('📋 Lab results data:', labResultsData);
        console.log('🔍 Edit mode status:', isEditMode);
        console.log('🔍 Context edit mode:', contextEditMode);
        
        // Use UPDATE method (PUT) to replace old data with new data
        console.log('🔄 Using UPDATE method (PUT) to replace old data with new data...');
        const updateData = {
          ...basicUpdateData,
          medications: medicationsData,
          lab_results: labResultsData,
          // Add flags to indicate this is replacement, not addition
          _replace_medications: true,
          _replace_lab_results: true
        };
        
        console.log('📤 UPDATE data being sent:', JSON.stringify(updateData, null, 2));
        console.log('📊 UPDATE data medications count:', updateData.medications.length);
        console.log('📊 UPDATE data lab results count:', updateData.lab_results.length);
        
        response = await updateClientFileData(editClientId, updateData);
        console.log('✅ UPDATE response:', response);
        
        // Don't clear edit mode data immediately - let user continue editing
        // Only clear when they explicitly exit edit mode
        
        setSnackbar({
          open: true,
          message: 'Client data updated successfully! Redirecting to Client Onboarding...',
          severity: 'success'
        });
        
        // Redirect to Client Onboarding after successful update
        setTimeout(() => {
          console.log('🔄 Redirecting to Client Onboarding after successful update...');
          // Clear localStorage data
          localStorage.removeItem('clientFileData');
          localStorage.removeItem('clientId');
          localStorage.removeItem('isEditMode');
          localStorage.removeItem('isFollowUpMode');
          localStorage.removeItem('followUpClientId');
          // Navigate back to Client Onboarding
          navigate('/clients/onboarding');
        }, 2000);
        
        return; // Exit early for edit mode
        
      } else {
        // Regular client file mode
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

        if (isFirstStep() && !isFollowUpMode && !isEditMode) {
          // First step: POST to create new client (only in regular mode, not edit mode)
          console.log('🆕 Creating new client (POST)');
          response = await submitClientFile(submissionData);
          
          // Extract client ID from response and store it
          if (response && response.id) {
            const newClientId = response.id.toString();
            setClientId(newClientId);
            // Immediately save to localStorage to ensure it's available
            localStorage.setItem('clientId', newClientId);
            console.log('✅ Client created with ID:', newClientId);
            console.log('💾 Client ID immediately saved to localStorage:', newClientId);
          }
          
          // For new clients, don't redirect immediately - let them continue with the form
          // Only redirect if this is a complete submission
          if (isComplete) {
            setTimeout(() => {
              console.log('🔄 Redirecting to Client Onboarding after completion...');
              // Clear localStorage data
              localStorage.removeItem('clientFileData');
              localStorage.removeItem('clientId');
              localStorage.removeItem('isEditMode');
              localStorage.removeItem('isFollowUpMode');
              localStorage.removeItem('followUpClientId');
              // Navigate back to Client Onboarding
              navigate('/clients/onboarding');
            }, 2000); // 2 second delay to show success message
          }
        } else if (!isFollowUpMode) {
          // Subsequent steps: PUT to update existing client (only in regular mode)
          if (!clientId) {
            throw new Error('Client ID not found. Please start from the first step.');
          }
          console.log('🔄 Updating existing client (PUT) with ID:', clientId);
          response = await updateClientFile(clientId, submissionData);
        }
        
        // Keep medications and lab results in form context to preserve data when changing steps
        console.log('💾 Preserving medications and lab results in form context');
        
        setSnackbar({
          open: true,
          message: isComplete 
            ? 'Client file completed and submitted successfully!' 
            : isFirstStep() && !isFollowUpMode && !isEditMode
              ? 'First step saved successfully! You can continue with the next steps.' 
              : isEditMode
                ? 'Client data updated successfully!'
                : 'Step saved successfully!',
          severity: 'success'
        });
      }
    } catch (error: any) {
      console.error('Error submitting step:', error);
      
      setSnackbar({
        open: true,
        message: error.response?.data?.message || error.message || 'Failed to save step',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle final form submission with validation
  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate form data
      console.log('🔍 Validating form data:', formData);
      const validation = await clientFileValidationSchema.validate(formData, { abortEarly: false });
      
      // Check if all data is complete
      if (!isDataComplete()) {
        setSnackbar({
          open: true,
          message: 'Please complete all required fields before final submission',
          severity: 'warning'
        });
        return;
      }
      
      // Submit as complete (will use appropriate API call based on step)
      await handleStepSubmit(true);
      
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
      

      {/* Follow-up Mode Indicator */}
      {isFollowUpMode && (
        <Box sx={{ 
          mb: 2, 
          p: 2, 
          bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#e3f2fd',
          borderRadius: 2,
          border: theme.palette.mode === 'dark' ? '1px solid #1976d2' : '1px solid #1976d2'
        }}>
          <Typography variant="h6" sx={{ 
            color: theme.palette.mode === 'dark' ? '#64b5f6' : '#1976d2',
            fontWeight: 600,
            mb: 1
          }}>
            🔄 Follow-up Mode
          </Typography>
          <Typography variant="body2" sx={{ 
            color: theme.palette.mode === 'dark' ? '#90caf9' : '#1565c0',
            mb: 0.5
          }}>
            Client ID: {followUpClientId}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: theme.palette.mode === 'dark' ? '#90caf9' : '#1565c0'
          }}>
            Data will be sent to /api/clients/{followUpClientId}/follow-up/
          </Typography>
        </Box>
      )}
      
      {/* Client ID Status */}
      {clientId && (
        <Box sx={{ 
          mb: 2, 
          p: 2, 
          bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f8f9fa',
          borderRadius: 2,
          border: theme.palette.mode === 'dark' ? '1px solid #333333' : '1px solid #e0e0e0'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2" sx={{ 
                color: theme.palette.mode === 'dark' ? '#02BE6A' : '#02BE6A',
                fontWeight: 600
              }}>
                📋 Client ID: {clientId} - {isFirstStep() && !isFollowUpMode && !isEditMode ? 'Creating new client (POST)' : isFollowUpMode ? 'Follow-up mode' : isEditMode ? 'Edit mode (UPDATE/PUT - Replace)' : 'Updating existing client (PUT)'}
              </Typography>
              {formData.isComplete === false && (
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#f44336' : '#f44336',
                  fontWeight: 500,
                  mt: 0.5
                }}>
                  ⚠️ Incomplete data - Please complete the missing steps
                </Typography>
              )}
            </Box>
            {isEditMode && (
              <Button
                variant="outlined"
                onClick={() => {
                  // Clear edit mode data and redirect to client onboarding
                  console.log('🔄 Exiting edit mode and redirecting to Client Onboarding...');
                  exitEditMode();
                  // Clear localStorage data
                  localStorage.removeItem('clientFileData');
                  localStorage.removeItem('clientId');
                  localStorage.removeItem('isEditMode');
                  // Navigate back to Client Onboarding
                  navigate('/clients/onboarding');
                }}
                sx={{
                  borderColor: '#f44336',
                  color: '#f44336',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '14px',
                  '&:hover': {
                    borderColor: '#d32f2f',
                    backgroundColor: '#f4433620',
                  }
                }}
              >
                Exit Edit Mode
              </Button>
            )}
          </Box>
        </Box>
      )}
      
      {/* Auto-save Indicator */}
      {isAutoSaving && (
        <Box sx={{ 
          mb: 2, 
          p: 2, 
          bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f0f9f4',
          borderRadius: 2,
          border: theme.palette.mode === 'dark' ? '1px solid #02BE6A' : '1px solid #02BE6A'
        }}>
          <Typography variant="body2" sx={{ 
            color: theme.palette.mode === 'dark' ? '#02BE6A' : '#02BE6A',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            💾 Auto-saving your data...
          </Typography>
        </Box>
      )}
      
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

          {/* Save Step Button - Directly below form */}
        <Box sx={{ 
          display: 'flex', 
            justifyContent: 'center', 
          alignItems: 'center',
            mt: 3, 
            mb: 2
          }}>
          <Button
            variant="outlined"
              onClick={() => handleStepSubmit(false)}
              disabled={isSubmitting}
            sx={{
              borderColor: '#02BE6A',
              color: '#02BE6A',
              px: 4,
              py: 2,
              borderRadius: 3,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '16px',
                minWidth: '140px',
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
              {isSubmitting ? 'Saving...' : 'Save Step'}
          </Button>
          </Box>
        </Box>
        
        {/* Back to Client Onboarding Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 2, 
          mb: 2
        }}>
          <Button
            variant="outlined"
            onClick={() => {
              console.log('🔄 Navigating back to Client Onboarding...');
              // Clear any stored data
              localStorage.removeItem('clientFileData');
              localStorage.removeItem('clientId');
              localStorage.removeItem('isEditMode');
              localStorage.removeItem('isFollowUpMode');
              localStorage.removeItem('followUpClientId');
              // Navigate back to Client Onboarding
              navigate('/clients/onboarding');
            }}
            sx={{
              borderColor: '#02BE6A',
              color: '#02BE6A',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '14px',
              '&:hover': {
                borderColor: '#029e56',
                backgroundColor: '#f0f9f4',
              }
            }}
          >
            Back to Client Onboarding
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