import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthLayout2 from "../AuthLayout2";
import useLogin from "../Login/useLogin";
import { CheckboxInput, FormInput, PageMetaData, PasswordInput } from "@src/components";

const BottomLink = () => {
  const { t } = useTranslation('auth');
  
  return (
    <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
      {t('login.noAccount')}&nbsp;
      <Link to="/auth/register2">
        <Typography variant="subtitle2" component={"span"}>
          {t('login.registerLink')}
        </Typography>
      </Link>
    </Typography>
  );
};

const Login2 = () => {
  const { loading, login, control } = useLogin();
  const { t } = useTranslation('auth');

  return (
    <>
      <PageMetaData title={t('login.title')} />

      <AuthLayout2
        authTitle={t('login.title')}
        helpText={t('login.subtitle')}
        hasThirdPartyLogin
        bottomLinks={<BottomLink />}>
        <form onSubmit={login} style={{ textAlign: "left" }}>
          <FormInput name="email" type="email" label={t('login.email')} control={control} />

          <Box sx={{ mt: 2 }}>
            <PasswordInput name="password" type="password" label={t('login.password')} control={control} />
          </Box>

          <Box sx={{ mt: 1 }}>
            <CheckboxInput name="rememberMe" label={t('login.rememberMe')} control={control} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" disabled={loading} size={"large"} fullWidth>
              {t('login.loginButton')}
            </Button>
          </Box>
        </form>
      </AuthLayout2>
    </>
  );
};

export default Login2;
