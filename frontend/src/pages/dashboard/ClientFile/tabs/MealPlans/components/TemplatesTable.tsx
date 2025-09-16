import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  IconButton,
  Card
} from '@mui/material';
import {
  Edit as EditIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { MealPlanTemplate } from '../types';
import { themeColors } from '../constants';

interface TemplatesTableProps {
  templates: MealPlanTemplate[];
  onEdit?: (template: MealPlanTemplate) => void;
  onDownload?: (template: MealPlanTemplate) => void;
  onView?: (template: MealPlanTemplate) => void;
}

const TemplatesTable: React.FC<TemplatesTableProps> = ({
  templates,
  onEdit,
  onDownload,
  onView
}) => {
  return (
    <Card 
      sx={{ 
        borderRadius: 2, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: `1px solid ${themeColors.border}`,
        overflow: 'hidden',
        mb: 3
      }}
    >
      <TableContainer sx={{ bgcolor: 'white' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: themeColors.background.tableHeader }}>
              <TableCell sx={{ fontWeight: 700, color: 'white', py: 2, fontSize: '0.9rem' }}>
                Template Name
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'white', py: 2, fontSize: '0.9rem' }}>
                Calories Needed
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'white', py: 2, fontSize: '0.9rem' }}>
                Breakfast
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'white', py: 2, fontSize: '0.9rem' }}>
                Lunch
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'white', py: 2, fontSize: '0.9rem' }}>
                Dinner
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'white', py: 2, fontSize: '0.9rem' }}>
                Add Meal
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'white', py: 2, fontSize: '0.9rem' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templates.map((template) => (
              <TableRow 
                key={template.id}
                sx={{ 
                  bgcolor: themeColors.background.tableRow,
                  '&:hover': { bgcolor: themeColors.background.tableRowHover },
                  borderBottom: 'none'
                }}
              >
                <TableCell sx={{ py: 2.5, verticalAlign: 'top', borderBottom: `1px solid ${themeColors.border}` }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: themeColors.text.primary }}>
                    {template.templateName}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5, verticalAlign: 'top', borderBottom: `1px solid ${themeColors.border}` }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: themeColors.primary }}>
                    {template.caloriesNeeded} kcal
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5, verticalAlign: 'top', borderBottom: `1px solid ${themeColors.border}` }}>
                  <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                    {template.breakfast} kcal
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5, verticalAlign: 'top', borderBottom: `1px solid ${themeColors.border}` }}>
                  <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                    {template.lunch} kcal
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5, verticalAlign: 'top', borderBottom: `1px solid ${themeColors.border}` }}>
                  <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                    {template.dinner} kcal
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5, verticalAlign: 'top', borderBottom: `1px solid ${themeColors.border}` }}>
                  <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                    {template.additionalMeals} kcal
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5, verticalAlign: 'top', borderBottom: `1px solid ${themeColors.border}` }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onEdit?.(template)}
                      sx={{ 
                        color: themeColors.primary,
                        '&:hover': { bgcolor: '#e8f5e8' }
                      }}
                      title="Edit Template"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDownload?.(template)}
                      sx={{ 
                        color: themeColors.info,
                        '&:hover': { bgcolor: '#e3f2fd' }
                      }}
                      title="Download Template"
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onView?.(template)}
                      sx={{ 
                        color: themeColors.text.secondary,
                        '&:hover': { bgcolor: '#f5f5f5' }
                      }}
                      title="View Template"
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default TemplatesTable;