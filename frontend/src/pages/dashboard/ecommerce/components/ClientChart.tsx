import { Box, Card, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";
import { useState } from "react";
import { LuTrendingUp } from "react-icons/lu";

const ClientChart = () => {
  const [timeRange, setTimeRange] = useState("weekly");

  const apexOpts: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#02BE6A", "#e8f5e8"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.25,
        gradientToColors: ["#18823F"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.85,
        stops: [0, 100]
      }
    },
    series: [
      {
        name: "Clients",
        data: [11, 14, 9, 12, 15, 6, 11],
      },
      {
        name: "Target",
        data: [9, 6, 11, 8, 5, 14, 9],
      },
    ],
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: "#7f8c8d",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Clients",
        style: {
          color: "#7f8c8d",
        },
      },
      labels: {
        style: {
          colors: "#7f8c8d",
        },
      },
      max: 20,
      tickAmount: 5,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "34.45px",
        borderRadius: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 5,
    },
    legend: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " clients";
        },
      },
    },
  };

  return (
    <Card sx={{
      p: 3,
      height: "100%",
      backgroundColor: "#ffffff",
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      border: "1px solid #f0f0f0"
    }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
          Total Number of Clients
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            sx={{ fontSize: "14px" }}
          >
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ReactApexCharts
        options={apexOpts}
        series={apexOpts.series}
        type="bar"
        height={300}
      />

      {/* Performance Indicator */}
      <Box sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mt: 3,
        p: 2,
        backgroundColor: "#fff8e1",
        borderRadius: 2,
        border: "1px solid #fdb90620"
      }}>
        <LuTrendingUp size={16} color="#fdb906" />
        <Typography variant="body2" color="#2c3e50">
          30% Your performance is 30% better compared to last month's performance
        </Typography>
      </Box>
    </Card>
  );
};

export default ClientChart;
