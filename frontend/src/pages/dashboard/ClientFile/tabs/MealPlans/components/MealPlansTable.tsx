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
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Restaurant as RestaurantIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { MealPlan } from '../types';

interface MealPlansTableProps {
  mealPlans: MealPlan[];
  onDeletePlan: (id: string) => void;
}

const MealPlansTable: React.FC<MealPlansTableProps> = ({ mealPlans, onDeletePlan }) => {
  const theme = useTheme();
  
  const getStatusColor = (status: MealPlan['status']) => {
    switch (status) {
      case 'Active':
        return '#02BE6A';
      case 'Completed':
        return '#2196f3';
      case 'Draft':
        return '#ff9800';
      case 'On Hold':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const getTypeIcon = (type: MealPlan['type']) => {
    switch (type) {
      case 'Weekly':
        return <CalendarIcon fontSize="small" />;
      case 'Daily':
        return <RestaurantIcon fontSize="small" />;
      case 'Custom':
        return <AssignmentIcon fontSize="small" />;
      default:
        return <RestaurantIcon fontSize="small" />;
    }
  };

  return (
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
            bgcolor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f8f9fa' 
          }}>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' 
            }}>
              Plan Name
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' 
            }}>
              Type
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' 
            }}>
              Calories
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' 
            }}>
              Duration
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' 
            }}>
              Progress
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' 
            }}>
              Status
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' 
            }}>
              Assigned By
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333' 
            }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mealPlans.map((plan) => (
            <TableRow 
              key={plan.id} 
              sx={{ 
                '&:hover': { 
                  bgcolor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#f8f9fa' 
                },
                bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF'
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getTypeIcon(plan.type)}
                  <Typography variant="body2" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    {plan.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                }}>
                  {plan.type}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                }}>
                  {plan.calories}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                }}>
                  {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={plan.progress}
                    sx={{
                      width: 60,
                      height: 6,
                      borderRadius: 3,
                      bgcolor: theme.palette.mode === 'dark' ? '#333333' : '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getStatusColor(plan.status),
                        borderRadius: 3
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                    fontSize: '0.875rem' 
                  }}>
                    {plan.progress}%
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={plan.status}
                  size="small"
                  sx={{
                    bgcolor: `${getStatusColor(plan.status)}20`,
                    color: getStatusColor(plan.status),
                    fontWeight: 600,
                    border: `1px solid ${getStatusColor(plan.status)}`
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#cccccc' : '#666' 
                }}>
                  {plan.assignedBy}
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
                    onClick={() => onDeletePlan(plan.id)}
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

export default MealPlansTable;