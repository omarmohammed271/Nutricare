import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete
} from '@mui/material';
import { AddMedicationDialogState } from '../types';
import { medicationOptions, frequencyOptions, routeOptions } from '../constants';

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
  return (
    <Dialog 
      open={dialogState.open} 
      onClose={onClose}
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle>Add New Medication</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              freeSolo
              options={medicationOptions}
              value={dialogState.name}
              onChange={(event, newValue) => onDialogChange('name', newValue || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Medication Name"
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#FFFFFF'
                    }
                  }}
                />
              )}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Dosage"
              value={dialogState.dosage}
              onChange={(e) => onDialogChange('dosage', e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g., 500mg, 10mg"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Frequency</InputLabel>
              <Select
                value={dialogState.frequency}
                onChange={(e) => onDialogChange('frequency', e.target.value)}
                sx={{
                  backgroundColor: '#FFFFFF'
                }}
              >
                {frequencyOptions.map((freq) => (
                  <MenuItem key={freq} value={freq}>{freq}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Route</InputLabel>
              <Select
                value={dialogState.route}
                onChange={(e) => onDialogChange('route', e.target.value)}
                sx={{
                  backgroundColor: '#FFFFFF'
                }}
              >
                {routeOptions.map((route) => (
                  <MenuItem key={route} value={route}>{route}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Start Date"
              type="date"
              value={dialogState.startDate}
              onChange={(e) => onDialogChange('startDate', e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="End Date (Optional)"
              type="date"
              value={dialogState.endDate}
              onChange={(e) => onDialogChange('endDate', e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Prescribed By"
              value={dialogState.prescribedBy}
              onChange={(e) => onDialogChange('prescribedBy', e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g., Dr. Smith"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Indication"
              value={dialogState.indication}
              onChange={(e) => onDialogChange('indication', e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g., Diabetes, Hypertension"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Notes (Optional)"
              value={dialogState.notes}
              onChange={(e) => onDialogChange('notes', e.target.value)}
              fullWidth
              multiline
              rows={3}
              size="small"
              placeholder="Special instructions, side effects to monitor, etc."
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{ color: '#666' }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onSave}
          variant="contained"
          sx={{ bgcolor: '#02BE6A', '&:hover': { bgcolor: '#01A85A' } }}
        >
          Save Medication
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMedicationDialog;