import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  Autocomplete,
  useTheme
} from '@mui/material';
import { AddMedicationDialogState } from '../types';
import { medicationOptions } from '../constants';

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
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus management for accessibility
  useEffect(() => {
    if (dialogState.open && firstInputRef.current) {
      // Small delay to ensure dialog is fully rendered
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [dialogState.open]);
  
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
            <Autocomplete
              freeSolo
              options={medicationOptions}
              value={dialogState.name}
              onChange={(event, newValue) => onDialogChange('name', newValue || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  ref={firstInputRef}
                  label="Medication Name *"
                  size="small"
                  fullWidth
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
              )}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Dosage *"
              value={dialogState.dosage}
              onChange={(e) => onDialogChange('dosage', e.target.value)}
              fullWidth
              size="small"
              required
              placeholder="e.g., 500mg, 10mg"
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