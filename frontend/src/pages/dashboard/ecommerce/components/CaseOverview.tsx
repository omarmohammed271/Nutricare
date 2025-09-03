import { Box, Card, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";

const CaseOverview = () => {
  const apexOpts: ApexOptions = {
    chart: {
      type: "pie",
      height: 400,
      toolbar: {
        show: false,
      },
    },
    colors: ["#02BE6A", "#18823F", "#3FC6FC"],
    series: [40, 35, 25],
    labels: ["Diabetes", "Cancer", "Neurological"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      style: {
        fontSize: "16px",
        fontWeight: 600,
        colors: ["#ffffff"]
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "inherit",
      labels: {
        colors: "#2c3e50",
      },
      markers: {
        size: 12,
        strokeWidth: 0,
      },
      formatter: function(seriesName, opts) {
        return seriesName + ": " + opts.w.globals.series[opts.seriesIndex];
      },
      offsetY: 10,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "0%",
        },
        offsetY: 0,
      },
    },
    stroke: {
      width: 0,
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Card sx={{
      p: 3,
      height: "100%",
      backgroundColor: "background.paper",
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      border: "1px solid",
      borderColor: "divider"
    }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: "#2c3e50" }}>
        Case Overview
      </Typography>
      
      {/* Large Pie Chart */}
      
        <ReactApexCharts
          options={apexOpts}
          series={apexOpts.series}
          type="pie"
          height={400}
        />
      
    </Card>
  );
};

export default CaseOverview;
