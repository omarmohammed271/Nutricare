/*
 * Copyright (c) 2023.
 * File Name: MaximizeScreen.tsx
 * Author: Coderthemes
 */

import { IconButton } from "@mui/material";
import { useState } from "react";
import { LuMaximize, LuMinimize } from "react-icons/lu";

const MaximizeScreen = () => {
  const [fullScreenOn, setFullScreenOn] = useState(false);

  /*
   * toggle full screen mode
   */
  const toggleFullScreen = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const document: any = window.document;
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
      setFullScreenOn(true);
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      setFullScreenOn(false);
    }

    // handle fullscreen exit
    const exitHandler = () => {};
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
  };

  return (
    <IconButton color={"inherit"} onClick={toggleFullScreen}>
      {fullScreenOn ? <LuMinimize /> : <LuMaximize />}
    </IconButton>
  );
};

export default MaximizeScreen;
