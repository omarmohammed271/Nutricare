import Chart, { type ChartItem } from "chart.js/auto";
import { useEffect } from "react";
import {
  interpolationConfig,
  lineConfig,
  multiAxesConfig,
  pointStylingConfig,
  lineSegmentConfig,
  steppedConfig,
} from "./data";

// component
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { Box, Grid } from "@mui/material";

const LineChartjs = () => {
  useEffect(() => {
    const interpolationTag = document.getElementById("interpolation-example") as ChartItem;
    const interpolationChart = new Chart(interpolationTag, interpolationConfig);

    const lineTag = document.getElementById("line-example") as ChartItem;
    const lineChart = new Chart(lineTag, lineConfig);

    const multiAxesTag = document.getElementById("multi-axes-example") as ChartItem;
    const multiAxesChart = new Chart(multiAxesTag, multiAxesConfig);

    const pointStylingTag = document.getElementById("point-styling-example") as ChartItem;
    const pointStylingChart = new Chart(pointStylingTag, pointStylingConfig);

    const lineSegmentTag = document.getElementById("line-segment-example") as ChartItem;
    const lineSegmentChart = new Chart(lineSegmentTag, lineSegmentConfig);

    const steppedTag = document.getElementById("stepped-example") as ChartItem;
    const steppedChart = new Chart(steppedTag, steppedConfig);

    return () => {
      interpolationChart.destroy();
      lineChart.destroy();
      multiAxesChart.destroy();
      pointStylingChart.destroy();
      lineSegmentChart.destroy();
      steppedChart.destroy();
    };
  }, []);

  return (
    <>
      <PageBreadcrumb title="Chartjs" subName="Charts" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Interpolation">
            <Box height={"320px"} width={"100%"}>
              <canvas id="interpolation-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Line">
            <Box height={"320px"} width={"100%"}>
              <canvas id="line-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Multi-Axes">
            <Box height={"320px"} width={"100%"}>
              <canvas id="multi-axes-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Point Styling">
            <Box height={"320px"} width={"100%"}>
              <canvas id="point-styling-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Line Segment">
            <Box height={"320px"} width={"100%"}>
              <canvas id="line-segment-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Stepped">
            <Box height={"320px"} width={"100%"}>
              <canvas id="stepped-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default LineChartjs;
