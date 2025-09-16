import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

interface MedicationNotesProps {
  importantNotes: string;
  adherenceRecommendations: string;
}

const MedicationNotes: React.FC<MedicationNotesProps> = ({ 
  importantNotes, 
  adherenceRecommendations 
}) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, border: '1px solid #e0e0e0' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#02BE6A' }}>
          Medication Notes & Guidelines
        </Typography>
        
        <Box sx={{ 
          bgcolor: '#f8f9fa', 
          p: 3, 
          borderRadius: 2, 
          mb: 3,
          border: '1px solid #e9ecef'
        }}>
          <Typography variant="body2" sx={{ 
            color: '#495057', 
            lineHeight: 1.7, 
            whiteSpace: 'pre-line',
            fontSize: '0.9rem'
          }}>
            <strong style={{ color: '#212529' }}>Important Notes:</strong><br />
            {importantNotes}
          </Typography>
        </Box>

        <Box sx={{ 
          bgcolor: '#e8f5e8', 
          p: 3, 
          borderRadius: 2,
          border: '1px solid #c3e6cb'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CheckCircleIcon sx={{ color: '#02BE6A', fontSize: 22 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#02BE6A' }}>
              Adherence Recommendations
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ 
            color: '#495057', 
            lineHeight: 1.7,
            fontSize: '0.9rem'
          }}>
            {adherenceRecommendations}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MedicationNotes;