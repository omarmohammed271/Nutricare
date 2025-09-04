/*
 * Copyright (c) 2023.
 * File Name: App.tsx
 * Author: Coderthemes
 */
import { useEffect } from "react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";

import Router from "@src/routes/Router";
import { createTheme } from "@src/theme";
import { configureFakeBackend } from "@src/common/fake-backend";
import { useLanguage } from "@src/hooks";
import { useLayoutContext } from "@src/states";

const AppContent = () => {
  const { i18n } = useLanguage();
  const { themeMode } = useLayoutContext();
  
  useEffect(() => {
    configureFakeBackend();
  }, []);

  // Create theme with current language for RTL support and theme mode
  const theme = createTheme(themeMode, i18n.language);

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <AppContent />
      </StyledEngineProvider>
    </>
  );
};

export default App;
