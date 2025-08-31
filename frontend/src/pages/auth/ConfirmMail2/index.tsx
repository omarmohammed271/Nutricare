import { Box, Button, Typography } from "@mui/material";

// images
import mailImg from "@src/assets/images/svg/mail_sent.svg";
import { PageMetaData } from "@src/components";
import AuthLayout2 from "../AuthLayout2";
import { Link } from "react-router-dom";

const BottomLink = () => {
  return (
    <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
      Don&apos;t have an account?&nbsp;
      <Link to="/auth/register2">
        <Typography variant="subtitle2" component={"span"}>
          Register
        </Typography>
      </Link>
    </Typography>
  );
};

const ConfirmMail2 = () => {
  return (
    <>
      <PageMetaData title={"Confirm Mail"} />

      <AuthLayout2
        authTitle="Please check your email"
        helpText="A email has been send to youremail@domain.com. Please check for an email from company and click on the included link to reset your password."
        pageImage={mailImg}
        bottomLinks={<BottomLink />}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" color="primary" type="submit" size={"large"} fullWidth>
            Back to Home
          </Button>
        </Box>
      </AuthLayout2>
    </>
  );
};

export default ConfirmMail2;
