import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import { LuArrowRight } from "react-icons/lu";

//images
import SessionsByBrowser from "./components/SessionsByBrowser";
import SessionsByOS from "./components/SessionsByOS";
import ViewsPerMinute from "./components/ViewsPerMinute";
import SessionOverview from "./components/SessionOverview";
import SessionsByCountry from "./components/SessionsByCountry";
import Statistics from "./components/Statistics";
import TableCharts from "./components/TableCharts";

const Analytics = () => {
  return (
    <>
      <PageBreadcrumb title="Analytics" subName="Menu" />

      <Statistics />
      <Grid container spacing={3} mt={0}>
        <Grid item lg={4} xs={12} md={6}>
          <SessionsByBrowser />
        </Grid>
        <Grid item lg={4} xs={12} md={6}>
          <SessionsByOS />
        </Grid>
        <Grid item lg={4} xs={12} md={6}>
          <ViewsPerMinute />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={0}>
        <Grid item lg={6} xs={12}>
          <SessionOverview />
        </Grid>
        <Grid item lg={6} xs={12}>
          <SessionsByCountry />
        </Grid>
      </Grid>
      <Box mt={3}>
        <TableCharts />
      </Box>
    </>
  );
};

export default Analytics;
