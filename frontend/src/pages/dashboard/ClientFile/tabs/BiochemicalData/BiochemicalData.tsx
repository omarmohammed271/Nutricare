import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme
} from '@mui/material';
import { LabResult } from '../../types/clientFileTypes';
import { AddTestDialogState, BiochemicalSummary } from './types';
import { TestResultsTable, AddTestDialog } from './components';
import { useClientFile } from '../../context/ClientFileContext';

const BiochemicalData = () => {
  const theme = useTheme();
  const { formData: contextData, updateBiochemical, existingData } = useClientFile();
  const [tests, setTests] = useState<LabResult[]>([]);
  const [addTestDialog, setAddTestDialog] = useState<AddTestDialogState>({
    open: false,
    test_name: '',
    result: '',
    reference_range: '',
    interpretation: '',
    file: null,
    date: new Date().toISOString().split('T')[0]
  });

  // Load existing lab results from API data (for display only, not for editing)
  useEffect(() => {
    if (existingData.labResults.length > 0) {
      setTests(existingData.labResults);
    } else {
      setTests([]);
    }
  }, [existingData.labResults]);

  // Clear local lab results when form context is cleared (after submission)
  useEffect(() => {
    if (contextData.biochemical.labResults.length === 0 && tests.some(test => !test.id || test.id < 1000)) {
      // Only clear new lab results, keep existing ones
      const existingTests = tests.filter(test => test.id && test.id >= 1000);
      setTests(existingTests);
      console.log('🧹 Cleared new lab results from local state after form context was cleared');
    }
  }, [contextData.biochemical.labResults, tests]);

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

  // Calculate summary statistics - simplified since we don't have status field
  const summary: BiochemicalSummary = {
    highValues: 0,
    normalValues: tests.length,
    lowValues: 0,
    criticalValues: 0
  };

  const handleAddTest = () => {
    setAddTestDialog({
      open: true,
      test_name: '',
      result: '',
      reference_range: '',
      interpretation: '',
      file: null,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleDialogChange = (field: keyof AddTestDialogState, value: string | File | null) => {
    setAddTestDialog(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveTest = () => {
    if (addTestDialog.test_name && addTestDialog.result) {
      const newTest: LabResult = {
        id: Date.now(), // Generate unique ID
        test_name: addTestDialog.test_name,
        result: addTestDialog.result,
        reference_range: addTestDialog.reference_range,
        interpretation: addTestDialog.interpretation,
        file: addTestDialog.file || null, // Store null instead of empty string
        date: addTestDialog.date
      };
      
      const updatedTests = [...tests, newTest];
      setTests(updatedTests);
      
      // Only send NEW lab results to context (not existing ones from API)
      const newTests = tests.filter(test => !test.id || test.id < 1000); // Existing tests have IDs from API (usually > 1000)
      const contextTests = [...newTests, newTest];
      updateBiochemical({ labResults: contextTests });
      
      setAddTestDialog({
        open: false,
        test_name: '',
        result: '',
        reference_range: '',
        interpretation: '',
        file: null,
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleCloseDialog = () => {
    setAddTestDialog(prev => ({ ...prev, open: false }));
  };

  const handleDeleteTest = (id: number) => {
    const updatedTests = tests.filter(test => test.id !== id);
    setTests(updatedTests);
    
    // Only send NEW lab results to context (not existing ones from API)
    const newTests = updatedTests.filter(test => !test.id || test.id < 1000); // Existing tests have IDs from API (usually > 1000)
    updateBiochemical({ labResults: newTests });
  };

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      <Grid container spacing={3}>
        {/* Main Content - Left Side */}
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 2,
            bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2'
          }}>
            <CardContent sx={{ p: 3 }}>
              <TestResultsTable 
                tests={tests}
                onDeleteTest={handleDeleteTest}
                onAddTest={handleAddTest}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Side Panel - Right Side */}
        <Grid item xs={12} md={4}>
          {/* ADIME Note Panel */}
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 2,
            bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 2,
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }}>
                Adime Note
              </Typography>
              
              <Typography variant="body2" sx={{ 
                fontWeight: 600, 
                mb: 1,
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }}>
                Assessment
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                mb: 3, 
                lineHeight: 1.5 
              }}>
                {adimeData.assessment}
              </Typography>

              <Typography variant="body2" sx={{ 
                fontWeight: 600, 
                mb: 2,
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }}>
                Client History:
              </Typography>
              
              <Box sx={{ '& > div': { mb: 1 } }}>
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Client Name: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    {adimeData.clientHistory.name}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Age/Gender: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    {adimeData.clientHistory.ageGender}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Ward Type: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    {adimeData.clientHistory.wardType}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Physical Activity: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    {adimeData.clientHistory.physicalActivity}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Stress Factor: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    {adimeData.clientHistory.stressFactor}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Feeding Type: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    {adimeData.clientHistory.feedingType}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Lab Results: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    {adimeData.clientHistory.labResults}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Current Medications: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    {adimeData.clientHistory.medications}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Test Dialog */}
      <AddTestDialog
        dialogState={addTestDialog}
        onDialogChange={handleDialogChange}
        onClose={handleCloseDialog}
        onSave={handleSaveTest}
      />
    </Box>
  );
};

export default BiochemicalData;