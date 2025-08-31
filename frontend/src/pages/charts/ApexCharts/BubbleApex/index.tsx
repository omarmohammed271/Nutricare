import ReactApexChart from "react-apexcharts";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// data
import { secondBubbleChartOpts, simpleBubbleChartOpts } from "./data";
import { Box, Grid } from "@mui/material";

const BubbleApex = () => {
  return (
    <>
      <PageBreadcrumb title="Bubble Charts" subName="Apex" />
      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Simple Bubble Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={simpleBubbleChartOpts}
                height={380}
                series={simpleBubbleChartOpts.series}
                type="bubble"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="3D Bubble Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={secondBubbleChartOpts}
                height={380}
                series={secondBubbleChartOpts.series}
                type="bubble"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default BubbleApex;
