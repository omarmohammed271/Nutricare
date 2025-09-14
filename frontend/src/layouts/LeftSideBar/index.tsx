/*
 * Copyright (c) 2023.
 * File Name: index.tsx
 * Author: Coderthemes
 */

import { Drawer, styled, Box, Button, Typography, Link as MuiLink } from "@mui/material";
import LogoBox from "./LogoBox";
import SimpleBar from "simplebar-react";
import AppMenu from "./AppMenu";
import { changeHTMLAttribute, getMenuItems } from "@src/helpers/menu";
import { WithSetting } from "@src/types";
import { useLayoutContext } from "@src/states";
import { useViewPort } from "@src/hooks";
import { useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";

/* Sidemenu content */
const SideBarContent = () => <AppMenu menuItems={getMenuItems()} />;

const LeftSideBarWrapper = styled("div")<WithSetting>(({ settings }) => {
  return {

    backgroundColor: settings.theme == "light" ? "#F9F4F2" : "#1a1a1a;",
  

    width: 240,
    minWidth: 240,
    height: "100vh",
    position: "sticky",
    top: 0,
    // transform: "translateX(-100%)"
    marginInlineStart: !settings.sidenav.showMobileMenu ? -240 : 0,
    transition: "0.3s margin",
    borderRight: settings.theme == "light" ? "1px solid #e9ecef" : "1px solid #2d3142",
  };
});

const LeftSideBarMenu = () => {
  const { settings } = useLayoutContext();

  return (
    <LeftSideBarWrapper settings={settings} className="app-menu-do-not-remove">
      <LogoBox backgroundColor />
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "100%",
        justifyContent: "space-between"
      }}>
        <SimpleBar style={{ height: "calc(100% - 200px)", flex: 1 }}>
          <SideBarContent />
        </SimpleBar>
        
        {/* Footer Section */}
        <Box sx={{ 
          p: 2, 
          borderTop: "1px solid #E5E5E5",
          backgroundColor: "#F9F4F2"
        }}>
          {/* Logout Button */}
          <Button
            component={Link}
            to="/auth/logout"
            fullWidth
            sx={{
              mb: 2,
              py: 1.5,
              px: 2,
              backgroundColor: "#E5E5E5",
              color: "#666666",
              borderRadius: 2,
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#D5D5D5",
              },
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "flex-start"
            }}
            startIcon={<LuLogOut size={16} />}
          >
            Logout
          </Button>
          
          {/* Terms and Privacy Links */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 0.5,
            mb: 1
          }}>
            <MuiLink
              component={Link}
              to="/terms"
              sx={{
                color: "#02BE6A",
                fontSize: "12px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Terms and conditions
            </MuiLink>
            <MuiLink
              component={Link}
              to="/privacy"
              sx={{
                color: "#02BE6A",
                fontSize: "12px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Privacy Policy
            </MuiLink>
          </Box>
          
          {/* Copyright */}
          <Typography
            sx={{
              color: "#999999",
              fontSize: "10px",
              textAlign: "center"
            }}
          >
            © 2025 Nutricare. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </LeftSideBarWrapper>
  );
};

const LeftSideBar = () => {
  const { width } = useViewPort();
  const { settings, updateSidenav } = useLayoutContext();
  const showMobileMenu = settings.sidenav.showMobileMenu;

  useEffect(() => {
    changeHTMLAttribute("data-mode", settings.theme);
  }, [settings.theme]);

  useEffect(() => {
    changeHTMLAttribute("data-menu-color", settings.sidenav.theme);
  }, [settings.sidenav.theme]);

  useEffect(() => {
    changeHTMLAttribute("data-sidenav-view", settings.sidenav.mode);
  }, [settings.sidenav.mode]);

  useEffect(() => {
    if (width < 1140) {
      updateSidenav({ mode: "mobile" });
    } else if (width >= 1140 && settings.sidenav.mode == "mobile") {
      updateSidenav({ mode: "default" });
    }
  }, [width]);

  const hideSideNavMobile = () => {
    // const htmlElement = document.getElementsByTagName("html")[0];
    // htmlElement.classList.remove("sidenav-enable");
    updateSidenav({ showMobileMenu: false });
  };
  return settings.sidenav.mode == "default" ? (
    <LeftSideBarMenu />
  ) : (
    <Drawer open={showMobileMenu} onClose={hideSideNavMobile}>
      <LeftSideBarMenu />
    </Drawer>
  );
};

export default LeftSideBar;
