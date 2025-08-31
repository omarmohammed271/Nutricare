/*
 * Copyright (c) 2023.
 * File Name: SidenavThemeToggler.tsx
 * Author: Coderthemes
 */

import { FormControlLabel, FormGroup, Stack, Switch, Typography } from "@mui/material";
import { LayoutSidenav } from "@src/types";
import { Box } from "@mui/system";
import { LuMoon, LuSun } from "react-icons/lu";

type SidenavThemeProps = {
  handleChangeSidenavTheme: (value: LayoutSidenav["theme"]) => void;
  sidenavTheme: LayoutSidenav["theme"];
};

const SidenavThemeToggler = ({ handleChangeSidenavTheme, sidenavTheme }: SidenavThemeProps) => {
  return (
    <>
      <div>
        <Typography variant={"subtitle2"} fontWeight={500}>
          Sidenav Theme
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
              "&:hover": sidenavTheme == "light" ? {} : { backgroundColor: "grey.200", borderColor: "grey.200" },
              ...(sidenavTheme == "light"
                ? { backgroundColor: "primary.lighter", borderColor: "primary.lighter", color: "primary.darker" }
                : {}),
            }}
            onClick={() => handleChangeSidenavTheme("light")}>
            <LuSun size={24} />
          </Box>
          <Box
            sx={{
              border: 1,
              display: "inline-flex",
              p: 1.5,
              borderColor: "divider",
              borderRadius: 1,
              cursor: "pointer",
              "&:hover": sidenavTheme == "dark" ? {} : { backgroundColor: "grey.200", borderColor: "grey.200" },
              ...(sidenavTheme == "dark"
                ? { backgroundColor: "primary.lighter", borderColor: "primary.lighter", color: "primary.darker" }
                : {}),
            }}
            onClick={() => handleChangeSidenavTheme("dark")}>
            <LuMoon size={24} />
          </Box>
        </Stack>
      </div>
    </>
  );
};

export default SidenavThemeToggler;
