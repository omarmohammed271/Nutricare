import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme
} from '@mui/material';
import { BiochemicalSummary } from '../types';

interface SummaryCardsProps {
  summary: BiochemicalSummary;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const theme = useTheme();
  
  const summaryData = [
    {
      count: summary.highValues,
      label: 'High Values',
      color: '#ff9800',
      bgColor: theme.palette.mode === 'dark' ? '#ff980020' : '#fff3e0'
    },
    {
      count: summary.normalValues,
      label: 'Normal Values',
      color: '#02BE6A',
      bgColor: theme.palette.mode === 'dark' ? '#02BE6A20' : '#e8f5e8'
    },
    {
      count: summary.lowValues,
      label: 'Low Values',
      color: '#2196f3',
      bgColor: theme.palette.mode === 'dark' ? '#2196f320' : '#e3f2fd'
    },
    {
      count: summary.criticalValues,
      label: 'Critical Values',
      color: '#f44336',
      bgColor: theme.palette.mode === 'dark' ? '#f4433620' : '#ffebee'
    }
  ];

  return (
    <Grid container spacing={2}>
      {summaryData.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ 
            borderRadius: 2, 
            bgcolor: item.bgColor,
            border: `1px solid ${item.color}20`
          }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                color: item.color 
              }}>
                {item.count}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
              }}>
                {item.label}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;