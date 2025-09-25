import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';

const HorizontChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    // القيم الأصلية
    const rawData = [
      { name: 'Carbs', value: 20 },
      { name: 'Protein', value: 35 },
      { name: 'Fiber', value: 45 },
    ];

  
    const total = rawData.reduce((sum, item) => sum + item.value, 0);


    const series = rawData.map(item => ({
      name: `${item.name} ${Math.round((item.value / total) * 100)}%`,
      data: [item.value],
    }));

    const options: ApexCharts.ApexOptions = {
      series,
      chart: {
        type: 'bar',
        height: 300,
        stacked: true,
        stackType: '100%',
        toolbar: { show: false },
        background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#F1FBF3',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '40%',
          borderRadius: 8,
        },
      },
      stroke: { width: 0 },
      xaxis: {
        categories: [''],
        labels: { 
          show: true,
          style: {
            colors: theme.palette.mode === 'dark' ? '#fff' : '#000'
          }
        },
        axisTicks: { show: false },
        axisBorder: { show: false },
      },
      yaxis: { 
        show: false,
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        fontWeight: 400,
        markers: {
            shape:'circle'
        },
        labels: {
          colors: theme.palette.mode === 'dark' ? '#fff' : '#000'
        }
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}%`,
        },
      },
      dataLabels: { enabled: false },
      grid: { 
        show: true,
        borderColor: theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0'
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Card
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#F1FBF3',
        borderRadius: '10px',
        border: theme.palette.mode === 'dark' ? '1px solid #404040' : '1px solid #4DA55A',
        boxShadow: theme.palette.mode === 'dark' ? '0 1px 3px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.1)',
        height: '100%',
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          sx={{
        color: theme.palette.mode === 'dark' ? '#fff' : '#757575', fontWeight: 600, mb: 2, textAlign: 'left'
          }}
        >
      Most Common Macronutrient Disruptions
        
        </Typography>
        <Box sx={{ borderBottom: theme.palette.mode === 'dark' ? '1px solid #404040' : '1px solid #E1E7EC', mb: 2 }} />
   
            
      
        <Box sx={{ height: 300 }}>
          <div id="chart" ref={chartRef} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HorizontChart;