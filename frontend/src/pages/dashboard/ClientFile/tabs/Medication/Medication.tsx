import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  FileDownload as FileDownloadIcon,
  Print as PrintIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { Medication as MedicationInterface, AddMedicationDialogState, MedicationSummary } from './types';
import { sampleMedications,  interactionAlerts } from './constants';
import { 

  AddMedicationDialog, 

} from './components';

const Medication = () => {
  const [medications, setMedications] = useState<MedicationInterface[]>(sampleMedications);
  const [searchByMedication, setSearchByMedication] = useState('');
  const [searchByCategory, setSearchByCategory] = useState('');
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

  // Sample medication data matching the image
  const medicationData = [
    {
      drugName: 'Calcium carbonate',
      drugEffect: 'Short-term use: diarrhea\nLong-term use: oral candidiasis, diarrhea, epigastric distress, Clostridium difficile',
      nutritionalImplications: 'Use caution with low potassium diets or in patients with renal failure'
    }
  ];

  // Calculate summary statistics
  const summary: MedicationSummary = {
    activeMedications: medications.filter(med => med.status === 'Active').length,
    drugInteractions: interactionAlerts.hasInteractions ? 2 : 0,
    completed: medications.filter(med => med.status === 'Completed').length,
    discontinued: medications.filter(med => med.status === 'Discontinued').length
  };



  const handleDialogChange = (field: keyof AddMedicationDialogState, value: string) => {
    setAddMedicationDialog(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveMedication = () => {
    if (addMedicationDialog.name && addMedicationDialog.dosage && addMedicationDialog.frequency) {
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
      
      setMedications(prev => [...prev, newMedication]);
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

  const handleCloseDialog = () => {
    setAddMedicationDialog(prev => ({ ...prev, open: false }));
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  };

  return (
    <Box sx={{ width: '100%', p: 1 , }}>
      <Grid container spacing={3}>
        {/* Left Column - Main Content */}
        <Grid item sx={{bgcolor: '#F9F4F2',height:'100%' , p:2 ,borderRadius:'20px' }} xs={12} lg={8}>
          {/* Search Filters */}
          <Box sx={{ mb: 3    }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Search By Medication</InputLabel>
                  <Select
                    value={searchByMedication}
                    label="Search By Medication"
                    onChange={(e) => setSearchByMedication(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  >
                    <MenuItem value="">All Medications</MenuItem>
                    <MenuItem value="calcium-carbonate">Calcium carbonate</MenuItem>
                    <MenuItem value="metformin">Metformin</MenuItem>
                    <MenuItem value="lisinopril">Lisinopril</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Search by Category</InputLabel>
                  <Select
                    value={searchByCategory}
                    label="Search by Category"
                    onChange={(e) => setSearchByCategory(e.target.value)}
                
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="supplements">Supplements</MenuItem>
                    <MenuItem value="diabetes">Diabetes</MenuItem>
                    <MenuItem value="cardiovascular">Cardiovascular</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Medication Table */}
          <Card sx={{ borderRadius: 0 ,boxShadow:'none' , bgcolor: '#F9F4F2' }}>
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F9F4F2'  }}>
                      <TableCell sx={{ fontWeight: 700,  py: 2 }}>Drug Name</TableCell>
                      <TableCell sx={{ fontWeight: 700,  py: 2 }}>Drug Effect</TableCell>
                      <TableCell sx={{ fontWeight: 700,  py: 2 }}>Nutritional Implications And Cautions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {medicationData.map((medication, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          
                     
                          '&:hover': { bgcolor: '#f8fff8' },
                          '&:nth-of-type(even)': { bgcolor: '#fafafa' }
                        }}
                      >
                        <TableCell sx={{  verticalAlign: 'top' ,bgcolor: 'white' , borderRadius:4 ,p:4, height:'fit-content' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {medication.drugName}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top' ,bgcolor: 'white' , borderRadius:4 ,p:4 }}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: 600,
                            color: '#666',
                            lineHeight: 1.5,
                            whiteSpace: 'pre-line'
                          }}>
                            {medication.drugEffect}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top' ,bgcolor: 'white' , borderRadius:4 ,p:4}}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: 600,
                            color: '#666',
                            lineHeight: 1.5,
                            whiteSpace: 'pre-line'
                          }}>
                            {medication.nutritionalImplications}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - ADIME Note Panel */}
        <Grid item xs={12} lg={4}>
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: 2, 
              height: 'fit-content',
              position: 'sticky',
              top: 20
            }}
          >
            <CardContent sx={{ p: 3 , bgcolor: '#F9F4F2' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#02BE6A' }}>
                Adime Note
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                  Assessment
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 2, lineHeight: 1.6 }}>
                  The Client Presents With A History Of Type 2 Diabetes And Hypertension, Currently Managed With Medication. Recent Labs Indicate Elevated Fasting Glucose (130 Mg/ DL) And Borderline Cholesterol Levels, Requiring Ongoing Dietary Monitoring.
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                  Clint History:
                </Typography>
                <Box sx={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Client Name:</strong> Ayesha Malik
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Age/Gender:</strong> 32-Year-Old Female
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Primary Diagnosis:</strong> Type 2 Diabetes Mellitus
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Nutrition-Related Complaints/Symptoms:</strong> Frequent Fatigue, Sugar Cravings, Occasional Bloating
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Current Diet Pattern:</strong> Following A High-Carbohydrate, Low-Fiber Diet With Fair Appetite
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Known Allergies:</strong> Allergic To Shellfish
                  </Typography>
                  <Typography variant="body2">
                    <strong>NRS Score:</strong> NRS-2002 Score: 3 (At Risk Of Malnutrition)
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