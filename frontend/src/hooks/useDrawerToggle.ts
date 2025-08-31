import { useState } from "react";

export type DrawerAnchorType = "top" | "left" | "bottom" | "right";

const useDrawerToggle = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: DrawerAnchorType, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return {
    state,
    toggleDrawer,
  };
};

export default useDrawerToggle;
