import React from 'react';
import { Box, Typography } from '@mui/material';

interface RecipeOvenCardProps {
  title: string;
  value: string;
  isMainSearch?: boolean;
  subtitle?: string;
}

const RecipeOvenCard = ({ title, value, isMainSearch = false, subtitle }: RecipeOvenCardProps) => {
  return (
    <Box
      sx={{
    
        p: 3,
        borderRadius: 3,
        bgcolor: '#02BE6A', // Green background like in the image
        color: 'white',
        width: '29%',
        minHeight: 120,
        textAlign: 'left',
        boxShadow: '0 4px 12px rgba(2, 190, 106, 0.3)',
        position: 'relative',
        overflow: 'hidden',
     
      }}
    >
      {/* Title */}
      <Typography 
        variant="body1" 
        sx={{ 
          fontWeight: 600,
          mb: 1,
          opacity: 0.9,
          position: 'relative',
          zIndex: 1
        }}
      >
        {title}
      </Typography>
      
      {/* Value */}
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 'bold',
          fontSize: isMainSearch && value === 'Avocado Toast' ? '1.2rem' : '2.5rem',
          lineHeight: 1,
          position: 'relative',
          zIndex: 1
        }}
      >
        {value}
      </Typography>
      
      {/* Subtitle */}
      {subtitle && (
        <Typography 
          variant="body2" 
          sx={{ 
            opacity: 0.8,
            mt: 0.5,
            position: 'relative',
            zIndex: 1
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default RecipeOvenCard;