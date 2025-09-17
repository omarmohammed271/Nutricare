import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme
} from '@mui/material';
import { BiochemicalTest, AddTestDialogState, BiochemicalSummary } from './types';
import { sampleBiochemicalTests } from './constants';
import { TestResultsTable, AddTestDialog } from './components';

const BiochemicalData = () => {
  const theme = useTheme();
  const [tests, setTests] = useState<BiochemicalTest[]>(sampleBiochemicalTests);
  const [addTestDialog, setAddTestDialog] = useState<AddTestDialogState>({
    open: false,
    testName: '',
    result: '',
    referenceRange: '',
    unit: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Calculate summary statistics
  const summary: BiochemicalSummary = {
    highValues: tests.filter(test => test.status === 'High').length,
    normalValues: tests.filter(test => test.status === 'Normal').length,
    lowValues: tests.filter(test => test.status === 'Low').length,
    criticalValues: tests.filter(test => test.status === 'Critical').length
  };

  const handleAddTest = () => {
    setAddTestDialog({
      open: true,
      testName: '',
      result: '',
      referenceRange: '',
      unit: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const handleDialogChange = (field: keyof AddTestDialogState, value: string) => {
    setAddTestDialog(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveTest = () => {
    if (addTestDialog.testName && addTestDialog.result) {
      const newTest: BiochemicalTest = {
        id: Date.now().toString(),
        testName: addTestDialog.testName,
        result: addTestDialog.result,
        referenceRange: addTestDialog.referenceRange,
        unit: addTestDialog.unit,
        status: 'Normal', // Default status, should be calculated based on reference range
        date: addTestDialog.date,
        notes: addTestDialog.notes
      };
      
      setTests(prev => [...prev, newTest]);
      setAddTestDialog({
        open: false,
        testName: '',
        result: '',
        referenceRange: '',
        unit: '',
        date: '',
        notes: ''
      });
    }
  };

  const handleCloseDialog = () => {
    setAddTestDialog(prev => ({ ...prev, open: false }));
  };

  const handleDeleteTest = (id: string) => {
    setTests(prev => prev.filter(test => test.id !== id));
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
                The Client Presents With A History Of Type 2 Diabetes And Hypertension, 
                Currently Managed With Medication. Recent Labs Indicate Elevated Fasting 
                Glucose (130 Mg/DL) And Borderline Cholesterol Levels, Requiring Ongoing 
                Dietary Monitoring.
              </Typography>

              <Typography variant="body2" sx={{ 
                fontWeight: 600, 
                mb: 2,
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }}>
                Clint History:
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
                    Ayesha Malik
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
                    32-Year-Old Female
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Primary Diagnosis: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    Type 2 Diabetes Mellitus
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Nutrition-Related Complaints/Symptoms: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    Frequent Fatigue, Sugar Cravings, Occasional Bloating
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Current Diet Pattern: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    Following A High-Carbohydrate, Low-Fiber Diet With Fair Appetite
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    Known Allergies: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    Allergic To Shellfish
                  </Typography>
                </Box>
                
                <Box>
                  <Typography component="span" variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    NRS Score: 
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    ml: 1 
                  }}>
                    NRS-2002 Score: 3 (At Risk Of Malnutrition)
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