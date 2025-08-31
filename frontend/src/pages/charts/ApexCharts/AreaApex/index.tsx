import ReactApexChart from "react-apexcharts";

// data
import {
  NavigateAreaApexOpts,
  areaApexOpts,
  areaNullValueOpts,
  dateTimeAreaApexOpts,
  irregularTimeSeriesOpts,
  spilineAreaApexOpts,
  stackedAreaOpts,
} from "./data";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { Box, Button, Grid } from "@mui/material";

// components

const AreaApex = () => {
  return (
    <>
      <PageBreadcrumb title="Area Charts" subName="Apex" />
      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Basic Area Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={areaApexOpts}
                height={380}
                series={areaApexOpts.series}
                type="area"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Spline Area">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={spilineAreaApexOpts}
                height={380}
                series={spilineAreaApexOpts.series}
                type="area"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Area Chart - Datetime X-axis">
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Button variant="text" size="small" color="secondary">
                
                1M
              </Button>
              <Button variant="text" size="small" color="secondary">
                
                6M
              </Button>
              <Button variant="text" size="small" color="secondary">
                
                1Y
              </Button>
              <Button variant="text" size="small" color="secondary">
                
                YTD
              </Button>
              <Button variant="text" size="small" color="secondary">
                
                All
              </Button>
            </Box>
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={dateTimeAreaApexOpts}
                height={350}
                series={dateTimeAreaApexOpts.series}
                type="area"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Area with Negative Values">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={NavigateAreaApexOpts}
                height={380}
                series={NavigateAreaApexOpts.series}
                type="area"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Stacked Area">
            <Box width={"100%"}>
              <ReactApexChart
                id="stacked-area"
                className="apex-charts"
                options={stackedAreaOpts}
                height={380}
                series={stackedAreaOpts.series}
                type="area"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Irregular TimeSeries">
            <Box width={"100%"}>
              <ReactApexChart
                id="area-timeSeries"
                className="apex-charts"
                options={irregularTimeSeriesOpts}
                height={380}
                series={irregularTimeSeriesOpts.series}
                type="area"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Area Chart with Null values">
            <Box width={"100%"}>
              <ReactApexChart
                id="area-chart-nullvalues"
                className="apex-charts"
                options={areaNullValueOpts}
                height={380}
                series={areaNullValueOpts.series}
                type="area"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default AreaApex;
