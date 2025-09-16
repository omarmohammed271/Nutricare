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

const ResetPasswordcode = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const activationFormSchema = yup.object({
    reset_code: yup
      .string()
      .required("Reset code is required")
      .min(6, "Activation code must be at least 6 characters"),
  });

  const { control, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: yupResolver(activationFormSchema),
    defaultValues: {
      reset_code: "",
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
      console.log("reset code:", { email, reset_code: data.reset_code });
      
      // Call the activation API with email from state and code from form
      const response = await AuthService.resetPasswordCode({
        email: email, // Email from registration flow
        reset_code: data.reset_code // Code from form input
      });

      if (response.status === 200) {
        console.log("Password reset email sent successfully!");
        navigate("/auth/recover-password", { state: { email: email } }); 
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error: any) {
      // Process server error and display appropriate message
      const errorInfo = ErrorHandler.processLoginError(error);
      enqueueSnackbar(errorInfo.message, { variant: "error" });
      
      // Handle specific field errors
      if (error?.response?.data) {
        const errorData = error.response.data;
        if (errorData.reset_code) {
          const message = Array.isArray(errorData.reset_code) ? errorData.reset_code[0] : errorData.reset_code;
          setError("reset_code", { type: "server", message });
        } else if (errorData.detail) {
          setError("reset_code", { type: "server", message: errorData.detail });
        } else if (errorData.non_field_errors) {
          const message = Array.isArray(errorData.non_field_errors) ? errorData.non_field_errors[0] : errorData.non_field_errors;
          setError("reset_code", { type: "server", message });
        }
      }
    }
  };

  // Function to request a new activation code
  const requestNewCode = async () => {
    try {
      const response = await AuthService.ResetPassword({ email });
      
      if (response.status === "success") {
        console.log("reset code sent successfully. Please check your email.");
        enqueueSnackbar("Reset code sent successfully. Please check your email.", { variant: "success" });
      } else {
        setError("reset_code", {
          type: "manual",
          message: response.message || "Failed to send reset code. Please try again."
        });
      }
    } catch (error: any) {
      // Process server error and display appropriate message
      const errorInfo = ErrorHandler.processLoginError(error);
      enqueueSnackbar(errorInfo.message, { variant: "error" });
      
      setError("reset_code", {
        type: "manual",
        message: error?.response?.data?.message || "An unexpected error occurred."
      });
    }
  };


  return (
    <>
      <PageMetaData title={"Reset Password Code"} />

      <AuthLayout2
        authTitle="Reset Passoword code"
        helpText={`Please enter the activation code that was sent to ${email || 'your email address'}.`}
        bottomLinks={<BottomLink />}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "left" }}>
          
          <Controller
            name="reset_code"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Reset Code"
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

export default ResetPasswordcode;