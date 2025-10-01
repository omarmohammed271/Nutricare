import { Box, Typography, useTheme } from '@mui/material'
import {ReportMetric} from '../../../mockdata/mockdata'

const SummaryCard = ({ label, value, description } : ReportMetric) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        width: '22%',
        p: 1,
        pt: 2,
        bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : 'white',
        gap: 2,
        borderRadius: '10px',
        border: theme.palette.mode === 'dark' ? '1px solid #404040' : 'none'
      }}
    >
      <Box sx={{ 
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(229, 247, 233, 0.1)' : '#E5F7E9', 
        p: 1, 
        borderRadius: '5px', 
        mb: 1 
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold', 
          color: theme.palette.mode === 'dark' ? '#77DD99' : '#779D59' 
        }}>
          {label}
        </Typography>
      </Box>
      <Typography variant="h2" sx={{ 
        fontWeight: 'bold',
        color: theme.palette.mode === 'dark' ? '#fff' : 'inherit'
      }}>
        {value}
      </Typography>
      <Typography sx={{ 
        fontWeight: '400',
        color: theme.palette.mode === 'dark' ? '#ccc' : 'inherit'
      }}>
        {description}
      </Typography>
    </Box>
  )
}

export default SummaryCard