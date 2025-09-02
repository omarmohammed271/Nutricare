import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { NutritionData } from '../types/recipeTypes';
import { FORM_STYLES } from '../constants/recipeConstants';

interface NutritionAnalysisPanelProps {
  nutritionData: NutritionData;
}

const CircularProgress: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <Box sx={{ textAlign: 'center', mb: 2 }}>
    <Box
      sx={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        border: '4px solid #E5E7EB',
        position: 'relative',
        mx: 'auto',
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '4px solid transparent',
          borderTopColor: '#22C55E',
          transform: `rotate(${(value / 100) * 360}deg)`,
          transition: 'transform 0.3s ease',
        }}
      />
      <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>
        {value}%
      </Typography>
    </Box>
    <Typography sx={{ fontSize: '12px', color: '#6B7280' }}>
      {label}
    </Typography>
  </Box>
);

const NutritionAnalysisPanel: React.FC<NutritionAnalysisPanelProps> = ({ nutritionData }) => {
  return (
    <Box>
      <Typography sx={FORM_STYLES.sectionTitle}>
        Global Analysis
      </Typography>
      
      {/* Energy */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#374151', mb: 1 }}>
          Energy
        </Typography>
        <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#1F2937' }}>
          {nutritionData.energy} kcal
        </Typography>
      </Box>

      {/* Circular Progress Indicators */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
        <CircularProgress value={nutritionData.fat} label="Fat" />
        <CircularProgress value={nutritionData.carbohydrates} label="Carbohydrates" />
        <CircularProgress value={nutritionData.protein} label="Protein" />
        <CircularProgress value={nutritionData.fiber} label="Fiber" />
      </Box>

      {/* Macronutrients Section */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#374151', mb: 2 }}>
          Macronutrients
        </Typography>
        <Box sx={{ height: 2, backgroundColor: '#E5E7EB', borderRadius: 1 }} />
      </Box>

      {/* Micronutrients Section */}
      <Box>
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#374151', mb: 2 }}>
          Micronutrients
        </Typography>
        <Box sx={{ height: 2, backgroundColor: '#E5E7EB', borderRadius: 1 }} />
      </Box>
    </Box>
  );
};

export default NutritionAnalysisPanel;