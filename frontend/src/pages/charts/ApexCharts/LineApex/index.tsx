import ReactApexChart from "react-apexcharts";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// data
import {
  brushChartOpts,
  brushChartOpts2,
  dashedLineChartOpts,
  gradientLineChartOpts,
  lineChartOpts,
  lineChartwithAnnotationOpts,
  lineWithDataLabelOpts,
  missingChartOpts,
  steplineChartOpts,
  syncingChartOpts,
  syncingChartOpts2,
  zoomableTimeseriesOpts,
} from "./data";
import { Box, Grid } from "@mui/material";

const LineApex = () => {
  return (
    <>
      <PageBreadcrumb title="Line Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Simple line chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={lineChartOpts}
                height={380}
                series={lineChartOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Line with Data Labels">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={lineWithDataLabelOpts}
                height={380}
                series={lineWithDataLabelOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Zoomable Timeseries">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={zoomableTimeseriesOpts}
                height={380}
                series={zoomableTimeseriesOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Line Chart with Annotations">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={lineChartwithAnnotationOpts}
                height={380}
                series={lineChartwithAnnotationOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Syncing charts">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={syncingChartOpts}
                height={200}
                series={syncingChartOpts.series}
                type="line"
              />
            </Box>
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={syncingChartOpts2}
                height={200}
                series={syncingChartOpts2.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Gradient Line Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={gradientLineChartOpts}
                height={430}
                series={gradientLineChartOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Missing / Null values">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={missingChartOpts}
                height={380}
                series={missingChartOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Dashed Line Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={dashedLineChartOpts}
                height={380}
                series={dashedLineChartOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Stepline Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={steplineChartOpts}
                height={390}
                series={steplineChartOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Brush Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={brushChartOpts}
                height={230}
                series={brushChartOpts.series}
                type="line"
              />
            </Box>
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={brushChartOpts2}
                height={130}
                series={brushChartOpts2.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default LineApex;
