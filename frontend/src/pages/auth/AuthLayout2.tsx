import { ReactNode } from "react";
import { Avatar, Box, Card, CardContent, Button, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useLayoutContext } from "@src/types/states";

//images
import logo from "@src/assets/images/nutricare-logo.svg";
import logoDark from "@src/assets/images/nutricare-logo.svg";
import bgAuth from "@src/assets/images/BackgoundAuth.jpg";
import { TbBrandGoogle } from "react-icons/tb";
import { LuQuote } from "react-icons/lu";
import {GoogleIcon} from "./Componenets/CustomIcons"
import "swiper/css";

type AccountLayoutProps = {
  pageImage?: string;
  authTitle: string;
  helpText?: string;
  bottomLinks?: ReactNode;
  children?: ReactNode;
  hasThirdPartyLogin?: boolean;
  isRegister?: boolean;
};

const AuthLayout2 = ({
  pageImage,
  authTitle,
  helpText,
  bottomLinks,
  children,
  hasThirdPartyLogin,
  isRegister=false
}: AccountLayoutProps) => {
  const { themeMode } = useLayoutContext();

  return (
    <Box
      sx={{
        display: "flex",
  
        
        flexDirection: 'row-reverse',
        height: "100vh",
        fontFamily: "'Inter', 'Roboto', sans-serif",
        overflow: "hidden"
      }}>
      <Card sx={{ zIndex: 10, width: "100%", maxWidth: { lg: "35%" }, height: "100vh" }}>
        <CardContent
          sx={{
            p: "2rem",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            
           
         
          }}>
          <Box
            sx={{
              widows: "100%",
              marginBottom: "2rem",
              display: "flex",

              textAlign: { lg: "start", xs: "start" },
              "& > a": {
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                textAlign: {
                  lg: "start",
                  xs: "center",
                },
              },
            }}>
            <Link to="/">
              {themeMode == "dark" ? (
                <img src={logo} alt="logo" style={{ height: 80 }} />
              ) : (
                <img src={logoDark} alt="logo" style={{ height: 65 }} />
              )}
            </Link>
          </Box>
          <Box sx={{ textAlign: "center" ,px:6 ,py:4 }}>
            {pageImage && (
              <Avatar
                src={pageImage}
                alt="avatar"
                variant="square"
                sx={{ height: "64px", width: "64px", mx: "auto", mb: "24px" }}
              />
            )}

            <Typography variant="h2" sx={{ mb: 1  , textAlign:'left' , color:'#4F4F4F', fontWeight:'700' ,fontSize:'2rem'}}>
              {authTitle}
            </Typography>
     
            {children}

            {hasThirdPartyLogin && (
              <Box sx={{ textAlign: "center", mt: "16px" }}>
             
<Divider sx={{ my: 1.5 }} textAlign="center">or</Divider>
                <Box sx={{ display: "flex", gap: "8px", justifyContent: "center" }}>
               
              <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              endIcon={<GoogleIcon />}
              sx={{
                borderRadius: "8px",
                p:1,
                bgcolor: '#E1E1E2',
                color:'#4F4F4F',
                border: "1px solid #E0E0E0",
                fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "18px",
    lineHeight: "120%",
    letterSpacing: "-0.5px",
              }}
            >
             Continue with Google
            </Button>
                </Box>
              </Box>
            )}
          </Box>

          <Box sx={{}}>{bottomLinks}</Box>
        </CardContent>
      </Card>

      <Box
        sx={{
          bgcolor: "#0000004d",
          width: "100%",
          height: "100vh",
          position: "relative",
          display: { lg: "flex", xs: "hidden" },
          alignItems: "end",
              
          
        backgroundPosition: "50% 28%",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(" + bgAuth + ")",
        backgroundSize: "cover",
        
        }}>
          
        <Box
          sx={{
            position: "absolute",
            insetInlineStart: 0,
            insetInlineEnd: 0,
            display: "flex",
            marginTop: "auto",
            justifyContent: "center",
            textAlign: "center",
            
          }}>
          <Box sx={{ width: { xl: "50%", xs: "100%" }, mx: "auto" }}>
          
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout2;
