import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  useTheme,
  Autocomplete,
  TextField,
  CircularProgress,
  Button,
  Alert
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { LuXCircle } from "react-icons/lu";
import { Medication as MedicationInterface, AddMedicationDialogState } from './types';
import { interactionAlerts } from './constants';
import { AddMedicationDialog, DrugSelectionDialog } from './components';
import { useClientFile } from '../../context/ClientFileContext';
import { useDrugCategories, useSearchDrugs, useDrugDetails } from '@src/hooks/useNutritionApi';
import { Drug, DrugCategory, DrugDetail } from '@src/services/nutritionApi';
import { useDrugSelection } from './hooks';
import FollowUpPanel from '../../components/FollowUpPanel';

const Medication = () => {
  const theme = useTheme();
  const { formData: contextData, updateMedication, existingData, clientId } = useClientFile();
  const [medications, setMedications] = useState<MedicationInterface[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [autoSearchEnabled, setAutoSearchEnabled] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [addMedicationDialog, setAddMedicationDialog] = useState<AddMedicationDialogState>({
    open: false,
    name: '',
    dosage: '',
    notes: ''
  });

  // Fetch drug categories and search drugs
  const { 
    data: drugCategoriesData, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useDrugCategories();

  const { 
    data: searchResults, 
    isLoading: searchLoading, 
    error: searchError 
  } = useSearchDrugs(searchQuery);

  // Ensure drugCategories is always an array
  const drugCategories = Array.isArray(drugCategoriesData) ? drugCategoriesData : [];

  // Create a flat list of all drugs with category information
  const allDrugsWithCategory = useMemo(() => {
    const drugs: any[] = [];
    
    drugCategories.forEach(category => {
      if (category.drugs && Array.isArray(category.drugs)) {
        category.drugs.forEach(drug => {
          drugs.push({
            ...drug,
            categoryName: category.name,
            categoryId: category.id,
            groupBy: category.name
          });
        });
      }
    });
    
    console.log('📊 ALL DRUGS WITH CATEGORY DATA:', drugs);
    return drugs;
  }, [drugCategories]);

  // Always show all drugs, but filter them when searching
  const availableDrugs = useMemo(() => {
    console.log('🔍 SEARCH PROCESS STARTED');
    console.log('🔍 Search Query:', searchQuery);
    console.log('🔍 All Drug Categories:', drugCategories);

    if (searchQuery && searchQuery.length > 0) {
      const searchTerm = searchQuery.toLowerCase().trim();
      console.log('🔍 Using local search, query:', searchTerm);
      console.log('🔍 Available categories:', drugCategories.map(cat => cat.name));

      const results: any[] = [];

      // STEP 1: Add all drugs from matching categories
      drugCategories.forEach(category => {
        const categoryMatches = category.name.toLowerCase().includes(searchTerm);
        if (categoryMatches && category.drugs) {
          console.log(`🔍 📂 Category match: "${category.name}" with ${category.drugs.length} drugs`);
          category.drugs.forEach(drug => {
            if (!results.some(d => d.id === drug.id)) {
              results.push({
                ...drug,
                categoryName: category.name,
                categoryId: category.id,
                groupBy: category.name
              });
              console.log(`🔍   💊 Added from category: "${drug.name}"`);
            }
          });
        }
      });

      // STEP 2: Add drugs that match by name (even if category didn't match)
      drugCategories.forEach(category => {
        if (category.drugs) {
          category.drugs.forEach(drug => {
            const drugMatches = drug.name.toLowerCase().includes(searchTerm);
            if (drugMatches && !results.some(d => d.id === drug.id)) {
              results.push({
                ...drug,
                categoryName: category.name,
                categoryId: category.id,
                groupBy: category.name
              });
              console.log(`🔍 💊 Added by name: "${drug.name}" (Category: "${category.name}")`);
            }
          });
        }
      });

      console.log('🔍 ✅ FINAL RESULTS:', results.length, 'drugs found');
      return results;
    }

    // No search query - show all drugs
    console.log('🔍 No search query, showing all', allDrugsWithCategory.length, 'drugs');
    return allDrugsWithCategory;
  }, [searchQuery, allDrugsWithCategory, drugCategories]);

  // Prepare drugs for autocomplete options with grouped display
  const allDrugs = useMemo(() => {
    console.log('🔍 PREPARING DRUGS FOR AUTOCOMPLETE');
    console.log('   Available drugs count:', availableDrugs.length);
    console.log('   Available drugs sample:', availableDrugs.slice(0, 3));
    
    // Use the drugs directly without adding extra properties
    const drugs = availableDrugs.map((drug: any) => {
      const mappedDrug = {
        ...drug,
        // Ensure we have the required properties
        name: drug.name || 'Unknown Drug',
        id: drug.id || 0,
        categoryName: drug.categoryName || 'Other',
        groupBy: drug.categoryName || 'Other'
      };
      
      return mappedDrug;
    });
    
    console.log('🔍 PREPARED DRUGS FOR AUTOCOMPLETE:', drugs.length);
    console.log('   Sample drug:', drugs[0]);
    console.log('   All drugs structure check:', {
      isArray: Array.isArray(drugs),
      length: drugs.length,
      hasName: drugs.length > 0 ? 'name' in drugs[0] : false,
      hasId: drugs.length > 0 ? 'id' in drugs[0] : false,
      hasCategoryName: drugs.length > 0 ? 'categoryName' in drugs[0] : false,
      hasGroupBy: drugs.length > 0 ? 'groupBy' in drugs[0] : false
    });
    
    return drugs;
  }, [availableDrugs]);

  // Drug selection hook
  const {
    drugSelection,
    selectDrug,
    openDialog: openDrugDialog,
    closeDialog: closeDrugDialog,
    clearSelection: clearDrugSelection,
    drugDetails,
    detailsLoading,
    detailsError
  } = useDrugSelection();

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);


  // Filter medications based on search query
  const filteredMedications = medications.filter(medication =>
    medication.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate dynamic ADIME Note content based on form data
  const generateAdimeNote = () => {
    const assessment = contextData.assessment;
    const biochemical = contextData.biochemical;
    const medication = contextData.medication;
    
    // Calculate age from date of birth
    const birthDate = new Date(assessment.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    // Generate assessment text based on available data
    let assessmentText = "The client presents with ";
    if (assessment.physicalActivity) {
      assessmentText += `a ${assessment.physicalActivity} activity level`;
    }
    if (assessment.stressFactor) {
      assessmentText += ` and ${assessment.stressFactor} as a stress factor`;
    }
    if (assessment.feedingType) {
      assessmentText += `. Current feeding type is ${assessment.feedingType}`;
    }
    if (biochemical.labResults.length > 0) {
      assessmentText += `. Recent lab results show ${biochemical.labResults.length} test(s) recorded`;
    }
    if (medication.medications.length > 0) {
      assessmentText += `. Currently managing ${medication.medications.length} medication(s)`;
    }
    assessmentText += ", requiring ongoing dietary monitoring and assessment.";

    return {
      assessment: assessmentText,
      clientHistory: {
        name: assessment.name || "Not provided",
        ageGender: `${age}-Year-Old ${assessment.gender === 'male' ? 'Male' : 'Female'}`,
        wardType: assessment.wardType || "Not specified",
        physicalActivity: assessment.physicalActivity || "Not specified",
        stressFactor: assessment.stressFactor || "Not specified",
        feedingType: assessment.feedingType || "Not specified",
        labResults: biochemical.labResults.length > 0 ? `${biochemical.labResults.length} lab result(s)` : "No lab results",
        medications: medication.medications.length > 0 ? `${medication.medications.length} medication(s)` : "No medications"
      }
    };
  };

  const adimeData = generateAdimeNote();



  const handleDialogChange = (field: keyof AddMedicationDialogState, value: string) => {
    setAddMedicationDialog(prev => ({ ...prev, [field]: value }));
  };

  // Load medications from context data
  useEffect(() => {
    console.log('🔄 Medication useEffect triggered');
    console.log('📋 Context medications:', contextData.medication.medications);
    console.log('📋 Current local medications:', medications);
    console.log('📋 Context medications length:', contextData.medication.medications.length);
    console.log('📋 Current local medications length:', medications.length);
    
    if (contextData.medication.medications.length > 0) {
      const contextMedications = contextData.medication.medications.map((med, index) => ({
        id: med.id?.toString() || `med-${index}-${Date.now()}`,
        name: med.name,
        dosage: med.dosage,
        frequency: '', // Not in API schema
        route: '', // Not in API schema
        startDate: '', // Not in API schema
        endDate: undefined,
        prescribedBy: '', // Not in API schema
        indication: '', // Not in API schema
        status: 'Active' as const,
        notes: med.notes || ''
      }));
      
      console.log('🔄 Mapped context medications:', contextMedications);
      
      // Only update if the medications are different to avoid infinite loops
      const currentIds = medications.map(med => med.id).sort();
      const newIds = contextMedications.map(med => med.id).sort();
      
      console.log('🔍 Current IDs:', currentIds);
      console.log('🔍 New IDs:', newIds);
      console.log('🔍 IDs match:', JSON.stringify(currentIds) === JSON.stringify(newIds));
      
      if (JSON.stringify(currentIds) !== JSON.stringify(newIds)) {
        console.log('✅ Updating medications with new data');
        setMedications(contextMedications);
      } else {
        console.log('⏭️ Skipping update - medications unchanged');
      }
    } else {
      console.log('🧹 Clearing medications - no context data');
      // Clear medications if no context data
      setMedications([]);
    }
  }, [contextData.medication.medications]);


  const handleSaveMedication = () => {
    if (addMedicationDialog.name && addMedicationDialog.dosage) {
      const newMedication: MedicationInterface = {
        id: Date.now().toString(),
        name: addMedicationDialog.name,
        dosage: addMedicationDialog.dosage,
        notes: addMedicationDialog.notes
      };
      
      const updatedMedications = [...medications, newMedication];
      setMedications(updatedMedications);
      
      // Send ALL medications to context (both new and existing ones)
      const apiMedications = updatedMedications.map(med => ({
        id: med.id,
        name: med.name,
        dosage: med.dosage,
        notes: med.notes || ''
      }));
      
      console.log('📤 Sending medications to context (replacement):', apiMedications);
      updateMedication({ medications: apiMedications });
      
      setAddMedicationDialog({
        open: false,
        name: '',
        dosage: '',
        notes: ''
      });
    }
  };

  const handleDrugSelect = (drug: Drug | null) => {
    console.log('🔍 DRUG SELECTED:', drug);
    setSelectedDrug(drug);
    if (drug) {
      setAddMedicationDialog(prev => ({
        ...prev,
        name: drug.name,
        open: true
      }));
    }
  };

  const handleSearchInputChange = (event: any, newInputValue: string) => {
    setSearchInput(newInputValue);
    
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set a new timeout to enable auto-search after 2 seconds of typing
    if (newInputValue.trim().length > 0) {
      searchTimeoutRef.current = setTimeout(() => {
        setAutoSearchEnabled(true);
        setSearchQuery(newInputValue);
        setIsSearching(true);
      }, 2000);
    } else {
      // If input is cleared, disable auto-search
      setAutoSearchEnabled(false);
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setIsSearching(true);
    setAutoSearchEnabled(true);
  };

  const handleClearSearch = () => {
    console.log('🧹 CLEAR SEARCH BUTTON CLICKED');
    setSearchQuery("");
    setSearchInput("");
    setIsSearching(false);
    setAutoSearchEnabled(false);
    
    // Clear any pending timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    console.log('🧹 CLEANUP EFFECT - Component mounted or about to unmount');
    return () => {
      console.log('🧹 CLEANUP EFFECT - Clearing timeout on unmount');
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Debug logging for drug selection
  useEffect(() => {
    console.log('💊 DRUG SELECTION EFFECT - Selected drug changed:', selectedDrug);
    if (selectedDrug) {
      console.log('💊 Drug selected, fetching details for drug:', selectedDrug.id);
    }
  }, [selectedDrug]);

  // Debug logging for search state
  useEffect(() => {
    console.log('🔍 SEARCH STATE EFFECT - Search state changed');
    console.log('   Search query:', searchQuery);
    console.log('   Search input:', searchInput);
    console.log('   Is searching:', isSearching);
    console.log('   Available drugs count:', availableDrugs.length);
    console.log('   All drugs for autocomplete:', allDrugs.length);
    console.log('   First few options:', allDrugs.slice(0, 3).map(d => ({ name: d.name, category: d.categoryName })));
    console.log('   Dropdown open condition:', searchInput.length > 0 && allDrugs.length > 0);
    console.log('   Search query length:', searchQuery.length);
    console.log('   All drugs length:', allDrugs.length);
  }, [searchQuery, searchInput, isSearching, availableDrugs, allDrugs]);

  const handleCloseDialog = () => {
    setAddMedicationDialog(prev => ({ ...prev, open: false }));
  };

  const handleDeleteMedication = (id: string) => {
    console.log('🗑️ Deleting medication with ID:', id);
    console.log('📋 Current medications before deletion:', medications);
    
    const updatedMedications = medications.filter(med => med.id !== id);
    console.log('📋 Medications after deletion:', updatedMedications);
    
    setMedications(updatedMedications);
    
    // Send ALL medications to context (both new and existing ones)
    const apiMedications = updatedMedications.map(med => ({
      id: med.id,
      name: med.name,
      dosage: med.dosage,
      notes: med.notes || ''
    }));
    
    console.log('📤 Sending to context (replacement):', apiMedications);
    updateMedication({ medications: apiMedications });
    console.log('✅ Context updated with medications (replacement)');
  };

  const isFollowUpMode = typeof window !== 'undefined' && localStorage.getItem('isFollowUpMode') === 'true';
  const followUpClientId = typeof window !== 'undefined' ? Number(localStorage.getItem('followUpClientId') || 0) : 0;

  return (
    <Box sx={{ width: '100%', p: 1, overflow: 'visible' }}>
      {isFollowUpMode && followUpClientId > 0 && (
        <FollowUpPanel clientId={followUpClientId} tab="medication" />
      )}
      <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
        {/* Left Column - Main Content */}
        <Grid item sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2',
          p:2,
          borderRadius:'20px' 
        }} xs={12} lg={8}>
          {/* Search and Add Medications */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2,
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
            }}>
              Search and Add Medications
              {!isSearching && (
                <Typography component="span" sx={{ 
                  fontSize: "12px", 
                  color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                  ml: 1,
                  fontWeight: 400
                }}>
                  ({allDrugsWithCategory.length} drugs available - type to search or select from dropdown)
                </Typography>
              )}
              {isSearching && (
                <Typography component="span" sx={{ 
                  fontSize: "12px", 
                  color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                  ml: 1,
                  fontWeight: 400
                }}>
                  (Search results)
                  {availableDrugs.length > 0 && (
                    <Typography component="span" sx={{ 
                      fontSize: "11px", 
                      color: "#02BE6A",
                      ml: 1,
                      fontWeight: 500
                    }}>
                      {availableDrugs.length} result{availableDrugs.length !== 1 ? 's' : ''} found
                    </Typography>
                  )}
                </Typography>
              )}
            </Typography>
            
            {categoriesError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Failed to load drug categories: {categoriesError.message}
              </Alert>
            )}
            
            {searchError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Failed to search drugs: {searchError.message}
              </Alert>
            )}
            
            {searchLoading && (
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1, 
                mb: 2,
                p: 2,
                backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
                borderRadius: 2,
                border: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e9ecef"
              }}>
                <CircularProgress size={16} />
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#cccccc" : "#666666",
                  fontSize: "12px"
                }}>
                  Searching by drug name or category...
                </Typography>
              </Box>
            )}
            
            <Autocomplete
              options={allDrugs}
              value={selectedDrug}
              onChange={(event, newValue) => {
                console.log('🔍 AUTOCOMPLETE - Drug selected:', newValue);
                handleDrugSelect(newValue);
                // Keep dropdown open after selection for continuous searching
                setSearchInput(newValue ? newValue.name : "");
              }}
              getOptionLabel={(option) => {
                console.log('🔍 AUTOCOMPLETE - Getting option label for:', option);
                return option.name || 'Unknown';
              }}
              loading={searchLoading || categoriesLoading}
              disabled={searchLoading || categoriesLoading}
              inputValue={searchInput}
              onInputChange={(event, newInputValue, reason) => {
                console.log('🔍 AUTOCOMPLETE - Input changed:', { newInputValue, reason });
                if (reason === 'input') {
                  console.log('🔍 AUTOCOMPLETE - User typing, setting 0.5 second delay before search');
                  setSearchInput(newInputValue);
                  
                  // Clear any existing timeout
                  if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                  }
                  
                  // Set a new timeout to trigger search after 0.5 seconds of inactivity
                  if (newInputValue.trim().length > 0) {
                    searchTimeoutRef.current = setTimeout(() => {
                      console.log('🔍 AUTOCOMPLETE - 0.5 seconds of inactivity, triggering search');
                      setSearchQuery(newInputValue);
                      setIsSearching(true);
                    }, 500);
                  } else {
                    // If input is cleared, reset search immediately
                    console.log('🔍 AUTOCOMPLETE - Input cleared, resetting search immediately');
                    setSearchQuery("");
                    setIsSearching(false);
                  }
                } else if (reason === 'clear') {
                  console.log('🔍 AUTOCOMPLETE - Input cleared via clear button');
                  setSearchInput("");
                  setSearchQuery("");
                  setIsSearching(false);
                  
                  // Clear any existing timeout
                  if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                  }
                }
              }}
              // Keep dropdown open while typing, but close it when something is selected
              open={(!selectedDrug && searchInput.length > 0 && allDrugs.length > 0) || isOpen}
              onOpen={() => {
                console.log('🔍 AUTOCOMPLETE - Dropdown opened');
                setIsOpen(true);
              }}
              onClose={(event, reason) => {
                console.log('🔍 AUTOCOMPLETE - Dropdown closed:', reason);
                // Only close on blur or escape, not on selection
                if (reason === 'blur' || reason === 'escape') {
                  setIsOpen(false);
                }
              }}
              autoComplete={false}
              freeSolo={false}
              clearOnBlur={false}
              disablePortal={false}
              PopperComponent={(props) => {
                const { disablePortal, anchorEl, children, ...otherProps } = props;
                return (
                  <div {...otherProps} style={{ ...otherProps.style, zIndex: 1300 }}>
                    {typeof children === 'function' ? children({ placement: 'bottom-start' }) : children}
                  </div>
                );
              }}
              filterOptions={(options, { inputValue }) => {
                return options;
              }}
              noOptionsText=""
              slotProps={{
                popper: {
                  sx: {
                    '& .MuiAutocomplete-noOptions': {
                      display: 'none'
                    }
                  }
                }
              }}
              groupBy={(option) => {
                return option.categoryName || 'Other';
              }}
              renderGroup={(params) => (
                <li key={params.key}>
                  <Box sx={{ 
                    px: 2, 
                    py: 1, 
                    backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "#f5f5f5",
                    borderBottom: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e0e0e0"
                  }}>
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 600, 
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                      fontSize: "14px"
                    }}>
                      {params.group}
                    </Typography>
                  </Box>
                  <ul style={{ padding: 0, margin: 0 }}>
                    {params.children}
                  </ul>
                </li>
              )}
              renderOption={(props, option) => {
                const { key, ...otherProps } = props;
                return (
                  <Box 
                    key={key}
                    component="li" 
                    {...otherProps} 
                    sx={{ 
                      pl: 4, 
                      py: 1,
                      "&:hover": {
                        backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "#f5f5f5"
                      }
                    }}
                  >
                    <Typography variant="body2" sx={{ 
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                      fontSize: "14px"
                    }}>
                      {option.name}
                    </Typography>
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onClick={() => {
                    if (allDrugs.length > 0) {
                      setIsOpen(true);
                    }
                  }}
                  placeholder="Search or select a drug..."
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {(searchLoading || categoriesLoading) ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : (
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {searchInput.trim() && (
                              <IconButton
                                onClick={handleClearSearch}
                                size="small"
                                sx={{
                                  color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                                  "&:hover": {
                                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000"
                                  }
                                }}
                              >
                                <LuXCircle size={16} />
                              </IconButton>
                            )}
                          </Box>
                        )}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                    sx: {
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#02BE6A",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#02BE6A",
                      },
                    }
                  }}
                />
              )}
            />
          </Box>

          {/* Current Medications List */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2,
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
            }}>
              Current Medications
            </Typography>
            
            <TextField
              placeholder="Search current medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#FFFFFF',
                  borderRadius: 2,
                }
              }}
            />

            {filteredMedications.length === 0 ? (
              <Box sx={{ 
                textAlign: 'center', 
                py: 4,
                color: theme.palette.mode === 'dark' ? '#cccccc' : '#666'
              }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {searchQuery ? 'No medications found matching your search.' : 'No medications added yet.'}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#999999' : '#888' }}>
                  Use the search above to find and add medications.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                {filteredMedications.map((medication) => (
                  <Card key={medication.id} sx={{ 
                    mb: 2, 
                    borderRadius: 2,
                    bgcolor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#FFFFFF'
                  }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600,
                            color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                            mb: 1
                          }}>
                            {medication.name}
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            color: theme.palette.mode === 'dark' ? '#cccccc' : '#666',
                            mb: 0.5
                          }}>
                            <strong>Dosage:</strong> {medication.dosage}
                          </Typography>
                          {medication.notes && (
                            <Typography variant="body2" sx={{ 
                              color: theme.palette.mode === 'dark' ? '#cccccc' : '#666'
                            }}>
                              <strong>Notes:</strong> {medication.notes}
                            </Typography>
                          )}
                        </Box>
                        <IconButton
                          size="small"
                          sx={{ 
                            color: theme.palette.mode === 'dark' ? '#f44336' : '#f44336',
                            ml: 1
                          }}
                          onClick={() => handleDeleteMedication(medication.id)}
                          title="Delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>

        </Grid>

        {/* Right Column - ADIME Note Panel */}
        <Grid item xs={12} lg={4} sx={{ alignSelf: 'flex-start' }}>
          <Box sx={{ 
            position: 'sticky',
            top: 80,
            zIndex: 1000,
            height: 'fit-content'
          }}>
            <Card 
              sx={{ 
                borderRadius: 3, 
                boxShadow: 2, 
                maxHeight: 'calc(100vh - 40px)',
                overflow: 'auto',
                bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2',
                width: '100%'
              }}
            >
            <CardContent sx={{ 
              p: 3, 
              bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2' 
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 3, 
                color: '#02BE6A' 
              }}>
                Adime Note
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ 
                  fontWeight: 600, 
                  mb: 2, 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' 
                }}>
                  Assessment
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                  mb: 2, 
                  lineHeight: 1.6 
                }}>
                  {adimeData.assessment}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ 
                  fontWeight: 600, 
                  mb: 2, 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' 
                }}>
                  Client History:
                </Typography>
                <Box sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                  fontSize: '0.875rem', 
                  lineHeight: 1.6 
                }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Client Name:</strong> {adimeData.clientHistory.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Age/Gender:</strong> {adimeData.clientHistory.ageGender}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Ward Type:</strong> {adimeData.clientHistory.wardType}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Physical Activity:</strong> {adimeData.clientHistory.physicalActivity}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Stress Factor:</strong> {adimeData.clientHistory.stressFactor}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Feeding Type:</strong> {adimeData.clientHistory.feedingType}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Lab Results:</strong> {adimeData.clientHistory.labResults}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Current Medications:</strong> {adimeData.clientHistory.medications}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Drug Interaction Check Section */}
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: 2, 
              height: 'fit-content',
              mt: 2,
              bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF'
            }}
          >
            <CardContent sx={{ 
              p: 3, 
              bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2' 
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 3, 
                color: '#02BE6A' 
              }}>
                Drug Interaction Check
              </Typography>
              
              {drugSelection.selectedDrug ? (
                <Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 2 
                  }}>
                    <Typography variant="h6" sx={{ 
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#2c3e50',
                      fontWeight: 600
                    }}>
                      Selected Drug: {drugSelection.selectedDrug.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={clearDrugSelection}
                      sx={{
                        borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                        color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                        textTransform: 'none'
                      }}
                    >
                      Clear
                    </Button>
                  </Box>
                  
                  {detailsLoading && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <CircularProgress size={16} />
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666'
                      }}>
                        Loading drug details...
                      </Typography>
                    </Box>
                  )}

                  {detailsError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      Failed to load drug details: {detailsError.message}
                    </Alert>
                  )}

                  {drugDetails && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ 
                        fontWeight: 600,
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#2c3e50',
                        mb: 1
                      }}>
                        Drug Effect:
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666',
                        mb: 2,
                        p: 2,
                        backgroundColor: theme.palette.mode === 'dark' ? '#111111' : '#f8f9fa',
                        borderRadius: 1,
                        border: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e9ecef"
                      }}>
                        {drugDetails.drug_effect || 'No drug effect information available.'}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ 
                        fontWeight: 600,
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#2c3e50',
                        mb: 1
                      }}>
                        Nutritional Implications:
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666',
                        p: 2,
                        backgroundColor: theme.palette.mode === 'dark' ? '#111111' : '#f8f9fa',
                        borderRadius: 1,
                        border: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e9ecef"
                      }}>
                        {drugDetails.nutritional_implications || 'No nutritional implications information available.'}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666',
                    mb: 2
                  }}>
                    No drug selected. Click below to check for drug interactions with current medications.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={openDrugDialog}
                    sx={{
                      bgcolor: "#02BE6A",
                      '&:hover': { bgcolor: "#02a85a" },
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Select Drug
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Add Medication Dialog */}
      <AddMedicationDialog
        dialogState={addMedicationDialog}
        onDialogChange={handleDialogChange}
        onClose={handleCloseDialog}
        onSave={handleSaveMedication}
      />

      {/* Drug Selection Dialog */}
      <DrugSelectionDialog
        open={drugSelection.isDialogOpen}
        onClose={closeDrugDialog}
        onDrugSelect={selectDrug}
        selectedDrug={drugSelection.selectedDrug}
      />
    </Box>
  );
};

export default Medication;