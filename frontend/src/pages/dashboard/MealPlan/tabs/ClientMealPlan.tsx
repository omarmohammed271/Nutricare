import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { LuPencil, LuPlus, LuSave, LuTrash, LuXCircle } from 'react-icons/lu';

const RecipesTab = () => {
  const initialRows: GridRowsProp = [
    {
      id: 1,
      templateName: 'Keto Diet',
      calories: '1200 kcal',
      carbohydrates: '100 g',
      protein: '100 g',
      fat: '100 g',
    },
    {
      id: 2,
      templateName: 'Keto Diet',
      calories: '1200 kcal',
      carbohydrates: '100 g',
      protein: '100 g',
      fat: '100 g',
    },
    {
      id: 3,
      templateName: 'Keto Diet',
      calories: '1200 kcal',
      carbohydrates: '100 g',
      protein: '100 g',
      fat: '100 g',
    },
    {
      id: 4,
      templateName: 'Keto Diet',
      calories: '1200 kcal',
      carbohydrates: '100 g',
      protein: '100 g',
      fat: '100 g',
    },
    {
      id: 5,
      templateName: 'Keto Diet',
      calories: '1200 kcal',
      carbohydrates: '100 g',
      protein: '100 g',
      fat: '100 g',
    },
    {
      id: 6,
      templateName: 'Keto Diet',
      calories: '1200 kcal',
      carbohydrates: '100 g',
      protein: '100 g',
      fat: '100 g',
    },
    {
      id: 7,
      templateName: 'Keto Diet',
      calories: '1200 kcal',
      carbohydrates: '100 g',
      protein: '100 g',
      fat: '100 g',
    },
    {
      id: 8,
      templateName: 'Keto Diet',
      calories: '1200 kcal',
      carbohydrates: '100 g',
      protein: '100 g',
      fat: '100 g',
    },
    {
      id: 9,
      templateName: 'Keto Diet',
      calories: '1200 kcal',
      carbohydrates: '100 g',
      protein: '100 g',
      fat: '100 g',
    },
  ];

  const [rows, setRows] = useState(initialRows);
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
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'templateName',
      headerName: 'Template Name',
      flex: 1,
      minWidth: 200,
      editable: true,
      headerClassName: 'header-green',
    },
    {
      field: 'calories',
      headerName: 'Calories',
      flex: 1,
      minWidth: 150,
      editable: true,
      headerClassName: 'header-green',
    },
    {
      field: 'carbohydrates',
      headerName: 'Carbohydrates',
      flex: 1,
      minWidth: 150,
      editable: true,
      headerClassName: 'header-green',
    },
    {
      field: 'protein',
      headerName: 'Protein',
      flex: 1,
      minWidth: 150,
      editable: true,
      headerClassName: 'header-green',
    },
    {
      field: 'fat',
      headerName: 'Fat',
      flex: 1,
      minWidth: 150,
      editable: true,
      headerClassName: 'header-green',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      cellClassName: 'actions',
      headerClassName: 'header-green',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<LuSave size={18} />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<LuXCircle size={18} />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<LuPencil size={18} />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<LuTrash size={18} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Button positioned above and to the right of the table */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          color="primary" 
          startIcon={<LuPlus />} 
          onClick={() => {
            const id = randomId();
            setRows((oldRows) => [
              {
                id,
                templateName: '',
                calories: '',
                carbohydrates: '',
                protein: '',
                fat: '',
                isNew: true,
              },
              ...oldRows,
            ]);
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
      
      {/* DataGrid Table */}
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

export default RecipesTab;
