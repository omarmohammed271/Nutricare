import { LayoutTheme } from "@src/types";

export type LeftbarThemeType = {
  label: {
    color: string;
  };
  item: {
    color: string;
    hover: string;
    active: string;
  };
};

const lightTheme: LeftbarThemeType = {
  label: {
    color: "#495057",
  },
  item: {
    color: "#495057",
    hover: "#4f71e5",
    active: "#02BE6A",
  },
};

const darkTheme: LeftbarThemeType = {
  label: {
    color: "#8791a0",
  },
  item: {
    color: "#969ba0",
    hover: "#c8d2dc",
    active: "#e1e6eb",
  },
};

export const getLeftbarTheme = (themeMode: LayoutTheme) => {
  return themeMode == "light" ? lightTheme : darkTheme;
};
