import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { PageMetaData } from "@src/components";
import { useAuthContext } from "@src/states";
import { LogoutIcon } from "../Logout";
import AuthLayout2 from "../AuthLayout2";

const BottomLink = () => (
  <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
    Log back In
    <Link to="/auth/login2">
      <Typography variant="subtitle2" component={"span"}>
        Log In
      </Typography>
    </Link>
  </Typography>
);

const Logout2 = () => {
  const { removeSession } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    removeSession();
    // Redirect to login2 after logout
    const timer = setTimeout(() => {
      navigate("/auth/login2", { replace: true });
    }, 1000);
    return () => clearTimeout(timer);
  }, [removeSession, navigate]);

  return (
    <>
      <PageMetaData title={"Logout"} />

      <AuthLayout2
        authTitle="See You Again !"
        helpText="You are now successfully logged out."
        bottomLinks={<BottomLink />}>
        <Box sx={{ width: 144, mx: "auto" }}>
          <LogoutIcon />
        </Box>
      </AuthLayout2>
    </>
  );
};

export default Logout2;
