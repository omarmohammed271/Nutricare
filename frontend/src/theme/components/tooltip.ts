/*
 * Copyright (c) 2023.
 * File Name: tooltip.ts
 * Author: Coderthemes
 */

import { Components } from "@mui/material/styles/components";
import { Theme, ThemeOptions } from "@mui/material/styles/createTheme";

const getTooltipOverWrites = (theme: Partial<ThemeOptions>): Components<Omit<Theme, "components">> => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette?.mode == "light" ? theme.palette.grey?.[700] : theme.palette?.grey?.[300],
        },
      },
    },
  };
};
export default getTooltipOverWrites;
