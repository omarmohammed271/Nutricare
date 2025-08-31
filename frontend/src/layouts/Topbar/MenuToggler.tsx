/*
 * Copyright (c) 2023.
 * File Name: MenuToggler.tsx
 * Author: Coderthemes
 */

import { IconButton } from "@mui/material";
import { useLayoutContext } from "@src/states";
import { LuMenu } from "react-icons/lu";

const MenuToggler = () => {
  const { settings, updateSidenav } = useLayoutContext();

  const showSideNavMobile = () => {
    updateSidenav({ showMobileMenu: !settings.sidenav.showMobileMenu });
  };

  return (
    <IconButton color={"inherit"} onClick={showSideNavMobile}>
      <LuMenu />
    </IconButton>
  );
};

export default MenuToggler;
