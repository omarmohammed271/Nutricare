import { Badge, Box, Collapse, Typography } from "@mui/material";
import { MenuItemTypes } from "@src/common/menu-items";
import { findAllParent, findMenuItem, getMenuItemFromURL } from "@src/helpers/menu";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { useLayoutContext } from "@src/states";
import { getLeftbarTheme, LeftbarThemeType } from "@src/layouts/LeftSideBar/helpers.ts";

type SubMenus = {
  item: MenuItemTypes;
  activeMenuItems?: Array<string>;
  toggleMenu?: (item: any, status: boolean) => void;
  theme: LeftbarThemeType;
  level?: number;
};

const MenuItemWithChildren = ({ item, activeMenuItems, toggleMenu, theme }: SubMenus) => {
  const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.key));

  const Icon = item.icon;

  useEffect(() => {
    setOpen(activeMenuItems!.includes(item.key));
  }, [activeMenuItems, item]);

  const toggleMenuItem = () => {
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };

  return (
    <li>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          padding: "12px 16px",
          gap: "12px",
          alignItems: "center",
          color: open ? theme.item.active : theme.item.color,
          "&:hover": { color: open ? theme.item.active : theme.item.hover },
        }}
        onClick={toggleMenuItem}>
        {Icon && <Icon size={16} />}
        <Typography
          variant="subtitle1"
          sx={{
            lineHeight: 1,
          }}>
          {item.label}
        </Typography>
        <div style={{ marginInlineStart: "auto" }}>
          {!item.badge ? (
            <LuChevronRight
              size={16}
              style={{
                display: "flex",
                transform: open ? "rotate(90deg)" : "rotate(0deg)",
                transition: "0.15s all",
              }}
            />
          ) : (
            <Box
              sx={{
                bgcolor: "success.main",
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
              }}>
              <Typography variant={"body2"} fontWeight={500} lineHeight={1}>
                {item.badge.text}
              </Typography>
            </Box>
          )}
        </div>
      </Box>
      <Collapse in={open}>
        <ul style={{ listStyle: "none", paddingInlineStart: "28px" }}>
          {(item.children || []).map((child, idx) => {
            return (
              <Fragment key={idx}>
                {child.children ? (
                  <MenuItemWithChildren
                    item={child}
                    theme={theme}
                    activeMenuItems={activeMenuItems}
                    toggleMenu={toggleMenu}
                  />
                ) : (
                  <MenuItem item={child} theme={theme} level={1} activeMenuItems={activeMenuItems} />
                )}
              </Fragment>
            );
          })}
        </ul>
      </Collapse>
    </li>
  );
};

const MenuItem = ({ item, theme, level, activeMenuItems }: SubMenus) => {
  const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.key));

  const Icon = item.icon;

  useEffect(() => {
    setOpen(activeMenuItems!.includes(item.key));
  }, [activeMenuItems, item]);

  return (
    <li style={{ padding: level == 1 ? "8px 16px" : "12px 16px" }}>
      <Box
        sx={{
          color: open ? theme.item.active : theme.item.color,
          "&:hover": { color: open ? theme.item.active : theme.item.hover },
        }}>
        <Link
          to={item.url!}
          target={item.target}
          data-menu-key={item.key}
          style={{ display: "flex", gap: "10px", alignItems: "center", textDecoration: "none", color: "inherit" }}>
          {Icon && <Icon />}
          <Typography variant="subtitle1" style={{ lineHeight: 1 }}>
            {item.label}
          </Typography>
          {item.badge && (
            <Box
              sx={{
                bgcolor: "success.main",
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
              }}>
              <Typography variant={"body2"} fontWeight={500} lineHeight={1}>
                {item.badge.text}
              </Typography>
            </Box>
          )}
        </Link>
      </Box>
    </li>
  );
};

const AppMenu = ({ menuItems }: { menuItems: MenuItemTypes[] }) => {
  const location = useLocation();

  const { settings } = useLayoutContext();

  const menuRef = useRef(null);

  const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

  const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
    if (show) {
      setActiveMenuItems([menuItem["key"], ...findAllParent(menuItems, menuItem)]);
    }
  };

  const theme = useMemo(() => getLeftbarTheme(settings.sidenav.theme), [settings.sidenav.theme]);

  const activeMenu = useCallback(() => {
    const trimmedURL = location?.pathname?.replaceAll("", "");
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL);

    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key);
      if (activeMt) {
        setActiveMenuItems([activeMt["key"], ...findAllParent(menuItems, activeMt)]);
      }

      setTimeout(function () {
        const activatedItem: any = document.querySelector(`#right-menu a[href="${trimmedURL}"]`);

        if (activatedItem != null) {
          const simplebarContent = document.querySelector("#right-menu");

          const offset = activatedItem!.offsetTop - 150;

          scrollTo(simplebarContent, 100, 600);
          if (simplebarContent && offset > 100) {
            scrollTo(simplebarContent, offset, 600);
          }
        }
      }, 200);

      // scrollTo (Left Side Bar Active Menu)
      const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const scrollTo = (element: any, to: any, duration: any) => {
        const start = element.scrollTop,
          change = to - start,
          increment = 20;
        let currentTime = 0;
        const animateScroll = function () {
          currentTime += increment;
          const val = easeInOutQuad(currentTime, start, change, duration);
          element.scrollTop = val;
          if (currentTime < duration) {
            setTimeout(animateScroll, increment);
          }
        };
        animateScroll();
      };
    }
  }, [location.pathname, menuItems]);

  useEffect(() => {
    if (menuItems && menuItems.length > 0) activeMenu();
  }, [activeMenu, menuItems]);

  return (
    <>
      <ul
        ref={menuRef}
        id="main-side-menu"
        style={{ marginTop: 0, marginBottom: 24, padding: "0 8px", listStyle: "none" }}>
        {(menuItems || []).map((item, idx) => {
          return (
            <Fragment key={idx}>
              {item.isTitle ? (
                <li style={{ padding: "12px 16px" }}>
                  <Typography fontWeight={500} variant={"subtitle2"} color={theme.label.color}>
                    {item.label}
                  </Typography>
                </li>
              ) : (
                <>
                  {item.children ? (
                    <MenuItemWithChildren
                      item={item}
                      theme={theme}
                      toggleMenu={toggleMenu}
                      activeMenuItems={activeMenuItems}
                    />
                  ) : (
                    <MenuItem item={item} theme={theme} activeMenuItems={activeMenuItems} />
                  )}
                </>
              )}
            </Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default AppMenu;
