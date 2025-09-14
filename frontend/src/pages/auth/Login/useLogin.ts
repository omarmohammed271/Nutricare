import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@src/states";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthService } from "@src/services";
import { ErrorHandler } from "@src/utils/errorHandler";
import type { LoginRequest } from "@src/types";
import * as yup from "yup";
import { useSnackbar } from "notistack";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, saveSession } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const loginFormSchema = yup.object({
    email: yup.string().email("Please enter valid email").required("Please enter email"),
    password: yup.string().required("Please enter password"),
    rememberMe: yup.boolean().optional(),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  type LoginFormFields = yup.InferType<typeof loginFormSchema>;

  const redirectUrl = useMemo(() => {
  const fromPath = location.state?.from?.pathname;

  if (fromPath) {
    return fromPath.startsWith("/admin") ? "/admin/user" : fromPath;
  }

  if (location.pathname.startsWith("/admin")) {
    return "/admin/user";
  }

  return "/ecommerce";
}, [location.state, location.pathname]);

  const login = handleSubmit(async (values: LoginFormFields) => {
    setLoading(true);
    
    try {
      const loginData: LoginRequest = {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      };

      // Authenticate with backend
      const response = await AuthService.login(loginData);
      
      // Extract token and create user object
      const token = AuthService.extractToken(response);
      
      if (!token) {
        throw new Error("No authentication token received from server");
      }

      const userData = AuthService.createUserFromResponse(response, values.email);
      
      // Save session with rememberMe preference
      saveSession(userData, values.rememberMe);
      
      // Show success message
      enqueueSnackbar("Login successful!", { variant: "success" });
      
      // Navigate to dashboard
      navigate(redirectUrl, { replace: true });
      
    } catch (error: any) {
      const errorInfo = ErrorHandler.processLoginError(error);
      enqueueSnackbar(errorInfo.message, { variant: "error" });
      
      // Log error for debugging (could be conditional based on environment)
      if (process.env.NODE_ENV === 'development') {
        console.error('Login error:', error);
      }
    } finally {
      setLoading(false);
    }
  });

  return { loading, login, redirectUrl, isAuthenticated, control };
}
