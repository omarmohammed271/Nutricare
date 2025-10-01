import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider, useTheme } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import { dataBMICHARTint } from '../../../mockdata/mockdata'

// datos BMI حسب الفئات (مطابقة للصورة تقريبًا)

interface BmiChartProps {
  dataBMICHART: dataBMICHARTint[];
  title?: string;
  height?: number;
}

const BmiChart = ({ dataBMICHART, title, height = 300 }: BmiChartProps) => {
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
        <Typography variant="h3" sx={{
          color: theme.palette.mode === 'dark' ? '#fff' : '#757575', 
          fontWeight: 600, 
          mb: 2, 
          textAlign: 'left'
        }}>
          {title}
        </Typography>
        <Divider sx={{ 
          width: '100%', 
          my: 2,
          borderColor: theme.palette.mode === 'dark' ? '#404040' : 'inherit'
        }}/>
        <Box sx={{ width: '100%', height: height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataBMICHART}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" 
                stroke={theme.palette.mode === 'dark' ? '#404040' : '#ccc'}
              />
              <XAxis 
                dataKey="name" 
                tick={{ fill: theme.palette.mode === 'dark' ? '#fff' : '#000' }}
              />
              <YAxis 
                tick={{ fill: theme.palette.mode === 'dark' ? '#fff' : '#000' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#fff',
                  borderColor: theme.palette.mode === 'dark' ? '#404040' : '#ccc',
                  color: theme.palette.mode === 'dark' ? '#fff' : '#000'
                }}
              />
              
              <Bar dataKey="count" radius={[20, 20, 0, 0]}>
                {dataBMICHART.map((entry: dataBMICHARTint, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
        
        {/* Color Legend */}
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={1} justifyContent="center">
            {dataBMICHART.map((item: dataBMICHARTint, index: number) => (
              <Grid item key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <Box sx={{ 
                    width: 12, 
                    height: 12, 
                    backgroundColor: item.color, 
                    borderRadius: '50%', 
                    mr: 1 
                  }} />
                  <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>
                    {item.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BmiChart;