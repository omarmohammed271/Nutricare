import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { Medication as MedicationInterface } from '../types';

interface MedicationTableProps {
  medications: MedicationInterface[];
  onDeleteMedication: (id: string) => void;
}

const MedicationTable: React.FC<MedicationTableProps> = ({ medications, onDeleteMedication }) => {
  const theme = useTheme();
  
  const getStatusColor = (status: MedicationInterface['status']) => {
    switch (status) {
      case 'Active':
        return '#02BE6A';
      case 'Discontinued':
        return '#f44336';
      case 'On Hold':
        return '#ff9800';
      case 'Completed':
        return '#2196f3';
      default:
        return '#666';
    }
  };

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        borderRadius: 2, 
        border: `2px solid #02BE6A`,
        bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF'
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ 
            bgcolor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#02BE6A' 
          }}>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : 'white' 
            }}>
              Medication
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : 'white' 
            }}>
              Dosage
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : 'white' 
            }}>
              Frequency
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : 'white' 
            }}>
              Route
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : 'white' 
            }}>
              Indication
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : 'white' 
            }}>
              Status
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : 'white' 
            }}>
              Start Date
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : 'white' 
            }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medications.map((medication) => (
            <TableRow key={medication.id} sx={{ 
              '&:hover': { 
                bgcolor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#f8fff8' 
              },
              '&:nth-of-type(even)': { 
                bgcolor: theme.palette.mode === 'dark' ? '#252525' : '#fafafa' 
              },
              bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF'
            }}>
              <TableCell>
                <Box>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    {medication.name}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                  }}>
                    Prescribed by: {medication.prescribedBy}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                }}>
                  {medication.dosage}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                }}>
                  {medication.frequency}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                }}>
                  {medication.route}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                }}>
                  {medication.indication}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={medication.status}
                  size="small"
                  sx={{
                    bgcolor: `${getStatusColor(medication.status)}20`,
                    color: getStatusColor(medication.status),
                    fontWeight: 600,
                    border: `1px solid ${getStatusColor(medication.status)}`
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                }}>
                  {medication.startDate ? new Date(medication.startDate).toLocaleDateString() : 'N/A'}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? '#02BE6A' : '#02BE6A' 
                    }}
                    title="View Details"
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? '#ff9800' : '#ff9800' 
                    }}
                    title="Edit"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? '#f44336' : '#f44336' 
                    }}
                    onClick={() => onDeleteMedication(medication.id)}
                    title="Delete"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MedicationTable;