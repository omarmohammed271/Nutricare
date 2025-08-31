/*
 * Copyright (c) 2023.
 * File Name: SidenavModeToggler.tsx
 * Author: Coderthemes
 */

import { FormControlLabel, FormGroup, Stack, Switch, Typography } from "@mui/material";
import { LayoutSidenav } from "@src/types";
import { Box } from "@mui/system";
import { LuMoon, LuPanelRight, LuPanelRightOpen, LuSun } from "react-icons/lu";

type SidenavModeProps = {
  handleChangeSidenavMode: (value: LayoutSidenav["mode"]) => void;
  sidenavMode: LayoutSidenav["mode"];
};

const SidenavModeToggler = ({ handleChangeSidenavMode, sidenavMode }: SidenavModeProps) => {
  return (
    <>
      <div>
        <Typography variant={"subtitle2"} fontWeight={500}>
          Sidenav Mode
        </Typography>

        <Stack direction={"row"} gap={2} mt={1}>
          <Box
            sx={{
              border: 1,
              display: "inline-flex",
              p: 1.5,
              borderColor: "divider",
              borderRadius: 1,
              cursor: "pointer",
              "&:hover": sidenavMode == "default" ? {} : { backgroundColor: "grey.200", borderColor: "grey.200" },
              ...(sidenavMode == "default"
                ? { backgroundColor: "primary.lighter", borderColor: "primary.lighter", color: "primary.darker" }
                : {}),
            }}
            onClick={() => handleChangeSidenavMode("default")}>
            <LuPanelRight size={24} style={{ transform: "rotate(180deg)" }} />
          </Box>
          <Box
            sx={{
              border: 1,
              display: "inline-flex",
              p: 1.5,
              borderColor: "divider",
              borderRadius: 1,
              cursor: "pointer",
              "&:hover": sidenavMode == "mobile" ? {} : { backgroundColor: "grey.200", borderColor: "grey.200" },
              ...(sidenavMode == "mobile"
                ? { backgroundColor: "primary.lighter", borderColor: "primary.lighter", color: "primary.darker" }
                : {}),
            }}
            onClick={() => handleChangeSidenavMode("mobile")}>
            <LuPanelRightOpen size={24} />
          </Box>
        </Stack>
      </div>
    </>
  );
};

export default SidenavModeToggler;
