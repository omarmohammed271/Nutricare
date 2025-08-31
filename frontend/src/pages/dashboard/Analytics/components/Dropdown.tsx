import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  PopoverReference,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { LuMoreVertical } from "react-icons/lu";

type StateType = {
  open: boolean;
  positionTop: number;
  positionLeft: number;
  anchorReference: PopoverReference;
};
const Dropdown = () => {
  const anchorRef = useRef(null);

  const [state, setState] = useState<StateType>({
    open: false,
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: "anchorEl",
  });
  const { open, anchorReference } = state;
  const handleClickButton = () => {
    setState({
      ...state,
      open: true,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleClickButton}>
        <LuMoreVertical size={18} />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        anchorReference={anchorReference}
        anchorPosition={{
          top: 200,
          left: 400,
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ p: "5px 10px 5px" }}>
              <ListItemText>Refresh Report</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ p: "5px 10px 5px" }}>
              <ListItemText>Export Report</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default Dropdown;
