import { Link } from "react-router-dom";
import { Email } from "../types";
import { Box, Checkbox, Grid, IconButton, Typography } from "@mui/material";
import { LuArchive, LuClock, LuMail, LuStar, LuTrash2 } from "react-icons/lu";

const EmailsList = ({ emails }: { emails: Email[] }) =>
  emails.map((email, idx) => (
    <Box
      key={idx}
      sx={{
        position: "relative",
        my: 1.5,
        "&:hover": {
          "& .mail-options-menu": {
            insetInlineEnd: 0,
          },
        },
      }}>
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Checkbox />

        <IconButton>
          <LuStar size={18} style={{ color: email.is_important ? "#fec25a" : "text.primary" }}></LuStar>
        </IconButton>

        <Grid container sx={{ cursor: "pointer" }} spacing={2}>
          <Grid item xl={2} sm={5}>
            <Typography color={email.is_read ? "grey.600" : "grey.700"}>{email.from_name}</Typography>
          </Grid>

          <Grid item xl={9} sm={6} sx={{ display: { sm: "block", xs: "hidden" } }}>
            <Box sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              <Typography color={email.is_read ? "grey.600" : "grey.700"}>{email.subject}</Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Typography color="grey.600" sx={{ display: "flex", flexWrap: "nowrap", width: "60px" }}>
              {email.time}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          insetInlineEnd: "-14rem",
          transitionProperty: "all",
          px: "8px",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "150ms",
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(200,200,200,0.1)",
        }}
        className="mail-options-menu">
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2px", height: "100%" }}>
          <IconButton>
            <LuArchive />
          </IconButton>
          <IconButton>
            <LuTrash2 />
          </IconButton>
          <IconButton>
            <LuMail />
          </IconButton>
          <IconButton>
            <LuClock />
          </IconButton>
        </Box>
      </Box>
    </Box>
  ));

export default EmailsList;
