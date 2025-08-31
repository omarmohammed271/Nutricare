import { LuMoon, LuShoppingCart, LuSunMedium } from "react-icons/lu";
import { Box, Button, IconButton, Link, SxProps, styled } from "@mui/material";
import { useScrollEvent } from "@src/hooks";
import { alpha } from "@mui/material/styles";
import LogoBox from "@src/layouts/LeftSideBar/LogoBox.tsx";
import { useLayoutContext } from "@src/states";

type WithSx = {
  sx?: SxProps;
}

export const ContainerBox = styled("div")<WithSx>(({ theme, sx }) => {
  return {
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    paddingRight: "1rem",
    paddingLeft: "1rem",
    maxWidth: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: theme.breakpoints.values.sm
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.breakpoints.values.md
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: theme.breakpoints.values.xl
    },
    [theme.breakpoints.up("xxl")]: {
      maxWidth: theme.breakpoints.values.xxl
    },
    sx
  };
});

const Navbar = () => {

  const { themeMode, updateTheme } = useLayoutContext();

  const themeLight = themeMode == "light";
  const toggleLayoutTheme = () => {
    updateTheme(themeLight ? "dark" : "light")
  }

  const { scrollY } = useScrollEvent();
  const scrollPassed = scrollY >= 110;
  return (
    <Box
      sx={{
        position: "sticky",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 40,
        width: "100%",
        alignItems: "center",
        backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.95),
        backdropFilter: "blur(2px)",
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "300ms",
        boxShadow: scrollPassed ? (theme) => theme.shadows[2] : null
      }}
    >
      <Box sx={{ display: "flex", height: "4rem", alignItems: "center" }}>
        <ContainerBox>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>

            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <LogoBox defaultTheme={themeMode} />
            </Box>

            <Box sx={{ position: "relative", mx: "auto", display: { lg: "block", xs: "none" }, flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                  variant="subtitle1"
                  underline="hover"
                  sx={{
                    px: "1rem", textDecoration: "none", py: "0.5rem", color: "text.primary", fontWeight: 500,
                    "&:hover": { color: "primary.main" }
                  }}
                  href="#hero"
                >
                  Home
                </Link>
                <Link
                  variant="subtitle1"
                  underline="hover"
                  sx={{
                    px: "1rem",
                    textDecoration: "none",
                    py: "0.5rem",
                    color: "text.primary", fontWeight: 500,
                    "&:hover": { color: "primary.main" }
                  }}
                  href="#demo"
                >
                  Demo
                </Link>
                <Link
                  variant="subtitle1"
                  underline="hover"
                  sx={{
                    px: "1rem",
                    textDecoration: "none",
                    py: "0.5rem",
                    color: "text.primary", fontWeight: 500,
                    "&:hover": { color: "primary.main" }
                  }}
                  href="#features"
                >
                  Features
                </Link>
                <Link
                  variant="subtitle1"
                  underline="hover"
                  sx={{
                    px: "1rem",
                    textDecoration: "none",
                    py: "0.5rem",
                    color: "text.primary", fontWeight: 500,
                    "&:hover": { color: "primary.main" }
                  }}
                  href="#showcase"

                >
                  Showcase
                </Link>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleLayoutTheme}>
                {themeLight ? <LuMoon /> : <LuSunMedium />}
              </IconButton>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<LuShoppingCart size={20} />}
              >
                Buy Now
              </Button>
            </Box>

          </Box>
        </ContainerBox>
      </Box>
    </Box>
  );
};

export default Navbar;
