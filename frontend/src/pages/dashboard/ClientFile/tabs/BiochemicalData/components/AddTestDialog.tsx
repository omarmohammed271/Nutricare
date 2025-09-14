import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  Autocomplete
} from '@mui/material';
import { AddTestDialogState } from '../types';
import { commonTestNames } from '../constants';

interface AddTestDialogProps {
  dialogState: AddTestDialogState;
  onDialogChange: (field: keyof AddTestDialogState, value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const AddTestDialog: React.FC<AddTestDialogProps> = ({ 
  dialogState, 
  onDialogChange, 
  onClose, 
  onSave 
}) => {
  return (
    <Dialog 
      open={dialogState.open} 
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle>Add New Biochemical Test</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              options={commonTestNames}
              value={dialogState.testName}
              onChange={(event, newValue) => onDialogChange('testName', newValue || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Test Name"
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
          
          <Grid item xs={6}>
            <TextField
              label="Result"
              value={dialogState.result}
              onChange={(e) => onDialogChange('result', e.target.value)}
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              label="Unit"
              value={dialogState.unit}
              onChange={(e) => onDialogChange('unit', e.target.value)}
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              label="Reference Range"
              value={dialogState.referenceRange}
              onChange={(e) => onDialogChange('referenceRange', e.target.value)}
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              label="Date"
              type="date"
              value={dialogState.date}
              onChange={(e) => onDialogChange('date', e.target.value)}
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
          
          <Grid item xs={12}>
            <TextField
              label="Notes (Optional)"
              value={dialogState.notes}
              onChange={(e) => onDialogChange('notes', e.target.value)}
              fullWidth
              multiline
              rows={3}
              size="small"
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
          Save Test
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTestDialog;