/*
 * Copyright (c) 2023.
 * File Name: main.tsx
 * Author: Coderthemes
 */
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, LayoutProvider } from "./states";
import App from "@src/App";

// Initialize i18n
import "./i18n";

// styles
import "@src/assets/css/app.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <LayoutProvider>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </LayoutProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
);
