import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { MedicationSummary } from '../types';

interface SummaryCardsProps {
  summary: MedicationSummary;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const summaryData = [
    {
      count: summary.activeMedications,
      label: 'Active Medications',
      color: '#02BE6A',
      bgColor: '#e8f5e8'
    },
    {
      count: summary.drugInteractions,
      label: 'Drug Interactions',
      color: '#ff9800',
      bgColor: '#fff3e0',
      icon: <WarningIcon sx={{ color: '#ff9800' }} />
    },
    {
      count: summary.completed,
      label: 'Completed',
      color: '#2196f3',
      bgColor: '#e3f2fd'
    },
    {
      count: summary.discontinued,
      label: 'Discontinued',
      color: '#f44336',
      bgColor: '#ffebee'
    }
  ];

  return (
    <Grid container spacing={2}>
      {summaryData.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ 
            borderRadius: 3, 
            bgcolor: item.bgColor,
            border: `2px solid ${item.color}30`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              {item.icon ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  {item.icon}
                  <Typography variant="h3" sx={{ fontWeight: 800, color: item.color }}>
                    {item.count}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 800, color: item.color, mb: 1 }}>
                  {item.count}
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: '#555', fontWeight: 600 }}>
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