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
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner while authentication is being checked
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #00C896',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666', margin: 0 }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login2" replace />;
  }

  return <>{children}</>;
};

const Router = (props: RouteProps) => {
  return (
    <BrowserRouter>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
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
