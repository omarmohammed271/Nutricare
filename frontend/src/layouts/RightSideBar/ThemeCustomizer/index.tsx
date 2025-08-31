/*
 * Copyright (c) 2023.
 * File Name: index.tsx
 * Author: Coderthemes
 */

import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { LuX } from "react-icons/lu";
import SimpleBar from "simplebar-react";

import LayoutThemeToggler from "./LayoutThemeToggler";
import SidenavModeToggler from "./SidenavModeToggler";
import SidenavThemeToggler from "./SidenavThemeToggler";
import { useLayoutContext } from "@src/states";
import { LayoutSidenav, LayoutTheme } from "@src/types";

const ThemeCustomizer = () => {
  const { settings, themeMode, updateSidenav, updateTheme, updateShowRightsideBar, resetSettings } = useLayoutContext();

  const handleChangeLayoutTheme = (theme: LayoutTheme) => updateTheme(theme);

  const handleChangeSidenavMode = (mode: LayoutSidenav["mode"]) => updateSidenav({ mode: mode });

  const handleChangeSidenavTheme = (theme: LayoutSidenav["theme"]) => updateSidenav({ theme: theme });

  return (
    <>
      <Box
        sx={{
          height: 70,
          minHeight: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#02BE6A",
          gap: "12px",
          px: "24px",
        }}>
        <Typography sx={{ color: "white" }} variant={"subtitle1"}>
          Theme Settings
        </Typography>
        <IconButton sx={{ color: "white" }} onClick={() => updateShowRightsideBar(false)}>
          <LuX />
        </IconButton>
      </Box>

      <SimpleBar style={{ height: "calc(100% - 70px)" }}>
        <Stack padding={"20px"} gap={2}>
          <LayoutThemeToggler handleChangeLayoutTheme={handleChangeLayoutTheme} layoutTheme={themeMode} />

          <SidenavModeToggler handleChangeSidenavMode={handleChangeSidenavMode} sidenavMode={settings.sidenav.mode} />

          <SidenavThemeToggler
            handleChangeSidenavTheme={handleChangeSidenavTheme}
            sidenavTheme={settings.sidenav.theme}
          />
        </Stack>
      </SimpleBar>

      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          gap: 16,
          borderTopWidth: 1,
          borderColor: "#d1d5db",
        }}>
        <Button sx={{ mx: "20px" }} onClick={() => resetSettings()} variant="contained" color="primary" fullWidth>
          Reset
        </Button>
      </Box>
    </>
  );
};

export default ThemeCustomizer;
