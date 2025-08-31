import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CheckboxInput, PageMetaData, PasswordInput } from "@src/components";
import { FormInput } from "@src/components";
import useLogin from "./useLogin";
import AuthLayout from "../AuthLayout";

/**
 * Bottom Links goes here
 */
const BottomLink = () => {
  return (
    <Box sx={{ my: "16px", display: "flex", justifyContent: "center" }}>
      <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
        Don&apos;t have an account?&nbsp;
        <Link to="/auth/register">
          <Typography variant="subtitle2" component={"span"}>
            Register
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

const Login = () => {
  const { loading, login, control } = useLogin();

  return (
    <>
      <PageMetaData title={"Login"} />
      
      {/* Test message to debug routing */}
      <div style={{ position: 'fixed', top: '10px', left: '10px', background: 'red', color: 'white', padding: '10px', zIndex: 9999 }}>
        LOGIN COMPONENT IS RENDERING!
      </div>

      {/* Simplified test version */}
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1 style={{ color: 'red' }}>LOGIN PAGE IS WORKING!</h1>
        <p>If you can see this, the routing is working!</p>
      </div>

      <AuthLayout
        authTitle="Login In"
        helpText="Enter your email address and password to access admin panel."
        bottomLinks={<BottomLink />}>
        <form onSubmit={login}>
          <FormInput name="email" type="email" label="Email Address" control={control} />

          <Box sx={{ mt: 2 }}>
            <PasswordInput name="password" type="password" label={"Password"} control={control} />
          </Box>

          <Box sx={{ mt: 1 }}>
            <CheckboxInput name="rememberMe" label="Remember me" control={control} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" disabled={loading} size={"large"}>
              Login
            </Button>
          </Box>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
