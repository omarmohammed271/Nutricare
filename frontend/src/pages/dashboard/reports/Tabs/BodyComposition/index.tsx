import { Box, useTheme } from '@mui/material';
import BmiCategoryCards from './components/BmiCategoryCards';
import BmiChart from './components/BmiChart';
import { mockBmiData ,healthMetrics  ,dataBMICHART ,dataBMICHART2} from '../../mockdata/mockdata';
import VisitTimingCard from '../Cases/components/VisitTimingCard'

const BodyComposition = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column", bgcolor: theme.palette.mode === 'dark' ? '#121212' : 'inherit', p: 2, borderRadius: '8px' }}>
        <BmiChart dataBMICHART={dataBMICHART} title="BMI Distribution"/>
    <Box sx={{display: "flex", gap: 2, flexDirection: "row" ,mb:5 ,p:2}}>  
      {mockBmiData.map((item) => (
        
        <BmiCategoryCards
      
          patients={item.patients}
          avgWeight={item.avgWeight}
          range={item.range}
        />
      ))}
 </Box>


     <Box sx={{display: "flex", gap: 2, flexDirection: "row" ,mb:1 ,p:2 ,height: 100}}>  
      {healthMetrics.map((item) => (
        
        <BmiCategoryCards
         
          patients={item.value}
          avgWeight={item.metric}
          range={item.subtitle}
        />
      ))}
 </Box>
 <Box>
     <Box sx={{display: "flex", gap: 2, flexDirection: "row"  ,p:2, height:350 }}>
        <Box sx={{width:"50%",height:"100%"}}>
        <BmiChart dataBMICHART={dataBMICHART2} title="Weight Trends" height={200} />
        </Box >
        <Box sx={{width:"50%" ,height:'100%'}}>
        <VisitTimingCard />
        </Box>
     </Box>
 </Box>

 
     
    </Box>
  );
};

export default BodyComposition;