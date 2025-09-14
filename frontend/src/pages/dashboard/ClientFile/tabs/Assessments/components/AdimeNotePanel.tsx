import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { AdimeNote } from '../types';

interface AdimeNotePanelProps {
  adimeNote: AdimeNote;
}

const AdimeNotePanel: React.FC<AdimeNotePanelProps> = ({ adimeNote }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Adime Note
        </Typography>
        <EditIcon sx={{ color: '#02BE6A', cursor: 'pointer' }} />
      </Box>

      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
        Assessment
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', mb: 3, lineHeight: 1.5 }}>
        {adimeNote.assessment}
      </Typography>

      <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
        Client History:
      </Typography>
      
      <Box sx={{ '& > div': { mb: 1 } }}>
        <Box>
          <Typography component="span" variant="body2" sx={{ fontWeight: 600 }}>
            Client Name: 
          </Typography>
          <Typography component="span" variant="body2" sx={{ color: '#666', ml: 1 }}>
            {adimeNote.clientHistory.clientName}
          </Typography>
        </Box>
        
        <Box>
          <Typography component="span" variant="body2" sx={{ fontWeight: 600 }}>
            Age/Gender: 
          </Typography>
          <Typography component="span" variant="body2" sx={{ color: '#666', ml: 1 }}>
            {adimeNote.clientHistory.ageGender}
          </Typography>
        </Box>
        
        <Box>
          <Typography component="span" variant="body2" sx={{ fontWeight: 600 }}>
            Primary Diagnosis: 
          </Typography>
          <Typography component="span" variant="body2" sx={{ color: '#666', ml: 1 }}>
            {adimeNote.clientHistory.primaryDiagnosis}
          </Typography>
        </Box>
        
        <Box>
          <Typography component="span" variant="body2" sx={{ fontWeight: 600 }}>
            Nutrition-Related Complaints/Symptoms: 
          </Typography>
          <Typography component="span" variant="body2" sx={{ color: '#666', ml: 1 }}>
            {adimeNote.clientHistory.nutritionRelatedComplaints}
          </Typography>
        </Box>
        
        <Box>
          <Typography component="span" variant="body2" sx={{ fontWeight: 600 }}>
            Current Diet Pattern: 
          </Typography>
          <Typography component="span" variant="body2" sx={{ color: '#666', ml: 1 }}>
            {adimeNote.clientHistory.currentDietPattern}
          </Typography>
        </Box>
        
        <Box>
          <Typography component="span" variant="body2" sx={{ fontWeight: 600 }}>
            Known Allergies: 
          </Typography>
          <Typography component="span" variant="body2" sx={{ color: '#666', ml: 1 }}>
            {adimeNote.clientHistory.knownAllergies}
          </Typography>
        </Box>
        
        <Box>
          <Typography component="span" variant="body2" sx={{ fontWeight: 600 }}>
            NRS Score: 
          </Typography>
          <Typography component="span" variant="body2" sx={{ color: '#666', ml: 1 }}>
            {adimeNote.clientHistory.nrsScore}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdimeNotePanel;