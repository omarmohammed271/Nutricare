import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { themeColors } from '../constants';

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
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Note to Meal Plan</DialogTitle>
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
              backgroundColor: '#FFFFFF'
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained" sx={{ bgcolor: themeColors.primary }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;