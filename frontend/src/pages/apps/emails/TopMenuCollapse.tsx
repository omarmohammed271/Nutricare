import { Button, ButtonGroup, CardContent, IconButton, Menu, MenuItem } from "@mui/material";
import { useDropdownMenu } from "@src/hooks";
import {
  LuAlertCircle,
  LuArchive,
  LuChevronDown,
  LuFolder,
  LuMenu,
  LuMoreHorizontal,
  LuTag,
  LuTrash2,
} from "react-icons/lu";

const TopMenuCollapse = ({ toggleLeftPanel }: { toggleLeftPanel: () => void }) => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  return (
    <>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 1, px: "8px" }}>
        <IconButton sx={{ display: { lg: "none", xs: "block" } }} onClick={toggleLeftPanel}>
          <LuMenu />
        </IconButton>

        <ButtonGroup variant="contained" color="primary">
          <Button variant="contained">
            <LuArchive size={20} />
          </Button>
          <Button variant="contained">
            <LuAlertCircle size={20} />
          </Button>
          <Button variant="contained">
            <LuTrash2 size={20} />
          </Button>
        </ButtonGroup>

        <Button variant="contained" color="primary" onClick={handleClick} startIcon={<LuFolder size={20} />}>
          <LuChevronDown />
        </Button>
        <Button variant="contained" color="primary" onClick={handleClick} startIcon={<LuTag size={20} />}>
          <LuChevronDown />
        </Button>
        <Button variant="contained" color="primary" onClick={handleClick} startIcon={<LuMoreHorizontal size={20} />}>
          More <LuChevronDown style={{ marginInlineStart: 2 }} />
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Mark as Unread</MenuItem>
          <MenuItem onClick={handleClose}>Add to Tasks</MenuItem>
          <MenuItem onClick={handleClose}>Star</MenuItem>
          <MenuItem onClick={handleClose}>Mute</MenuItem>
        </Menu>
      </CardContent>
    </>
  );
};

export default TopMenuCollapse;
