import React, { useState } from 'react';

import { Box, Tabs, Tab, Card } from '@mui/material';
import { PageBreadcrumb } from '@src/components';
import Mealplan from './tabs/Mealplan';
import WeeklyPlan from './tabs/WeeklyPlan';
import Nutrition from './tabs/Nutrition'; // This is the Recipes tab
import ClientMealPlan from './tabs/ClientMealPlan';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`meal-plan-tabpanel-${index}`}
      aria-labelledby={`meal-plan-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `meal-plan-tab-${index}`,
    'aria-controls': `meal-plan-tabpanel-${index}`,
  };
}

const MealPlan = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <PageBreadcrumb title="Meal Plan" subName="Dashboard" />
      
      <Box sx={{  }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
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

        <TabPanel value={value} index={0}>
          <Mealplan />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WeeklyPlan />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Nutrition /> {/* Recipes functionality */}
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ClientMealPlan /> {/* Client templates */}
        </TabPanel>
      </Box>
    </>
  );
};

export default MealPlan;