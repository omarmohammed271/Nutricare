import { Box, Button, Card, CardContent, Grid, List, ListItem, Stack, Typography } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import { LuBriefcase, LuBuilding2, LuGroup, LuUsers } from "react-icons/lu";

const Pricing = () => {
  return (
    <>
      <PageBreadcrumb title="Pricing" subName="Extra Pages" />
      <Box sx={{ px: { xl: "128px" }, mx: "auto" }}>
        <Box sx={{ maxWidth: "512px", mx: "auto", textAlign: "center" }}>
          <Typography component={"h2"} sx={{ fontSize: "22px", mb: "4px", fontWeight: 500, color: "grey.600" }}>
            Our
            <Typography component={"span"} fontSize={"22px"} fontWeight={600} color={"grey.700"}>
              Plans
            </Typography>
          </Typography>
          <Typography sx={{ color: "grey.700", fontSize: "12px" }}>
            We have plans and prices that fit your business perfectly. Make your client site a success with our
            products.
          </Typography>
        </Box>
        <Box mt={"40px"}>
          <Grid container spacing={3}>
            <Grid item lg={4} xs={12}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography component={"h6"} sx={{ textTransform: "uppercase", color: "grey.700", fontWeight: 500 }}>
                    Professional Pack
                  </Typography>
                  <Box
                    sx={{
                      color: "primary.main",
                      border: "1px solid #02BE6A80",
                      bgcolor: "#02BE6A33",
                      borderRadius: "100%",
                      fontSize: "22px",
                      lineHeight: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "64px",
                      height: "64px",
                      mx: "auto",
                      my: "24px",
                    }}>
                    <LuUsers size={24} />
                  </Box>
                  <Typography
                    component={"h2"}
                    sx={{ fontSize: "30px", lineHeight: "36px", mb: "24px", color: "grey.700" }}>
                    $19
                    <Typography
                      component={"span"}
                      sx={{ fontSize: "14px", textTransform: "uppercase", fontWeight: "500", color: "grey.500" }}>
                      / Month
                    </Typography>
                  </Typography>
                  <Stack sx={{ gap: "24px", fontSize: "16px", color: "grey.700" }}>
                    <Typography>10 GB Storage</Typography>
                    <Typography>500 GB Bandwidth</Typography>
                    <Typography>No Domain</Typography>
                    <Typography>1 User</Typography>
                    <Typography>Email Support</Typography>
                    <Typography>24x7 Support</Typography>
                  </Stack>
                  <Box mt={"50px"}>
                    <Button variant="contained" color="primary" fullWidth>
                      Change Plan
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={4} xs={12}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography component={"h6"} sx={{ textTransform: "uppercase", color: "grey.700", fontWeight: 500 }}>
                    Professional Pack
                  </Typography>
                  <Box
                    sx={{
                      color: "error.main",
                      border: "1px solid #f1577680",
                      bgcolor: "#f1577633",
                      borderRadius: "100%",
                      fontSize: "22px",
                      lineHeight: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "64px",
                      height: "64px",
                      mx: "auto",
                      my: "24px",
                    }}>
                    <LuBriefcase size={24} />
                  </Box>
                  <Typography
                    component={"h2"}
                    sx={{ fontSize: "30px", lineHeight: "36px", mb: "24px", color: "grey.700" }}>
                    $29
                    <Typography
                      component={"span"}
                      sx={{ fontSize: "14px", textTransform: "uppercase", fontWeight: "500", color: "grey.500" }}>
                      / Month
                    </Typography>
                  </Typography>
                  <Stack sx={{ gap: "24px", fontSize: "16px", color: "grey.700" }}>
                    <Typography>50 GB Storage</Typography>
                    <Typography>900 GB Bandwidth</Typography>
                    <Typography>2 Domain</Typography>
                    <Typography>10 User</Typography>
                    <Typography>Email Support</Typography>
                    <Typography>24x7 Support</Typography>
                  </Stack>
                  <Box mt={"50px"}>
                    <Button variant="contained" color="error" fullWidth>
                      Change Plan
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={4} xs={12}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography component={"h6"} sx={{ textTransform: "uppercase", color: "grey.700", fontWeight: 500 }}>
                    Professional Pack
                  </Typography>
                  <Box
                    sx={{
                      color: "primary.main",
                      border: "1px solid #02BE6A80",
                      bgcolor: "#02BE6A33",
                      borderRadius: "100%",
                      fontSize: "22px",
                      lineHeight: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "64px",
                      height: "64px",
                      mx: "auto",
                      my: "24px",
                    }}>
                    <LuBuilding2 size={24} />
                  </Box>
                  <Typography
                    component={"h2"}
                    sx={{ fontSize: "30px", lineHeight: "36px", mb: "24px", color: "grey.700" }}>
                    $39
                    <Typography
                      component={"span"}
                      sx={{ fontSize: "14px", textTransform: "uppercase", fontWeight: "500", color: "grey.500" }}>
                      / Month
                    </Typography>
                  </Typography>
                  <Stack sx={{ gap: "24px", fontSize: "16px", color: "grey.700" }}>
                    <Typography>100 GB Storage</Typography>
                    <Typography>Unlimited Bandwidth</Typography>
                    <Typography>10 Domain</Typography>
                    <Typography>Unlimited User</Typography>
                    <Typography>Email Support</Typography>
                    <Typography>24x7 Support</Typography>
                  </Stack>
                  <Box mt={"50px"}>
                    <Button variant="contained" color="primary" fullWidth>
                      Change Plan
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Pricing;
