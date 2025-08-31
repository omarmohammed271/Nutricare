import ReactApexChart from "react-apexcharts";

// components

// data
import {
  basicBarOpts,
  customDataLabelBarOpts,
  fullStackedBarOpts,
  groupBarOpts,
  imageFillBarOpts,
  markersBarOpts,
  navigateBarOpts,
  patternedBarOpts,
  reversedBarOpts,
  stackedBarOpts,
} from "./data";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { Box, Grid } from "@mui/material";

const BarApex = () => {
  return (
    <>
      <PageBreadcrumb title="Bar Charts" subName="Apex" />
      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Basic Bar Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={basicBarOpts}
                height={380}
                series={basicBarOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Grouped Bar Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={groupBarOpts}
                height={380}
                series={groupBarOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Stacked Bar Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={stackedBarOpts}
                height={380}
                series={stackedBarOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="100% Stacked Bar Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={fullStackedBarOpts}
                height={380}
                series={fullStackedBarOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Bar with Negative Values">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={navigateBarOpts}
                height={380}
                series={navigateBarOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Reversed Bar Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={reversedBarOpts}
                height={380}
                series={reversedBarOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Bar with Image Fill">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={imageFillBarOpts}
                height={450}
                series={imageFillBarOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Custom DataLabels Bar">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={customDataLabelBarOpts}
                height={450}
                series={customDataLabelBarOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Patterned Bar Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={patternedBarOpts}
                height={380}
                series={patternedBarOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Bar with Markers">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={markersBarOpts}
                height={380}
                series={markersBarOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default BarApex;
