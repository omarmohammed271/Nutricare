/*
 * Copyright (c) 2023.
 * File Name: index.ts
 * Author: Coderthemes
 */
import { createTheme as muiCreateTheme } from "@mui/material";

import componentOverrides from "@src/theme/components";
import gridTheme from "@src/theme/grid";
import paletteTheme from "@src/theme/palette";
import shadowTheme from "@src/theme/shadow";
import typographyTheme from "@src/theme/typography";
import { ThemeOptions } from "@mui/material/styles/createTheme";
import { LayoutState } from "@src/types";

const createTheme = (theme: LayoutState["theme"], language: string = 'en') => {
  const themeOption: Partial<ThemeOptions> = {
    palette: paletteTheme(theme),
    typography: typographyTheme(),
    breakpoints: gridTheme(),
    shape: {
      borderRadius: 4,
    },
    spacing: 8,
    shadows: shadowTheme(theme),
    zIndex: {
      appBar: 1100,
      drawer: 1200,
    },
    direction: language === 'ar' ? 'rtl' : 'ltr',
  };

  return muiCreateTheme({
    ...themeOption,
    components: componentOverrides(themeOption),
  });
};

export { createTheme };

