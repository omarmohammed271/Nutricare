"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TextField,
  MenuItem,
  Select,
  Pagination,
  Stack,
  Button,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Edit, Delete } from "@mui/icons-material";
const rows = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  dietitian: "Dr Saba",
  clients: 120,
  usage: "12 Hrs",
}));

const data2 = [
  { month: "JAN", assessments: 7, followUps: 6 },
  { month: "FEB", assessments: 6, followUps: 8 },
  { month: "MAR", assessments: 10, followUps: 7 },
  { month: "APR", assessments: 8, followUps: 9 },
  { month: "MAY", assessments: 7, followUps: 6 },
  { month: "JUN", assessments: 6, followUps: 7 },
  { month: "JUL", assessments: 9.5, followUps: 5 },
  { month: "AUG", assessments: 8, followUps: 6 },
  { month: "SEP", assessments: 10, followUps: 7 },
  { month: "OCT", assessments: 9, followUps: 6 },
  { month: "NOV", assessments: 8, followUps: 7 },
  { month: "DEC", assessments: 10, followUps: 8 },
];

const data = [
  { month: "Jan", current: 140, previous: 180 },
  { month: "Feb", current: 170, previous: 175 },
  { month: "Mar", current: 200, previous: 220 },
  { month: "Apr", current: 230, previous: 200 },
  { month: "May", current: 330, previous: 210 },
  { month: "Jun", current: 260, previous: 190 },
  { month: "Jul", current: 180, previous: 160 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "white",
          p: 1,
          px: 2,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}>
        <Typography variant="caption" color="text.secondary">
          This Month
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="green">
          {payload[0].value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    );
  }
  return null;
};

const CustomTooltip2 = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#333",
          color: "#fff",
          padding: "4px 8px",
          borderRadius: "6px",
          fontSize: "12px",
        }}>
        {payload[0].value}
      </div>
    );
  }
  return null;
};

export default function ReportsContent() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleChangePage = (_: any, value: number) => {
    setPage(value);
  };

  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <Box p={5} flex={1}>
        <Typography variant="h3" fontWeight="bold" mb={3}>
          Reporting and Insights
        </Typography>
        {/* ====== Line Chart 1 ====== */}
        <Card sx={{ borderRadius: 3, bgcolor: "rgb(249, 244, 242)", marginBottom: 5 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Dietitian
              </Typography>
              <Typography variant="h6"></Typography>
            </Box>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4caf50" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#888" }} />
                <YAxis tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} tickMargin={30} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="line"
                  wrapperStyle={{ fontSize: 12, color: "#888" }}
                />

                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#4caf50"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  fill="url(#colorGreen)"
                />
                <Line type="monotone" dataKey="previous" stroke="#9e9e9e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ====== Line Chart 2 ====== */}
        <Card sx={{ mb: 3, borderRadius: 3, bgcolor: "rgb(249, 244, 242)", padding: 2 }}>
          <CardContent>
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6">Monthly Overview of clients by Assessment and Follow Ups</Typography>

                <TextField select size="small" defaultValue="2025" sx={{ minWidth: 120 }}>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </TextField>
              </Box>

              <Stack direction="row" spacing={4} mb={2}>
                <Box display="flex" alignItems="center">
                  <Box sx={{ width: 20, height: 12, bgcolor: "#2ecc71", borderRadius: "3px", mr: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    Assessments
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <Box sx={{ width: 20, height: 12, bgcolor: "#27ae60", borderRadius: "3px", mr: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    Follow Ups
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data2}>
                <CartesianGrid strokeDasharray="0" vertical={true} horizontal={true} stroke="#ffff" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#888" }} />
                <YAxis tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} tickMargin={30} />
                <Tooltip content={<CustomTooltip2 />} />
                <Line type="monotone" dataKey="assessments" stroke="#2ecc71" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="followUps" stroke="#27ae60" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ====== Table ====== */}
        <Card sx={{ p: 2, boxShadow: "none", border: "none" }} elevation={0}>
          <Stack direction="row" spacing={2} mb={2}>
            <TextField label="Search" variant="outlined" size="small" />
            <Select defaultValue="all" size="small">
              <MenuItem value="all">User Type</MenuItem>
              <MenuItem value="dietitian">Dietitian</MenuItem>
              <MenuItem value="client">Client</MenuItem>
            </Select>
            <Select defaultValue="all" size="small">
              <MenuItem value="all">Date Range</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </Stack>

          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table size="small" sx={{ border: "1px solid #ddd" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
                  <TableCell
                    sx={{
                      color: "white",
                      height: "40px",
                      border: "1px solid",
                      borderColor: (theme) => theme.palette.primary.main,
                    }}>
                    Dietitian
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", border: "1px solid  ", borderColor: (theme) => theme.palette.primary.main }}>
                    Clients
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", border: "1px solid ", borderColor: (theme) => theme.palette.primary.main }}>
                    System Usage
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", border: "1px solid ", borderColor: (theme) => theme.palette.primary.main }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                      {row.dietitian}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                      {row.clients}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                      {row.usage}
                    </TableCell>
                    <TableCell  align="center" sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            sx={{
              border: "1px solid",
              borderTop: "none",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              borderColor: (theme) => theme.palette.primary.main,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Button
              variant="text"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              sx={{
                minWidth: "40px",
                border: "1px solid rgb(227, 227, 227)",
                borderRadius: "10px",
                bgcolor: "white",
              }}>
              &lt;
            </Button>

            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              hidePrevButton
              hideNextButton
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "8px",
                  color: (theme) => theme.palette.primary.main,
                  fontSize: "12px",
                },
                "& .Mui-selected": {
                  bgcolor: (theme) => theme.palette.primary.main + " !important",
                  color: "white",
                },
              }}
            />

            <Button
              variant="text"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              sx={{
                minWidth: "40px",
                border: "1px solid rgb(227, 227, 227)",
                borderRadius: "10px",
                bgcolor: "white",
              }}>
              &gt;
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}
