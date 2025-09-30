import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  Autocomplete,
  useTheme,
  Box,
  Typography
} from '@mui/material';
import { AddTestDialogState } from '../types';
import { commonTestNames } from '../constants';
import { FileUploader, FileType } from '@src/components/FileUploader';
import { LuUpload } from 'react-icons/lu';

interface AddTestDialogProps {
  dialogState: AddTestDialogState;
  onDialogChange: (field: keyof AddTestDialogState, value: string | File | null) => void;
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
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);

  const handleFileUpload = (files: FileType[]) => {
    if (files.length > 0) {
      const file = files[0]; // Take only the first file
      setSelectedFiles([file]);
      onDialogChange('file', file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFiles([]);
    onDialogChange('file', null);
  };
  
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
              value={dialogState.test_name}
              onChange={(event, newValue) => onDialogChange('test_name', newValue || '')}
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
          
          <Grid item xs={12}>
            <TextField
              label="Reference Range"
              value={dialogState.reference_range}
              onChange={(e) => onDialogChange('reference_range', e.target.value)}
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
              label="Interpretation"
              value={dialogState.interpretation}
              onChange={(e) => onDialogChange('interpretation', e.target.value)}
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
          
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ 
              mb: 1,
              fontWeight: 600,
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
            }}>
              Attach File (Optional)
            </Typography>
            
            {selectedFiles.length === 0 ? (
              <Box sx={{ 
                border: '2px dashed #02BE6A', 
                borderRadius: 2, 
                p: 2, 
                textAlign: 'center',
                bgcolor: theme.palette.mode === 'dark' ? '#02BE6A20' : '#f8fff8',
                minHeight: '120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <LuUpload size={32} color="#02BE6A" style={{ marginBottom: '8px' }} />
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666',
                  mb: 1
                }}>
                  Drop files here or click to browse
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#999999' : '#888'
                }}>
                  Supports PDF, images, and documents
                </Typography>
                <FileUploader
                  icon={LuUpload}
                  iconSize={32}
                  text=""
                  onFileUpload={handleFileUpload}
                  showPreview={false}
                />
              </Box>
            ) : (
              <Box sx={{ 
                border: '1px solid #02BE6A', 
                borderRadius: 2, 
                p: 2,
                bgcolor: theme.palette.mode === 'dark' ? '#02BE6A20' : '#f8fff8'
              }}>
                <Typography variant="body2" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  mb: 1
                }}>
                  Selected File:
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666',
                  mb: 1
                }}>
                  {selectedFiles[0]?.name}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleRemoveFile}
                  sx={{
                    borderColor: '#f44336',
                    color: '#f44336',
                    '&:hover': {
                      borderColor: '#d32f2f',
                      backgroundColor: '#f4433620'
                    }
                  }}
                >
                  Remove File
                </Button>
              </Box>
            )}
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