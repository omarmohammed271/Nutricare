import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { FormInput, PageMetaData } from "@src/components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import AuthLayout2 from "../AuthLayout2";
import { AuthService } from "@src/services";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BottomLink = () => {
  return (
    <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 , justifyContent:'center' }}>
      Already have account?
      <Link to="/auth/login2">
        <Typography variant="subtitle2" component={"span"}>
          Log In
        </Typography>
      </Link>
    </Typography>
  );
};

const ResetPassword2 = () => {
  const [email , setEmail] =useState("")
  const resetPasswordFormSchema = yup.object({
    email: yup.string().email("Please enter valid email").required("Please enter email"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  useEffect (() => { 
  }, [email]);

  const onSubmit =  async (data: any) => {
     

  try {
    const response = await AuthService.ResetPassword({
      email: data.email,
      
    });

    console.log("console ",response)

    if (response.status  == 200) {
      // ✅ العملية نجحت
      console.log("Password reset email sent successfully!");
      navigate("/auth/recover-password-code",{ state: { email: data.email } } ); 
    } else {
      // 🚨 حالة unexpected response
      console.log("Unexpected response:", response);
    }
  } catch (error: any) {
    // Axios error
    if (error.response) {
      // السيرفر رد بحاجة زي 400 أو 500
      console.log("Server error:", error.response.data);
    } else if (error.request) {
      // السيرفر مردش
      console.log("No response from server:", error.request);
    } else {
      // مشكلة في الكود
      console.log("Error:", error.message);
    }
  }
  };

  return (
    <>
      <PageMetaData title={"Reset Password"} />

      <AuthLayout2
        authTitle="Reset Password"
        helpText="Enter your email address and we'll send you an email with instructions to reset your password."
        bottomLinks={<BottomLink />}>
        <form onSubmit={handleSubmit((onSubmit))}>
          <FormInput
            name="email"
            type="email"
            label="Email Address"
            containerSx={{ mt: 2, textAlign: "left" }}
            control={control}
          />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" size={"large"} fullWidth>
              Reset Password
            </Button>
          </Box>
        </form>
      </AuthLayout2>
    </>
  );
};

export default ResetPassword2;