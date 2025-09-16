import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Slider,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import { CalculationResults } from '../types';

interface CalculationsPanelProps {
  calculations: CalculationResults;
  onMacroSliderChange: (macro: keyof CalculationResults['macronutrients']) => (event: Event, newValue: number | number[]) => void;
}

const CalculationsPanel: React.FC<CalculationsPanelProps> = ({ calculations, onMacroSliderChange }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#02BE6A' }}>
        Real-Time Auto Calculations
      </Typography>
      
      {/* Calculation Values */}
      <Grid container spacing={2}>
        {[
          { label: 'BMI', subLabel: 'Body Mass Index', value: '22.2 kg/m²' },
          { label: 'Adjusted Body Weight', value: '22.2 kg' },
          { label: 'IBW', subLabel: 'Ideal Body Weight', value: '23 kg/m²' },
          { label: 'BMR', subLabel: 'Basal Metabolic Rate', value: '1272 kcal' },
          { label: 'Mifflin Equation', value: '22.2 kg' },
          { label: 'TDEE', subLabel: 'Total Daily Energy Expenditure', value: '1970 kcal' },
          { label: 'Fluid Requirement', subLabel: 'Holiday-Segar Method', value: '4 mL/kg/hr' }
        ].map((item, index) => (
          <Grid item xs={12} key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.mode ==='dark' ? '#fff': '#666'  }}>
                  {item.label}
                </Typography>
                {item.subLabel && (
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    {item.subLabel}
                  </Typography>
                )}
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#02BE6A' }}>
                {item.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Macronutrients Distribution */}
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
        Macronutrients Distribution %
      </Typography>
      
      <Grid container spacing={3}>
        {[
          { label: 'Carbs', value: calculations.macronutrients.carbs, color: '#02BE6A' },
          { label: 'Proteins', value: calculations.macronutrients.proteins, color: '#02BE6A' },
          { label: 'Fats', value: calculations.macronutrients.fats, color: '#02BE6A' }
        ].map((macro) => (
          <Grid item xs={12} key={macro.label}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
              {macro.label}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Slider
                  value={macro.value}
                  onChange={onMacroSliderChange(macro.label.toLowerCase() as keyof CalculationResults['macronutrients'])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  sx={{ color: macro.color }}
                />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '30px' }}>
                {macro.value}%
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography variant="caption" sx={{ color: '#666', mt: 2, display: 'block' }}>
        This result was calculated using the Mifflin-St Jeor Equation
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          bgcolor: '#02BE6A',
          '&:hover': { bgcolor: '#01A85A' },
          borderRadius: 2,
          fontWeight: 600
        }}
      >
        Add New Equation
      </Button>
    </Box>
  );
};

export default CalculationsPanel;