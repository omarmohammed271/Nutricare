import { Box, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import DynamicLoaded from "./DynamicLoaded";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// data
import {
  basicColumnOpts,
  columnGroupLabelOpts,
  columnWithDataTableOpts,
  columnWithRotatedlabelsOpts,
  columnwithMarkersOpts,
  columnwithnegativevalueOpts,
  distributedColumnOpts,
  fullStackedColumnOpts,
  rangeColumnOpts,
  stackedColumnOpts,
} from "./data";

const ColumnApex = () => {
  return (
    <>
      <PageBreadcrumb title="Column Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Basic Column Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={basicColumnOpts}
                height={396}
                series={basicColumnOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Column Chart with Datalabels">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={columnWithDataTableOpts}
                height={380}
                series={columnWithDataTableOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Stacked Column Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={stackedColumnOpts}
                height={380}
                series={stackedColumnOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="100% Stacked Column Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={fullStackedColumnOpts}
                height={380}
                series={fullStackedColumnOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Column with Markers">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={columnwithMarkersOpts}
                height={380}
                series={columnwithMarkersOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Column with Group Label">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={columnGroupLabelOpts}
                height={380}
                series={columnGroupLabelOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Column Chart with rotated labels & Annotations">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={columnWithRotatedlabelsOpts}
                height={380}
                series={columnWithRotatedlabelsOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Column Chart with negative values">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={columnwithnegativevalueOpts}
                height={380}
                series={columnwithnegativevalueOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Distributed Column Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={distributedColumnOpts}
                height={380}
                series={distributedColumnOpts.series}
                type="bar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Range Column Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={rangeColumnOpts}
                height={380}
                series={rangeColumnOpts.series}
                type="rangeBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xs={12}>
          <ComponentContainerCard title="Dynamic Loaded Chart">
            <Box width={"100%"}>
              <DynamicLoaded />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default ColumnApex;
