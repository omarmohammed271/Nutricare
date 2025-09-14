import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';
import { PageBreadcrumb } from '@src/components';
import { Assessments, BiochemicalData, Medication, MealPlans } from './tabs';

function a11yProps(index: number) {
  return {
    id: `client-file-tab-${index}`,
    'aria-controls': `client-file-tabpanel-${index}`,
  };
}

const ClientFile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define the tab routes and their corresponding components
  const tabRoutes = [
    { path: '/client-file', label: 'Assessments', component: <Assessments /> },
    { path: '/client-file/biochemical-data', label: 'Biochemical data', component: <BiochemicalData /> },
    { path: '/client-file/medication', label: 'Medication', component: <Medication /> },
    { path: '/client-file/meal-plans', label: 'Meal Plans', component: <MealPlans /> }
  ];

  // Determine current tab based on the URL
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const tabIndex = tabRoutes.findIndex(route => route.path === currentPath);
    return tabIndex >= 0 ? tabIndex : 0;
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(tabRoutes[newValue].path);
  };

  // Get the current component to render
  const getCurrentComponent = () => {
    const currentPath = location.pathname;
    const currentRoute = tabRoutes.find(route => route.path === currentPath);
    return currentRoute ? currentRoute.component : tabRoutes[0].component;
  };

  return (
    <>
      <PageBreadcrumb title="Client File" subName="Dashboard" />
      
      <Box sx={{}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={getCurrentTab()} 
            onChange={handleTabChange} 
            aria-label="client file tabs"
            variant="fullWidth"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'none',
                borderBottom:'none',
                height:0,
                color: '#FFFFFF'
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                minHeight: 15,
                color: '#666',
                backgroundColor: '#f8f9fa',
                borderBottom:'0px',
                borderRadius: '12px',
                margin: 0,
                '&.Mui-selected': {
                  color: '#FFFFFF',
                  backgroundColor: '#02BE6A',
                  fontWeight: 700,
                },
                '&:not(:last-child)': {
                  borderRight: 'none',
                },
              },
            }}
          >
            <Tab label="Assessments" {...a11yProps(0)} />
            <Tab label="Biochemical data" {...a11yProps(1)} />
            <Tab label="Medication" {...a11yProps(2)} />
            <Tab label="Meal Plans" {...a11yProps(3)} />
          </Tabs>
        </Box>

        {/* Render current component based on route */}
        <Box sx={{ p: 3 }}>
          {getCurrentComponent()}
        </Box>
      </Box>
    </>
  );
};

export default ClientFile;