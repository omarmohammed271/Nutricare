import { Box, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

//data
import { datetimeOpts, scatterWithImagesOpts, scatterXYOpts } from "./data";

const ScatterApex = () => {
  return (
    <>
      <PageBreadcrumb title="Scatter Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Scatter (XY) Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={scatterXYOpts}
                height={380}
                series={scatterXYOpts.series}
                type="scatter"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Scatter Chart - Datetime">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={datetimeOpts}
                height={380}
                series={datetimeOpts.series}
                type="scatter"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Scatter - Images">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={scatterWithImagesOpts}
                height={380}
                series={scatterWithImagesOpts.series}
                type="scatter"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default ScatterApex;
