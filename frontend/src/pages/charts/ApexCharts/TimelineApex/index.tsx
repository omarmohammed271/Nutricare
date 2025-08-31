import ReactApexChart from "react-apexcharts";
import { Box, Grid } from "@mui/material";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

//data
import {
  advancedTimelineOpts,
  basicTimelineOpts,
  distributedTimelineOpts,
  groupRowsTimelineOpts,
  multiSeriesTimelineOpts,
} from "./data";

const TimelineApex = () => {
  return (
    <>
      <PageBreadcrumb title="Timeline Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Basic Timeline">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={basicTimelineOpts}
                height={350}
                series={basicTimelineOpts.series}
                type="rangeBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Distributed Timeline">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={distributedTimelineOpts}
                height={350}
                series={distributedTimelineOpts.series}
                type="rangeBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Multi Series Timeline">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={multiSeriesTimelineOpts}
                height={350}
                series={multiSeriesTimelineOpts.series}
                type="rangeBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Advanced Timeline">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={advancedTimelineOpts}
                height={350}
                series={advancedTimelineOpts.series}
                type="rangeBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Multiple Series - Group Rows">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={groupRowsTimelineOpts}
                height={350}
                series={groupRowsTimelineOpts.series}
                type="rangeBar"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default TimelineApex;
