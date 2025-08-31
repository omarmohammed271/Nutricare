import { Box, Grid, Typography } from "@mui/material";
import { IconType } from "react-icons";

type QuickAccessFileTypes = {
  quickAccessFiles: {
    icon: IconType;
    name: string;
    size: string;
    variant?: string;
  }[];
};

const QuickAccess = ({ quickAccessFiles }: QuickAccessFileTypes) => {
  return (
    <Box sx={{ mt: "24px" }}>
      <Typography component={"h6"} sx={{ fontSize: "16px", mb: "16px", fontWeight: 600, color: "grey.700" }}>
        Quick Access
      </Typography>
      <Grid container spacing={1}>
        {quickAccessFiles.map((file, idx) => {
          const Icon = file.icon;
          return (
            <Grid item xl={3} xs={12} md={6} key={idx}>
              <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: "4px", m: "6px" }}>
                <Box sx={{ p: "12px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Box sx={{ width: "48px", height: "48px" }}>
                      <Typography
                        component={"span"}
                        variant="subtitle1"
                        sx={{
                          color: "secondary.main",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                          borderRadius: "4px",
                          bgcolor: "grey.200",
                        }}>
                        <Icon size={20} />
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "grey.600", fontWeight: 700 }}>{file.name}</Typography>
                      <Typography component={"p"} sx={{ color: "grey.600" }}>
                        {file.size}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default QuickAccess;
