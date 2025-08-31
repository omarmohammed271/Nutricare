/*
 * Copyright (c) 2023.
 * File Name: AppsDropdown.tsx
 * Author: Coderthemes
 */
import githubIcon from "@src/assets/images/brands/github.png";
import bitbucketIcon from "./icons/bitbucket.png";
import dropboxIcon from "./icons/dropbox.png";
import slackIcon from "./icons/slack.png";
import dribbbleIcon from "./icons/dribbble.png";
import behanceIcon from "./icons/behance.png";

import { Box, Grid, IconButton, Menu, MenuItem, MenuList, MenuProps, Typography } from "@mui/material";
import { useDropdownMenu } from "@src/hooks";
import { LuLayoutGrid } from "react-icons/lu";
import { styled, alpha } from "@mui/material/styles";
import { splitArray } from "@src/utils";
import { apps } from "./data";

const AppsDropdown = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();
  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: "268px",
      color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
    },
  }));

  return (
    <>
      <IconButton onClick={handleClick} color={"inherit"}>
        <LuLayoutGrid />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <Box sx={{ p: "18px", width: "318px" }}>
          <Grid container spacing={2}>
            {apps.map((app, idx) => {
              return (
                <Grid item md={4} key={idx}>
                  <Box
                    sx={{
                      py: "10px",
                      textAlign: "center",
                      "&:hover": { bgcolor: "grey.200" },
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}>
                    <img src={app.icon} alt={app.name} height={"24px"} />
                    <Typography component={"p"} sx={{ fontSize: "13px", color: "text.secondary" }}>
                      {app.name}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </StyledMenu>
    </>
  );
};

export default AppsDropdown;
