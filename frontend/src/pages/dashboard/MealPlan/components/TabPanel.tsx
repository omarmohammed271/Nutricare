import React from 'react';
import { Box } from '@mui/material';
import { TabPanelProps } from '../types/mealPlanTypes';

export const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`template-tabpanel-${index}`}
      aria-labelledby={`template-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ width: '100%' }}>
          {children}
        </Box>
      )}
    </Box>
  );
};