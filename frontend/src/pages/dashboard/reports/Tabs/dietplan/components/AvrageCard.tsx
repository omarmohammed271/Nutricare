import { Card, CardContent, Typography, Box, Grid, useTheme } from '@mui/material';
import { AverageNutritionalPrescriptions } from '../../../mockdata/mockdata';


interface AvrageCardProps {
  data?: any;
  title?: string;
}

const AvrageCard = ({data,title}:AvrageCardProps) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%', borderRadius: '10px', border: theme.palette.mode === 'dark' ? '1px solid #404040' : '1px solid #4DA55A', bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff' }}>
      <CardContent>
        <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#757575', fontWeight: 600, mb: 1 }}>
          Average Nutritional Prescriptions
        </Typography>
        <Box sx={{ borderBottom: theme.palette.mode === 'dark' ? '1px solid #404040' : '1px solid #E1E7EC', mb: 2 }} />
          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? '#ccc' : '#757575', fontWeight: 400, mb: 3 }}>
          {title}
        </Typography>
        <Grid container spacing={2}  >
          {AverageNutritionalPrescriptions.map((metric, index) => (
            <Grid item xs={12} key={index} >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 ,bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#FAFAFA' ,borderLeft:'6px solid #6ED475', borderRadius:'5px' ,px:1   }}>
                <Typography sx={{ color: theme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>{metric.label}</Typography>
                <Typography sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>{metric.value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AvrageCard;