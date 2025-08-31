import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { HttpClient } from "@src/helpers";
import { useAuthContext } from "@src/states";
import { yupResolver } from "@hookform/resolvers/yup";
import type { User } from "@src/types";
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
    rememberMe: yup.boolean().oneOf([true], "Checkbox must be checked").optional(),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "demo@demo.com",
      password: "password",
    },
  });

  type LoginFormFields = yup.InferType<typeof loginFormSchema>;

  const redirectUrl = useMemo(() => {
    // If there's a specific redirect path from location state, use it
    if (location.state?.from?.pathname) {
      return location.state.from.pathname;
    }
    // Otherwise redirect to the dashboard
    return "/ecommerce";
  }, [location.state]);

  const login = handleSubmit(async (values: LoginFormFields) => {
    setLoading(true);
    try {
      const res: AxiosResponse<User> = await HttpClient.post("/login", values);
      if (res.data.token) {
        saveSession({
          ...(res.data ?? {}),
          token: res.data.token,
        });
        navigate(redirectUrl);
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        enqueueSnackbar(error.response?.data?.error, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  });

  return { loading, login, redirectUrl, isAuthenticated, control };
}
