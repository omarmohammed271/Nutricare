import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

interface InteractionAlertProps {
  hasInteractions: boolean;
  message: string;
}

const InteractionAlert: React.FC<InteractionAlertProps> = ({ hasInteractions, message }) => {
  if (!hasInteractions) return null;

  return (
    <Card sx={{ 
      borderRadius: 3, 
      bgcolor: '#fff3e0', 
      border: '2px solid #ff9800',
      boxShadow: '0 2px 8px rgba(255, 152, 0, 0.2)'
    }}>
      <CardContent sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <WarningIcon sx={{ color: '#ff9800', fontSize: 28 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff9800', mb: 0.5 }}>
              Drug Interaction Alert
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5 }}>
              {message}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InteractionAlert;