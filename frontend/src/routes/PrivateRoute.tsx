/*
 * Copyright (c) 2023.
 * File Name: PrivateRoute.tsx
 * Author: Coderthemes
 */
import { useAuthContext } from "@src/states"
import React from "react"
import { Navigate } from "react-router-dom"

type RouteProps = {
  component: React.ComponentType;
};

export const RouteWrapper = ({ component: RouteComponent }: RouteProps) => {
  return <RouteComponent />;
};

export const PrivateRouteWrapper = ({ component: RouteComponent }: RouteProps) => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <RouteComponent /> : <Navigate to={`/auth/login`} replace />;
};
