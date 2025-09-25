import { Box, useTheme } from '@mui/material'
import React from 'react'
import PieChart from './components/PieChart'

import { macroData } from '../../mockdata/mockdata'
import HorizontChart from './components/HorizontChart'
import AvrageCard from './components/AvrageCard'

// Sample data for macronutrient distribution

const Diet = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{display:'flex', flexDirection:'column', width: '100%', gap:2, bgcolor: theme.palette.mode === 'dark' ? '#121212' : 'inherit', p: 2, borderRadius: '8px'}}>
    <Box sx={{ display:'flex', flexDirection:'row', width: '100%' ,gap:2  }}>
      <Box sx={{width: '50%'}}>
  <PieChart data={macroData}/>
      </Box>
      <Box sx={{width: '50%'}}> 
        <HorizontChart/>
      </Box>
  
    </Box>

    <Box sx={{display:'flex', flexDirection:'row', width: '100%' , gap:3 , height:400  }}> 
      <AvrageCard title={'Energy (kcal/day)'}/>
      <AvrageCard title={'Protein (g/day)'}/>
      <AvrageCard title={'Fluid (mL/day)'}/>
    </Box>
     </Box>
  )
}

export default Diet