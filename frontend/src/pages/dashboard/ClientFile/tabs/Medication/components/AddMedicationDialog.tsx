import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  useTheme
} from '@mui/material';
import { AddMedicationDialogState } from '../types';

interface AddMedicationDialogProps {
  dialogState: AddMedicationDialogState;
  onDialogChange: (field: keyof AddMedicationDialogState, value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const AddMedicationDialog: React.FC<AddMedicationDialogProps> = ({ 
  dialogState, 
  onDialogChange, 
  onClose, 
  onSave 
}) => {
  const theme = useTheme();
  
  return (
    <Dialog 
      open={dialogState.open} 
      onClose={onClose}
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF'
        }
      }}
    >
      <DialogTitle sx={{ 
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' 
      }}>
        Add New Medication
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Medication Name"
              value={dialogState.name}
              onChange={(e) => onDialogChange('name', e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g., Aspirin, Metformin"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#FFFFFF',
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                },
                '& .MuiFormLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Dosage"
              value={dialogState.dosage}
              onChange={(e) => onDialogChange('dosage', e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g., 100mg, 500mg twice daily"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#FFFFFF',
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                },
                '& .MuiFormLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Notes"
              value={dialogState.notes}
              onChange={(e) => onDialogChange('notes', e.target.value)}
              fullWidth
              multiline
              rows={3}
              size="small"
              placeholder="Special instructions, side effects to monitor, etc."
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#FFFFFF',
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                },
                '& .MuiFormLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666'
                }
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{ 
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#666' 
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onSave}
          variant="contained"
          sx={{ 
            bgcolor: '#02BE6A', 
            '&:hover': { 
              bgcolor: theme.palette.mode === 'dark' ? '#01A85A' : '#01A85A' 
            } 
          }}
        >
          Save Medication
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMedicationDialog;