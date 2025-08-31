import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { CheckboxInput, FormInput, PageMetaData, PasswordInput } from "@src/components";
import AuthLayout2 from "../AuthLayout2";

const BottomLink = () => {
  return (
    <Box sx={{ my: "16px", display: "flex", justifyContent: "center" }}>
      <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
        Already have account?
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
  const registerFormSchema = yup.object({
    fullName: yup.string().required("Name is required"),
    email: yup.string().email("Please enter valid email").required("Please enter email"),
    password: yup.string().required("Please enter password"),
    rememberMe: yup.boolean().oneOf([true], "Checkbox must be checked").optional(),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      fullName: "Attex Demo",
      email: "demo@demo.com",
      password: "password",
    },
  });

  return (
    <>
      <PageMetaData title={"Register"} />

      <AuthLayout2
        authTitle="Free Register"
        helpText="Don't have an account? Create your account, it takes less than a minute."
        bottomLinks={<BottomLink />}
        hasThirdPartyLogin>
        <form onSubmit={handleSubmit(() => null)} style={{ textAlign: "left" }}>
          <FormInput name="fullName" type="text" label="Full Name" control={control} />

          <FormInput name="email" type="email" label="Email Address" containerSx={{ mt: 2 }} control={control} />

          <PasswordInput name="password" type="password" label={"Password"} containerSx={{ mt: 2 }} control={control} />

          <CheckboxInput name="rememberMe" label="Remember me" control={control} labelSx={{ mt: 1 }} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" size={"large"} fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </AuthLayout2>
    </>
  );
};

export default Register2;
