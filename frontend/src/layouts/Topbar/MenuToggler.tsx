/*
 * Copyright (c) 2023.
 * File Name: MenuToggler.tsx
 * Author: Coderthemes
 */

import { IconButton, Box, Typography } from "@mui/material";
import { useLayoutContext } from "@src/types/states";
import { LuMenu } from "react-icons/lu";

const MenuToggler = () => {
  const { settings, updateSidenav } = useLayoutContext();

  const showSideNavMobile = () => {
    updateSidenav({ showMobileMenu: !settings.sidenav.showMobileMenu });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton color={"inherit"} onClick={showSideNavMobile}>
        <LuMenu />
      </IconButton>
      
      {/* NutriCare Logo */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            color: "#02BE6A",
            fontSize: "1.5rem"
          }}
        >
          NutriCare
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: "text.secondary",
            fontSize: "0.7rem",
            display: "block",
            lineHeight: 1
          }}
        >
          Nutrition & Health
        </Typography>
      </Box>
    </Box>
  );
};

export default MenuToggler;
