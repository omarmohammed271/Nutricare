import { useEffect } from "react";
import Chart, { type ChartItem } from "chart.js/auto";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// data
import { boundariesConfig, datasetConfig, drawTimeConfig, radarConfig, stackedConfig } from "./data";
import { Box, Grid } from "@mui/material";

// components

const AreaChartjs = () => {
  useEffect(() => {
    const boundariesTag = document.getElementById("boundaries-example") as ChartItem;
    const boundariesChart = new Chart(boundariesTag, boundariesConfig);

    const datasetTag = document.getElementById("dataset-example") as ChartItem;
    const datasetChart = new Chart(datasetTag, datasetConfig);

    const drawTimeTag = document.getElementById("draw-time-example") as ChartItem;
    const drawTimeChart = new Chart(drawTimeTag, drawTimeConfig);

    const stackedTag = document.getElementById("stacked-example") as ChartItem;
    const stackedChart = new Chart(stackedTag, stackedConfig);

    const radarTag = document.getElementById("radar-example") as ChartItem;
    const radarChart = new Chart(radarTag, radarConfig);

    return () => {
      boundariesChart.destroy();
      datasetChart.destroy();
      drawTimeChart.destroy();
      stackedChart.destroy();
      radarChart.destroy();
    };
  }, []);

  return (
    <>
      <PageBreadcrumb title="Chartjs" subName="Charts" />
      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Boundaries">
            <Box height={"320px"} width={"100%"}>
              <canvas id="boundaries-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Different Dataset">
            <Box height={"320px"} width={"100%"}>
              <canvas id="dataset-example" data-colors="#3e60d5,#fa5c7c,#47ad77,#ebeff2, #f56f36"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Draw Time">
            <Box height={"320px"} width={"100%"}>
              <canvas id="draw-time-example" data-colors="#3e60d5,#47ad77"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Stacked">
            <Box height={"320px"} width={"100%"}>
              <canvas id="stacked-example" data-colors="#3e60d5,#fa5c7c,#47ad77,#ebeff2, #f56f36"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Radar">
            <Box height={"320px"} width={"100%"}>
              <canvas id="radar-example" data-colors="#3e60d5,#fa5c7c,#47ad77,#ebeff2, #f56f36"></canvas>
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default AreaChartjs;
