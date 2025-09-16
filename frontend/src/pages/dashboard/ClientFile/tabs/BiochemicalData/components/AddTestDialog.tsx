import React from 'react';
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
  const theme = useTheme();
  
  return (
    <Dialog 
      open={dialogState.open} 
      onClose={onClose}
      maxWidth="sm" 
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
        Add New Biochemical Test
      </DialogTitle>
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
          
          <Grid item xs={6}>
            <TextField
              label="Result"
              value={dialogState.result}
              onChange={(e) => onDialogChange('result', e.target.value)}
              fullWidth
              size="small"
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
          
          <Grid item xs={6}>
            <TextField
              label="Unit"
              value={dialogState.unit}
              onChange={(e) => onDialogChange('unit', e.target.value)}
              fullWidth
              size="small"
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
          
          <Grid item xs={6}>
            <TextField
              label="Reference Range"
              value={dialogState.referenceRange}
              onChange={(e) => onDialogChange('referenceRange', e.target.value)}
              fullWidth
              size="small"
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
              label="Notes (Optional)"
              value={dialogState.notes}
              onChange={(e) => onDialogChange('notes', e.target.value)}
              fullWidth
              multiline
              rows={3}
              size="small"
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
          Save Test
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTestDialog;