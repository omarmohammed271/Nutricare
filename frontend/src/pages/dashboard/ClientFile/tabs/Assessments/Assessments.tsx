import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  useTheme
} from '@mui/material';
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

  // Load data from context on mount
  useEffect(() => {
    console.log('📥 Loading context data into form:', contextData.assessment);
    setFormData(contextData.assessment);
  }, [contextData.assessment]);

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
            <CardContent sx={{ p: 3 }}>
              <CalculationsPanel 
                calculations={calculations}
                onMacroSliderChange={handleMacroSliderChange}
              />
            </CardContent>
          </Card>

          {/* ADIME Note */}
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 2,
            bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2'
          }}>
            <CardContent sx={{ p: 3 }}>
              <AdimeNotePanel adimeNote={dynamicAdimeNote} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Assessments;