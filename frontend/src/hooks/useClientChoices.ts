import { useState, useEffect } from 'react';
import { getClientChoices } from '@src/api/endpoints';

export interface ChoiceOption {
  value: string;
  label: string;
}

/**
 * Custom hook to fetch client choices from the API
 * 
 * This hook fetches dropdown choices for the AssessmentForm from the /api/clients/choices/ endpoint.
 * It provides loading states, error handling, and a refetch function.
 * 
 * @returns {UseClientChoicesReturn} Object containing choices data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { choices, loading, error, refetch } = useClientChoices();
 * 
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} />;
 * 
 * // Use choices.weight_type_selection, choices.physical_activity, etc.
 * ```
 */

// The API returns objects with {key: label} structure, not arrays of {value, label}
interface ClientChoices {
  ward_type: Record<string, string>;
  physical_activity: Record<string, string>;
  stress_factor: Record<string, string>;
  feeding_type: Record<string, string>;
  gender: Record<string, string>;
}

interface UseClientChoicesReturn {
  choices: {
    ward_type: Array<{value: string, label: string}>;
    physical_activity: Array<{value: string, label: string}>;
    stress_factor: Array<{value: string, label: string}>;
    feeding_type: Array<{value: string, label: string}>;
    gender: Array<{value: string, label: string}>;
  } | null;
  rawChoices: ClientChoices | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useClientChoices = (): UseClientChoicesReturn => {
  const [choices, setChoices] = useState<ClientChoices | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChoices = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching client choices from API...');
      const data = await getClientChoices();
      console.log('✅ Client choices fetched successfully:', data);
      
      // Debug: Log the structure of each field
      console.log('🔍 Debugging API response structure:');
      (Object.keys(data) as Array<keyof ClientChoices>).forEach(key => {
        const value = data[key];
        console.log(`${key}:`, value, 'isArray:', Array.isArray(value));
        if (typeof value === 'object' && !Array.isArray(value)) {
          console.log(`${key} options:`, Object.entries(value).map(([val, label]) => `${val} -> ${label}`));
        }
      });
      
      setChoices(data);
    } catch (err) {
      console.error('❌ Failed to fetch client choices:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch choices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChoices();
  }, []);

  // Helper function to convert API object format to form-compatible format
  const convertToFormOptions = (choicesObj: Record<string, string> | undefined, fallbackOptions: Array<{value: string, label: string}>): Array<{value: string, label: string}> => {
    if (!choicesObj) return fallbackOptions;
    
    return Object.entries(choicesObj).map(([value, label]) => ({
      value,
      label
    }));
  };

  // Convert choices to form-compatible format
  const formChoices = choices ? {
    ward_type: convertToFormOptions(choices.ward_type, []),
    physical_activity: convertToFormOptions(choices.physical_activity, []),
    stress_factor: convertToFormOptions(choices.stress_factor, []),
    feeding_type: convertToFormOptions(choices.feeding_type, []),
    gender: convertToFormOptions(choices.gender, [])
  } : null;

  return {
    choices: formChoices,
    rawChoices: choices,
    loading,
    error,
    refetch: fetchChoices
  };
};

export type { ClientChoices };
