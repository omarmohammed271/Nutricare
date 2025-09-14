import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { PageMetaData } from "@src/components";
import AuthLayout2 from "../AuthLayout2";
import { AuthService } from "@src/services";
import { useAuthContext } from "@src/states";

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

const Register2 = () => {
  const navigate = useNavigate();
  const { saveSession } = useAuthContext();
  
  const registerFormSchema = yup.object({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], "Passwords must match")
      .required("Please confirm your password"),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], "You must agree to terms and conditions")
      .required("You must agree to terms and conditions"),
  });

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: true,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("Registration data:", data);
      
      // Call the signup API
      const response = await AuthService.signup({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        agreeToTerms: data.agreeToTerms
      });
      
      // After successful signup, redirect to activation page
      // Pass the email to the activation page
      navigate("/auth/activate-account", { state: { email: data.email } });
    } catch (error: any) {
      console.error("Registration failed:", error);
      // Handle registration errors
      // You could set error state here to display to the user
    }

    sessionStorage.setItem("signupEmail", data.email);

  };

  return (
    <>
      <PageMetaData title={"Register"} />

      <AuthLayout2
        authTitle="Sign Up"
        helpText="Don't have an account? Create your account, it takes less than a minute."
        bottomLinks={<BottomLink />}
        hasThirdPartyLogin
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "left" }}>
          {/* Full Name Field */}
          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Full Name"
                type="text"
                error={!!error}
                helperText={error?.message}
                fullWidth
                margin="normal"
              />
            )}
          />

          {/* Email Field - with green styling */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email Address"
                type="email"
                error={!!error}
                helperText={error?.message}
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#00C896',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#00C896',
                      borderWidth: '2px',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00C896',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#00C896',
                    '&.Mui-focused': {
                      color: '#00C896',
                    },
                  },
                }}
              />
            )}
          />

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
          <Box sx={{ mt: 2 }}>
            <Controller
              name="agreeToTerms"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the{" "}
                      <Link to="/terms" style={{ color: "inherit", textDecoration: "underline" }}>
                        Terms and Conditions
                      </Link>
                    </Typography>
                  }
                />
              )}
            />
            {errors.agreeToTerms && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
                {errors.agreeToTerms.message}
              </Typography>
            )}
          </Box>

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
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </Box>
        </form>
      </AuthLayout2>
    </>
  );
};

export default Register2;