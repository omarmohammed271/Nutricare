import { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, styled, tableFooterClasses } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridValueGetterParams,
  GridActionsCellItem,
  GridToolbarContainer,
  GridEventListener,
  GridColumnGroupingModel,
  GridToolbar,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowEditStopReasons,
  gridClasses,
} from "@mui/x-data-grid";
import {
  randomArrayItem,
  randomCreatedDate,
  randomId,
  randomTraderName,
  useDemoData,
} from "@mui/x-data-grid-generator";
import { LuPencil, LuPlus, LuSave, LuTrash, LuXCircle } from "react-icons/lu";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

const DataTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Super", firstName: "Cersie", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 12, lastName: "Super", firstName: "Kenil", age: 42 },
    { id: 13, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 14, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 15, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 16, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 17, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 18, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 19, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 22, lastName: "Super", firstName: "Kenil", age: 42 },
    { id: 23, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 24, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 25, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 26, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 27, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 28, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 29, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <ComponentContainerCard
      title="Data"
      description="The DataGrid component is designed for use-cases that are focused on handling large amounts of tabular data."
      stackProps={{ sx: { height: 450 } }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[7, 14]}
        checkboxSelection
      />
    </ComponentContainerCard>
  );
};

const CRUDTable = () => {
  const roles = ["Market", "Finance", "Development"];
  const randomRole = () => {
    return randomArrayItem(roles);
  };

  const initialRows: GridRowsProp = [
    {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 36,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 19,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 28,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
  ];

  type EditToolbarProps = {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  };

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<LuPlus />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
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
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "joinDate",
      headerName: "Join date",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "role",
      headerName: "Department",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Market", "Finance", "Development"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<LuSave size={18} />}
              label="Save"
              sx={{
                color: "primary.main",
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
    <ComponentContainerCard
      title="Full-featured CRUD"
      description="The data grid is not only a data visualization tool. It offers built-in editing features for you to manage your data set. The following demo shows a full-featured CRUD (Create, Read, Update, Delete) typically found in enterprise applications.">
      <Box
        sx={{
          height: 410,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </ComponentContainerCard>
  );
};

const ColumnGrouping = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Super", firstName: "Kenil", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "Internal",
      description: "",
      children: [{ field: "id" }],
    },
    {
      groupId: "Basic info",
      children: [
        {
          groupId: "Full name",
          children: [{ field: "lastName" }, { field: "firstName" }],
        },
        { field: "age" },
      ],
    },
  ];

  return (
    <ComponentContainerCard
      title="Column Grouping"
      description="You can define column groups with the columnGroupingModel prop. This prop receives an array of column groups.">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          experimentalFeatures={{ columnGrouping: true }}
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          columnGroupingModel={columnGroupingModel}
        />
      </div>
    </ComponentContainerCard>
  );
};

const QuickFilter = () => {
  const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = useMemo(() => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)), [data.columns]);

  return (
    <ComponentContainerCard
      title="Quick Filtering Grid"
      description="Quick filter allows filtering rows by multiple columns with a single text input. ">
      <Box sx={{ height: 400, width: 1 }}>
        <DataGrid
          {...data}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Box>
    </ComponentContainerCard>
  );
};

const ColumnVirtualization = () => {
  type DataRowModel = {
    id: GridRowId;
    [price: string]: number | string;
  };

  type GridData = {
    columns: GridColDef[];
    rows: DataRowModel[];
  };

  function useData(rowLength: number, columnLength: number) {
    const [data, setData] = useState<GridData>({ columns: [], rows: [] });

    useEffect(() => {
      const rows: DataRowModel[] = [];

      for (let i = 0; i < rowLength; i += 1) {
        const row: DataRowModel = {
          id: i,
        };

        for (let j = 1; j <= columnLength; j += 1) {
          row[`price${j}M`] = `${i.toString()}, ${j} `;
        }

        rows.push(row);
      }

      const columns: GridColDef[] = [];

      for (let j = 1; j <= columnLength; j += 1) {
        columns.push({ field: `price${j}M`, headerName: `${j}M` });
      }

      setData({
        rows,
        columns,
      });
    }, [rowLength, columnLength]);

    return data;
  }

  const data = useData(10, 10);

  const StyledDataGrid = styled(DataGrid)(() => {
    return {
      [`& .${gridClasses.footerContainer}`]: {
        "> div:first-child": {
          display: "none",
        },
      },
    };
  });

  return (
    <ComponentContainerCard
      title="Column virtualization"
      description="Column virtualization is the insertion and removal of columns as the data grid scrolls horizontally.">
      <div style={{ height: 370 }}>
        <StyledDataGrid {...data} columnBuffer={2} columnThreshold={2} />
      </div>
    </ComponentContainerCard>
  );
};

const ToolbarNExport = () => {
  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 4,
    maxColumns: 6,
  });

  return (
    <ComponentContainerCard title="Enabling Toolbar and exporting data">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid {...data} loading={loading} slots={{ toolbar: GridToolbar }} />
      </div>
    </ComponentContainerCard>
  );
};

const ColumnVisibility = () => {
  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 20,
    maxColumns: 20,
  });
  return (
    <ComponentContainerCard
      title="Column Visibility"
      description="By default, all the columns are visible. The column's visibility can be switched through the user interface in two ways">
      <div style={{ display: "grid", height: 400, width: "100%" }}>
        <DataGrid
          {...data}
          loading={loading}
          initialState={{
            ...data.initialState,
            columns: {
              ...data.initialState?.columns,
              columnVisibilityModel: {
                id: false,
                brokerId: false,
                status: false,
              },
            },
          }}
        />
      </div>
    </ComponentContainerCard>
  );
};

const DataGridTable = () => {
  return (
    <>
      <PageBreadcrumb title="Data Grid" subName="Tables" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <DataTable />
        </Grid>

        <Grid item xl={6} xs={12}>
          <CRUDTable />
        </Grid>

        <Grid item xl={6} xs={12}>
          <ColumnGrouping />
        </Grid>

        <Grid item xl={6} xs={12}>
          <QuickFilter />
        </Grid>

        <Grid item xl={6} xs={12}>
          <ColumnVirtualization />
        </Grid>

        <Grid item xl={6} xs={12}>
          <ToolbarNExport />
        </Grid>

        <Grid item xl={12} xs={12}>
          <ColumnVisibility />
        </Grid>
      </Grid>
    </>
  );
};

export default DataGridTable;
