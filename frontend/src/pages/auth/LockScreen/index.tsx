import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageMetaData, PasswordInput } from "@src/components";
import AuthLayout from "../AuthLayout";

// images
import avatar2 from "@src/assets/images/avatars/avatar2.png";

const BottomLink = () => {
  return (
    <Box sx={{ my: "16px", display: "flex", justifyContent: "center" }}>
      <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
        Not you? return
        <Link to="/auth/login">
          <Typography variant="subtitle2" component={"span"}>
            Log In
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

const LockScreen = () => {
  const lockScreenFormSchema = yup.object({
    password: yup.string().required("Please enter password"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(lockScreenFormSchema),
    defaultValues: {
      password: "password",
    },
  });

  return (
    <>
      <PageMetaData title={"Lock Screen"} />

      <AuthLayout
        authTitle="Hi! Tosha"
        helpText="Enter your password to access the admin."
        bottomLinks={<BottomLink />}
        pageImage={avatar2}>
        <form onSubmit={handleSubmit(() => null)}>
          <PasswordInput name="password" type="password" label={"Password"} containerSx={{ mt: 2 }} control={control} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" size={"large"}>
              Login
            </Button>
          </Box>
        </form>
      </AuthLayout>
    </>
  );
};

export default LockScreen;
