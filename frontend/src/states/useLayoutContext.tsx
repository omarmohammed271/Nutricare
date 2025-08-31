/*
 * Copyright (c) 2023.
 * File Name: useLayoutContext.tsx
 * Author: Coderthemes
 */

import { ReactNode, createContext, useContext } from "react";
import { LayoutSidenav, LayoutState, LayoutTheme, LayoutType } from "@src/types/layout";
import useLocalStorage from "@src/hooks/useLocalStorage";

const ThemeContext = createContext<LayoutType | undefined>(undefined);

const useLayoutContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useLayoutContext can only be used within LayoutProvider");
  }
  return context;
};

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const INIT_STATE: LayoutState = {
    theme: params["layout_theme"] == "dark" ? "dark" : "light",
    sidenav: {
      mode: params["sidenav_mode"] == "mobile" ? "mobile" : "default",
      theme: params["sidenav_theme"] == "light" ? "light" : "dark",
      showMobileMenu: true,
    },
    showRightsideBar: false,
  };

  const [settings, setSettings] = useLocalStorage<LayoutState>("__CONFIG__",INIT_STATE);

  const themeMode: LayoutTheme = settings.theme;

  // update settings
  const updateSettings = (_newSettings: Partial<LayoutState>) => setSettings({ ...settings, ..._newSettings });

  const updateTheme = (newTheme: LayoutTheme) => {
    setSettings({
      ...settings,
      theme: newTheme,
    });
  };

  const updateSidenav = (newSidenav: Partial<LayoutSidenav>) =>
    updateSettings({ sidenav: { ...settings.sidenav, ...newSidenav } });

  const updateShowRightsideBar = (show: LayoutState["showRightsideBar"]) =>
    setSettings({ ...settings, showRightsideBar: show });

  const resetSettings = () => {
    setSettings(INIT_STATE);
  };
  return (
    <ThemeContext.Provider
      value={{
        settings,
        themeMode,
        updateTheme,
        updateSidenav,
        updateShowRightsideBar,
        resetSettings,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useLayoutContext, LayoutProvider };
