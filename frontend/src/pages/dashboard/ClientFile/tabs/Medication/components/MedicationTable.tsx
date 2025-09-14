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
  IconButton
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
    <TableContainer component={Paper} sx={{ borderRadius: 2, border: '2px solid #02BE6A' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#02BE6A' }}>
            <TableCell sx={{ fontWeight: 700, color: 'white' }}>Medication</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'white' }}>Dosage</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'white' }}>Frequency</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'white' }}>Route</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'white' }}>Indication</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'white' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'white' }}>Start Date</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medications.map((medication) => (
            <TableRow key={medication.id} sx={{ 
              '&:hover': { bgcolor: '#f8fff8' },
              '&:nth-of-type(even)': { bgcolor: '#fafafa' }
            }}>
              <TableCell>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {medication.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Prescribed by: {medication.prescribedBy}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {medication.dosage}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {medication.frequency}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {medication.route}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: '#666' }}>
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
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {new Date(medication.startDate).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    sx={{ color: '#02BE6A' }}
                    title="View Details"
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: '#ff9800' }}
                    title="Edit"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: '#f44336' }}
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