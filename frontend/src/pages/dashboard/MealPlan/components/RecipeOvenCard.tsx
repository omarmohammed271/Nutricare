import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import { LuChefHat } from 'react-icons/lu';
import { RecipePublished } from '../types/mealPlanTypes';

interface RecipeOvenCardProps extends RecipePublished {
  subtitle?: string;
}

const RecipeOvenCard: React.FC<RecipeOvenCardProps> = ({ title, value, isMainSearch, subtitle }) => {
  return (
    <Card
      sx={{
        width: '28%',
        background: isMainSearch 
          ? 'linear-gradient(135deg, #4CAF50 0%, #02BE6A 100%)'
          : 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
        height: 110,
        p: 3,
        borderRadius: 4,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(255, 183, 77, 0.3)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(255, 183, 77, 0.4)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -10,
          right: -10,
          width: 60,
          height: 60,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -5,
          left: -5,
          width: 40,
          height: 40,
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <LuChefHat size={20} style={{ color: '#02BE6A' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
            {title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!isMainSearch ? (
            <>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  fontSize: '2.5rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                {value}
              </Typography>
              
              <LuChefHat size={18} style={{ color: '#02BE6A' }} />
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', mt: 1 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  fontSize: '1.8rem',
                  textShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  textAlign: 'left',
                  mb: 1
                }}
              >
                Most Popular
              </Typography>
              
              {subtitle && (
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '1.1rem',
                    textShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    fontFamily: '"Dancing Script", "Brush Script MT", cursive',
                    textAlign: 'left',
                    fontStyle: 'italic',
                    letterSpacing: '0.3px'
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default RecipeOvenCard;