import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridRowsProp,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { LuPlus } from 'react-icons/lu';

import { initialRows } from './data';
import { createColumns } from './utils';
import { MealPlanTemplateRow } from './types';

const ClientMealPlan = () => {
  const [rows, setRows] = useState<MealPlanTemplateRow[]>(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false } as MealPlanTemplateRow;
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = createColumns(
    rowModesModel,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          color="primary" 
          startIcon={<LuPlus />} 
          onClick={() => {
            const id = randomId();
            const newRow: MealPlanTemplateRow = {
              id,
              templateName: '',
              calories: '',
              carbohydrates: '',
              protein: '',
              fat: '',
              isNew: true,
            };
            setRows((oldRows) => [newRow, ...oldRows]);
            setRowModesModel((oldModel) => ({
              ...oldModel,
              [id]: { mode: GridRowModes.Edit, fieldToFocus: 'templateName' },
            }));
          }}
          sx={{
            backgroundColor: '#22c55e',
            color: 'white',
            '&:hover': {
              backgroundColor: '#16a34a',
            },
          }}
        >
          Add Template
        </Button>
      </Box>
      
      <Box
        sx={{
          height: 600,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
          '& .header-green': {
            backgroundColor: '#22c55e',
            color: 'white',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-root': {
            border: '2px solid #22c55e',
            borderRadius: '12px',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e5e7eb',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: 'none',
            },
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[7]}
          sx={{
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#f8fafc',
              borderTop: '1px solid #e5e7eb',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ClientMealPlan;