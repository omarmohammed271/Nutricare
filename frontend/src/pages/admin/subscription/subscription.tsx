import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Height } from "@mui/icons-material";
import UsageSummary from "./Usage";

const SubscriptionPage = () => {
  const [tab, setTab] = useState("tiers");

  const features = [
    "Full nutrition assessment tools",
    "Full nutrition assessment tools",
    "Full nutrition assessment tools",
    "Full nutrition assessment tools",
  ];

  const plans = [
    { plan: "Monthly", price: "$20" },
    { plan: "Yearly", price: "$200" },
  ];

  return (
    <Box p={2}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Subscription & Access Control
      </Typography>

      {/* Custom Tabs */}
      <Box display="flex" borderRadius="10px" overflow="hidden" width="100%" mb={3}>
        <Button
          onClick={() => setTab("tiers")}
          sx={{
            flex: 1,
            borderRadius: 2,
            py: 1,
            fontWeight: "bold",
            bgcolor: tab === "tiers" ? (theme) => theme.palette.primary.main : "white",
            color: tab === "tiers" ? "white" : "black",
            "&:hover": {
              bgcolor: tab === "tiers" ? "darkgreen" : "#f5f5f5",
            },
          }}>
          Subscription Tiers
        </Button>
        <Button
          onClick={() => setTab("usage")}
          sx={{
            flex: 1,
            borderRadius: 2,
            py: 1,
            fontWeight: "bold",
            bgcolor: tab === "usage" ? (theme) => theme.palette.primary.main : "white",
            color: tab === "usage" ? "white" : "black",
            "&:hover": {
              bgcolor: tab === "usage" ? "darkgreen" : "#f5f5f5",
            },
          }}>
          Plan Usage Summary
        </Button>
      </Box>

      {/* Tab Content */}
      {tab === "tiers" && (
        <Box>
          {/* Features Table */}

          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "white",
                      height: "40px",
                      border: "1px solid",
                      borderColor: (theme) => theme.palette.primary.main,
                    }}>
                    Feature
                  </TableCell>
                  <TableCell sx={{ color: "white", width: "100px" }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {features.map((f, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                      {f}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}
                      align="right">
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Plans Table */}
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "white",
                      height: "40px",
                      border: "1px solid",
                      borderColor: (theme) => theme.palette.primary.main,
                    }}>
                    Plan
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                    Price
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      border: "1px solid",
                      borderColor: (theme) => theme.palette.primary.main,
                      width: "100px",
                    }}
                    align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                      {p.plan}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderColor: (theme) => theme.palette.primary.main }}>
                      {p.price}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid",
                        borderColor: (theme) => theme.palette.primary.main,
                        width: "100px",
                        whiteSpace: "nowrap",
                      }}
                      align="right">
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {tab === "usage" && <UsageSummary />}

    </Box>
  );
};

export default SubscriptionPage;
