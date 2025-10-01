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
  IconButton,
  Button,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { LabResult } from '../../../types/clientFileTypes';

interface TestResultsTableProps {
  tests: LabResult[];
  onDeleteTest: (id: number) => void;
  onAddTest?: () => void;
}

const TestResultsTable: React.FC<TestResultsTableProps> = ({ tests, onDeleteTest, onAddTest }) => {
  const theme = useTheme();

  return (
    <Box sx={{}}>
      {/* Header with Add Test Button */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 700,
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
        }}>
          Laboratory Results
        </Typography>
        <Button
          variant="contained"
          onClick={onAddTest}
          sx={{
            bgcolor: '#02BE6A',
            '&:hover': { 
              bgcolor: theme.palette.mode === 'dark' ? '#01A85A' : '#01A85A' 
            },
            borderRadius: 2,
          }}
        >
          Add Test
        </Button>
      </Box>

      {/* Test Results Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2, 
          border: `1px solid ${theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0'}`,
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
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#FFFFFF' 
              }}>
                Test Name
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#FFFFFF' 
              }}>
                Result
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#FFFFFF' 
              }}>
                Reference Range
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#FFFFFF' 
              }}>
                Interpretation
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#FFFFFF' 
              }}>
                Date
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#FFFFFF' 
              }}>
                File
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#FFFFFF' 
              }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.length === 0 ? (
              <TableRow sx={{ 
                bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF'
              }}>
                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666',
                    fontStyle: 'italic',
                    mb: 2
                  }}>
                    No laboratory tests added yet.
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#999999' : '#888',
                    fontSize: '0.9rem'
                  }}>
                    Click "Add Test" button above to add your first lab result.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              tests.map((test) => (
                <TableRow 
                  key={test.id} 
                  sx={{ 
                    '&:hover': { 
                      bgcolor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#F9F4F2' 
                    },
                    bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF'
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 600,
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                    }}>
                      {test.test_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 600,
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                    }}>
                      {test.result}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ 
                      color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                    }}>
                      {test.reference_range}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ 
                      color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                    }}>
                      {test.interpretation}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ 
                      color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                    }}>
                      {new Date(test.date).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ 
                      color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                    }}>
                      {test.file ? (typeof test.file === 'string' ? test.file : test.file.name) : 'No file'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        sx={{ 
                          color: theme.palette.mode === 'dark' ? '#02BE6A' : '#02BE6A' 
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
                        onClick={() => onDeleteTest(test.id)}
                        title="Delete"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TestResultsTable;