import { useState, useCallback } from 'react';
import { Drug, DrugDetail } from '@src/services/nutritionApi';
import { useDrugDetails } from '@src/hooks/useNutritionApi';

export interface DrugSelectionState {
  selectedDrug: Drug | null;
  drugDetails: DrugDetail | null;
  isDialogOpen: boolean;
}

export const useDrugSelection = () => {
  const [drugSelection, setDrugSelection] = useState<DrugSelectionState>({
    selectedDrug: null,
    drugDetails: null,
    isDialogOpen: false
  });

  // Fetch drug details when a drug is selected
  const { 
    data: drugDetails, 
    isLoading: detailsLoading, 
    error: detailsError 
  } = useDrugDetails(drugSelection.selectedDrug?.id || 0);

  const selectDrug = useCallback((drug: Drug | null) => {
    setDrugSelection(prev => ({
      ...prev,
      selectedDrug: drug,
      drugDetails: drug ? (drugDetails || null) : null
    }));
  }, [drugDetails]);

  const openDialog = useCallback(() => {
    setDrugSelection(prev => ({
      ...prev,
      isDialogOpen: true
    }));
  }, []);

  const closeDialog = useCallback(() => {
    setDrugSelection(prev => ({
      ...prev,
      isDialogOpen: false
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setDrugSelection({
      selectedDrug: null,
      drugDetails: null,
      isDialogOpen: false
    });
  }, []);

  return {
    drugSelection,
    selectDrug,
    openDialog,
    closeDialog,
    clearSelection,
    drugDetails,
    detailsLoading,
    detailsError
  };
};
