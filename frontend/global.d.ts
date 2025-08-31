/*
 * Copyright (c) 2023.
 * File Name: global.d.ts
 * Author: Coderthemes
 */

import { SimplePaletteColorOptions } from "@mui/material";

declare module 'path';


declare module "@mui/system/createTheme" {

  interface BreakpointOverrides {
    xxl: true
  }
}


declare module "@mui/material/styles" {

  interface PaletteOptions {
    light?: SimplePaletteColorOptions;
    dark?: SimplePaletteColorOptions;
  }
}

