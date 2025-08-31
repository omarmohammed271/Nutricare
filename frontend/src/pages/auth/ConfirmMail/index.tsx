import { Box, Button } from "@mui/material";
import AuthLayout from "../AuthLayout";
import { PageMetaData } from "@src/components";

// images
import mailImg from "@src/assets/images/svg/mail_sent.svg";

const ConfirmMail = () => {
  return (
    <>
      <PageMetaData title={"Confirm Mail"} />

      <AuthLayout
        authTitle="Please check your email"
        helpText="A email has been send to youremail@domain.com. Please check for an email from company and click on the included link to reset your password."
        pageImage={mailImg}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" color="primary" type="submit" size={"large"}>
            Back to Home
          </Button>
        </Box>
      </AuthLayout>
    </>
  );
};

export default ConfirmMail;
