import React from 'react';
import { Box, Typography } from '@mui/material';

const Mealplan  = () => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ color: '#4CAF50', mb: 2 }}>
        Overview Tab
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Overview content goes here
      </Typography>
    </Box>
  );
};

export default Mealplan;
