import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  Avatar,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Restaurant as RestaurantIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

interface RecentActivity {
  type: string;
  message: string;
  icon: string;
}

interface QuickActionsProps {
  recentActivities: RecentActivity[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ recentActivities }) => {
  const theme = useTheme();
  
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#02BE6A';
      case 'completed':
        return '#2196f3';
      case 'warning':
        return '#ff9800';
      default:
        return '#666';
    }
  };

  return (
    <Card sx={{ 
      borderRadius: 3, 
      boxShadow: 2,
      bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF'
    }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 700, 
          mb: 3,
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
        }}>
          Quick Actions
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<AddIcon />}
              sx={{
                bgcolor: '#02BE6A',
                '&:hover': { 
                  bgcolor: theme.palette.mode === 'dark' ? '#01A85A' : '#01A85A' 
                },
                py: 1.5,
                borderRadius: 2
              }}
            >
              Create New Plan
            </Button>
          </Grid>
          
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<RestaurantIcon />}
              sx={{
                color: '#02BE6A',
                borderColor: '#02BE6A',
                py: 1.5,
                borderRadius: 2,
                '&:hover': { 
                  bgcolor: theme.palette.mode === 'dark' ? '#02BE6A10' : '#f1f8e9' 
                }
              }}
            >
              Browse Templates
            </Button>
          </Grid>
          
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AssignmentIcon />}
              sx={{
                color: '#ff9800',
                borderColor: '#ff9800',
                py: 1.5,
                borderRadius: 2,
                '&:hover': { 
                  bgcolor: theme.palette.mode === 'dark' ? '#ff980010' : '#fff3e0' 
                }
              }}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ 
          my: 3,
          borderColor: theme.palette.mode === 'dark' ? '#333333' : undefined
        }} />

        <Typography variant="body2" sx={{ 
          fontWeight: 600, 
          mb: 2,
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
        }}>
          Recent Activity
        </Typography>
        
        <Box sx={{ '& > div': { mb: 1.5 } }}>
          {recentActivities.map((activity, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ 
                width: 24, 
                height: 24, 
                bgcolor: getActivityColor(activity.type), 
                fontSize: '0.75rem' 
              }}>
                {activity.icon}
              </Avatar>
              <Typography variant="body2" sx={{ 
                color: theme.palette.mode === 'dark' ? '#cccccc' : '#666', 
                fontSize: '0.875rem' 
              }}>
                {activity.message}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickActions;