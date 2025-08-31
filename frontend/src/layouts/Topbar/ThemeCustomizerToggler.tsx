/*
 * Copyright (c) 2023.
 * File Name: ThemeCustomizerToggler.tsx
 * Author: Coderthemes
 */

import { IconButton } from "@mui/material";
import { useLayoutContext } from "@src/states";
import { LuSettings } from "react-icons/lu";

const ThemeCustomizerToggler = () => {
  const {
    settings: { showRightsideBar },
    updateShowRightsideBar: updateShowRightsideBar,
  } = useLayoutContext();

  const handleRightsideBar = () => {
    updateShowRightsideBar(!showRightsideBar);
  };

  return (
    <>
      <IconButton color={"inherit"} onClick={handleRightsideBar}>
        <LuSettings />
      </IconButton>
    </>
  );
};

export default ThemeCustomizerToggler;
