import React, { createContext, useContext, useReducer, useState, useEffect, ReactNode } from "react";
import { ClientFileFormData, ClientFileData } from "../types/clientFileTypes";

// Action types
type ClientFileAction =
  | { type: "UPDATE_ASSESSMENT"; payload: Partial<ClientFileFormData["assessment"]> }
  | { type: "UPDATE_BIOCHEMICAL"; payload: Partial<ClientFileFormData["biochemical"]> }
  | { type: "UPDATE_MEDICATION"; payload: Partial<ClientFileFormData["medication"]> }
  | { type: "UPDATE_MEAL_PLAN"; payload: Partial<ClientFileFormData["mealPlan"]> }
  | { type: "SET_COMPLETION_STATUS"; payload: boolean }
  | { type: "SET_CLIENT_ID"; payload: string | null }
  | { type: "RESET_FORM" }
  | { type: "LOAD_DATA"; payload: ClientFileFormData };

// Initial state
const initialState: ClientFileFormData = {
  assessment: {
    name: "",
    gender: "",
    dateOfBirth: "",
    weight: "",
    height: "",
    weightTypeSelection: "",
    physicalActivity: "",
    wardType: "",
    stressFactor: "",
    feedingType: "",
  },
  biochemical: {
    labResults: [],
  },
  medication: {
    medications: [],
  },
  mealPlan: {
    notes: "",
  },
  isComplete: false,
};

// Reducer
const clientFileReducer = (state: ClientFileFormData, action: ClientFileAction): ClientFileFormData => {
  switch (action.type) {
    case "UPDATE_ASSESSMENT":
      return {
        ...state,
        assessment: { ...state.assessment, ...action.payload },
      };
    case "UPDATE_BIOCHEMICAL":
      return {
        ...state,
        biochemical: { ...state.biochemical, ...action.payload },
      };
    case "UPDATE_MEDICATION":
      return {
        ...state,
        medication: { ...state.medication, ...action.payload },
      };
    case "UPDATE_MEAL_PLAN":
      return {
        ...state,
        mealPlan: { ...state.mealPlan, ...action.payload },
      };
    case "SET_COMPLETION_STATUS":
      return {
        ...state,
        isComplete: action.payload,
      };
    case "SET_CLIENT_ID":
      // This action doesn't modify formData, handled separately
      return state;
    case "RESET_FORM":
      return initialState;
    case "LOAD_DATA":
      return action.payload;
    default:
      return state;
  }
};

// Context type
interface ClientFileContextType {
  formData: ClientFileFormData;
  clientId: string | null;
  existingData: { medications: any[], labResults: any[] };
  isEditMode: boolean;
  updateAssessment: (data: Partial<ClientFileFormData["assessment"]>) => void;
  updateBiochemical: (data: Partial<ClientFileFormData["biochemical"]>) => void;
  updateMedication: (data: Partial<ClientFileFormData["medication"]>) => void;
  updateMealPlan: (data: Partial<ClientFileFormData["mealPlan"]>) => void;
  setCompletionStatus: (isComplete: boolean) => void;
  setClientId: (id: string | null) => void;
  resetForm: () => void;
  loadData: (data: ClientFileFormData) => void;
  loadFromNavigationState: (data: any) => void;
  setEditMode: (isEdit: boolean) => void;
  exitEditMode: () => void;
  // Helper function to convert form data to API format
  getApiData: () => ClientFileData;
  getFormData: () => FormData;
  // Helper function to check if all required data is complete
  isDataComplete: () => boolean;
}

// Create context
const ClientFileContext = createContext<ClientFileContextType | undefined>(undefined);

// Provider component
export const ClientFileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, dispatch] = useReducer(clientFileReducer, initialState);
  const [clientId, setClientIdState] = useState<string | null>(null);
  const [existingData, setExistingData] = useState<{ medications: any[], labResults: any[] }>({ medications: [], labResults: [] });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Load existing data from localStorage on mount
  useEffect(() => {
    const savedClientData = localStorage.getItem('clientFileData');
    const savedClientId = localStorage.getItem('clientId');
    
    console.log('🔍 Checking localStorage for client data...');
    console.log('📦 Saved client data:', savedClientData);
    console.log('🆔 Saved client ID:', savedClientId);
    
    if (savedClientData && savedClientId) {
      try {
        const parsedData = JSON.parse(savedClientData);
        console.log('✅ Parsed client data:', parsedData);
        
        // Store existing medications and lab results separately
        setExistingData({
          medications: parsedData.medication?.medications || [],
          labResults: parsedData.biochemical?.labResults || []
        });
        
        // Load all data including medications and lab results for editing
        const formDataForEditing = {
          ...parsedData,
          medication: { medications: parsedData.medication?.medications || [] },
          biochemical: { labResults: parsedData.biochemical?.labResults || [] }
        };
        
        dispatch({ type: "LOAD_DATA", payload: formDataForEditing });
        setClientIdState(savedClientId);
        setIsInitialLoad(false); // Mark initial load as complete
        console.log('📂 Loaded existing client data successfully');
        console.log('🆔 Loaded client ID successfully');
        console.log('📋 Existing data stored separately:', { medications: parsedData.medication?.medications?.length || 0, labResults: parsedData.biochemical?.labResults?.length || 0 });
      } catch (error) {
        console.error('❌ Failed to parse saved client data:', error);
      }
    } else {
      console.log('ℹ️ No saved client data found, using initial state');
      setIsInitialLoad(false); // Mark initial load as complete even with no data
    }
  }, []);

  // Auto-save form data to localStorage whenever it changes
  useEffect(() => {
    // Skip auto-save during initial load to prevent overwriting loaded data
    if (isInitialLoad) {
      console.log('⏭️ Skipping auto-save during initial load');
      setIsInitialLoad(false);
      return;
    }
    
    // Only auto-save if the form has meaningful data (not empty initial state)
    const hasMeaningfulData = formData.assessment && 
      Object.values(formData.assessment).some(value => value && value !== '');
    
    if (formData && Object.keys(formData).length > 0 && hasMeaningfulData) {
      console.log('💾 Auto-saving form data to localStorage:', formData);
      localStorage.setItem('clientFileData', JSON.stringify(formData));
      
      if (clientId) {
        localStorage.setItem('clientId', clientId);
      }
      console.log('✅ Form data saved to localStorage');
    } else {
      console.log('⏭️ Skipping auto-save - no meaningful data to save');
    }
  }, [formData, clientId, isInitialLoad]);

  // Force refresh form data when in edit mode
  useEffect(() => {
    if (isEditMode && clientId) {
      console.log('🔄 Edit mode detected, checking for saved data...');
      const savedData = localStorage.getItem('clientFileData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          console.log('📋 Found saved data in edit mode:', parsedData);
          
          // Check if the saved data has meaningful content
          const hasMeaningfulData = parsedData.assessment && 
            Object.values(parsedData.assessment).some(value => value && value !== '');
          
          console.log('📋 Has meaningful saved data:', hasMeaningfulData);
          
          if (hasMeaningfulData) {
            console.log('🔄 Reloading data from saved data in edit mode');
            dispatch({ type: "LOAD_DATA", payload: parsedData });
          }
        } catch (error) {
          console.error('❌ Error parsing saved data:', error);
        }
      }
    }
  }, [isEditMode, clientId]);

  const updateAssessment = (data: Partial<ClientFileFormData["assessment"]>) => {
    dispatch({ type: "UPDATE_ASSESSMENT", payload: data });
  };

  const updateBiochemical = (data: Partial<ClientFileFormData["biochemical"]>) => {
    dispatch({ type: "UPDATE_BIOCHEMICAL", payload: data });
  };

  const updateMedication = (data: Partial<ClientFileFormData["medication"]>) => {
    console.log('🔄 Context updateMedication called with:', data);
    console.log('📋 Current form data medications before update:', formData.medication.medications);
    dispatch({ type: "UPDATE_MEDICATION", payload: data });
    console.log('✅ Context medication updated');
    console.log('📋 New form data medications after update:', formData.medication.medications);
  };

  const updateMealPlan = (data: Partial<ClientFileFormData["mealPlan"]>) => {
    dispatch({ type: "UPDATE_MEAL_PLAN", payload: data });
  };

  const setCompletionStatus = (isComplete: boolean) => {
    dispatch({ type: "SET_COMPLETION_STATUS", payload: isComplete });
  };

  const setClientId = (id: string | null) => {
    console.log('🆔 Setting client ID in context:', id);
    setClientIdState(id);
    dispatch({ type: "SET_CLIENT_ID", payload: id });
    // Also immediately save to localStorage
    if (id) {
      localStorage.setItem('clientId', id);
      console.log('💾 Client ID immediately saved to localStorage from context:', id);
    }
  };

  const setEditMode = (isEdit: boolean) => {
    setIsEditMode(isEdit);
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
    setClientIdState(null);
    setExistingData({ medications: [], labResults: [] });
    setIsEditMode(false);
    // Clear localStorage when resetting
    localStorage.removeItem('clientFileData');
    localStorage.removeItem('clientId');
    localStorage.removeItem('isEditMode');
  };

  const exitEditMode = () => {
    setIsEditMode(false);
    setClientIdState(null);
    setExistingData({ medications: [], labResults: [] });
    // Clear edit mode data from localStorage
    localStorage.removeItem('isEditMode');
    localStorage.removeItem('clientId');
    localStorage.removeItem('clientFileData');
  };

  const loadData = (data: ClientFileFormData) => {
    dispatch({ type: "LOAD_DATA", payload: data });
  };

  const loadFromNavigationState = (data: any) => {
    try {
      console.log('🔄 Loading data from navigation state:', data);
      console.log('📋 Assessment data:', data.assessment);
      console.log('📋 Medication data:', data.medication);
      console.log('📋 Biochemical data:', data.biochemical);
      
      // Set edit mode when loading from navigation state
      setIsEditMode(true);
      
      // For edit mode, load ALL existing data including medications and lab results
      const formData = {
        assessment: data.assessment || initialState.assessment,
        biochemical: { labResults: data.biochemical?.labResults || [] }, // Load existing lab results
        medication: { medications: data.medication?.medications || [] }, // Load existing medications
        mealPlan: data.mealPlan || initialState.mealPlan,
        isComplete: data.isComplete || false
      };
      
      console.log('📋 Form data to load:', formData);
      console.log('📋 Medications count:', formData.medication.medications.length);
      console.log('📋 Lab results count:', formData.biochemical.labResults.length);
      
      // Load the client data into the form
      dispatch({ type: "LOAD_DATA", payload: formData });
      
      // Store existing medications and lab results separately for reference
      if (data.biochemical?.labResults) {
        setExistingData(prev => ({
          ...prev,
          labResults: data.biochemical.labResults
        }));
      }
      
      if (data.medication?.medications) {
        setExistingData(prev => ({
          ...prev,
          medications: data.medication.medications
        }));
      }
      
      console.log('✅ Data loaded from navigation state successfully');
      console.log('📋 Form data loaded:', formData);
      console.log('📋 Existing data stored:', { 
        medications: data.medication?.medications?.length || 0, 
        labResults: data.biochemical?.labResults?.length || 0 
      });
    } catch (error) {
      console.error('❌ Error loading data from navigation state:', error);
    }
  };

  // Check if all required data is complete
  const isDataComplete = (): boolean => {
    const { assessment, biochemical, medication } = formData;
    
    // Check assessment data
    const hasRequiredAssessment = assessment.name && 
      assessment.gender && 
      assessment.dateOfBirth && 
      assessment.weight && 
      assessment.height && 
      assessment.physicalActivity && 
      assessment.wardType && 
      assessment.stressFactor && 
      assessment.feedingType;
    
    // Check if there's at least one lab result or medication (from both existing and new data)
    const hasLabResults = biochemical.labResults.length > 0 || existingData.labResults.length > 0;
    const hasMedications = medication.medications.length > 0 || existingData.medications.length > 0;
    
    console.log('🔍 Data completeness check:', {
      hasRequiredAssessment,
      hasLabResults: { form: biochemical.labResults.length, existing: existingData.labResults.length },
      hasMedications: { form: medication.medications.length, existing: existingData.medications.length },
      isComplete: hasRequiredAssessment && (hasLabResults || hasMedications)
    });
    
    return Boolean(hasRequiredAssessment && (hasLabResults || hasMedications));
  };

  // Convert form data to API format
  const getApiData = (): ClientFileData => {
    const { assessment, biochemical, medication, isComplete } = formData;
    
    // Calculate age from date of birth
    const birthDate = new Date(assessment.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    return {
      name: assessment.name,
      gender: assessment.gender as "male" | "female",
      age: age,
      date_of_birth: assessment.dateOfBirth,
      weight: parseFloat(assessment.weight) || 0,
      height: parseFloat(assessment.height) || 0,
      physical_activity: assessment.physicalActivity as any,
      ward_type: assessment.wardType as any,
      stress_factor: assessment.stressFactor as any,
      feeding_type: assessment.feedingType as any,
      lab_results: biochemical.labResults.map(labResult => {
        const result: any = {
          test_name: labResult.test_name,
          result: labResult.result,
          date: labResult.date
        };
        
        // Only include reference_range if it has a value (not null, undefined, or empty string)
        if (labResult.reference_range && labResult.reference_range !== null && labResult.reference_range.trim() !== '') {
          result.reference_range = labResult.reference_range;
        }
        
        // Only include interpretation if it has a value (not null, undefined, or empty string)
        if (labResult.interpretation && labResult.interpretation !== null && labResult.interpretation.trim() !== '') {
          result.interpretation = labResult.interpretation;
        }
        
        // Only include file if it has a value (not null, undefined, or empty string)
        if (labResult.file && labResult.file !== null) {
          const fileValue = typeof labResult.file === 'string' ? labResult.file.trim() : labResult.file;
          if (fileValue) {
            result.file = fileValue;
          }
        }
        
        return result;
      }),
      medications: medication.medications,
      is_finished: isComplete || false,
    };
  };

  // Convert form data to FormData for file uploads
  const getFormData = (): FormData => {
    const { assessment, biochemical, medication, isComplete } = formData;
    
    // Calculate age from date of birth
    const birthDate = new Date(assessment.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    const formDataObj = new FormData();
    
    // Add basic assessment data
    formDataObj.append('name', assessment.name);
    formDataObj.append('gender', assessment.gender);
    formDataObj.append('age', age.toString());
    formDataObj.append('date_of_birth', assessment.dateOfBirth);
    formDataObj.append('weight', (parseFloat(assessment.weight) || 0).toString());
    formDataObj.append('height', (parseFloat(assessment.height) || 0).toString());
    formDataObj.append('physical_activity', assessment.physicalActivity);
    formDataObj.append('ward_type', assessment.wardType);
    formDataObj.append('stress_factor', assessment.stressFactor);
    formDataObj.append('feeding_type', assessment.feedingType);
    formDataObj.append('is_finished', (isComplete || false).toString());
    
    // Add medications as JSON string
    formDataObj.append('medications', JSON.stringify(medication.medications));
    
    // Add lab results with files
    biochemical.labResults.forEach((labResult, index) => {
      formDataObj.append(`lab_results[${index}][test_name]`, labResult.test_name);
      formDataObj.append(`lab_results[${index}][result]`, labResult.result);
      formDataObj.append(`lab_results[${index}][date]`, labResult.date);
      
      // Only append reference_range if it has a value (not null, undefined, or empty string)
      if (labResult.reference_range && labResult.reference_range !== null && labResult.reference_range.trim() !== '') {
        formDataObj.append(`lab_results[${index}][reference_range]`, labResult.reference_range);
      }
      
      // Only append interpretation if it has a value (not null, undefined, or empty string)
      if (labResult.interpretation && labResult.interpretation !== null && labResult.interpretation.trim() !== '') {
        formDataObj.append(`lab_results[${index}][interpretation]`, labResult.interpretation);
      }
      
      // If there's a file, append it
      if (labResult.file && labResult.file !== null && labResult.file !== '' && typeof labResult.file === 'object' && labResult.file instanceof File) {
        formDataObj.append(`lab_results[${index}][file]`, labResult.file);
      }
    });
    
    return formDataObj;
  };

  const value: ClientFileContextType = {
    formData,
    clientId,
    existingData,
    isEditMode,
    updateAssessment,
    updateBiochemical,
    updateMedication,
    updateMealPlan,
    setCompletionStatus,
    setClientId,
    resetForm,
    loadData,
    loadFromNavigationState,
    setEditMode,
    exitEditMode,
    getApiData,
    getFormData,
    isDataComplete,
  };

  return (
    <ClientFileContext.Provider value={value}>
      {children}
    </ClientFileContext.Provider>
  );
};

// Custom hook to use the context
export const useClientFile = (): ClientFileContextType => {
  const context = useContext(ClientFileContext);
  if (context === undefined) {
    throw new Error("useClientFile must be used within a ClientFileProvider");
  }
  return context;
};

