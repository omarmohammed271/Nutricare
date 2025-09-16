import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
  Divider,
  LinearProgress,
  Grid
} from '@mui/material';
import { Restaurant as RestaurantIcon } from '@mui/icons-material';
import { MealPlan } from '../types';

interface CurrentActivePlanProps {
  activePlans: MealPlan[];
}

const CurrentActivePlan: React.FC<CurrentActivePlanProps> = ({ activePlans }) => {
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

  if (activePlans.length === 0) {
    return (
      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Current Active Plan
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            No active plans found
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const activePlan = activePlans[0];

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Current Active Plan
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{ color: '#02BE6A', borderColor: '#02BE6A' }}
          >
            View Details
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#02BE6A', mr: 2 }}>
            <RestaurantIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {activePlan.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {activePlan.calories} calories/day • Assigned by {activePlan.assignedBy}
            </Typography>
          </Box>
          <Chip
            label={activePlan.status}
            sx={{
              bgcolor: `${getStatusColor(activePlan.status)}20`,
              color: getStatusColor(activePlan.status),
              fontWeight: 600
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Progress: {activePlan.progress}%
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {new Date(activePlan.startDate).toLocaleDateString()} - {new Date(activePlan.endDate).toLocaleDateString()}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={activePlan.progress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: '#f0f0f0',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#02BE6A',
                borderRadius: 4
              }
            }}
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          Macronutrient Distribution:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 700 }}>
                {activePlan.macros.carbs}%
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                Carbs
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#2196F3', fontWeight: 700 }}>
                {activePlan.macros.protein}%
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                Protein
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#FF9800', fontWeight: 700 }}>
                {activePlan.macros.fat}%
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                Fat
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {activePlan.notes && (
          <Box sx={{ bgcolor: '#f8f9fa', p: 2, borderRadius: 2, mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              <strong>Notes:</strong> {activePlan.notes}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentActivePlan;