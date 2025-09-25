import { AppBar, Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cases from "./Tabs/Cases";
import BodyComposition from "./Tabs/BodyComposition";
import Diet from "./Tabs/dietplan/Diet";
import EternalFeeding from "./Tabs/Eternal Feeding/EternalFeeding";

// Tab panel component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reports-tabpanel-${index}`}
      aria-labelledby={`reports-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 , pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `reports-tab-${index}`,
    'aria-controls': `reports-tabpanel-${index}`,
  };
}

const ReportsPage = () => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  
  // Map tab names to indices
  const tabMap: Record<string, number> = {
    'Cases-and-follow-ups': 0,
    'Body-Composition': 1,
    'Diet-Plans': 2,
    'External-Feeding': 3
  };
  
  // Set initial tab based on URL parameter
  useEffect(() => {
    if (tab && tabMap.hasOwnProperty(tab)) {
      setValue(tabMap[tab]);
    } else {
      // Default to first tab
      setValue(0);
    }
  }, [tab]);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    
    // Update URL based on tab index
    const tabNames = Object.keys(tabMap);
    const selectedTab = tabNames.find(key => tabMap[key] === newValue) || 'overview';
    navigate(`/reports/${selectedTab}`);
  };

  return (
    <>
      <PageBreadcrumb title="Reports" subName="Dashboard" />
      
      <Box sx={{ width: '100%' }}>
        <AppBar position="static" color="default" 
          sx={{
            bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
            boxShadow: theme.palette.mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)'
          }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="reports tabs"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'none',
                borderBottom:'none',
                height: 0,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: theme.palette.mode === 'dark' ? '#cccccc' : '#666',
                backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f8f9fa',
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

            <Tab label="Cases and follow ups" {...a11yProps(0)} />
            <Tab label="Body Composition" {...a11yProps(1)} />
            <Tab label="Diet Plans" {...a11yProps(2)} />
            <Tab label="Eternal Feeding" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        
        <CustomTabPanel value={value} index={0}>
        <Cases/>
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={1}>
          <BodyComposition />
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={2}>
          <Diet/>
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={3}>
         <EternalFeeding/>
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default ReportsPage;