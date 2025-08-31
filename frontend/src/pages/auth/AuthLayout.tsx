import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { AuthBGLayout } from "@src/components";

// images
import logo from "@src/assets/images/nutricare-logo.svg";

type AccountLayoutProps = {
  pageImage?: string;
  authTitle?: string;
  helpText?: string;
  bottomLinks?: ReactNode;
  children?: ReactNode;
};

const AuthLayout = ({ pageImage, authTitle, helpText, bottomLinks, children }: AccountLayoutProps) => {
  return (
    <>
      <AuthBGLayout>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ maxWidth: "448px" }}>
              <Card sx={{ borderRadius: 2, width: 416 }}>
                <CardContent sx={{ backgroundColor: "primary.main", p: 4 }}>
                  <Link to="/" style={{ display: "flex", justifyContent: "center" }}>
                    <img src={logo} alt="logo" height={24} />
                  </Link>
                </CardContent>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ textAlign: "center", mx: "auto", width: "75%" }}>
                    {pageImage && (
                      <Avatar
                        variant="rounded"
                        src={pageImage}
                        alt="mail sent image"
                        sx={{ mx: "auto", width: 64, height: 64 }}
                      />
                    )}
                    <Typography variant="h4" sx={{ textAlign: "center", mb: "16px", mt: 4.5 }}>
                      {authTitle}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: "36px" }} color={"text.secondary"}>
                      {helpText}
                    </Typography>
                  </Box>

                  {children}
                </CardContent>
              </Card>

              {bottomLinks}
            </Box>
          </Box>
        </Box>

        <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Link to={"https://coderthemes.com/"} target="_blank" style={{ color: "unset" }}>
            <Typography variant="body2" sx={{ textAlign: "center", p: "24px" }} color={"text.secondary"}>
              {new Date().getFullYear()} © Nutricare - Coderthemes.com
            </Typography>
          </Link>
        </Box>
      </AuthBGLayout>
    </>
  );
};

export default AuthLayout;
