import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Grid, useTheme } from '@mui/material'
import { mockReportsData } from '../../mockdata/mockdata'
import SummaryCard from './components/SummaryCard'
import DiagnosesCard from './components/DiagnosesCard'
import VisitTimingCard from './components/VisitTimingCard'

const Cases = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column", bgcolor: theme.palette.mode === 'dark' ? '#121212' : 'inherit', p: 2, borderRadius: '8px' }}>
      {/* Summary Metrics Section */}
      <Box sx={{
        display: 'flex',
        height: '150px',
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(163, 230, 173, 0.1)' : '#A3E6AD26',
        borderRadius: '10px',
        p: 4,
        justifyContent: 'space-around',
        gap: 2,
        border: theme.palette.mode === 'dark' ? '1px solid #404040' : '1px solid #4DA55A ',
      }}>
        {mockReportsData.summaryMetrics.map((item, index) => (
          <SummaryCard
            key={index}
            label={item.label}
            value={item.value}
            description={item.description}
          />
        ))}
      </Box>

      {/* Diagnoses and Visit Timing Section */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}>
        <Box sx={{ width: '40%' }}>
          <DiagnosesCard />
        </Box>
        <Box sx={{ width: '60%' }}>
          <VisitTimingCard />
        </Box>
      </Box>
    </Box>
  )
}

export default Cases