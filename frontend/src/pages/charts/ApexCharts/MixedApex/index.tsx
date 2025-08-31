import ReactApexChart from "react-apexcharts";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

//data
import { lineAreaChartOpts, lineColumnAreaChartOpts, lineColumnChartOpts, multipleYAxisChartOpts } from "./data";
import { Box, Grid } from "@mui/material";

const MixedApex = () => {
  return (
    <>
      <PageBreadcrumb title="Mixed Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Line & Column Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={lineColumnChartOpts}
                height={380}
                series={lineColumnChartOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Multiple Y-Axis Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={multipleYAxisChartOpts}
                height={380}
                series={multipleYAxisChartOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Line & Area Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={lineAreaChartOpts}
                height={380}
                series={lineAreaChartOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Line, Column & Area Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={lineColumnAreaChartOpts}
                height={380}
                series={lineColumnAreaChartOpts.series}
                type="line"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default MixedApex;
