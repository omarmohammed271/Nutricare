import { Link } from "react-router-dom";

//image
import logo from "@src/assets/images/nutricare-logo.svg";

// components
import { AuthBGLayout, PageMetaData } from "../../components";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { LuFrown, LuHome } from "react-icons/lu";

const Error404 = () => {
  return (
    <>
      <PageMetaData title="Error 404" />
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
                <CardContent sx={{ backgroundColor: "primary.main", p: "36px" }}>
                  <Link to="/" style={{ display: "flex", justifyContent: "center" }}>
                    <img src={logo} alt="logo" height={24} />
                  </Link>
                </CardContent>
                <CardContent sx={{ px: "24px", py: "40px" }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography component={"h1"} sx={{ fontSize: "72px", color: "primary.main", fontWeight: 600 }}>
                      4<LuFrown size={60} />4
                    </Typography>
                    <Typography
                      component={"h4"}
                      sx={{
                        color: "error.main",
                        fontSize: "18px",
                        textTransform: "uppercase",
                        my: "28px",
                        fontWeight: 600,
                      }}>
                      Page Not Found
                    </Typography>
                    <Typography component={"p"} sx={{ fontSize: "12px", color: "grey.600" }}>
                      It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us.
                      Here's a little tip that might help you get back on track.
                    </Typography>
                    <Button
                      sx={{ mt: "40px" }}
                      size="medium"
                      variant="contained"
                      color="info"
                      startIcon={<LuHome size={18} />}>
                      Back to Home
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>

        <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Link to={"https://coderthemes.com/"} target="_blank" style={{ textDecoration: "none" }}>
            <Typography variant="body2" sx={{ textAlign: "center", p: "24px" }} color={"text.secondary"}>
              {new Date().getFullYear()} © Attex - Coderthemes.com
            </Typography>
          </Link>
        </Box>
      </AuthBGLayout>
    </>
  );
};

export default Error404;
