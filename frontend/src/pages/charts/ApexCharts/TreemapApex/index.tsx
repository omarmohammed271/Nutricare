import { Box, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// data
import { basicTreemapOpts, colorRangeTreemapOpts, distributedTreemapOpts, multipleSeriesTreemapOpts } from "./data";

const TreemapApex = () => {
  return (
    <>
      <PageBreadcrumb title="Treemap Charts" subName="Apex" />
      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Basic Treemap">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={basicTreemapOpts}
                height={350}
                series={basicTreemapOpts.series}
                type="treemap"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Treemap Multiple Series">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={multipleSeriesTreemapOpts}
                height={350}
                series={multipleSeriesTreemapOpts.series}
                type="treemap"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Distributed Treemap">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={distributedTreemapOpts}
                height={350}
                series={distributedTreemapOpts.series}
                type="treemap"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Color Range Treemap">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={colorRangeTreemapOpts}
                height={350}
                series={colorRangeTreemapOpts.series}
                type="treemap"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default TreemapApex;
