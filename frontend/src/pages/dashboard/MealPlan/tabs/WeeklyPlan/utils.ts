import { GridColDef } from '@mui/x-data-grid';
import { MealPlanTemplate, FilterCategory } from './types';

export const filterTemplatesByCategory = (data: MealPlanTemplate[], category: FilterCategory): MealPlanTemplate[] => {
  if (category === 'all') {
    return data;
  }
  return data.filter(template => template.category === category);
};

export const getTabA11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const getDataGridColumns = (): GridColDef[] => [
  {
    field: 'templateName',
    headerName: 'Template Name',
    flex: 1,
    minWidth: 200,
    headerClassName: 'header-green',
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1,
    minWidth: 150,
    headerClassName: 'header-green',
  },
  {
    field: 'calories',
    headerName: 'Calories',
    flex: 1,
    minWidth: 150,
    headerClassName: 'header-green',
  },
  {
    field: 'carbohydrates',
    headerName: 'Carbohydrates',
    flex: 1,
    minWidth: 150,
    headerClassName: 'header-green',
  },
  {
    field: 'protein',
    headerName: 'Protein',
    flex: 1,
    minWidth: 150,
    headerClassName: 'header-green',
  },
  {
    field: 'fat',
    headerName: 'Fat',
    flex: 1,
    minWidth: 150,
    headerClassName: 'header-green',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 120,
    headerClassName: 'header-green',
  },
];