import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import SearchWithDropdown from "./DropDown";

const UsageSummary = () => {
  const data = [
    { name: "Dr Saba", startDate: "23-03-2025", clients: "24" },
    { name: "Dr Saba", startDate: "23-03-2025", clients: "24" },
    { name: "Dr Saba", startDate: "23-03-2025", clients: "24" },
    { name: "Dr Saba", startDate: "23-03-2025", clients: "24" },
    { name: "Dr Saba", startDate: "23-03-2025", clients: "24" },
    { name: "Dr Saba", startDate: "23-03-2025", clients: "24" },
    { name: "Dr Saba", startDate: "23-03-2025", clients: "24" },
    { name: "Dr Saba", startDate: "23-03-2025", clients: "24" },
  ];

  return (
    <Box>
      {/* Search bar */}
      <Box display="flex" justifyContent="flex-end" mb={2} gap={2}>
        <SearchWithDropdown />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              border: "1px solid",
              borderColor: (theme) => theme.palette.primary.main,
            }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Dietician Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Start Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Clients Used / Limit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                  {row.name}
                </TableCell>
                <TableCell sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                  {row.startDate}
                </TableCell>
                <TableCell sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                  {row.clients}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsageSummary;
