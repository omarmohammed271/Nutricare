/*
 * Copyright (c) 2023.
 * File Name: main.tsx
 * Author: Coderthemes
 */
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { SnackbarProvider } from "notistack";
import { AuthProvider, LayoutProvider } from "./states";
import App from "@src/App";

// Initialize i18n
import "./i18n";

// styles
import "@src/assets/css/app.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <LayoutProvider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </LayoutProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
