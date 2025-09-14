import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import { AssessmentData, CalculationResults, AdimeNote } from './types';
import { defaultAssessmentData, defaultCalculations, defaultAdimeNote } from './constants';
import { AssessmentForm, CalculationsPanel, AdimeNotePanel } from './components';

const Assessments = () => {
  const [formData, setFormData] = useState<AssessmentData>(defaultAssessmentData);
  const [calculations, setCalculations] = useState<CalculationResults>(defaultCalculations);
  const [adimeNote] = useState<AdimeNote>(defaultAdimeNote);

  const handleInputChange = (field: keyof AssessmentData) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
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
          <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: '#F9F4F2', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <AssessmentForm 
                formData={formData}
                onInputChange={handleInputChange}
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
          <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 ,bgcolor: '#F9F4F2' }}>
            <CardContent sx={{ p: 3 }}>
              <CalculationsPanel 
                calculations={calculations}
                onMacroSliderChange={handleMacroSliderChange}
              />
            </CardContent>
          </Card>

          {/* ADIME Note */}
          <Card sx={{ borderRadius: 3, boxShadow: 2 , bgcolor: '#F9F4F2' }}>
            <CardContent sx={{ p: 3 }}>
              <AdimeNotePanel adimeNote={adimeNote} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Assessments;