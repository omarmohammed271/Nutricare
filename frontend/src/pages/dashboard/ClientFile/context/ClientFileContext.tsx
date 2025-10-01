import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { ClientFileFormData, ClientFileData } from "../types/clientFileTypes";

// Action types
type ClientFileAction =
  | { type: "UPDATE_ASSESSMENT"; payload: Partial<ClientFileFormData["assessment"]> }
  | { type: "UPDATE_BIOCHEMICAL"; payload: Partial<ClientFileFormData["biochemical"]> }
  | { type: "UPDATE_MEDICATION"; payload: Partial<ClientFileFormData["medication"]> }
  | { type: "UPDATE_MEAL_PLAN"; payload: Partial<ClientFileFormData["mealPlan"]> }
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
  updateAssessment: (data: Partial<ClientFileFormData["assessment"]>) => void;
  updateBiochemical: (data: Partial<ClientFileFormData["biochemical"]>) => void;
  updateMedication: (data: Partial<ClientFileFormData["medication"]>) => void;
  updateMealPlan: (data: Partial<ClientFileFormData["mealPlan"]>) => void;
  resetForm: () => void;
  loadData: (data: ClientFileFormData) => void;
  // Helper function to convert form data to API format
  getApiData: () => ClientFileData;
  getFormData: () => FormData;
}

// Create context
const ClientFileContext = createContext<ClientFileContextType | undefined>(undefined);

// Provider component
export const ClientFileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, dispatch] = useReducer(clientFileReducer, initialState);

  const updateAssessment = (data: Partial<ClientFileFormData["assessment"]>) => {
    dispatch({ type: "UPDATE_ASSESSMENT", payload: data });
  };

  const updateBiochemical = (data: Partial<ClientFileFormData["biochemical"]>) => {
    dispatch({ type: "UPDATE_BIOCHEMICAL", payload: data });
  };

  const updateMedication = (data: Partial<ClientFileFormData["medication"]>) => {
    dispatch({ type: "UPDATE_MEDICATION", payload: data });
  };

  const updateMealPlan = (data: Partial<ClientFileFormData["mealPlan"]>) => {
    dispatch({ type: "UPDATE_MEAL_PLAN", payload: data });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const loadData = (data: ClientFileFormData) => {
    dispatch({ type: "LOAD_DATA", payload: data });
  };

  // Convert form data to API format
  const getApiData = (): ClientFileData => {
    const { assessment, biochemical, medication } = formData;
    
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
        
        // Only include reference_range if it has a value
        if (labResult.reference_range && labResult.reference_range.trim() !== '') {
          result.reference_range = labResult.reference_range;
        }
        
        // Only include interpretation if it has a value
        if (labResult.interpretation && labResult.interpretation.trim() !== '') {
          result.interpretation = labResult.interpretation;
        }
        
        // Only include file if it has a value
        const fileValue = typeof labResult.file === 'string' ? labResult.file.trim() : '';
        if (fileValue) {
          result.file = fileValue;
        }
        
        return result;
      }),
      medications: medication.medications,
    };
  };

  // Convert form data to FormData for file uploads
  const getFormData = (): FormData => {
    const { assessment, biochemical, medication } = formData;
    
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
    
    // Add medications as JSON string
    formDataObj.append('medications', JSON.stringify(medication.medications));
    
    // Add lab results with files
    biochemical.labResults.forEach((labResult, index) => {
      formDataObj.append(`lab_results[${index}][test_name]`, labResult.test_name);
      formDataObj.append(`lab_results[${index}][result]`, labResult.result);
      formDataObj.append(`lab_results[${index}][date]`, labResult.date);
      
      // Only append reference_range if it has a value
      if (labResult.reference_range && labResult.reference_range.trim() !== '') {
        formDataObj.append(`lab_results[${index}][reference_range]`, labResult.reference_range);
      }
      
      // Only append interpretation if it has a value
      if (labResult.interpretation && labResult.interpretation.trim() !== '') {
        formDataObj.append(`lab_results[${index}][interpretation]`, labResult.interpretation);
      }
      
      // If there's a file, append it
      if (labResult.file && typeof labResult.file === 'object' && labResult.file instanceof File) {
        formDataObj.append(`lab_results[${index}][file]`, labResult.file);
      }
    });
    
    return formDataObj;
  };

  const value: ClientFileContextType = {
    formData,
    updateAssessment,
    updateBiochemical,
    updateMedication,
    updateMealPlan,
    resetForm,
    loadData,
    getApiData,
    getFormData,
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

