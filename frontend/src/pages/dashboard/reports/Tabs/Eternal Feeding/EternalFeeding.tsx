import { Box, Card, Typography, useTheme } from '@mui/material'
import BmiCategoryCards from './componenets/BmiCategoryCards'
import {  Goalmatrices , dataChartEternalFood ,GoalAchievementData ,VisitTimingMetric } from '../../mockdata/mockdata';
import  BmiChart from './componenets/BmiChart'
import AvrageCard from './componenets/AvrageCard';


const EternalFeeding = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{display: "flex",  gap: 2 , flexDirection: "column", bgcolor: theme.palette.mode === 'dark' ? '#121212' : 'inherit', p: 2, borderRadius: '8px' }}>

  
    <Box sx={{display: "flex",  gap: 4 , flexDirection: "row" ,mb: 4 }}>
        
     {Goalmatrices.map((item) => (
        
        <BmiCategoryCards
         
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
        />
      ))}

  </Box>
      <Box sx={{display: "flex",  gap:2 , flexDirection: "row" }}>
        <Box sx={{width:'50%'}}>
      <BmiChart dataBMICHART={dataChartEternalFood} title="Formula Type Usage" height={200}/>
      </Box>
      <Box sx={{width:'50%'}}>
      <AvrageCard title={'Protein (g/day)'} data={GoalAchievementData} />
      </Box>
      </Box>
      <Card sx={{
        width:'100%', 
        height:100, 
        borderRadius:4,  
        border: theme.palette.mode === 'dark' ? "1px solid #404040" : "1px solid #4DA55A", 
        boxShadow: theme.palette.mode === 'dark' ? '0px 0px 3.6px 0px rgba(255,255,255,0.1)' : '0px 0px 3.6px 0px #505050',
        bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff'
      }}>
          <Box
        sx={{
          textAlign: 'center',
          color: 'white',
        }}
      >
        {/* العنوان */}
        <Typography
          variant="caption"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 600,
            mb: 0.5,
            color: theme.palette.mode === 'dark' ? '#fff' : '#757575',
          }}
        >
          Goal Achievement Rate Calculation
        </Typography>

        {/* النتيجة باللون الأخضر اللامع */}
        <Typography
          variant="h5"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#34D399', // أخضر لامع (مثل #34D399 أو #10B981)
            mt: 1,
            fontFamily: 'monospace',
          }}
        >
          (90 ÷ 115) × 100 = 78.5%
        </Typography>

        {/* الشرح */
        }
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.65rem',
            color: theme.palette.mode === 'dark' ? '#ccc' : '#757575',
            fontFamily: 'monospace',
          }}
        >
          Formula: (Patients Reaching Goal ÷ Total EN Patients) × 100
        </Typography>
      </Box>

      </Card>
    </Box>
  )
}

export default EternalFeeding