import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthLayout2 from "../AuthLayout2";
import { PageMetaData } from "@src/components";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { handleLogin } from "@src/api/admin/adminAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const BottomLink = () => {
  const { t } = useTranslation("auth");

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        gap: 0.5,
        justifyContent: "center",
      }}
    >
      {t("login.noAccount")}&nbsp;
      <Link to="/auth/register2">
        <Typography variant="subtitle2" component="span">
          {t("login.registerLink")}
        </Typography>
      </Link>
    </Typography>
  );
};

const Login2 = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: handleLogin,
    mutationKey: ["login"],
    onSuccess: () => {
      navigate("/admin/user");
    },
    onError: (err:any) => {
      toast.error(err?.response?.data?.error)
    },
  });
  const onSubmit = (data:any) => {
    mutate(data);
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <>
      <PageMetaData title={t("login.title")} />

      <AuthLayout2
        authTitle={t("login.title")}
        helpText={t("login.subtitle")}
        hasThirdPartyLogin
        bottomLinks={<BottomLink />}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "left" }}>
          {/* Email field */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: t("validation.emailRequired"),
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={t("login.email")}
                type="email"
                error={!!error}
                helperText={error?.message}
                fullWidth
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: "#00C896",
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00C896",
                      borderWidth: "2px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00C896",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#00C896",
                    "&.Mui-focused": {
                      color: "#00C896",
                    },
                  },
                }}
              />
            )}
          />

          {/* Password field */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: t("validation.passwordRequired"),
              minLength: {
                value: 6,
                message: t("validation.passwordMinLength"),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={t("login.password")}
                type={showPassword ? "text" : "password"}
                error={!!error}
                helperText={error?.message}
                fullWidth
                margin="normal"
                autoComplete="current-password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          {/* Remember Me */}
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Controller
              name="rememberMe"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="success"
                    />
                  }
                  label={t("login.rememberMe")}
                />
              )}
            />

            <Typography>
              <Link to="/admin/auth/recover-password">
                {t("login.forgotPassword")}
              </Link>
            </Typography>
          </Box>

          {/* Submit button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isPending}
              size="large"
              fullWidth
              sx={{ borderRadius: "0.5rem", padding: "12px" }}
            >
              {isPending ? "Loading..." : t("login.loginButton")}
            </Button>
          </Box>

          {/* Show error message */}
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

export default Login2;
