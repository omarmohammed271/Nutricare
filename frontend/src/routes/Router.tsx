/*
 * Copyright (c) 2023.
 * File Name: Router.tsx
 * Author: Coderthemes
 */
import { BrowserRouter, Route, Routes, type RouteProps } from "react-router-dom"
import { Suspense, useState, useEffect } from "react"
import ScrollToTop from "@src/components/ScrollToTop"
import DefaultLayout from '@src/layouts/DefaultLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import { defaultLayoutRoutes, verticalLayoutRoutes } from './routes'
import { useAuthContext } from "@src/states"
import { Navigate } from "react-router-dom"

// Wrapper component for protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give the auth context time to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login2" replace />;
};

const Router = (props: RouteProps) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {verticalLayoutRoutes.map((route, idx) => (
          <Route 
            key={idx + (route.path ?? '')} 
            path={route.path} 
            {...props} 
            element={
              <VerticalLayout>
                <ProtectedRoute>
                  {route.element}
                </ProtectedRoute>
              </VerticalLayout>
            } 
          />
        ))}
        {defaultLayoutRoutes.map((route, idx) => (
          <Route 
            key={idx + (route.path ?? '')} 
            path={route.path} 
            {...props} 
            element={<DefaultLayout>{route.element}</DefaultLayout>} 
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
