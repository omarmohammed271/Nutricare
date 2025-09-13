import { Link } from "react-router-dom";

//image
import logo from "@src/assets/images/nutricare-logo.svg";
import frame404 from "@src/assets/images/landing/Frame 1171276469.svg";

// components
import { PageMetaData } from "../../components";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { LuHome } from "react-icons/lu";

const Error404 = () => {
  return (
    <>
      <PageMetaData title="Error 404" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "background.default"
        }}>
        <img 
          src={frame404} 
          alt="404 illustration" 
          style={{ 
            maxWidth: "100%", 
            height: "auto",
            maxHeight: "80vh",
            width: "auto",
            objectFit: "contain"
          }} 
        />
      </Box>
    </>
  );
};

export default Error404;