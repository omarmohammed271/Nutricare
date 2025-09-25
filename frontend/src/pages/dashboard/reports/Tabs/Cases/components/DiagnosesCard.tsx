import { Card, CardContent, Typography, Box, Divider, useTheme } from '@mui/material';
import { mockReportsData } from '../../../mockdata/mockdata';

const DiagnosesCard = () => {
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
          mb: 4 
        }}>
          Diagnoses
        </Typography>
     
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {mockReportsData.diagnoses.map((diagnosis, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                px: 2, 
                py: 1,
                borderLeft: '4px solid #02BE6A',
                borderRadius: '4px',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'inherit'
              }}
            >
              <Typography variant='h5' sx={{ 
                fontWeight: 600, 
                color: theme.palette.mode === 'dark' ? '#fff' : '#1B2559', 
                fontSize: '1rem' 
              }}>
                {diagnosis.condition}
              </Typography>
              <Typography variant='h5' sx={{  
                color: '#02BE6A', 
                fontSize: '1.3rem' 
              }}>
                {diagnosis.count}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DiagnosesCard;