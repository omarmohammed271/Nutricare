/*
 * Copyright (c) 2023.
 * File Name: accordion.ts
 * Author: Coderthemes
 */

import { Components } from "@mui/material/styles/components";
import { Theme, ThemeOptions } from "@mui/material/styles/createTheme";
import type {} from "@mui/x-data-grid";

const getTableOverWrites = (theme: Partial<ThemeOptions>): Components<Omit<Theme, "components">> => {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: theme.palette?.mode == "light" ? "#eee" : "#333",
        },
      },
    },
    // @ts-ignore
    MuiDataGrid: {
      styleOverrides: {
        cell: {
          borderColor: theme.palette?.mode == "light" ? "#eee" : "#333",
        },
      },
    },
  };
};
export default getTableOverWrites;
