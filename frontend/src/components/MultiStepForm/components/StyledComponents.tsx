import { styled } from '@mui/material/styles';
import { TextField, Select, Button } from '@mui/material';

// Styled TextField with green theme
export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    '& fieldset': {
      borderColor: '#4CAF50',
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: '#4CAF50',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4CAF50',
    },
    '&.Mui-error fieldset': {
      borderColor: '#f44336',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#4CAF50',
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#4CAF50',
    },
    '&.Mui-error': {
      color: '#f44336',
    },
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 8,
    '&.Mui-error': {
      color: '#f44336',
    },
  },
}));

// Styled Select with green theme
export const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4CAF50',
    borderWidth: 2,
    borderRadius: 8,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4CAF50',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4CAF50',
  },
  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: '#f44336',
  },
}));

// Client selection buttons
export const ClientButton = styled(Button)(({ theme }) => ({
  borderColor: '#4CAF50',
  color: '#4CAF50',
  borderWidth: 2,
  borderRadius: 8,
  padding: '12px 24px',
  textTransform: 'none',
  fontSize: '16px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.04)',
  },
  '&.selected': {
    backgroundColor: '#4CAF50',
    color: 'white',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
}));

// Action buttons base style
export const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: '12px 32px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  transition: 'all 0.2s ease-in-out',
}));

// Back button style
export const BackButton = styled(ActionButton)(({ theme }) => ({
  borderColor: '#4CAF50',
  color: '#4CAF50',
  borderWidth: 2,
  '&:hover': {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.04)',
  },
  '&:disabled': {
    borderColor: '#e0e0e0',
    color: '#999',
  },
}));

// Next/Submit button style
export const NextButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: '#4CAF50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#45a049',
  },
  '&:disabled': {
    backgroundColor: '#e0e0e0',
    color: '#999',
  },
}));