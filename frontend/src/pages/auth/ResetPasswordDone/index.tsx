import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { PageMetaData } from "@src/components";
import AuthLayout2 from "../AuthLayout2";
import { AuthService } from "@src/services";
import { useAuthContext } from "@src/types/states";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { ErrorHandler } from "@src/utils/errorHandler";

const BottomLink = () => {
  return (
    <Box sx={{ my: "16px", display: "flex", justifyContent: "center" }}>
      <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
        Already have an account?
        <Link to="/auth/login2">
          <Typography variant="subtitle2" component={"span"}>
            Log In
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};



const ResetPasswordDone = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { saveSession } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state && (location.state as any).email) {
      setEmail((location.state as any).email);
    }
  }, [location.state]);


  useEffect(() => { 
    console.log("Email received from registration:", email);
  }, [email]);

  const registerFormSchema = yup.object({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], "Passwords must match")
      .required("Please confirm your password"),
  });

  const { control, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("Reset Password data:", data);
      
      const response = await AuthService.ResetPasswordDone({
        email: email,
        new_password: data.password,
      });

      console.log("console : ", response);
      
      enqueueSnackbar("Password reset successfully!", { variant: "success" });
      navigate("/auth/login2");
    } catch (error: any) {
      console.error("Password reset failed:", error);
      
      // Process server error and display appropriate message
      const errorInfo = ErrorHandler.processLoginError(error);
      enqueueSnackbar(errorInfo.message, { variant: "error" });
      
      // If it's a field-specific error, set it on the form
      if (error?.response?.data) {
        const errorData = error.response.data;
        if (errorData.password) {
          const message = Array.isArray(errorData.password) ? errorData.password[0] : errorData.password;
          setError("password", { type: "server", message });
        }
      }
    }
  };

  return (
    <>
      <PageMetaData title={"Reset Password"} />

      <AuthLayout2
        authTitle="Reset Password"
        helpText="Don't have an account? Create your account, it takes less than a minute."
        bottomLinks={<BottomLink />}
       
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "left" }}>
          {/* Full Name Field */}
         

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                error={!!error}
                helperText={error?.message}
                fullWidth
                margin="normal"
                autoComplete="new-password"
              />
            )}
          />

          {/* Confirm Password Field */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                error={!!error}
                helperText={error?.message}
                fullWidth
                margin="normal"
                autoComplete="new-password"
              />
            )}
          />

          {/* Terms and Conditions Checkbox */}
        

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              size="large" 
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Reseting password..." : "Reseting password"}
            </Button>
          </Box>
        </form>
      </AuthLayout2>
    </>
  );
};

export default ResetPasswordDone;