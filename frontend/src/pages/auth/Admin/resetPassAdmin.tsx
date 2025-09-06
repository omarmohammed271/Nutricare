import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { FormInput, PageMetaData } from "@src/components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import AuthLayout2 from "../AuthLayout2";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const ResetPassword2 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordFormSchema = yup.object({
    password: yup.string().required("Please enter password").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Reset Password Form Data:", data);
  };

  return (
    <>
      <PageMetaData title={"Reset Password"} />

      <AuthLayout2
        authTitle="Reset Password"
        helpText="Enter your new password below to reset your account password."
        >

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password */}
          <FormInput
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            containerSx={{ mt: 2, textAlign: "left" }}
            control={control}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="start">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />

          {/* Confirm Password */}
          <FormInput
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            containerSx={{ mt: 2, textAlign: "left" }}
            control={control}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="start">
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              sx={{ borderRadius: "0.5rem", padding: "12px" }}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              fullWidth>
              Confirm
            </Button>
          </Box>
        </form>
      </AuthLayout2>
    </>
  );
};

export default ResetPassword2;
