import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, useTheme, Button, Snackbar, Alert, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { PageBreadcrumb } from '@src/components';
import { Assessments, BiochemicalData, Medication, MealPlans } from './tabs';
import { ClientFileProvider, useClientFile } from './context/ClientFileContext';
import { submitClientFile, updateClientFile, updateClientFileData, patchClientFile } from './api/clientFileApi';
import { clientFileValidationSchema } from './validation/clientFileValidation';
import { createFollowUp, updateFollowUp, getClientById } from '@src/api/endpoints';

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
  const { formData, clientId, getApiData, getFormData, isDataComplete, setCompletionStatus, setClientId, updateMedication, updateBiochemical, loadFromNavigationState, isEditMode: contextEditMode, setEditMode, exitEditMode, resetForm } = useClientFile();
  
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
  
  // Check if we're creating a new client
  const isNewClient = location.state?.isNewClient || 
                     new URLSearchParams(location.search).get('mode') === 'new' ||
                     localStorage.getItem('isNewClient') === 'true';
  
  // Check if we're in edit mode - prioritize localStorage but also check context
  const localStorageEditMode = localStorage.getItem('isEditMode') === 'true';
  const isEditMode = localStorageEditMode || contextEditMode;
  const editClientId = localStorage.getItem('clientId') || clientId;
  
  console.log('🔄 Follow-up mode:', isFollowUpMode);
  console.log('🆔 Follow-up client ID:', followUpClientId);
  console.log('✏️ Edit mode (localStorage):', localStorage.getItem('isEditMode') === 'true');
  console.log('✏️ Edit mode (context):', contextEditMode);
  console.log('✏️ Edit mode (combined):', isEditMode);
  console.log('🆔 Edit client ID:', editClientId);
  console.log('📍 Location state:', location.state);
  console.log('🔍 URL search params:', new URLSearchParams(location.search).toString());
  
  // Track if we've already loaded follow-up/new/edit data to prevent infinite loops
  const followUpDataLoaded = React.useRef(false);
  const editDataLoaded = React.useRef(false);
  const newClientDataLoaded = React.useRef(false);
  
  // Load data from navigation state if in follow-up mode
  React.useEffect(() => {
    console.log('🔄 Follow-up useEffect triggered');
    console.log('🔄 isFollowUpMode:', isFollowUpMode);
    console.log('🔄 followUpDataLoaded.current:', followUpDataLoaded.current);
    
    // Store follow-up mode info; if switching clients, clear stale cached data first
    if (location.state?.isFollowUp && location.state?.clientId) {
      const incomingId = location.state.clientId.toString();
      const prevFollowUpId = localStorage.getItem('followUpClientId');
      if (prevFollowUpId && prevFollowUpId !== incomingId) {
        console.log('🧹 Switching follow-up client. Clearing cached form data');
        try {
          localStorage.removeItem('clientFileData');
          localStorage.removeItem('clientId');
          localStorage.removeItem('isEditMode');
          resetForm();
        } catch {}
      }
      localStorage.setItem('isFollowUpMode', 'true');
      localStorage.setItem('followUpClientId', incomingId);
      // Ensure we are not in new client mode
      localStorage.removeItem('isNewClient');
      console.log('💾 Stored follow-up mode info in localStorage');
    }
    
    // Store new client mode info in localStorage for persistence across navigation
    if (location.state?.isNewClient) {
      localStorage.setItem('isNewClient', 'true');
      console.log('💾 Stored new client mode info in localStorage');
    }
    
    if (isFollowUpMode && !followUpDataLoaded.current) {
      if (location.state?.clientData) {
        try {
          console.log('🔄 Loading follow-up data from navigation state');
          // Ensure a clean slate when loading new client data
          resetForm();
          localStorage.removeItem('clientFileData');
          localStorage.removeItem('clientId');
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
            resetForm();
            loadFromNavigationState(JSON.parse(savedClientData));
            followUpDataLoaded.current = true;
          } catch (error) {
            console.error('❌ Error loading follow-up data from localStorage:', error);
          }
        } else if (followUpClientId) {
          // Fallback: fetch client by ID to prefill basics
          (async () => {
            try {
              console.log('🌐 Fetching client by ID for follow-up prefill:', followUpClientId);
              const client = await getClientById(parseInt(String(followUpClientId)));
              const snapshot = {
                name: client.name,
                gender: client.gender,
                date_of_birth: client.date_of_birth,
                assessment: {
                  name: client.name || '',
                  gender: client.gender || '',
                  dateOfBirth: client.date_of_birth || '',
                  weight: client.weight != null ? String(client.weight) : '',
                  height: client.height != null ? String(client.height) : '',
                  weightTypeSelection: '',
                  physicalActivity: client.physical_activity || '',
                  wardType: client.ward_type || '',
                  stressFactor: client.stress_factor || '',
                  feedingType: client.feeding_type || ''
                },
                biochemical: { labResults: [] },
                medication: { medications: [] },
                mealPlan: { notes: '' },
                isComplete: false,
              } as any;
              try { localStorage.setItem('followUpClientData', JSON.stringify(snapshot)); } catch {}
              loadFromNavigationState(snapshot);
              followUpDataLoaded.current = true;
              console.log('✅ Prefilled follow-up basics from fetched client');
            } catch (e) {
              console.error('❌ Failed to fetch client for follow-up prefill:', e);
            }
          })();
        }
      }
    } else if (!isFollowUpMode) {
      // Reset the flag when not in follow-up mode
      followUpDataLoaded.current = false;
    } else {
      console.log('ℹ️ Not loading follow-up data - already loaded or conditions not met');
    }
    
    // Handle edit mode data loading (but not in new client mode)
    if (isEditMode && !editDataLoaded.current && !isNewClient) {
      const savedClientData = localStorage.getItem('clientFileData');
      const savedClientId = localStorage.getItem('clientId');
      console.log('✏️ Edit mode detected, checking localStorage...');
      console.log('📋 isEditMode:', isEditMode);
      console.log('📋 editDataLoaded.current:', editDataLoaded.current);
      console.log('📋 isNewClient:', isNewClient);
      console.log('📋 savedClientData exists:', !!savedClientData);
      console.log('📋 savedClientId exists:', !!savedClientId);
      console.log('📋 savedClientId value:', savedClientId);
      console.log('📋 localStorageEditMode:', localStorageEditMode);
      console.log('📋 contextEditMode:', contextEditMode);
      
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
    } else if (!isEditMode || isNewClient) {
      // Reset the flag when not in edit mode or in new client mode
      editDataLoaded.current = false;
      if (isNewClient) {
        setEditMode(false); // Clear edit mode in context for new client
      }
    }
  }, [isFollowUpMode, location.state, isEditMode, editClientId, loadFromNavigationState, setClientId]);

  // Removed path-change auto reload to prevent overwriting in-progress edits

  // Load data for new client mode from localStorage (persist across tabs/refreshes)
  React.useEffect(() => {
    if (!isNewClient) {
      newClientDataLoaded.current = false;
      return;
    }

    if (newClientDataLoaded.current) return;

    try {
      // When creating a new client, ensure a clean slate (do NOT preload old data)
      console.log('🆕 New client mode: clearing any previous form data and modes');
      
      // Clear follow-up and edit modes but preserve new client mode
      localStorage.removeItem('isFollowUpMode');
      localStorage.removeItem('followUpClientId');
      localStorage.removeItem('followUpClientData');
      localStorage.removeItem('clientFileData');
      localStorage.removeItem('clientId');
      localStorage.removeItem('isEditMode');
      localStorage.removeItem('editingFollowUpId');
      
      setEditMode(false);
      // Reset form in context by loading an empty state
      loadFromNavigationState({
        assessment: { name: '', gender: '', dateOfBirth: '', weight: '', height: '', weightTypeSelection: '', physicalActivity: '', wardType: '', stressFactor: '', feedingType: '' },
        biochemical: { labResults: [] },
        medication: { medications: [] },
        mealPlan: { notes: '' },
        isComplete: false
      });
      // Also clear existingData cache
      try {
        const cf = JSON.parse(localStorage.getItem('clientFileData') || '{}');
        if (cf) {
          localStorage.setItem('clientFileData', JSON.stringify({
            assessment: { name: '', gender: '', dateOfBirth: '', weight: '', height: '', weightTypeSelection: '', physicalActivity: '', wardType: '', stressFactor: '', feedingType: '' },
            biochemical: { labResults: [] },
            medication: { medications: [] },
            mealPlan: { notes: '' },
            isComplete: false
          }));
        }
      } catch {}
      newClientDataLoaded.current = true;
    } catch (error) {
      console.error('❌ Error loading new client data from localStorage:', error);
    }
  }, [isNewClient, loadFromNavigationState]);
  
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
    { path: '/client-file', label: 'Assessments', component: Assessments },
    { path: '/client-file/biochemical-data', label: 'Biochemical data', component: BiochemicalData },
    { path: '/client-file/medication', label: 'Medication', component: Medication },
    { path: '/client-file/meal-plans', label: 'Meal Plans', component: MealPlans }
  ];

  // Determine current tab based on the URL
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const tabIndex = tabRoutes.findIndex(route => route.path === currentPath);
    return tabIndex >= 0 ? tabIndex : 0;
  };

  const handleTabChange = async (event: React.SyntheticEvent, newValue: number) => {
    console.log('🔄 Tab change detected...');
    console.log('🆕 Is new client mode:', isNewClient);
    console.log('🔄 Is follow-up mode:', isFollowUpMode);
    console.log('✏️ Is edit mode:', isEditMode);
    
    // Don't auto-save in new client mode - keep form empty
    if (isNewClient) {
      console.log('⏭️ Skipping auto-save in new client mode - keeping form empty');
      navigate(tabRoutes[newValue].path);
      return;
    }
    
    // Auto-save current step data to localStorage before switching tabs (only for edit/follow-up modes)
    console.log('🔄 Auto-saving current step to localStorage...');
    setIsAutoSaving(true);
    try {
      // Check if there's meaningful data to save
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
    
    // Navigate to the new tab
    navigate(tabRoutes[newValue].path);
    
    // Removed post-navigation reload to avoid overwriting in-progress edits
  };


  // Check if current tab is the last tab
  const isLastTab = () => {
    return getCurrentTab() === tabRoutes.length - 1;
  };


  // Check if this is the first step (Assessments)
  const isFirstStep = () => {
    return getCurrentTab() === 0;
  };

  // Get the current component to render
  const getCurrentComponent = () => {
    const currentPath = location.pathname;
    const currentRoute = tabRoutes.find(route => route.path === currentPath);
    const Component = currentRoute ? currentRoute.component : tabRoutes[0].component;
    return <Component />;
  };

  // Handle step-by-step submission
  const handleStepSubmit = async (isComplete: boolean = false) => {
    try {
      console.log('🚀 handleStepSubmit called with isComplete:', isComplete);
      console.log('🔄 isFollowUpMode:', isFollowUpMode);
      console.log('🆔 followUpClientId:', followUpClientId);
      
      setIsSubmitting(true);
      
      // Set completion status
      // Once completed in edit mode, keep it completed without requiring re-checks
      const desiredComplete = formData.isComplete || isComplete;
      setCompletionStatus(desiredComplete);
      
      let response;
      
      if (isFollowUpMode) {
        // Follow-up mode: Send to follow-up endpoint
        console.log('🔄 Follow-up mode: Sending to follow-up endpoint');
        console.log('📋 Current step:', getCurrentTab());
        console.log('📋 Step name:', tabRoutes[getCurrentTab()]?.label || 'Unknown');
        
        if (!followUpClientId) {
          throw new Error('Follow-up client ID not found. Cannot create follow-up.');
        }
        
        // Prepare follow-up data: send only the updated section for current tab
        const baseFollowUpData: any = {
          status: (formData.isComplete || isComplete) ? 'completed' : 'scheduled',
          date: new Date().toISOString().split('T')[0],
          is_finished: true,
        };

        let followUpData: any = { ...baseFollowUpData };
        const currentTabIndex = getCurrentTab();
        if (currentTabIndex === 0) {
          // Assessments tab: send assessment-only fields
          followUpData = {
            ...baseFollowUpData,
            name: formData.assessment.name,
            gender: formData.assessment.gender,
            date_of_birth: formData.assessment.dateOfBirth,
            weight: formData.assessment.weight ? parseFloat(formData.assessment.weight) : undefined,
            height: formData.assessment.height ? parseFloat(formData.assessment.height) : undefined,
            physical_activity: formData.assessment.physicalActivity,
            ward_type: formData.assessment.wardType,
            stress_factor: formData.assessment.stressFactor,
            feeding_type: formData.assessment.feedingType,
          };
        } else if (currentTabIndex === 1) {
          // Biochemical tab: send lab results only
          followUpData = {
            ...baseFollowUpData,
            lab_results: formData.biochemical.labResults.map(lab => ({
              test_name: lab.test_name,
              result: lab.result,
              reference_range: lab.reference_range,
              interpretation: lab.interpretation,
              file: lab.file,
              date: lab.date
            })),
          };
        } else if (currentTabIndex === 2) {
          // Medication tab: send medications only
          followUpData = {
            ...baseFollowUpData,
            medications: formData.medication.medications.map(med => ({
              name: med.name,
              dosage: med.dosage,
              notes: med.notes
            })),
          };
        } else if (currentTabIndex === 3) {
          // Meal Plans tab: send notes only
          followUpData = {
            ...baseFollowUpData,
            notes: formData.mealPlan.notes || '',
          };
        }
        
        const editingFollowUpId = localStorage.getItem('editingFollowUpId');
        console.log('📤 Sending follow-up data:', followUpData);
        if (editingFollowUpId) {
          console.log('✏️ Updating existing follow-up ID:', editingFollowUpId);
          response = await updateFollowUp(parseInt(followUpClientId), parseInt(editingFollowUpId), followUpData as any);
        } else {
          response = await createFollowUp(parseInt(followUpClientId), followUpData);
        }
        
        // Keep follow-up mode active after save; only clear transient edit id
        localStorage.removeItem('editingFollowUpId');
        
        setSnackbar({
          open: true,
          message: 'Follow-up data saved successfully!',
          severity: 'success'
        });
        // Notify follow-up panels to refetch
        try {
          const evt = new CustomEvent('followup:updated', { detail: { clientId: parseInt(followUpClientId) } });
          document.dispatchEvent(evt);
        } catch {}
        
        // Explicitly keep us in follow-up mode and not edit mode
        // Ensure we do not set context edit mode
        setEditMode(false);
        return; // Exit early for follow-up mode
        
      } else if (isEditMode) {
        // Edit mode: partial update (PATCH) only for current tab
        console.log('✏️ Edit mode (PATCH): Updating only current tab');
        if (!editClientId) {
          throw new Error('Edit client ID not found. Cannot update client.');
        }

        const desiredComplete = formData.isComplete || isComplete;
        const currentTabIndex = getCurrentTab();
        let patchData: Record<string, any> = { is_finished: desiredComplete };

        if (currentTabIndex === 0) {
          patchData = {
            ...patchData,
            name: formData.assessment.name,
            gender: (formData.assessment.gender === 'male' || formData.assessment.gender === 'female') ? formData.assessment.gender : 'male',
            age: 0,
            date_of_birth: formData.assessment.dateOfBirth,
            weight: formData.assessment.weight ? parseFloat(formData.assessment.weight) : 0,
            height: formData.assessment.height ? parseFloat(formData.assessment.height) : 0,
            physical_activity: formData.assessment.physicalActivity || 'sedentary',
            ward_type: formData.assessment.wardType || 'outpatient',
            stress_factor: formData.assessment.stressFactor,
            feeding_type: formData.assessment.feedingType || 'oral',
          };
        } else if (currentTabIndex === 1) {
          patchData = {
            ...patchData,
            lab_results: formData.biochemical.labResults.map(lab => ({
              id: lab.id,
              test_name: lab.test_name,
              result: lab.result,
              reference_range: lab.reference_range,
              interpretation: lab.interpretation,
              file: lab.file,
              date: lab.date,
            })),
          };
        } else if (currentTabIndex === 2) {
          patchData = {
            ...patchData,
            medications: formData.medication.medications.map(med => ({
              id: med.id,
              name: med.name,
              dosage: med.dosage,
              notes: med.notes,
            })),
          };
        } else if (currentTabIndex === 3) {
          patchData = {
            ...patchData,
            meal_plan: { notes: formData.mealPlan.notes },
          };
        }

        console.log('📤 PATCH data being sent:', JSON.stringify(patchData, null, 2));
        response = await patchClientFile(editClientId, patchData);
        console.log('✅ PATCH response:', response);

        setSnackbar({
          open: true,
          message: 'Client data updated successfully!',
          severity: 'success'
        });

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

        if (isNewClient) {
          // Handle new client creation and updates
          if (isFirstStep() || !clientId) {
            // First step or no client ID yet: POST to create new client
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
          } else {
            // Subsequent steps: PUT to update the new client
            console.log('🔄 Updating new client (PUT) with ID:', clientId);
            response = await updateClientFile(clientId, submissionData);
          }
          
          // For new clients, clear localStorage data but don't redirect
          if (isComplete) {
            console.log('✅ New client completed successfully!');
            // Clear localStorage data but stay on the page
            localStorage.removeItem('clientFileData');
            localStorage.removeItem('clientId');
            localStorage.removeItem('isEditMode');
            localStorage.removeItem('isFollowUpMode');
            localStorage.removeItem('followUpClientId');
            localStorage.removeItem('isNewClient');
          }
        } else if (isFirstStep() && !isFollowUpMode && !isEditMode) {
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
            : isFirstStep() && !isFollowUpMode && !isEditMode && !isNewClient
              ? 'First step saved successfully! You can continue with the next steps.' 
              : isEditMode
                ? 'Client data updated successfully!'
                : isNewClient
                  ? 'Step saved locally! You can continue with the next steps.'
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
      {(clientId || (isFollowUpMode && followUpClientId)) && (
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
                📋 Client ID: {isFollowUpMode ? followUpClientId : clientId} - {isFirstStep() && !isFollowUpMode && !isEditMode ? 'Creating new client (POST)' : isFollowUpMode ? 'Follow-up mode' : isEditMode ? 'Edit mode (UPDATE/PUT - Replace)' : 'Updating existing client (PUT)'}
              </Typography>
              {!isFollowUpMode && formData.isComplete === false && (
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
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 2,
          mt: 4, 
          mb: 2,
          p: 3,
          borderTop: theme.palette.mode === 'dark' ? '1px solid #333333' : '1px solid #e0e0e0'
        }}>
          {/* Step Submit Button (normal/edit modes) or Save Follow-up (follow-up edit mode) */}
          {(() => {
            let isFollowUpEdit = false;
            try {
              isFollowUpEdit = localStorage.getItem('isFollowUpMode') === 'true' && !!localStorage.getItem('editingFollowUpId');
            } catch {}
            return (
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
                  minWidth: '180px',
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
                {isSubmitting ? 'Saving...' : isFollowUpEdit ? 'Save Follow-up' : 'Save Step'}
              </Button>
            );
          })()}

          {/* Final Submit Button (only on last tab) */}
          {isLastTab() && (
            <Button
              variant="contained"
              onClick={handleFinalSubmit}
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
              {isSubmitting ? 'Submitting...' : 'Complete & Submit'}
            </Button>
          )}
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