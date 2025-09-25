import { Box, Card, CardContent, Typography, useTheme } from '@mui/material'
import React from 'react'
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'

interface MacroData {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: MacroData[];
}

export default function PieChart({ data }: PieChartProps) {
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#F1FBF3',
      borderRadius: '10px', 
      border: theme.palette.mode === 'dark' ? '1px solid #404040' : '1px solid #4DA55A',
      boxShadow: theme.palette.mode === 'dark' ? '0 1px 3px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.1)',
      height: '100%'
    }}>
      <CardContent>
        <Typography 
          variant="h3" 
          sx={{ 
        color: theme.palette.mode === 'dark' ? '#fff' : '#757575', fontWeight: 600, mb: 2, textAlign: 'left'
          }}
        >
          Macronutrient Distribution
           
        </Typography>
        <Box sx={{ borderBottom: theme.palette.mode === 'dark' ? '1px solid #404040' : '1px solid #E1E7EC', mb: 2 }} />
      
        <Box sx={{ display: 'flex', height: 300 }}>
            
          {/* Pie Chart */}
          <Box sx={{ width: '70%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                  label={false} // No labels on the pie slices
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </Box>
          
          {/* Legend on the right side */}
          <Box sx={{ 
            width: '30%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            pl: 2
          }}>
            {data.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  width: 14, 
                  height: 14, 
                  backgroundColor: item.color, 
                  borderRadius: '50%', 
                  mr: 1.5 
                }} />
                <Box sx={{display: 'flex', flexDirection:'row' , gap:2, justifyContent:'space-between' ,width:'100%'}}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.mode === 'dark' ? '#fff' : '#1B2559' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#ccc' : '#64748B', fontSize: '0.75rem' }}>
                    {item.value}%
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}