/*
 * Copyright (c) 2023.
 * File Name: layout.ts
 * Author: Coderthemes
 */

type LayoutTheme = "light" | "dark";

type LayoutSidenav = {
  theme: LayoutTheme;
  mode: "default" | "mobile";
  showMobileMenu: boolean;
};

type LayoutState = {
  theme: LayoutTheme;
  sidenav: LayoutSidenav;
  showRightsideBar: boolean;
};

type LayoutType = {
  settings: LayoutState;
  themeMode: LayoutTheme;
  updateTheme: (newTheme: LayoutTheme) => void;
  updateSidenav: (newSidenav: Partial<LayoutSidenav>) => void;
  updateShowRightsideBar: (show: LayoutState["showRightsideBar"]) => void;
  resetSettings: () => void;
};

export type { LayoutTheme, LayoutSidenav, LayoutState, LayoutType };
