import { MealPlanTemplate, FilterCategory } from '../types/mealPlanTypes';

/**
 * Filters meal plan templates based on category
 * @param data - Array of meal plan templates
 * @param category - Category to filter by
 * @returns Filtered array of templates
 */
export const filterTemplatesByCategory = (
  data: MealPlanTemplate[], 
  category: FilterCategory
): MealPlanTemplate[] => {
  if (category === 'all') {
    return data;
  }
  return data.filter((template) => template.category === category);
};

/**
 * Tab panel accessibility props generator
 * @param index - Tab index
 * @returns Accessibility props object
 */
export const getTabA11yProps = (index: number) => ({
  id: `template-tab-${index}`,
  'aria-controls': `template-tabpanel-${index}`,
});

/**
 * Common DataGrid column configuration
 */
export const getDataGridColumns = () => [
  {
    field: 'templateName',
    headerName: 'Template Name',
    flex: 1,
    minWidth: 200,
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
] as const;