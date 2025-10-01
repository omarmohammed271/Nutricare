import React, { useState, useEffect, useCallback } from 'react';
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
  CircularProgress
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Medication as MedicationInterface, AddMedicationDialogState } from './types';
import { interactionAlerts } from './constants';
import { AddMedicationDialog } from './components';
import { useClientFile } from '../../context/ClientFileContext';
import { useDrugCategories, useSearchDrugs } from '@src/hooks/useNutritionApi';
import { Drug } from '@src/services/nutritionApi';

const Medication = () => {
  const theme = useTheme();
  const { formData: contextData, updateMedication } = useClientFile();
  const [medications, setMedications] = useState<MedicationInterface[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addMedicationDialog, setAddMedicationDialog] = useState<AddMedicationDialogState>({
    open: false,
    name: '',
    dosage: '',
    frequency: '',
    route: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    prescribedBy: '',
    indication: '',
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

  // Load data from context on mount
  useEffect(() => {
    if (contextData.medication.medications.length > 0) {
      // Convert MedicationApi to MedicationInterface format
      const contextMedications = contextData.medication.medications.map(med => ({
        id: Date.now().toString() + Math.random(),
        name: med.name,
        dosage: med.dosage,
        frequency: 'Daily', // Default frequency
        route: 'Oral', // Default route
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        prescribedBy: 'Dr. Smith', // Default prescriber
        indication: 'Treatment', // Default indication
        notes: med.notes || '',
        status: 'Active' as const
      }));
      setMedications(contextMedications);
    }
  }, [contextData.medication.medications]);

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

  // Load data from context on mount
  useEffect(() => {
    if (contextData.medication.medications.length > 0) {
      const contextMedications = contextData.medication.medications.map((med, index) => ({
        id: index.toString(),
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
      setMedications(contextMedications);
    }
  }, [contextData.medication.medications]);

  const handleSaveMedication = () => {
    if (addMedicationDialog.name && addMedicationDialog.dosage) {
      const newMedication: MedicationInterface = {
        id: Date.now().toString(),
        name: addMedicationDialog.name,
        dosage: addMedicationDialog.dosage,
        frequency: addMedicationDialog.frequency,
        route: addMedicationDialog.route,
        startDate: addMedicationDialog.startDate,
        endDate: addMedicationDialog.endDate || undefined,
        prescribedBy: addMedicationDialog.prescribedBy,
        indication: addMedicationDialog.indication,
        status: 'Active',
        notes: addMedicationDialog.notes
      };
      
      const updatedMedications = [...medications, newMedication];
      setMedications(updatedMedications);
      
      // Update context with medications in API format
      const apiMedications = updatedMedications.map(med => ({
        name: med.name,
        dosage: med.dosage,
        notes: med.notes || ''
      }));
      
      updateMedication({ medications: apiMedications });
      
      setAddMedicationDialog({
        open: false,
        name: '',
        dosage: '',
        frequency: '',
        route: '',
        startDate: '',
        endDate: '',
        prescribedBy: '',
        indication: '',
        notes: ''
      });
    }
  };

  const handleDrugSelect = (drug: Drug | null) => {
    setSelectedDrug(drug);
    if (drug) {
      setAddMedicationDialog(prev => ({
        ...prev,
        name: drug.name,
        open: true
      }));
    }
  };

  const handleCloseDialog = () => {
    setAddMedicationDialog(prev => ({ ...prev, open: false }));
  };

  const handleDeleteMedication = (id: string) => {
    const updatedMedications = medications.filter(med => med.id !== id);
    setMedications(updatedMedications);
    
    // Update context with medications in API format
    const apiMedications = updatedMedications.map(med => ({
      name: med.name,
      dosage: med.dosage,
      notes: med.notes || ''
    }));
    
    updateMedication({ medications: apiMedications });
  };

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      <Grid container spacing={3}>
        {/* Left Column - Main Content */}
        <Grid item sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2',
          height:'100%', 
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
            </Typography>
            
            <Autocomplete
              options={searchResults || []}
              value={selectedDrug}
              onChange={(event, newValue) => handleDrugSelect(newValue)}
              getOptionLabel={(option) => option.name || ''}
              isOptionEqualToValue={(option, value) => !!option && !!value && option.id === value.id}
              loading={searchLoading || categoriesLoading}
              disabled={searchLoading || categoriesLoading}
              onInputChange={useCallback((event: any, newInputValue: string) => {
                if (event) {
                  setSearchQuery(newInputValue);
                }
              }, [])}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search for medications..."
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {(searchLoading || categoriesLoading) ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#FFFFFF',
                      borderRadius: 2,
                    }
                  }}
                />
              )}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props as any;
                return (
                  <Box key={key} component="li" {...optionProps}>
                    <Typography variant="body2">
                      {option.name}
                    </Typography>
                  </Box>
                );
              }}
              noOptionsText="No medications found"
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
                          <Typography variant="body2" sx={{ 
                            color: theme.palette.mode === 'dark' ? '#cccccc' : '#666',
                            mb: 0.5
                          }}>
                            <strong>Frequency:</strong> {medication.frequency}
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            color: theme.palette.mode === 'dark' ? '#cccccc' : '#666',
                            mb: 0.5
                          }}>
                            <strong>Route:</strong> {medication.route}
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
        <Grid item xs={12} lg={4}>
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: 2, 
              height: 'fit-content',
              position: 'sticky',
              top: 20,
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
        </Grid>
      </Grid>

      {/* Add Medication Dialog */}
      <AddMedicationDialog
        dialogState={addMedicationDialog}
        onDialogChange={handleDialogChange}
        onClose={handleCloseDialog}
        onSave={handleSaveMedication}
      />
    </Box>
  );
};

export default Medication;