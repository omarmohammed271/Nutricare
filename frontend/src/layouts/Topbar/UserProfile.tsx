/*
 * Copyright (c) 2023.
 * File Name: LanguageDropdown.tsx
 * Author: Coderthemes
 */

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import country1 from "@src/assets/images/flags/Argentina.png";
import country2 from "@src/assets/images/flags/Canada.png";
import country3 from "@src/assets/images/flags/Bharat.png";
import country4 from "@src/assets/images/flags/Japan.png";
import country5 from "@src/assets/images/flags/UK.png";
import country6 from "@src/assets/images/flags/US.png";
import avatar2 from "@src/assets/images/avatars/avatar2.png";
import {
  LuChevronDown,
  LuHeartHandshake,
  LuLock,
  LuLogOut,
  LuSettings,
  LuUserCircle2,
  LuUserPlus,
} from "react-icons/lu";
import { useDropdownMenu } from "@src/hooks";
import { useLayoutContext } from "@src/states";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";

type ProfileDropdownOption = {
  icon: IconType;
  label: string;
  link?: string;
};

const UserProfile = () => {
  const selectedLanguage = country3;
  const {
    settings: { theme },
  } = useLayoutContext();

  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  const profileDropdownOptions: ProfileDropdownOption[] = [
    {
      icon: LuUserCircle2,
      label: "My Account",
    },
    {
      icon: LuSettings,
      label: "Settings",
    },
    {
      icon: LuHeartHandshake,
      label: "Support",
    },
    {
      icon: LuLock,
      label: "Lock Screen",
      link: "/auth/lock-screen",
    },
    {
      icon: LuLogOut,
      label: "Logout",
      link: "/auth/logout",
    },
  ];

  return (
    <Box sx={{ cursor: "pointer", gap: 1, alignItems: "center", display: "flex", height: "100%", width: "auto" }}>
      <Box
        onClick={handleClick}
        sx={{
          paddingLeft: "8px",
          paddingRight: "8px",
          display: "flex",
          alignItems: "center",
          width: "140px",
          borderLeft: 1,
          borderRight: 1,
          borderColor: theme == "dark" ? "#374151" : "divider",
          height: "70px",
          backgroundColor: "#0000000d",
          justifyContent: "space-around",
        }}>
        <Avatar src={avatar2} alt="avatar" sx={{ height: 32, width: 32 }} />
        <div>
          <Typography variant="subtitle2" color={"text.primary"}>
            Tosha Minner
          </Typography>
          <Typography variant="caption" color={"text.primary"}>
            Founder & CEO
          </Typography>
        </div>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}>
        {profileDropdownOptions.map((option, idx) => {
          const Icon = option.icon;
          return (
            <MenuItem onClick={handleClose} key={idx}>
              <ListItemIcon>
                <Icon size={18} />
              </ListItemIcon>
              {option.link ? (
                <Link to={option.link}>
                  <ListItemText sx={{ color: "text.secondary" }}>{option.label}</ListItemText>
                </Link>
              ) : (
                option.label
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default UserProfile;
