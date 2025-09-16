import { Link } from "react-router-dom";

import logo from "@src/assets/images/nutricare-logo.svg";
import logolight from "@src/assets/images/nutricare-logo.svg"
import logoDark from "@src/assets/images/NDark.svg";
import { useLayoutContext } from "@src/types/states";
import { styled } from "@mui/system";
import { WithSetting } from "@src/types";


const LogoBox = ({ defaultTheme, backgroundColor }: { defaultTheme?: "light" | "dark"; backgroundColor?: boolean }) => {
  const { settings } = useLayoutContext();

  const {
    sidenav: { theme },
  } = settings;

  const LogoBoxWrapper = styled("div")<WithSetting>(({ settings }) => {
    return {
      backgroundColor: backgroundColor ? (settings.theme == "light" ? "#F9F4F2 " : "#1a1a1a;") : "transparent",
      height: "70px",
      position: "sticky",
      top: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2,
    };
  });

  return (
    <LogoBoxWrapper settings={settings}>
      <Link
        to="/"
        style={{
          justifyContent: "center",
          display: "flex",
        }}>
        <img src={settings.theme == "light" ? logolight : logoDark} height={70} width={94} />
      </Link>
    </LogoBoxWrapper>
  );
};

export default LogoBox;
