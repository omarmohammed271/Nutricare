import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { FormInput, PageMetaData } from "@src/components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import AuthLayout2 from "../AuthLayout2";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { handleResetPassword } from "@src/api/admin/adminAPI";
import toast from "react-hot-toast";

const ResetPassword2 = () => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordFormSchema = yup.object({
    new_password: yup.string().required("Please enter password").min(6, "Password must be at least 6 characters"),
    email: yup.string()
      
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "",
      new_password: "",
    },
  });
  const navigate = useNavigate()

  const {mutate , isPending , isError ,error} = useMutation({
    mutationFn : handleResetPassword,
    mutationKey : ['reset password'],
    onSuccess : () =>{
      toast.success("New Password Has Reset Check e-Mail")
      navigate('/admin/auth/login')
    },
    onError(err:any){
            toast.error(err?.response?.data?.error)
    }
  })

   const onSubmit = (data:any) => {
    mutate(data);
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
            name="email"
            placeholder="email"
            type={"email"}
            containerSx={{ mt: 2, textAlign: "left" }}
            control={control}
            
          />

          {/* Confirm Password */}
          <FormInput
            name="new_password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="New Password"
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
            disabled={isPending}
              sx={{ borderRadius: "0.5rem", padding: "12px" }}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              fullWidth>
              {isPending ? "Loading..." : "Confirm"}
            </Button>
          </Box>
          {isError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error?.response?.data?.error || "Something went wrong!"}
            </Typography>
          )}
        </form>
      </AuthLayout2>
    </>
  );
};

export default ResetPassword2;
