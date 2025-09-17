import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { MedicationSummary } from '../types';

interface SummaryCardsProps {
  summary: MedicationSummary;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const theme = useTheme();
  
  const summaryData = [
    {
      count: summary.activeMedications,
      label: 'Active Medications',
      color: '#02BE6A',
      bgColor: theme.palette.mode === 'dark' ? '#02BE6A20' : '#e8f5e8'
    },
    {
      count: summary.drugInteractions,
      label: 'Drug Interactions',
      color: '#ff9800',
      bgColor: theme.palette.mode === 'dark' ? '#ff980020' : '#fff3e0',
      icon: <WarningIcon sx={{ color: '#ff9800' }} />
    },
    {
      count: summary.completed,
      label: 'Completed',
      color: '#2196f3',
      bgColor: theme.palette.mode === 'dark' ? '#2196f320' : '#e3f2fd'
    },
    {
      count: summary.discontinued,
      label: 'Discontinued',
      color: '#f44336',
      bgColor: theme.palette.mode === 'dark' ? '#f4433620' : '#ffebee'
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
              <Typography variant="body2" sx={{ 
                color: theme.palette.mode === 'dark' ? '#cccccc' : '#555', 
                fontWeight: 600 
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