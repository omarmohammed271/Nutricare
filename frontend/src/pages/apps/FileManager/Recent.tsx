import {
  Avatar,
  Box,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import { LuDownload, LuLink, LuMoreVertical, LuPenLine, LuShare2, LuTrash2 } from "react-icons/lu";
import { recentFiles } from "./data";
import { useDropdownMenu } from "@src/hooks";

const Recent = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();
  return (
    <Box sx={{ mt: "24px" }}>
      <Typography component={"h6"} sx={{ fontSize: "16px", mb: "16px", fontWeight: 600, color: "grey.700" }}>
        Recent
      </Typography>
      <Grid container>
        <Grid item sx={{ width: "100%" }}>
          <Box sx={{ overflowX: "auto" }}>
            <Box sx={{ display: "inline-block", minWidth: "100%", verticalAlign: "middle" }}>
              <Box sx={{ overflow: "hidden" }}>
                <Table sx={{ minWidth: "100%" }}>
                  <TableHead
                    sx={{
                      bgcolor: "grey.100",
                      borderTop: "1px solid",
                      borderTopColor: "divider",
                      borderBottom: "1px solid",
                      borderBottomColor: "divider",
                    }}>
                    <TableRow>
                      <TableCell
                        sx={{ color: "grey.700", p: "14px", fontWeight: 500, minWidth: "160px", border: "0px" }}>
                        File Name
                      </TableCell>
                      <TableCell
                        sx={{ color: "grey.700", p: "14px", fontWeight: 500, minWidth: "160px", border: "0px" }}>
                        Last Modified
                      </TableCell>
                      <TableCell
                        sx={{ color: "grey.700", p: "14px", fontWeight: 500, minWidth: "96px", border: "0px" }}>
                        File Size
                      </TableCell>
                      <TableCell
                        sx={{ color: "grey.700", p: "14px", fontWeight: 500, minWidth: "128px", border: "0px" }}>
                        Owner
                      </TableCell>
                      <TableCell
                        sx={{ color: "grey.700", p: "14px", fontWeight: 500, minWidth: "96px", border: "0px" }}>
                        Members
                      </TableCell>
                      <TableCell sx={{ color: "grey.700", p: "14px", fontWeight: 500, border: "0px" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentFiles.map((file, idx) => {
                      return (
                        <TableRow key={idx}>
                          <TableCell sx={{ p: "16px", color: "grey.700", fontWeight: 500 }}>{file.name}</TableCell>
                          <TableCell sx={{ p: "16px", color: "grey.600", fontWeight: 400, whiteSpace: "nowrap" }}>
                            <Typography component={"p"}>{file.modifiedDate}</Typography>
                            <Typography component={"span"} variant="body2" fontSize={"10px"}>
                              {file.modifiedBy}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ p: "16px", color: "grey.600", fontWeight: 500 }}>{file.size}</TableCell>
                          <TableCell sx={{ p: "16px", color: "grey.600", fontWeight: 500 }}>{file.owner}</TableCell>
                          <TableCell sx={{ position: "relative", p: "14px" }}>
                            <Box sx={{ display: "flex" }}>
                              {file.members.map((member, idx) => {
                                return (
                                  <Tooltip key={idx} title={member.name} placement="top" arrow>
                                    <Box
                                      sx={{
                                        height: "32px",
                                        width: "32px",
                                        ml: "-5px",
                                        "&:hover": { transform: "translateY(-2px)", transition: "300ms" },
                                      }}>
                                      <Avatar
                                        src={member.image}
                                        variant="circular"
                                        sx={{ display: "inline-block", height: "100%", width: "100%" }}
                                      />
                                    </Box>
                                  </Tooltip>
                                );
                              })}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ p: "14px" }}>
                            <IconButton
                              sx={{ px: "6px" }}
                              onClick={handleClick}
                              aria-controls={open ? "account-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}>
                              <LuMoreVertical size={16} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LuShare2 />
          </ListItemIcon>
          Share
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LuLink />
          </ListItemIcon>
          Get Sharable Link
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LuPenLine />
          </ListItemIcon>
          Rename
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LuDownload />
          </ListItemIcon>
          Download
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LuTrash2 />
          </ListItemIcon>
          Remove
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Recent;
