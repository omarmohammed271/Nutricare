import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, PageMetaData } from "@src/components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AuthLayout from "../AuthLayout2";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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

const ResetPassword = () => {
  const resetPasswordFormSchema = yup.object({
    Password: yup.string().min(6, "Password must be at least 6 characters").required("Please enter password"),
    "Confirm password": yup.string().oneOf([yup.ref("Password")], "Passwords must match").required("Please confirm password"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
    defaultValues: {
      Password: "",
      "Confirm password": "",
    },
  });

  return (
    <>
      <PageMetaData title={"Reset Password"} />

      <AuthLayout
        authTitle="Reset Password"
        helpText="Enter your email address and we'll send you an email with instructions to reset your password."
        bottomLinks={<BottomLink />}>
        <form onSubmit={handleSubmit(() => null)}>
          <FormInput   name="Password"  type="password" placeholder="Password"  containerSx={{ mt: 2 }} control={control} />
             <FormInput name="Confirm password" type="password"  placeholder="Confirm Password" containerSx={{ mt: 2 }} control={control} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" size={"large"}>
              Reset Password
            </Button>
          </Box>
        </form>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
