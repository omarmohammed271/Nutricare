import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  useTheme
} from '@mui/material';
import { getThemeColors } from '../constants';

interface NoteDialogProps {
  open: boolean;
  currentNote: string;
  onClose: () => void;
  onSave: () => void;
  onNoteChange: (note: string) => void;
}

const NoteDialog: React.FC<NoteDialogProps> = ({
  open,
  currentNote,
  onClose,
  onSave,
  onNoteChange
}) => {
  const theme = useTheme();
  const themeColors = getThemeColors(theme);
  
  return (
    <Dialog 
      open={open} 
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
        Add Note to Meal Plan
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Note"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={currentNote}
          onChange={(e) => onNoteChange(e.target.value)}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ 
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' 
        }}>
          Cancel
        </Button>
        <Button 
          onClick={onSave} 
          variant="contained" 
          sx={{ 
            bgcolor: themeColors.primary,
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? '#01A85A' : '#02BE6A'
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;