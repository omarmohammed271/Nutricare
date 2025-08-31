/*
 * Copyright (c) 2023.
 * File Name: LayoutThemeToggler.tsx
 * Author: Coderthemes
 */

import { IconButton } from "@mui/material";
import { useLayoutContext } from "@src/states";
import { LuMoon, LuSunMedium } from "react-icons/lu";

const LayoutThemeToggler = () => {
  const { themeMode, updateTheme } = useLayoutContext();

  return (
    <IconButton color={"inherit"} onClick={() => updateTheme(themeMode == "light" ? "dark" : "light")}>
      {themeMode == "light" ? <LuMoon /> : <LuSunMedium />}
    </IconButton>
  );
};

export default LayoutThemeToggler;
