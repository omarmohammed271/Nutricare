import React, { useState } from 'react';
import { Box, Tabs, Tab, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { TabPanel } from './components/TabPanel';
import { myTemplatesData, readyToUseData, filterCategories } from './data';
import { filterTemplatesByCategory, getTabA11yProps, getDataGridColumns } from './utils';
import { FilterCategory } from './types';
import { THEME_COLORS, DATAGRID_CONFIG, TAB_CONFIG } from './constants';

const WeeklyPlan = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (event: any) => {
    setFilterCategory(event.target.value as FilterCategory);
  };

  const getFilteredData = () => {
    const currentData = tabValue === 0 ? myTemplatesData : readyToUseData;
    return filterTemplatesByCategory(currentData, filterCategory);
  };

  const columns = getDataGridColumns();

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        gap: 2
      }}>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="category-filter-label">Filter Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={filterCategory}
              label="Filter Category"
              onChange={handleFilterChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: THEME_COLORS.primary,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: THEME_COLORS.primary,
                },
              }}
            >
              {filterCategories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="template tabs"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: THEME_COLORS.primary,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minHeight: TAB_CONFIG.minHeight,
                color: THEME_COLORS.textSecondary,
                minWidth: TAB_CONFIG.minWidth,
                '&.Mui-selected': {
                  color: THEME_COLORS.primary,
                  fontWeight: 700,
                },
                '&:hover': {
                  color: THEME_COLORS.primaryHover,
                },
              },
            }}
          >
            <Tab label="My Templates" {...getTabA11yProps(0)} />
            <Tab label="Ready to Use" {...getTabA11yProps(1)} />
          </Tabs>
        </Box>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box
          sx={{
            height: DATAGRID_CONFIG.minHeight,
            width: '100%',
            '& .header-green': {
              backgroundColor: THEME_COLORS.primary,
              color: 'white',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-root': {
              border: `2px solid ${THEME_COLORS.primary}`,
              borderRadius: '12px',
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${THEME_COLORS.border}`,
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: 'none',
              },
            },
          }}
        >
          <DataGrid
            rows={getFilteredData()}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: DATAGRID_CONFIG.defaultPageSize },
              },
            }}
            pageSizeOptions={DATAGRID_CONFIG.pageSizeOptions}
            sx={{
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: THEME_COLORS.background,
                borderTop: `1px solid ${THEME_COLORS.border}`,
              },
            }}
          />
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box
          sx={{
            height: DATAGRID_CONFIG.minHeight,
            width: '100%',
            '& .header-green': {
              backgroundColor: THEME_COLORS.primary,
              color: 'white',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-root': {
              border: `2px solid ${THEME_COLORS.primary}`,
              borderRadius: '12px',
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${THEME_COLORS.border}`,
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: 'none',
              },
            },
          }}
        >
          <DataGrid
            rows={getFilteredData()}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: DATAGRID_CONFIG.defaultPageSize },
              },
            }}
            pageSizeOptions={DATAGRID_CONFIG.pageSizeOptions}
            sx={{
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: THEME_COLORS.background,
                borderTop: `1px solid ${THEME_COLORS.border}`,
              },
            }}
          />
        </Box>
      </TabPanel>
    </Box>
  );
};

export default WeeklyPlan;