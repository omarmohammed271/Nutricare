import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";
import WorldVectorMap from "@src/components/VectorMap/WorldMap";
import Dropdown from "./Dropdown";
import { grey } from "@mui/material/colors";
import React from "react";

const SessionsByCountry = () => {
  const apexOpts: ApexOptions = {
    chart: {
      height: 332,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ["#16a7e9"],
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Sessions",
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
        formatter: function (val: any) {
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
    series: {
      regions: [
        {
          attribute: "fill",
          scale: {
            ScaleKR: "#e6ebff80",
            ScaleCA: "#b3c3ff80",
            ScaleGB: "#809bfe80",
            ScaleNL: "#4d73fe80",
            ScaleIT: "#1b4cfe80",
            ScaleFR: "#727cf580",
            ScaleJP: "#e7fef780",
            ScaleUS: "#e7e9fd80",
            ScaleCN: "#8890f780",
            ScaleIN: "#727cf580",
          },
          values: {
            KR: "ScaleKR",
            CA: "ScaleCA",
            GB: "ScaleGB",
            NL: "ScaleNL",
            IT: "ScaleIT",
            FR: "ScaleFR",
            JP: "ScaleJP",
            US: "ScaleUS",
            CN: "ScaleCN",
            IN: "ScaleIN",
          },
        },
      ],
    },
  };
  return (
    <Card>
      <Box paddingX={"24px"} paddingY={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography component={"h4"} color={"grey.700"} variant="h5">
          Sessions by country
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
                height={380}
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

export default SessionsByCountry;
