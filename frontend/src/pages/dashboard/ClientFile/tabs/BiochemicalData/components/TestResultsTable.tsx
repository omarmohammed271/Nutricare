import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { BiochemicalTest } from '../types';

interface TestResultsTableProps {
  tests: BiochemicalTest[];
  onDeleteTest: (id: string) => void;
}

const TestResultsTable: React.FC<TestResultsTableProps> = ({ tests, onDeleteTest }) => {
  const getStatusColor = (status: BiochemicalTest['status']) => {
    switch (status) {
      case 'Normal':
        return '#02BE6A';
      case 'High':
        return '#ff9800';
      case 'Low':
        return '#2196f3';
      case 'Critical':
        return '#f44336';
      default:
        return '#666';
    }
  };

  return (
    <Box sx={{}}>
      {/* Upload Test Section */}
      <Box 
        sx={{ 
          border: '2px dashed #02BE6A', 
          borderRadius: 2, 
          p: 3, 
          mb: 3, 
          textAlign: 'center',
          bgcolor: '#f8fff8',
              display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent:'center'
      
        
      
        }}
      >
        <Box>
        <CloudUploadIcon sx={{ fontSize: 32, color: '#02BE6A', mb: 1  }} />
        <Typography  sx={{ fontWeight: 600, mb: 1 }}>
          Upload Test
        </Typography>
        </Box>
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          alignContent:'center',
          alignItems:'center',
          justifyContent:'center'


}}>
        <Button
          variant="contained"
          sx={{
            display:'flex',
            
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#02BE6A',
            '&:hover': { bgcolor: '#01A85A' },
            borderRadius: 2,
          
        
         
          }}
        >
          Choose File
        </Button>
        </Box>
      </Box>

      {/* Test Results Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#02BE6A' }}>
              <TableCell sx={{ fontWeight: 700, color: '#FFFFFF' }}>Test Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#FFFFFF' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#FFFFFF' }}>Results</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#FFFFFF' }}>Reference Range</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#FFFFFF' }}>Clinical Interpretation</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#FFFFFF' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id} sx={{ '&:hover': { bgcolor: '#F9F4F2' } }}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {test.testName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {new Date(test.date).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: getStatusColor(test.status) }}>
                      {test.result} {test.unit}
                    </Typography>
                    <Chip
                      label={test.status === 'High' ? '↑' : test.status === 'Low' ? '↓' : '✓'}
                      size="small"
                      sx={{
                        bgcolor: `${getStatusColor(test.status)}20`,
                        color: getStatusColor(test.status),
                        fontWeight: 600,
                        minWidth: 24,
                        height: 20
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {test.referenceRange} {test.unit}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {test.status === 'High' ? 'Iron deficiency or chronic disease' : 
                     test.status === 'Normal' ? 'Ideal no deficiency found' :
                     'Iron deficiency or chronic disease'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      sx={{ color: '#02BE6A' }}
                      title="Edit"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: '#f44336' }}
                      onClick={() => onDeleteTest(test.id)}
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
    </Box>
  );
};

export default TestResultsTable;