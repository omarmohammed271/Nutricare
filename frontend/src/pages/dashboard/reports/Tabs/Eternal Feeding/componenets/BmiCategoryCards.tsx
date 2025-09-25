import React from 'react';
import { Card, Typography, Grid, useTheme } from '@mui/material';
import {  GoalProps} from '../../../mockdata/mockdata';

const BmiCategoryCards = ({title, value, subtitle}:GoalProps ) => {
  const theme = useTheme();
  
  return (
   
    
        <Grid item sx={{ width: "100%"  }} >
          <Card
            sx={{
              border: `2px solid #4DA55A`,
              borderRadius: '12px',
              textAlign: 'left',
              padding: 1,
              px:2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.05)',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out',
              },
              cursor: 'pointer',
              bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff'
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: theme.palette.mode === 'dark' ? '#fff' : '#757575',
                mb: 3,
              }}
            >

                {title}
          
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: theme.palette.mode === 'dark' ? '#fff' : '#757575',
                mb: 0.5,
                   fontWeight: 600,
              }}
            >
              {value} 
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.mode === 'dark' ? '#ccc' : '#757575',
                fontWeight: 500,
                fontSize:'0.7rem'
              }}
            >
                  {subtitle}
            </Typography>
          </Card>
        </Grid>
 
  
  );
};

export default BmiCategoryCards;