import ReactApexChart from "react-apexcharts";
import { Box, Grid } from "@mui/material";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// data
import {
  basicRadialBarOpts,
  circleWithImageOpts,
  customAngleOpts,
  gradientCircularOpts,
  multipleRadialBarsOpts,
  semiCircleGaugeOpts,
  strokedCircularGuageOpts,
} from "./data";

const RadialbarApex = () => {
  return (
    <>
      <PageBreadcrumb title="RadialBar Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Basic RadialBar Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={basicRadialBarOpts}
                height={320}
                series={basicRadialBarOpts.series}
                type="radialBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Multiple RadialBars">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={multipleRadialBarsOpts}
                height={320}
                series={multipleRadialBarsOpts.series}
                type="radialBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Circle Chart - Custom Angle">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={customAngleOpts}
                height={380}
                series={customAngleOpts.series}
                type="radialBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Circle Chart with Image">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={circleWithImageOpts}
                height={360}
                series={circleWithImageOpts.series}
                type="radialBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Stroked Circular Guage">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={strokedCircularGuageOpts}
                height={380}
                series={strokedCircularGuageOpts.series}
                type="radialBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Gradient Circular Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={gradientCircularOpts}
                height={330}
                series={gradientCircularOpts.series}
                type="radialBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Semi Circle Gauge">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={semiCircleGaugeOpts}
                height={625}
                series={semiCircleGaugeOpts.series}
                type="radialBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default RadialbarApex;
