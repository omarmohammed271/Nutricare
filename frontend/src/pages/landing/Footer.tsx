import logo from "@src/assets/images/nutricare-logo.svg";
import logoDark from "@src/assets/images/logo-dark.png";
import { LuShoppingCart } from "react-icons/lu";
import { Box, Button, Link, Typography, } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { ContainerBox } from "./Navbar";
import LogoBox from "@src/layouts/LeftSideBar/LogoBox";
import { useLayoutContext } from "@src/types/states";

const Footer = () => {
  const { themeMode } = useLayoutContext();
  return (
    <Box sx={{  pt:5,position: 'relative', backgroundSize: 'cover', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat', backgroundColor: "background.paper" }}>
      <ContainerBox>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 4 }}>
          <LogoBox defaultTheme={themeMode} />
          <Typography variant="caption" sx={{ textAlign: 'center', mx: 'auto', color: 'text.secondary', "&>a": { color: 'text.secondary', fontWeight: 600 } }}>
            {new Date().getFullYear()} © Nutricare
            <br />
            Crafted and Coded with <span> ❤️ </span> by &nbsp;
            <Link href="https://coderthemes.com/" target="_blank">
              Coderthemes
            </Link>
          </Typography>
        </Box>
      </ContainerBox>
    </Box>
  )
}

export default Footer
