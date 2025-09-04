import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';
import { PageBreadcrumb } from '@src/components';
import Mealplan from './tabs/Mealplan';
import WeeklyPlan from './tabs/WeeklyPlan';
import Nutrition from './tabs/Nutrition'; // This is the Recipes tab
import ClientMealPlan from './tabs/ClientMealPlan';

function a11yProps(index: number) {
  return {
    id: `meal-plan-tab-${index}`,
    'aria-controls': `meal-plan-tabpanel-${index}`,
  };
}

const MealPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define the tab routes and their corresponding components
  const tabRoutes = [
    { path: '/meal-plan', label: 'Meal Plan', component: <Mealplan /> },
    { path: '/meal-plan/templates', label: 'Meal Plan Templates', component: <WeeklyPlan /> },
    { path: '/meal-plan/recipes', label: 'Recipes', component: <Nutrition /> },
    { path: '/meal-plan/client-plans', label: 'Client Meal Plan', component: <ClientMealPlan /> }
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
      <PageBreadcrumb title="Meal Plan" subName="Dashboard" />
      
      <Box sx={{  }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={getCurrentTab()} 
            onChange={handleTabChange} 
            aria-label="meal plan tabs"
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
            <Tab label="Meal Plan" {...a11yProps(0)} />
            <Tab label="Meal Plan Templates" {...a11yProps(1)} />
            <Tab label="Recipes" {...a11yProps(2)} />
            <Tab label="Client Meal Plan" {...a11yProps(3)} />
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

export default MealPlan;