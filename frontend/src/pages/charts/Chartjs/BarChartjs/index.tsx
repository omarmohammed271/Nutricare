import { Box, Grid } from "@mui/material";
import Chart, { type ChartItem } from "chart.js/auto";
import { useEffect } from "react";
import {
  borderRadiusConfig,
  floatingConfig,
  horizontalConfig,
  stackedConfig,
  groupStackConfig,
  verticalConfig,
} from "./data";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

const BarChartjs = () => {
  useEffect(() => {
    const borderRadiusTag = document.getElementById("border-radius-example") as ChartItem;
    const borderRadiusChart = new Chart(borderRadiusTag, borderRadiusConfig);

    const floatingTag = document.getElementById("floating-example") as ChartItem;
    const floatingChart = new Chart(floatingTag, floatingConfig);

    const horizontalTag = document.getElementById("horizontal-example") as ChartItem;
    const horizontalChart = new Chart(horizontalTag, horizontalConfig);

    const stackedTag = document.getElementById("stacked-example") as ChartItem;
    const stackedChart = new Chart(stackedTag, stackedConfig);

    const groupStackTag = document.getElementById("group-stack-example") as ChartItem;
    const groupStackChart = new Chart(groupStackTag, groupStackConfig);

    const verticalTag = document.getElementById("vertical-example") as ChartItem;
    const verticalChart = new Chart(verticalTag, verticalConfig);

    return () => {
      borderRadiusChart.destroy();
      floatingChart.destroy();
      horizontalChart.destroy();
      stackedChart.destroy();
      groupStackChart.destroy();
      verticalChart.destroy();
    };
  });

  return (
    <>
      <PageBreadcrumb title="Chartjs" subName="Charts" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Border Radius">
            <Box height={"320px"} width={"100%"}>
              <canvas id="border-radius-example" data-colors="#3e60d5,#47ad77" />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Floating">
            <Box height={"320px"} width={"100%"}>
              <canvas id="floating-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Horizontal">
            <Box height={"320px"} width={"100%"}>
              <canvas id="horizontal-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Stacked">
            <Box height={"320px"} width={"100%"}>
              <canvas id="stacked-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Stacked with Groups">
            <Box height={"320px"} width={"100%"}>
              <canvas id="group-stack-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Vertical">
            <Box height={"320px"} width={"100%"}>
              <canvas id="vertical-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default BarChartjs;
