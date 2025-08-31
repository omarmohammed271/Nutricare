import { Link } from "react-router-dom";

// components
import { PageBreadcrumb } from "@src/components";
import { Box, Button, Typography } from "@mui/material";
import { LuHome } from "react-icons/lu";

const Error404Alt = () => {
  return (
    <>
      <PageBreadcrumb title="Error 404" subName="Error Pages" />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ textAlign: "center", maxWidth: "576px" }}>
          <Typography component={"h1"} sx={{ fontSize: "72px", color: "primary.main", fontWeight: 500 }}>
            404
          </Typography>
          <Typography
            component={"h4"}
            sx={{ color: "error.main", fontSize: "18px", textTransform: "uppercase", my: "28px", fontWeight: 600 }}>
            Page Not Found
          </Typography>
          <Typography component={"p"} sx={{ fontSize: "12px", color: "grey.600" }}>
            
            It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us. Here's a
            little tip that might help you get back on track.
          </Typography>
          <Button sx={{ mt: "40px" }} size="medium" variant="contained" color="info" startIcon={<LuHome size={18} />}>
            Return Home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Error404Alt;
