/*
 * Copyright (c) 2023.
 * File Name: index.ts
 * Author: Coderthemes
 */

import { deepMergeObjects } from "@src/helpers/global";
import { Components } from "@mui/material/styles/components";
import { Theme, ThemeOptions } from "@mui/material/styles/createTheme";
import getTableOverWrites from "@src/theme/components/table";
import getTooltipOverWrites from "@src/theme/components/tooltip";

const componentOverrides = (theme: Partial<ThemeOptions>): Components<Omit<Theme, "components">> => {
  return deepMergeObjects([getTableOverWrites(theme), getTooltipOverWrites(theme)]);
};
export default componentOverrides;
