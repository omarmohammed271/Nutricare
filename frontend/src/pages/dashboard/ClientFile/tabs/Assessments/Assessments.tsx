import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  useTheme,
  Collapse,
  IconButton,
  Typography
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { AssessmentData, CalculationResults, AdimeNote } from './types';
import { defaultAssessmentData, defaultCalculations, defaultAdimeNote } from './constants';
import { AssessmentForm, CalculationsPanel, AdimeNotePanel } from './components';
import { useClientFile } from '../../context/ClientFileContext';
import { assessmentValidationSchema } from '../../validation/clientFileValidation';

const Assessments = () => {
  const theme = useTheme();
  const { formData: contextData, updateAssessment } = useClientFile();
  const [formData, setFormData] = useState<AssessmentData>(defaultAssessmentData);
  const [calculations, setCalculations] = useState<CalculationResults>(defaultCalculations);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [editingFields, setEditingFields] = useState<Set<string>>(new Set());
  const [calculationsExpanded, setCalculationsExpanded] = useState<boolean>(true);
  const [adimeNoteExpanded, setAdimeNoteExpanded] = useState<boolean>(true);

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
        clientName: assessment.name || "Not provided",
        ageGender: `${age}-Year-Old ${assessment.gender === 'male' ? 'Male' : 'Female'}`,
        primaryDiagnosis: assessment.wardType || "Not specified",
        nutritionRelatedComplaints: assessment.stressFactor || "Not specified",
        currentDietPattern: assessment.feedingType || "Not specified",
        knownAllergies: assessment.physicalActivity || "Not specified",
        nrsScore: `NRS-2002 Score: ${biochemical.labResults.length + medication.medications.length} (Assessment in progress)`
      }
    };
  };

  const dynamicAdimeNote = generateAdimeNote();

  // Load data from context on mount and when context changes
  useEffect(() => {
    console.log('📥 Loading context data into form:', contextData.assessment);
    console.log('📥 Current form data:', formData);
    console.log('📥 Editing fields count:', editingFields.size);
    
    // Check if context has meaningful data to load
    const hasContextData = contextData.assessment && 
      Object.values(contextData.assessment).some(value => value && value !== '');
    
    console.log('📥 Has context data:', hasContextData);
    
    // Also check if current form data is empty and context has data
    const currentFormEmpty = !formData.name && !formData.gender && !formData.dateOfBirth;
    const shouldLoadData = hasContextData || (currentFormEmpty && contextData.assessment);
    
    console.log('📥 Current form empty:', currentFormEmpty);
    console.log('📥 Should load data:', shouldLoadData);
    
    if (shouldLoadData) {
      console.log('✅ Updating form data from context');
      setFormData(contextData.assessment);
    } else {
      console.log('⏭️ No meaningful context data to load');
    }
  }, [contextData.assessment, formData]);

  // Additional useEffect to check localStorage directly if context fails
  useEffect(() => {
    const isEditMode = localStorage.getItem('isEditMode') === 'true';
    const currentFormEmpty = !formData.name && !formData.gender && !formData.dateOfBirth;
    
    if (isEditMode && currentFormEmpty) {
      console.log('🔍 Edit mode detected with empty form, checking localStorage directly...');
      const savedData = localStorage.getItem('clientFileData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          console.log('📋 Found saved data in localStorage:', parsedData.assessment);
          
          if (parsedData.assessment && Object.values(parsedData.assessment).some(value => value && value !== '')) {
            console.log('✅ Loading data directly from localStorage');
            setFormData(parsedData.assessment);
            // Also update the context
            updateAssessment(parsedData.assessment);
          }
        } catch (error) {
          console.error('❌ Error parsing saved data:', error);
        }
      }
    }
  }, [formData, updateAssessment]);

  // Debug: Log whenever formData changes
  useEffect(() => {
    console.log('📝 Form data changed:', formData);
  }, [formData]);

  const handleInputChange = (field: keyof AssessmentData) => (event: any) => {
    const newValue = event.target.value;
    const updatedData = {
      ...formData,
      [field]: newValue
    };
    
    console.log(`🔄 Assessment field changed: ${field} = ${newValue}`);
    console.log('📝 Updated data:', updatedData);
    
    // Mark field as being edited
    setEditingFields(prev => new Set(prev).add(field));
    
    setFormData(updatedData);
    
    // Update context
    updateAssessment(updatedData);
    
    console.log('✅ Context updated with:', updatedData);
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInputBlur = (field: keyof AssessmentData) => () => {
    // Remove field from editing set when user finishes editing
    setEditingFields(prev => {
      const newSet = new Set(prev);
      newSet.delete(field);
      return newSet;
    });
    console.log(`✅ Finished editing field: ${field}`);
  };

  const handleMacroSliderChange = (macro: keyof typeof calculations.macronutrients) => (event: Event, newValue: number | number[]) => {
    const value = newValue as number;
    setCalculations(prev => ({
      ...prev,
      macronutrients: {
        ...prev.macronutrients,
        [macro]: value
      }
    }));
  };

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      <Grid container spacing={3}>
        {/* Left Side - Assessment Form */}
        <Grid item xs={12} md={7}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 2, 
            bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2', 
            mb: 3 
          }}>
            <CardContent sx={{ p: 3 }}>
              <AssessmentForm 
                formData={formData}
                onInputChange={handleInputChange}
                onInputBlur={handleInputBlur}
                validationErrors={validationErrors}
              />

              {/* Submit Button */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 4,
                  py: 2,
                  bgcolor: '#02BE6A',
                  '&:hover': { bgcolor: '#01A85A' },
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Nutrition Risk Screening
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - Calculations and Notes */}
        <Grid item xs={12} md={5}>
          {/* Real-Time Auto Calculations */}
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 2, 
            mb: 3,
            bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 2,
              borderBottom: calculationsExpanded ? '1px solid #e0e0e0' : 'none'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#fff' : '#333' }}>
                Real-Time Auto Calculations
              </Typography>
              <IconButton 
                onClick={() => setCalculationsExpanded(!calculationsExpanded)}
                sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#333' }}
              >
                {calculationsExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
            <Collapse in={calculationsExpanded}>
              <CardContent sx={{ p: 3 }}>
                <CalculationsPanel 
                  calculations={calculations}
                  onMacroSliderChange={handleMacroSliderChange}
                />
              </CardContent>
            </Collapse>
          </Card>

          {/* ADIME Note */}
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 2,
            bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 2,
              borderBottom: adimeNoteExpanded ? '1px solid #e0e0e0' : 'none'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#fff' : '#333' }}>
                ADIME Note
              </Typography>
              <IconButton 
                onClick={() => setAdimeNoteExpanded(!adimeNoteExpanded)}
                sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#333' }}
              >
                {adimeNoteExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
            <Collapse in={adimeNoteExpanded}>
              <CardContent sx={{ p: 3 }}>
                <AdimeNotePanel adimeNote={dynamicAdimeNote} />
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Assessments;