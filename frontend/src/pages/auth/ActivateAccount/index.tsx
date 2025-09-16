import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { PageMetaData } from "@src/components";
import AuthLayout2 from "../AuthLayout2";
import { AuthService } from "@src/services";
import { useAuthContext } from "@src/types/states";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { ErrorHandler } from "@src/utils/errorHandler";

const BottomLink = () => {
  return (
    <Box sx={{ my: "16px", display: "flex", justifyContent: "center" }}>
      <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
        Already have an account?&nbsp;
        <Link to="/auth/login2">
          <Typography variant="subtitle2" component={"span"}>
            Log In
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

const ActivateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveSession } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  
  // Get email from navigation state
  useEffect(() => {
    if (location.state && (location.state as any).email) {
      setEmail((location.state as any).email);
    }
  }, [location.state]);

  const activationFormSchema = yup.object({
    activation_code: yup
      .string()
      .required("Activation code is required")
      .min(6, "Activation code must be at least 6 characters"),
  });

  const { control, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: yupResolver(activationFormSchema),
    defaultValues: {
      activation_code: "",
    },
  });

  // Update form when email changes
  useEffect(() => {
    if (email) {
      // Email is set but not used in form, only for API call
      console.log("Email received from registration:", email);
    }
  }, [email]);

  const onSubmit = async (data: any) => {
    try {
      console.log("Activation data:", { email, activation_code: data.activation_code });
      
      // Call the activation API with email from state and code from form
      const response = await AuthService.activateCode({
        email: email, // Email from registration flow
        activation_code: data.activation_code // Code from form input
      });
      
      // If activation is successful, save the session and redirect
      if (response.user && response.token) {
        const userWithToken = AuthService.createUserFromResponse(response as any, email);
        saveSession(userWithToken, false); // false = don't remember me by default
        enqueueSnackbar("Account activated successfully!", { variant: "success" });
        navigate("/ecommerce"); // Redirect to dashboard
      } else {
        // Handle case where activation succeeded but no token was returned
        console.error("Activation succeeded but no authentication token received");
        enqueueSnackbar("Account activated! Please login to continue.", { variant: "success" });
        navigate("/auth/login2", { state: { email: email } });
      }
    } catch (error: any) {
      console.error("Activation failed:", error);
      
      // Process server error and display appropriate message
      const errorInfo = ErrorHandler.processLoginError(error);
      enqueueSnackbar(errorInfo.message, { variant: "error" });
      
      // Handle specific field errors
      if (error?.response?.data) {
        const errorData = error.response.data;
        if (errorData.activation_code) {
          const message = Array.isArray(errorData.activation_code) ? errorData.activation_code[0] : errorData.activation_code;
          setError("activation_code", { type: "server", message });
        } else if (errorData.detail) {
          setError("activation_code", { type: "server", message: errorData.detail });
        }
      } else {
        setError("activation_code", {
          type: "manual",
          message: "Invalid activation code. Please try again."
        });
      }
    }
  };

  // Function to request a new activation code
  const requestNewCode = async () => {
    try {
      const response = await AuthService.resendActivation({ email });
      
      if (response.status === "success") {
        console.log("Activation code sent successfully. Please check your email.");
        enqueueSnackbar("Activation code sent successfully. Please check your email.", { variant: "success" });
      } else {
        setError("activation_code", {
          type: "manual",
          message: response.message || "Failed to send activation code. Please try again."
        });
      }
    } catch (error: any) {
      // Process server error and display appropriate message
      const errorInfo = ErrorHandler.processLoginError(error);
      enqueueSnackbar(errorInfo.message, { variant: "error" });
      
      setError("activation_code", {
        type: "manual",
        message: error?.response?.data?.message || "An unexpected error occurred."
      });
    }
  };


  return (
    <>
      <PageMetaData title={"Activate Account"} />

      <AuthLayout2
        authTitle="Activate Your Account"
        helpText={`Please enter the activation code that was sent to ${email || 'your email address'}.`}
        bottomLinks={<BottomLink />}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "left" }}>
          {/* Activation Code Field */}
          <Controller
            name="activation_code"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Activation Code"
                type="text"
                error={!!error}
                helperText={error?.message || "Enter the 6-digit code sent to your email"}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 6 }}
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

          {/* Request New Code Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button 
              onClick={requestNewCode}
              color="primary" 
              size="small"
              sx={{ textTransform: "none" }}
            >
              Request New Code
            </Button>
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
              {isSubmitting ? "Activating..." : "Activate Account"}
            </Button>
          </Box>
        </form>
      </AuthLayout2>
    </>
  );
};

export default ActivateAccount;