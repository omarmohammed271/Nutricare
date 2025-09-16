import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import { BiochemicalSummary } from '../types';

interface SummaryCardsProps {
  summary: BiochemicalSummary;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const summaryData = [
    {
      count: summary.highValues,
      label: 'High Values',
      color: '#ff9800',
      bgColor: '#fff3e0'
    },
    {
      count: summary.normalValues,
      label: 'Normal Values',
      color: '#02BE6A',
      bgColor: '#e8f5e8'
    },
    {
      count: summary.lowValues,
      label: 'Low Values',
      color: '#2196f3',
      bgColor: '#e3f2fd'
    },
    {
      count: summary.criticalValues,
      label: 'Critical Values',
      color: '#f44336',
      bgColor: '#ffebee'
    }
  ];

  return (
    <Grid container spacing={2}>
      {summaryData.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ borderRadius: 2, bgcolor: item.bgColor }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: item.color }}>
                {item.count}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
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