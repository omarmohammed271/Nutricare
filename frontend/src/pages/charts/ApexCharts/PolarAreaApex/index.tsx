import ReactApexChart from "react-apexcharts";
import { Box, Grid } from "@mui/material";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// data
import { basicPolarAreaOpts, monochromePolarAreaOpts } from "./data";

const PolarAreaApex = () => {
  return (
    <>
      <PageBreadcrumb title="Polar Area Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Basic Polar Area Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={basicPolarAreaOpts}
                height={380}
                series={basicPolarAreaOpts.series}
                type="polarArea"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Monochrome Polar Area">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={monochromePolarAreaOpts}
                height={380}
                series={monochromePolarAreaOpts.series}
                type="polarArea"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default PolarAreaApex;
