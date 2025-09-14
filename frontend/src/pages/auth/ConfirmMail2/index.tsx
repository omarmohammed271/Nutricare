import { Box, Button, Typography } from "@mui/material";

// images
import mailImg from "@src/assets/images/svg/mail_sent.svg";
import { PageMetaData } from "@src/components";
import AuthLayout2 from "../AuthLayout2";
import { Link, useNavigate } from "react-router-dom";

const BottomLink = () => {
  const navigate = useNavigate();
  
  const handleActivateClick = () => {
    navigate("/auth/activate-account");
  };

  return (
    <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
      Already received your code?&nbsp;
      <Typography 
        variant="subtitle2" 
        component={"span"} 
        onClick={handleActivateClick}
        sx={{ cursor: "pointer", textDecoration: "underline" }}
      >
        Activate Account
      </Typography>
    </Typography>
  );
};

const ConfirmMail2 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/auth/login2");
  };

  return (
    <>
      <PageMetaData title={"Confirm Mail"} />

      <AuthLayout2
        authTitle="Please check your email"
        helpText="A email has been send to youremail@domain.com. Please check for an email from company and click on the included link to reset your password."
        pageImage={mailImg}
        bottomLinks={<BottomLink />}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleBackToHome} 
            size={"large"} 
            fullWidth
          >
            Back to Login
          </Button>
        </Box>
      </AuthLayout2>
    </>
  );
};

export default ConfirmMail2;