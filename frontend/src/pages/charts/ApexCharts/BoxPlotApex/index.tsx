import { Box, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

//data
import { basicBoxplotOpts, horizontalBoxPlotOpts, scatterBoxplotOpts } from "./data";

const BoxPlotApex = () => {
  return (
    <>
      <PageBreadcrumb title="Boxplot Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Basic Boxplot">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={basicBoxplotOpts}
                height={350}
                series={basicBoxplotOpts.series}
                type="boxPlot"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Scatter Boxplot">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={scatterBoxplotOpts}
                height={350}
                series={scatterBoxplotOpts.series}
                type="boxPlot"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Horizontal BoxPlot">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={horizontalBoxPlotOpts}
                height={350}
                series={horizontalBoxPlotOpts.series}
                type="boxPlot"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default BoxPlotApex;
