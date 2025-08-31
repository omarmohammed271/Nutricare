import { Grid } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import Statistics from "./components/Statistics";
import RevenueChart from "./components/RevenueChart";
import TotalSalesChart from "./components/TotalSalesChart";
import TopSellingProducts from "./components/TopSellingProducts";
import RevenueByLocation from "./components/RevenueByLocation";

const Ecommerce = () => {
  return (
    <>
      <PageBreadcrumb title="Dashboard" subName="Ecommerce" />

      <Statistics />

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item lg={8} xs={12}>
          <RevenueChart />
        </Grid>
        <Grid item lg={4} xs={12}>
          <TotalSalesChart />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item lg={5} xs={12}>
          <TopSellingProducts />
        </Grid>
        <Grid item lg={7} xs={12}>
          <RevenueByLocation />
        </Grid>
      </Grid>
    </>
  );
};

export default Ecommerce;
