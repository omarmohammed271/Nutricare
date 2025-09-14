import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import { QuickStats } from '../types';

interface QuickStatsCardsProps {
  stats: QuickStats;
}

const QuickStatsCards: React.FC<QuickStatsCardsProps> = ({ stats }) => {
  const statsData = [
    {
      value: stats.totalPlans || 0,
      label: 'Total Plans',
      color: '#02BE6A',
      bgColor: '#e8f5e8'
    },
    {
      value: stats.activePlans || 0,
      label: 'Active Plans',
      color: '#2196f3',
      bgColor: '#e3f2fd'
    },
    {
      value: stats.completedPlans || 0,
      label: 'Completed',
      color: '#9c27b0',
      bgColor: '#f3e5f5'
    },
    {
      value: stats.avgCalories ? Math.round(stats.avgCalories) : 0,
      label: 'Avg Calories',
      color: '#ff9800',
      bgColor: '#fff3e0'
    },
    {
      value: `${stats.adherenceRate || 0}%`,
      label: 'Adherence Rate',
      color: '#e91e63',
      bgColor: '#fce4ec'
    }
  ];

  return (
    <Grid container spacing={2}>
      {statsData.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
          <Card sx={{ 
            borderRadius: 3, 
            bgcolor: item.bgColor,
            border: `2px solid ${item.color}20`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: item.color, mb: 0.5 }}>
                {item.value}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                {item.label}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickStatsCards;