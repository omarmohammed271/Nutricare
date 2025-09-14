import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SearchWithDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <TextField
        size="small"
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleOpen} edge="end">
                <ArrowDropDownIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: 300,
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px", // Rounded input
          },
        }}
      />

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>All</MenuItem>
        <MenuItem onClick={handleClose}>Active</MenuItem>
        <MenuItem onClick={handleClose}>Inactive</MenuItem>
      </Menu>
    </Box>
  );
};

export default SearchWithDropdown;
