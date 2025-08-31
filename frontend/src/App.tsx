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

const App = () => {
  const { i18n } = useLanguage();
  
  useEffect(() => {
    configureFakeBackend();
  }, []);

  // Create theme with current language for RTL support
  const theme = createTheme('light', i18n.language);

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
