import { LuArrowDown } from "react-icons/lu";
import { Box, Button, Grid, Typography, Stack, Link } from "@mui/material";
import { ContainerBox } from "./Navbar";

import heroImg from "@src/assets/images/landing/hero.png";
import reactImg from "@src/assets/images/landing/react.svg";
import muiImg from "@src/assets/images/landing/mui.svg";
import viteImg from "@src/assets/images/landing/vite.svg";
import bunImg from "@src/assets/images/landing/bun.svg";
import typescriptImg from "@src/assets/images/landing/typescript.svg";
import { useLayoutContext } from "@src/states";

const Hero = () => {
  const { themeMode } = useLayoutContext();

  return (
    <Box sx={{ position: "relative", scrollMarginTop: "2.5rem", backgroundColor: "background.paper" }} id="hero">
      <Box sx={{ position: "relative", pb: "1.5rem" }}>
        <Box sx={{ width: "100%", pt: { xxl: 12, sm: 8 }, pb: "3rem" }}>
          <ContainerBox sx={{ position: "relative", paddingLeft: 0, paddingRight: 0 }}>
            <Grid container sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Grid item xl={5} xs={12} sx={{ order: { xl: 1, xs: 2 }, height: "100%" }}>
                <Stack sx={{ justifyContent: "space-between" }} gap={6}>
                  <Typography variant="h1" sx={{ fontSize: "38px", lineHeight: 1.4, color: "text.primary" }}>
                    Attex - React & Material UI (MUI) Admin & Dashboard Template
                  </Typography>
                  <Typography variant="h5" sx={{
                    color: "text.primary",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    "&>span": { color: "primary.main", fontWeight: 500 }
                  }}>
                    The Attex MUI is built on top of latest MUI, following best practices.
                    <br />
                    Provides you with ready to use Dashboards, Apps and <span>Many</span> UI Elements
                  </Typography>
                  <Button variant="contained" color="primary" size="large" href="#dashboards"
                    endIcon={<LuArrowDown size={16} />}
                    sx={{ width: "fit-content" }}>
                    View Demos
                  </Button>
                </Stack>
              </Grid>
              <Grid item xl={5} xs={12} sx={{ order: { xl: 2, xs: 1 } }}>
                <Box style={{
                  display: "inline-flex",
                  overflow: "hidden",
                  borderRadius: "0.5rem",
                  transitionProperty: "all",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "500ms",


                }}
                  sx={{ boxShadow: 6 }}
                  data-aos="zoom-out"
                  data-aos-easing="ease-out-back"
                  data-aos-duration={1000}>
                  <Link href="#demo" style={{ lineHeight: 0 }}>
                    <img style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "100%", }} src={heroImg} />
                  </Link>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ marginTop: { xxl: 12, sm: 4 }, textAlign: "center" }}>
              <Typography variant="h3" sx={{
                display: "inline",
                border: "0px",
                borderBottomWidth: "1px",
                borderStyle: "dashed",
                borderColor: "primary.light",
                color: "text.primary",
                fontWeight: 600
              }}>
                Developed Using (Best in own class)
              </Typography>
              <Box sx={{
                mb: "2.5rem",
                mt: "2rem",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                "& > img:hover": { transform: "translateY(-4px)" }
              }}>
                {[reactImg, muiImg, typescriptImg, viteImg, bunImg].map((item, idx) => <img key={idx} style={{
                  height: "3rem",
                  width: "3rem",
                  maxWidth: "100%",
                  cursor: "pointer",
                  transitionProperty: "all",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "150ms"
                }} src={item} />)}
              </Box>
            </Box>
          </ContainerBox>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
