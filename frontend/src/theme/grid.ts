/*
 * Copyright (c) 2023.
 * File Name: grid.ts
 * Author: Coderthemes
 */

import { BreakpointsOptions } from "@mui/system/createTheme/createBreakpoints";

const themeGrid = (): BreakpointsOptions => {
  return {
    values: { 
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  };
};

export default themeGrid;
