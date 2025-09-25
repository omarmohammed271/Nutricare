import React from 'react';
import { Card, Typography, Grid, useTheme } from '@mui/material';
import { mockBmiData , BmiDataItem} from '../../../mockdata/mockdata';

const BmiCategoryCards = ({range, patients, avgWeight}:BmiDataItem ) => {
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
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.mode === 'dark' ? '#fff' : '#1B2559',
                mb: 0.5,
              }}
            >

                {avgWeight}
          
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === 'dark' ? '#ccc' : '#1B2559',
                mb: 0.5,
              }}
            >
              {patients} 
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.mode === 'dark' ? '#aaa' : '#1B2559',
                fontWeight: 500,
              }}
            >
                  {range}
            </Typography>
          </Card>
        </Grid>
 
  
  );
};

export default BmiCategoryCards;