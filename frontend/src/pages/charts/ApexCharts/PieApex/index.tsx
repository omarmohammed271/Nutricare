import ReactApexChart from "react-apexcharts";
import { useState } from "react";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// data
import {
  donutUpdateOpts,
  gradientDonutOpts,
  imagefillOpts,
  monochromePieOpts,
  patternedDonutOpts,
  simpleDonutOpts,
  simplePieOpts,
} from "./data";
import { Box, Button, Grid } from "@mui/material";

// components

const PieApex = () => {
  const [data, setData] = useState([44, 55, 13, 33]);

  function appendData() {
    const arr = data.map(function () {
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    });
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);
    return setData(arr);
  }

  function removeData() {
    const arr = data.map(function () {
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    });
    arr.pop();
    return setData(arr);
  }

  function randomize() {
    return setData(
      data.map(function () {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      }),
    );
  }

  function reset() {
    return setData([44, 55, 13, 33]);
  }

  return (
    <>
      <PageBreadcrumb title="Pie Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Simple Pie Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={simplePieOpts}
                height={320}
                series={simplePieOpts.series}
                type="pie"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Simple Donut Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={simpleDonutOpts}
                height={320}
                series={simpleDonutOpts.series}
                type="donut"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Monochrome Pie Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={monochromePieOpts}
                height={320}
                series={monochromePieOpts.series}
                type="pie"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Gradient Donut Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={gradientDonutOpts}
                height={320}
                series={gradientDonutOpts.series}
                type="donut"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Patterned Donut Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={patternedDonutOpts}
                height={320}
                series={patternedDonutOpts.series}
                type="donut"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Pie Chart with Image fill">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={imagefillOpts}
                height={320}
                series={imagefillOpts.series}
                type="pie"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Donut Update">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={donutUpdateOpts}
                height={320}
                series={data}
                type="donut"
              />
            </Box>
            <Box sx={{ mt: "4px", width: "100%", gap: 1, display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              <Button variant="outlined" size="small" color="primary" onClick={randomize}>
                RANDOMIZE
              </Button>
              <Button variant="outlined" size="small" color="primary" onClick={appendData}>
                ADD
              </Button>
              <Button variant="outlined" size="small" color="primary" onClick={removeData}>
                REMOVE
              </Button>
              <Button variant="outlined" size="small" color="primary" onClick={reset}>
                RESET
              </Button>
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default PieApex;
