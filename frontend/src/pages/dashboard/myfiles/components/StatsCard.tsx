import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { StatsCardProps } from '../types';

const StatsCard: React.FC<StatsCardProps> = ({ title, count, color, icon }) => (
  <Card 
    sx={{ 
      background: color,
      color: 'white',
      display: 'flex',
      alignItems: 'center'
    }}
  >
    <CardContent sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box>
        <Typography variant="h3" component="div" fontWeight="bold">
          {count.toString().padStart(2, '0')}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ marginLeft: 'auto', opacity: 0.7 }}>
        {icon}
      </Box>
    </CardContent>
  </Card>
);

export default StatsCard;