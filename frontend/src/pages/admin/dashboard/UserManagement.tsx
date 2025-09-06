import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Switch,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
  styled,
  Pagination,
  useTheme,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  approval: string;
};

const demoUsers: User[] = Array.from({ length: 19 }).map((_, i) => ({
  id: i + 1,
  name: "Dr. Saba",
  email: "saba@gmail.com",
  active: true,
  approval: i % 2 === 0 ? "Accepted" : "Pending",
}));

function CustomPagination({
  page,
  count,
  onChange,
}: {
  page: number; // 0-based
  count: number; // total pages
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}) {

    return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Previous button */}
      <IconButton
        size="small"
        onClick={() => page > 0 && onChange({} as any, page - 1)}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      {/* Page numbers (convert 0-based to 1-based) */}
      <Pagination
        count={count}
        page={page + 1}
        onChange={(_, newPage) => onChange(_, newPage - 1)}
        variant="text"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        hidePrevButton
        hideNextButton
        sx={(theme) => ({
            "& .MuiPaginationItem-root": {
              borderRadius: "8px",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: theme.palette.primary.main + " !important",
              color: theme.palette.primary.contrastText + " !important",
              "&:hover": {
                backgroundColor: theme.palette.primary.light + " !important",
              },
            },
        })}
      />

      {/* Next button */}
      <IconButton
        size="small"
        onClick={() => page < count - 1 && onChange({} as any, page + 1)}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(demoUsers);
  const [page, setPage] = useState(0); // 0-based
  const [rowsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = users.filter(
    (u) =>
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "All" ||
        (statusFilter === "Active" && u.active) ||
        (statusFilter === "Inactive" && !u.active))
  );

  const pageCount = Math.ceil(filtered.length / rowsPerPage);

  // Ensure page is always valid when filters/search change
  useEffect(() => {
    if (page >= pageCount) {
      setPage(0);
    }
  }, [page, pageCount]);

  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const toggleActive = (id: number) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );

  const CustomTableCell = styled(TableCell)(({ theme }) => ({
    borderColor: theme.palette.primary.main,
    padding: "10px"
  }));
  const BorderedCell = styled(TableCell)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "10px"
  }));
  

  return (
    <Paper sx={{ p: 2, boxShadow: "none" }}>
      {/* Top bar: search + filter */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            label="Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer sx={{ borderRadius: "10px", overflow: "hidden", border: (theme) => `1px solid ${theme.palette.primary.main}` }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
            >
              {["Name", "Email", "Status", "Approval Request", "Actions"].map(
                (h) => (
                  <CustomTableCell
                    key={h}
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: (theme) => theme.typography.h1,
                      padding: "15px"
                    }}
                  >
                    {h}
                  </CustomTableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {paged.map((u) => (
              <TableRow key={u.id}>
                <CustomTableCell>{u.name}</CustomTableCell>
                <BorderedCell>{u.email}</BorderedCell>
                <CustomTableCell>
                  <Switch
                    checked={u.active}
                    onChange={() => toggleActive(u.id)}
                    color="success"
                  />
                  {u.active ? "Active" : "Inactive"}
                </CustomTableCell>
                <BorderedCell>
                <Typography
                    sx={{
                      color: u.approval === "Accepted" ? "green" : "orange",
                      fontWeight: 500,
                    }}
                  >
                    {u.approval}
                  </Typography>
                </BorderedCell>
                <CustomTableCell>
                  <IconButton color="success">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </CustomTableCell>
              </TableRow>
            ))}

            {/* Pagination row */}
            {pageCount > 1 && (
              <TableRow>
                <CustomTableCell sx={{ border:"0px" }} colSpan={5}>
                  <CustomPagination
                    page={page}
                    count={pageCount}
                    onChange={(_, newPage) => setPage(newPage)}
                  />
                </CustomTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
