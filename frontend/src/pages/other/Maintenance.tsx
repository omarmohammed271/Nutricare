import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { AuthBGLayout } from "@src/components";
import { LuClock3, LuGem, LuHelpCircle } from "react-icons/lu";

//image
import maintenance from "@src/assets/images/svg/maintenance.svg";

const Maintenance = () => {
  return (
    <>
      <AuthBGLayout>
        <Box sx={{ height: "100vh", position: "relative" }}>
          <Box sx={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, height: "100%" }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              position: "relative",
              width: "100%",
            }}>
            <Box width={{ lg: "58.33%", xl: "80%", xs: "91.66%" }}>
              <Card>
                <CardContent sx={{ p: "40px" }}>
                  <Box sx={{ mx: "auto" }}>
                    <img src={maintenance} style={{ height: "160px", width: "100%" }} />
                  </Box>
                  <Box sx={{ maxWidth: "512px", mx: "auto", textAlign: "center" }}>
                    <Typography
                      component={"h2"}
                      sx={{ fontSize: "22px", mt: "36px", mb: "4px", color: "grey.700", fontWeight: 500 }}>
                      Site is Under Maintenance
                    </Typography>
                    <Typography component={"p"} sx={{ fontWeight: 400, color: "grey.600" }}>
                      
                      We're making the system more awesome. We'll be back shortly.
                    </Typography>
                  </Box>
                  <Box pt={"96px"}>
                    <Grid container spacing={3}>
                      <Grid item md={4} xs={12}>
                        <Box sx={{ px: "12px", textAlign: "center" }}>
                          <Box
                            sx={{
                              bgcolor: "primary.main",
                              color: "#ffff",
                              fontSize: "20px",
                              borderRadius: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "56px",
                              width: "56px",
                              mx: "auto",
                              mb: "32px",
                            }}>
                            <LuGem />
                          </Box>
                          <Typography
                            component={"h5"}
                            sx={{ mb: "8px", textTransform: "uppercase", fontWeight: 600, color: "grey.700" }}>
                            Why is the Site Down?
                          </Typography>
                          <Typography component={"p"} sx={{ color: "grey.600" }}>
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration.
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Box sx={{ px: "12px", textAlign: "center" }}>
                          <Box
                            sx={{
                              bgcolor: "primary.main",
                              color: "#ffff",
                              fontSize: "20px",
                              borderRadius: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "56px",
                              width: "56px",
                              mx: "auto",
                              mb: "32px",
                            }}>
                            <LuClock3 />
                          </Box>
                          <Typography
                            component={"h5"}
                            sx={{ mb: "8px", textTransform: "uppercase", fontWeight: 600, color: "grey.700" }}>
                            Why is the Site Down?
                          </Typography>
                          <Typography component={"p"} sx={{ color: "grey.600" }}>
                            
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                            of classical but the majority.
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Box sx={{ px: "12px", textAlign: "center" }}>
                          <Box
                            sx={{
                              bgcolor: "primary.main",
                              color: "#ffff",
                              fontSize: "20px",
                              borderRadius: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "56px",
                              width: "56px",
                              mx: "auto",
                              mb: "32px",
                            }}>
                            <LuHelpCircle />
                          </Box>
                          <Typography
                            component={"h5"}
                            sx={{ mb: "8px", textTransform: "uppercase", fontWeight: 600, color: "grey.700" }}>
                            Why is the Site Down?
                          </Typography>
                          <Typography component={"p"} sx={{ color: "grey.600" }}>
                            
                            If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                            embar..
                          </Typography>
                        </Box>
                      </Grid>
                      <Box></Box>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                fontWeight: 500,
                height: "56px",
                bgcolor: "transparent",
              }}>
              <Typography component={"span"}>{new Date().getFullYear()} © Attex - Coderthemes.com</Typography>
            </Box>
          </Box>
        </Box>
      </AuthBGLayout>
    </>
  );
};

export default Maintenance;
