import home1 from "@src/assets/images/landing/home-1.jpg";
import { Box, Grid } from "@mui/material";
import { ContainerBox } from './Navbar'
import { SectionTitle, DemoCard } from "./components";
import heroImg from "@src/assets/images/landing/hero.png";
import dashboardAnalytics from "@src/assets/images/landing/dashboard-analytics.png";
import dashboardEcom from "@src/assets/images/landing/dashboard-ecom.png";

const DashboardDemos = () => {
  return (
    <Box sx={{ py: '5rem', backgroundColor: "background.paper" }} id="demo">
      <ContainerBox>
        <SectionTitle name="Management" title="Dashboard Pages" description="Manage all your business in at one glance" />
        <Grid
          container
          spacing={4}
          className="justify-content-center grid grid-cols-1 gap-8 md:grid-cols-2"
          data-aos="fade-up"
          data-aos-duration={1000}
        >
          <Grid item md={6}>
            <DemoCard
              link='ecommerce'
              image={dashboardEcom}
              name="E-Commerce"
            />
          </Grid>

          <Grid item md={6}>
            <DemoCard
              link='analytics'
              image={dashboardAnalytics}
              name="Analytics"
            />
          </Grid>
        </Grid>
      </ContainerBox>
    </Box>
  )
}

export default DashboardDemos
