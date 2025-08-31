import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Button, Grid } from "@mui/material";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// data
import { basicRadarOpts, multipleSeriesOpts, polygonFillOpts } from "./data";

// components

const RadarApex = () => {
  const [data, setData] = useState([
    {
      name: "Series 1",
      data: [80, 50, 30, 40, 100, 20],
    },
    {
      name: "Series 2",
      data: [20, 30, 40, 80, 20, 80],
    },
    {
      name: "Series 3",
      data: [44, 76, 78, 13, 43, 10],
    },
  ]);

  function update() {
    function randomSeries() {
      const arr = [];
      for (let i = 0; i < 6; i++) {
        arr.push(Math.floor(Math.random() * 100));
      }
      return arr;
    }

    setData([
      {
        name: "Series 1",
        data: randomSeries(),
      },
      {
        name: "Series 2",
        data: randomSeries(),
      },
      {
        name: "Series 3",
        data: randomSeries(),
      },
    ]);
  }

  return (
    <>
      <PageBreadcrumb title="Radar Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Basic Radar Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={basicRadarOpts}
                height={350}
                series={basicRadarOpts.series}
                type="radar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Radar with Polygon-fill">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={polygonFillOpts}
                height={350}
                series={polygonFillOpts.series}
                type="radar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Radar – Multiple Series">
            <Box width={"100%"} textAlign={"center"}>
              <ReactApexChart
                className="apex-charts"
                options={multipleSeriesOpts}
                height={350}
                series={data}
                type="radar"
              />
              <Button variant="outlined" size="small" color="primary" onClick={update}>
                Update
              </Button>
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default RadarApex;
