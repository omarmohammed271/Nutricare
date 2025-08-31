import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Dropdown from "./Dropdown";
import ReactApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import WorldVectorMap from "@src/components/VectorMap/WorldMap";

const RevenueByLocation = () => {
  const apexOpts: ApexOptions = {
    chart: {
      height: 320,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ["#47ad77"],
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Orders",
        data: [90, 75, 60, 50, 45, 36, 28, 20, 15, 12],
      },
    ],
    xaxis: {
      categories: [
        "India",
        "China",
        "United States",
        "Japan",
        "France",
        "Italy",
        "Netherlands",
        "United Kingdom",
        "Canada",
        "South Korea",
      ],
      axisBorder: {
        show: false,
      },
      labels: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    grid: {
      strokeDashArray: 5,
    },
  };

  // vector map config
  const vectorOptions = {
    normalizeFunction: "polynomial",
    markers: [
      {
        coords: [40.71, -74.0],
        name: "New York",
      },
      {
        coords: [37.77, -122.41],
        name: "San Francisco",
      },
      {
        coords: [-33.86, 151.2],
        name: "Sydney",
      },
      {
        coords: [1.3, 103.8],
        name: "Singapore",
      },
    ],
    markerStyle: {
      initial: {
        r: 9,
        fill: "#6658dd",
        "fill-opacity": 0.9,
        stroke: "#fff",
        "stroke-width": 7,
        "stroke-opacity": 0.4,
      },

      hover: {
        stroke: "#fff",
        "fill-opacity": 1,
        "stroke-width": 1.5,
      },
    },
    backgroundColor: "transparent",
    hoverOpacity: 0.7,
    hoverColor: false,
    regionStyle: {
      initial: {
        fill: "rgba(145,166,189,.25)",
      },
    },
    zoomOnScroll: false,
  };
  return (
    <Card>
      <Box paddingX={"24px"} paddingY={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography component={"h4"} color={"grey.700"} variant="h5">
          Revenue By Locations
        </Typography>
        <Dropdown />
      </Box>
      <CardContent sx={{ padding: "24px" }}>
        <Box>
          <Grid container spacing={1}>
            <Grid item lg={8}>
              <WorldVectorMap height="298px" width="100%" options={vectorOptions} />
            </Grid>
            <Grid item lg={4}>
              <ReactApexCharts
                className="apex-charts"
                options={apexOpts}
                height={322}
                series={apexOpts.series}
                type="bar"
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueByLocation;
