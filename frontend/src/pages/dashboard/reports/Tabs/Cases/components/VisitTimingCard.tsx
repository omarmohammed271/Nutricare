import { Card, CardContent, Typography, Box, Grid, useTheme } from '@mui/material';
import { mockReportsData } from '../../../mockdata/mockdata';

const VisitTimingCard = () => {
  const theme = useTheme();
  
  return (
    <Card sx={{   
      bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#F1FBF3',
      height: '100%', 
      borderRadius: '10px', 
      border: theme.palette.mode === 'dark' ? '1px solid #404040' : '1px solid #4DA55A',
      boxShadow: theme.palette.mode === 'dark' ? '0 1px 3px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <CardContent>
        <Typography variant="h2" sx={{ 
          color: theme.palette.mode === 'dark' ? '#fff' : '#1B2559', 
          fontWeight: 600, 
          mb: 3 
        }}>
          Visit Timing Metrics
        </Typography>
        <Grid container spacing={2}  >
          {mockReportsData.visitTimingMetrics.map((metric, index) => (
            <Grid item xs={12} key={index} >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                py: 1,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#FAFAFA',
                borderLeft: '4px solid #6ED475', 
                borderRadius: '5px', 
                px: 1  
              }}>
                <Typography sx={{ color: theme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>
                  {metric.label}
                </Typography>
                <Typography sx={{ 
                  fontWeight: 600,
                  color: theme.palette.mode === 'dark' ? '#fff' : 'inherit'
                }}>
                  {metric.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VisitTimingCard;