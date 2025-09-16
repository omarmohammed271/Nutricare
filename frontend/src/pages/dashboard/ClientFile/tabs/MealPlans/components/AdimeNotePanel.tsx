import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import { getThemeColors } from '../constants';

const AdimeNotePanel: React.FC = () => {
  const theme = useTheme();
  const themeColors = getThemeColors(theme);
  
  return (
    <Card 
      sx={{ 
        borderRadius: 2, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: `1px solid ${themeColors.border}`,
        height: 'fit-content',
        position: 'sticky',
        top: 20,
        mt: 3,
        bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            mb: 3, 
            color: themeColors.text.primary,
            fontSize: '1.25rem'
          }}
        >
          Adime Note
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2, 
              color: themeColors.text.primary,
              fontSize: '0.95rem'
            }}
          >
            Assessment
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: themeColors.text.secondary, 
              mb: 2, 
              lineHeight: 1.6,
              fontSize: '0.875rem'
            }}
          >
            The Client Presents With A History Of Type 2 Diabetes And Hypertension, Currently Managed With Medication. Recent Labs Indicate Elevated Fasting Glucose (130 Mg/ DL) And Borderline Cholesterol Levels, Requiring Ongoing Dietary Monitoring.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2, 
              color: themeColors.text.primary,
              fontSize: '0.95rem'
            }}
          >
            Diet History:
          </Typography>
          <Box sx={{ color: themeColors.text.secondary, fontSize: '0.875rem', lineHeight: 1.6 }}>
            <Typography variant="body2" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
              <Box component="span" sx={{ fontWeight: 600, color: themeColors.text.primary }}>Current Plan:</Box> Weight Loss Plan - Week 1
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
              <Box component="span" sx={{ fontWeight: 600, color: themeColors.text.primary }}>Target Calories:</Box> 1800 kcal/day
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
              <Box component="span" sx={{ fontWeight: 600, color: themeColors.text.primary }}>Macro Distribution:</Box> 30% Protein, 40% Carbs, 30% Fat
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
              <Box component="span" sx={{ fontWeight: 600, color: themeColors.text.primary }}>Meal Frequency:</Box> 3 Main Meals + 2 Snacks
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
              <Box component="span" sx={{ fontWeight: 600, color: themeColors.text.primary }}>Restrictions:</Box> Low Sodium, Diabetic-Friendly
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              <Box component="span" sx={{ fontWeight: 600, color: themeColors.text.primary }}>Progress:</Box> Week 1 of 12-week program
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdimeNotePanel;