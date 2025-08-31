/*
 * Copyright (c) 2023.
 * File Name: Footer.tsx
 * Author: Coderthemes
 */

import { Stack, Typography, styled } from "@mui/material";
import { useLayoutContext } from "@src/states";
import { WithSetting } from "@src/types";

const FooterWrapper = styled("div")<WithSetting>(({ theme, settings }) => {
  return {
    backgroundColor: theme.palette.background.paper,
    height: "60px",
    minHeight: "60px",
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
  };
});

const Footer = () => {
  const { settings } = useLayoutContext();

  return (
    <FooterWrapper settings={settings} className="footer-do-not-remove">
      <Typography variant="subtitle2" color={"text.primary"}>
        2016 - {new Date().getFullYear()} © Attex - Coderthemes
      </Typography>
      <Stack direction={"row"} spacing={2} sx={{ display: "flex" }}>
        <Typography variant="subtitle2" color={"text.primary"}>
          About
        </Typography>
        <Typography variant="subtitle2" color={"text.primary"}>
          Support
        </Typography>
        <Typography variant="subtitle2" color={"text.primary"}>
          Contact Us
        </Typography>
      </Stack>
    </FooterWrapper>
  );
};

export default Footer;
