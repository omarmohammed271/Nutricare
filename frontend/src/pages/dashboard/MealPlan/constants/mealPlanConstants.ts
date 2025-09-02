// Theme colors
export const THEME_COLORS = {
  primary: '#22c55e',
  primaryHover: '#16a34a',
  primaryLight: '#f0fdf4',
  border: '#e5e7eb',
  background: '#f8fafc',
  text: '#374151',
  textSecondary: '#666',
} as const;

// DataGrid configuration
export const DATAGRID_CONFIG = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 25],
  minHeight: 600,
} as const;

// Tab configuration
export const TAB_CONFIG = {
  minWidth: 120,
  minHeight: 48,
} as const;