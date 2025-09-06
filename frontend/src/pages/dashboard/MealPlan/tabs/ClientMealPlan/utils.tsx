import React from 'react';
import { GridColDef, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { LuPencil, LuSave, LuTrash, LuXCircle } from 'react-icons/lu';

export const createColumns = (
  rowModesModel: any,
  handleEditClick: (id: any) => () => void,
  handleSaveClick: (id: any) => () => void,
  handleDeleteClick: (id: any) => () => void,
  handleCancelClick: (id: any) => () => void
): GridColDef[] => [
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
            key="save"
            icon={<LuSave size={18} />}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key="cancel"
            icon={<LuXCircle size={18} />}
            label="Cancel"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          key="edit"
          icon={<LuPencil size={18} />}
          label="Edit"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<LuTrash size={18} />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];