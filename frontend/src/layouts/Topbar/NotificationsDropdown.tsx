/*
 * Copyright (c) 2023.
 * File Name: NotificationsDropdown.tsx
 * Author: Coderthemes
 */

import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useDropdownMenu } from "@src/hooks";
import { LuBell } from "react-icons/lu";

import { NotificationItem } from "./data";
import { Fragment } from "react";
import SimpleBar from "simplebar-react";
import { IconType } from "react-icons";

type NotificationDropDownProps = {
  notifications: Array<NotificationItem>;
};
const NotificationsDropdown = ({ notifications }: NotificationDropDownProps) => {
  /**
   * Get time since
   */
  function timeSince(date: Date) {
    if (typeof date !== "object") {
      date = new Date(date);
    }

    const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
    let intervalType: string;

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = "year";
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = "month";
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = "day";
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }
    if (interval > 1 || interval === 0) {
      intervalType += "s";
    }
    return interval + " " + intervalType + " ago";
  }

  let previousDate: null | number | Date = null;
  let currentDate: null | number | Date = null;

  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  const unreadCount = 1;
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
      minWidth: 180,
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
        <Badge color="success" badgeContent={unreadCount}>
          <LuBell size={24} />
        </Badge>
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuList sx={{ py: 0 }}>
          <Box sx={{ p: "12px" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography component={"h6"} sx={{ color: "grey.700" }}>
                Notification
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "grey.700" }}>Clear All</Typography>
            </Box>
          </Box>
          <Divider />
          <SimpleBar style={{ height: "320px", width: "340px", padding: "16px 0px" }}>
            {(notifications || []).map((notification, idx) => {
              const Icon: IconType | undefined = notification.icon;

              const todayDate = new Date().getDate();
              currentDate = notification.createdAt.getDate();
              let labelName = "";
              if (previousDate !== currentDate) {
                previousDate = currentDate;
                if (todayDate === currentDate) {
                  labelName = "Today";
                } else if (todayDate - currentDate === 1) {
                  labelName = "Yesterday";
                } else {
                  labelName = `${new Date().toLocaleDateString()}`;
                }
                return (
                  <Fragment key={idx}>
                    <Typography
                      component={"h5"}
                      sx={{ fontSize: "12px", color: "grey.700", px: "16px", mb: "8px", mt: "5px" }}>
                      {labelName}
                    </Typography>
                    <MenuItem onClick={handleClose} sx={{ gap: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexShrink: 0 }}>
                          {notification.avatar ? (
                            <Avatar
                              variant="circular"
                              sx={{ height: "36px", width: "36px" }}
                              src={notification.avatar}
                            />
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "36px",
                                width: "36px",
                                bgcolor: "primary.main",
                                borderRadius: "100%",
                              }}>
                              {Icon && <Icon color="white" />}
                            </Box>
                          )}
                        </Box>
                        <Box sx={{ flexGrow: 1, overflow: "hidden", whiteSpace: "nowrap", ml: "8px" }}>
                          <Typography component={"h5"} sx={{ mb: "4px", fontWeight: 500, color: "text.secondary" }}>
                            Datacorp
                            <Typography component={"small"} sx={{ ml: "4px", fontSize: "10px" }}>
                              1 min ago
                            </Typography>
                          </Typography>
                          <Typography component={"small"} sx={{ fontSize: "10px", color: "text.primary" }}>
                            Caleb Flakelar commented on Admin
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  </Fragment>
                );
              } else {
                return (
                  <MenuItem onClick={handleClose} sx={{ gap: 1 }} key={idx}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ flexShrink: 0 }}>
                        {notification.avatar ? (
                          <Avatar variant="circular" sx={{ height: "36px", width: "36px" }} src={notification.avatar} />
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "36px",
                              width: "36px",
                              bgcolor: "primary.main",
                              borderRadius: "100%",
                            }}>
                            {Icon && <Icon color="white" />}
                          </Box>
                        )}
                      </Box>
                      <Box sx={{ flexGrow: 1, overflow: "hidden", whiteSpace: "nowrap", ml: "8px" }}>
                        <Typography component={"h5"} sx={{ mb: "4px", fontWeight: 500, color: "text.secondary" }}>
                          
                          {notification.text}
                          <Typography component={"small"} sx={{ ml: "4px", fontSize: "10px" }}>
                            {timeSince(notification.createdAt)}
                          </Typography>
                        </Typography>
                        <Typography
                          component={"small"}
                          sx={{ fontSize: "10px", color: "text.primary", whiteSpace: "pre-wrap" }}>
                          {notification.subText}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                );
              }
            })}
          </SimpleBar>
          <Divider />
          <Box sx={{ p: "6px", textAlign: "center" }}>
            <Button size="small" variant="text" color="primary">
              View All
            </Button>
          </Box>
        </MenuList>
      </StyledMenu>
    </>
  );
};

export default NotificationsDropdown;
