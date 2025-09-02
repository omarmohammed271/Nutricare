/*
 * Copyright (c) 2023.
 * File Name: palette.ts
 * Author: Coderthemes
 */
import { darken, lighten, Palette } from "@mui/material";
import { PaletteOptions } from "@mui/material/styles/createPalette";

export const getColorVariants = (color: string, contrastText: string) => {
  return {
    lighter: lighten(color, 0.6),
    light: lighten(color, 0.35),
    main: color,
    dark: darken(color, 0.35),
    darker: darken(color, 0.6),
    contrastText: contrastText,
  };
};

const paletteTheme = (themeMode: "light" | "dark"): PaletteOptions => {
  //Light Palette
  let palette: PaletteOptions = {
    mode: "light",
    tonalOffset: 0.2,
    contrastThreshold: 3,
    common: {
      white: "#fff",
      black: "#000",
    },
    grey: {
      50: "#f8f8f8",
      100: "#f4f6fa",
      200: "#eaecf0",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#aab8c5",
      600: "#818e9e",
      700: "#444d57",
      800: "#3f4650",
      900: "#3a444b",
      A100: "#f1f1f1",
      A200: "#e3eaef",
      A400: "#ced4da",
      A700: "#444d57",
    },
    primary: getColorVariants("#02BE6A", "#fff"),
    secondary: getColorVariants("#6c757d", "#fff"),
    success: getColorVariants("#26c362", "#fff"),
    info: getColorVariants("#3FC6FC", "#fff"),
    warning: getColorVariants("#fdb906", "#fff"),
    error: getColorVariants("#ff0a0a", "#fff"),
    light: getColorVariants("#eef2f7", "#6c757d"),
    dark: getColorVariants("#313a46", "#fff"),
    background: {
      paper: "#fff",
      default: "#ffffff",
    },
    action: {},
    text: {
      primary: "#001930",
      secondary: "#50555c",
      disabled: "#82878c",
    },
    divider: "#dee2e6",
  };

  if (themeMode == "dark") {
    palette = {
      ...palette,
      mode: "dark",
      grey: {
        50: "#1a1a1a",
        100: "#2d2d2d",
        200: "#404040",
        300: "#525252",
        400: "#737373",
        500: "#a3a3a3",
        600: "#d4d4d4",
        700: "#e5e5e5",
        800: "#f5f5f5",
        900: "#ffffff",
        A100: "#2d2d2d",
        A200: "#404040",
        A400: "#737373",
        A700: "#e5e5e5",
      },
      primary: getColorVariants("#02BE6A", "#fff"),
      secondary: getColorVariants("#6c757d", "#fff"),
      success: getColorVariants("#26c362", "#fff"),
      info: getColorVariants("#3FC6FC", "#fff"),
      warning: getColorVariants("#fdb906", "#fff"),
      error: getColorVariants("#ff0a0a", "#fff"),
      light: getColorVariants("#404040", "#ffffff"),
      dark: getColorVariants("#ffffff", "#000000"),
      background: {
        paper: "#1a1a1a",
        default: "#0f0f0f",
      },
      text: {
        primary: "#ffffff",
        secondary: "#d4d4d4",
        disabled: "#737373",
      },
      divider: "#404040",
    };
  }

  return palette;
};

export default paletteTheme;
