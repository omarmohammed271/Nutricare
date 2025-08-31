import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { FormInput, PageMetaData } from "@src/components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import AuthLayout2 from "../AuthLayout2";

const BottomLink = () => {
  return (
    <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
      Already have account?
      <Link to="/auth/login">
        <Typography variant="subtitle2" component={"span"}>
          Log In
        </Typography>
      </Link>
    </Typography>
  );
};

const ResetPassword2 = () => {
  const resetPasswordFormSchema = yup.object({
    email: yup.string().email("Please enter valid email").required("Please enter email"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "demo@demo.com",
    },
  });

  return (
    <>
      <PageMetaData title={"Reset Password"} />

      <AuthLayout2
        authTitle="Reset Password"
        helpText="Enter your email address and we'll send you an email with instructions to reset your password."
        bottomLinks={<BottomLink />}>
        <form onSubmit={handleSubmit(() => null)}>
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
