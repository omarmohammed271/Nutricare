import { Link } from "react-router-dom";
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
import useLogin from "../Login/useLogin";
import { PageMetaData } from "@src/components";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const { loading, login, control } = useLogin();
  const { t } = useTranslation("auth");

  // state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

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
        <form onSubmit={login} style={{ textAlign: "left" }}>
          {/* Email field with green styling */}
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

          {/* Password field with show/hide icon */}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          {/* Remember Me Switch */}
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
              <Link to="/auth/recover-password2">
                {t("login.forgotPassword")}
              </Link>
            </Typography>
          </Box>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              size="large"
              fullWidth
              sx={{
                p: 1,
              }}
            >
              {t("login.loginButton")}
            </Button>
          </Box>
        </form>
      </AuthLayout2>
    </>
  );
};

export default Login2;
