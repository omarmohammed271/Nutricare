import React from 'react';
import { Box, Typography, LinearProgress, useTheme } from '@mui/material';
import { NutritionData } from '../types/recipeTypes';
import { FORM_STYLES } from '../constants/recipeConstants';

interface NutritionAnalysisPanelProps {
  nutritionData: NutritionData;
}

const CircularProgress: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `conic-gradient(${color} ${value * 3.6}deg, ${theme.palette.mode === 'dark' ? '#2d2d2d' : '#E5E7EB'} ${value * 3.6}deg)`,
          position: 'relative',
          mx: 'auto',
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '60px',
            height: '60px',
            backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : 'white',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        }}
      >
        <Typography 
          sx={{ 
            fontSize: '14px', 
            fontWeight: 700, 
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#374151',
            position: 'relative',
            zIndex: 1
          }}
        >
          {value || 0}%
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '13px', color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#6B7280', fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  );
};

const NutritionAnalysisPanel: React.FC<NutritionAnalysisPanelProps> = ({ nutritionData }) => {
  const theme = useTheme();
  
  return (
    <Box>
      <Typography sx={{ 
        ...FORM_STYLES.sectionTitle,
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#1F2937'
      }}>
        Global Analysis
      </Typography>
      
      {/* Energy */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 500, color: theme.palette.mode === 'dark' ? '#d4d4d4' : '#374151', mb: 1 }}>
          Energy
        </Typography>
        <Typography sx={{ fontSize: '24px', fontWeight: 700, color: theme.palette.mode === 'dark' ? '#ffffff' : '#1F2937' }}>
          {nutritionData.energy} kcal
        </Typography>
      </Box>

      {/* Circular Progress Indicators */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
        <CircularProgress value={nutritionData.fat || 25} label="Fat" color="#EF4444" />
        <CircularProgress value={nutritionData.carbohydrates || 45} label="Carbohydrates" color="#F59E0B" />
        <CircularProgress value={nutritionData.protein || 30} label="Protein" color="#10B981" />
        <CircularProgress value={nutritionData.fiber || 15} label="Fiber" color="#8B5CF6" />
      </Box>

      {/* Macronutrients Section */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: theme.palette.mode === 'dark' ? '#ffffff' : '#374151', mb: 2 }}>
          Macronutrients
        </Typography>
        <Box sx={{ height: 2, backgroundColor: theme.palette.mode === 'dark' ? '#404040' : '#E5E7EB', borderRadius: 1 }} />
      </Box>

      {/* Micronutrients Section */}
      <Box>
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: theme.palette.mode === 'dark' ? '#ffffff' : '#374151', mb: 2 }}>
          Micronutrients
        </Typography>
        <Box sx={{ height: 2, backgroundColor: theme.palette.mode === 'dark' ? '#404040' : '#E5E7EB', borderRadius: 1 }} />
      </Box>
    </Box>
  );
};

export default NutritionAnalysisPanel;