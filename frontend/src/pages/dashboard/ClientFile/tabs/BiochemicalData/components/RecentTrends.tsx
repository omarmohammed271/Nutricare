import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';

interface RecentTrendsProps {
  note: string;
}

const RecentTrends: React.FC<RecentTrendsProps> = ({ note }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Recent Trends & Notes
        </Typography>
        
        <Box sx={{ bgcolor: '#f8f9fa', p: 2, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            <strong>Latest Assessment (Jan 15, 2024):</strong><br />
            {note}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentTrends;