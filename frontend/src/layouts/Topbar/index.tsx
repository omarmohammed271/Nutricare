/*
 * Copyright (c) 2023.
 * File Name: index.tsx
 * Author: Coderthemes
 */

import { Box, FilledInput, InputAdornment } from "@mui/material";
import { LuSearch } from "react-icons/lu";
import { styled } from "@mui/material";
import { WithSetting } from "@src/types";
import { useLayoutContext } from "@src/states";
import MenuToggler from "./MenuToggler";
import MaximizeScreen from "./MaximizeScreen";
import LayoutThemeToggler from "./LayoutThemeToggler";
import ThemeCustomizerToggler from "./ThemeCustomizerToggler";
import AppsDropdown from "./AppsDropdown";
import NotificationsDropdown from "./NotificationsDropdown";
import LanguageDropdown from "./LanguageDropdown";
import { notifications } from "./data";
import UserProfile from "./UserProfile";

const TopBarWrapper = styled("div")<WithSetting>(({ theme, settings }) => {
  return {
    backgroundColor: theme.palette.background.paper,
    paddingInlineStart: "16px",
    paddingInlineEnd: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "70px",
    minHeight: "70px",
    borderRadius: 0,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / .1)",
    zIndex: 2,
    position: "sticky",
    top: 0,
  };
});

const Topbar = () => {
  const { settings } = useLayoutContext();

  return (
    <TopBarWrapper settings={settings} className="topbar-header-do-not-remove">
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <MenuToggler />

        <Box sx={{ maxWidth: "203px", display: { xs: "none", md: "block" } }}>
          <FilledInput
            placeholder="Search"
            startAdornment={
              <InputAdornment position="end">
                <InputAdornment position="start">
                  <LuSearch size={14} />
                </InputAdornment>
              </InputAdornment>
            }
            sx={{
              pl: 0,
              "&:hover": {
                borderBottom: 0,
              },
              "&:before": {
                borderBottom: 0,
              },
              "& > .MuiInputBase-input": {
                py: "8px",
              },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.5 }}
        alignItems={"center"}>
        <Box sx={{ display: { lg: "block", xs: "none" } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <LanguageDropdown />
            <NotificationsDropdown notifications={notifications} />
            <AppsDropdown />
          </Box>
        </Box>

        <ThemeCustomizerToggler />

        <LayoutThemeToggler />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <MaximizeScreen />
        </Box>
        <UserProfile />
      </Box>
    </TopBarWrapper>
  );
};

export default Topbar;
