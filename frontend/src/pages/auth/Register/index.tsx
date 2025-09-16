import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { CheckboxInput, FormInput, PageMetaData, PasswordInput } from "@src/components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import AuthLayout from "../AuthLayout";
import { AuthService } from "@src/services";
import { useAuthContext } from "@src/types/states";

/**
 * Bottom Links goes here
 */
const BottomLink = () => {
  return (
    <Box sx={{ my: "16px", display: "flex", justifyContent: "center" }}>
      <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
        Already have account?
        <Link to="/auth/login">
          <Typography variant="subtitle2" component={"span"}>
            Log In
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const { saveSession } = useAuthContext();
  
  const registerFormSchema = yup.object({
    fullName: yup.string().required("Name is required"),
    email: yup.string().email("Please enter valid email").required("Please enter email"),
    password: yup.string().required("Please enter password"),
    rememberMe: yup.boolean().oneOf([true], "Checkbox must be checked").optional(),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      fullName: "Nutricare Demo",
      email: "demo@demo.com",
      password: "password",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // Call the signup API
      const response = await AuthService.signup({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.password, // For compatibility with backend
        agreeToTerms: data.rememberMe || true // For compatibility with backend
      });
      
      // After successful signup, redirect to activation page
      navigate("/auth/activate-account", { state: { email: data.email } });
    } catch (error: any) {
      console.error("Registration failed:", error);
      // Handle registration errors
    }
  };

  return (
    <>
      <PageMetaData title={"Register"} />

      <AuthLayout
        authTitle="Free Register"
        helpText="Don't have an account? Create your account, it takes less than a minute."
        bottomLinks={<BottomLink />}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput name="fullName" type="text" label="Full Name" control={control} />

          <FormInput name="email" type="email" label="Email Address" containerSx={{ mt: 2 }} control={control} />

          <PasswordInput name="password" type="password" label={"Password"} containerSx={{ mt: 2 }} control={control} />

          <CheckboxInput name="rememberMe" label="Remember me" control={control} labelSx={{ mt: 1 }} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" size={"large"}>
              Register
            </Button>
          </Box>
        </form>
      </AuthLayout>
    </>
  );
};

export default Register;