import ReactApexChart from "react-apexcharts";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// data
import { candlestickwithLineOpts, categoryXAxisOpts, simpleCandlestickOpts } from "./data";
import { Box, Grid } from "@mui/material";

const CandleStickApex = () => {
  return (
    <>
      <PageBreadcrumb title="Candlestick Charts" subName="Apex" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Simple Candlestick Chart">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={simpleCandlestickOpts}
                height={400}
                series={simpleCandlestickOpts.series}
                type="candlestick"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Category X-Axis">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={categoryXAxisOpts}
                height={380}
                series={categoryXAxisOpts.series}
                type="candlestick"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Candlestick with Line">
            <Box width={"100%"}>
              <ReactApexChart
                className="apex-charts"
                options={candlestickwithLineOpts}
                height={380}
                series={candlestickwithLineOpts.series}
                type="candlestick"
              />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default CandleStickApex;
