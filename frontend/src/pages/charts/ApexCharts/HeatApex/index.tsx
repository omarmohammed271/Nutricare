import ReactApexChart from "react-apexcharts";
import { Box, Grid } from "@mui/material";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

//data
import { basicHeatmapOpts, colorRangeHeatmapOpts, multipleHeatmapOpts, rangewithoutShadeOpts } from "./data";

const HeatApex = () => {
  return (
    <>
      <PageBreadcrumb title="Heatmap Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Basic Heatmap - Single Series">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={basicHeatmapOpts}
                height={380}
                series={basicHeatmapOpts.series}
                type="heatmap"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Heatmap - Multiple Series">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={multipleHeatmapOpts}
                height={380}
                series={multipleHeatmapOpts.series}
                type="heatmap"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Heatmap - Color Range">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={colorRangeHeatmapOpts}
                height={380}
                series={colorRangeHeatmapOpts.series}
                type="heatmap"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Heatmap - Range without Shades">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={rangewithoutShadeOpts}
                height={380}
                series={rangewithoutShadeOpts.series}
                type="heatmap"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default HeatApex;
