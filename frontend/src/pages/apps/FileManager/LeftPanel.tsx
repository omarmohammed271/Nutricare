import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useDropdownMenu } from "@src/hooks";
import {
  LuClock3,
  LuFile,
  LuFileBadge,
  LuFilePlus2,
  LuFolder,
  LuFolders,
  LuShare,
  LuStar,
  LuTrash2,
  LuUsers,
} from "react-icons/lu";
import { TbBrandGoogleDrive, TbDrone } from "react-icons/tb";
import SimpleBar from "simplebar-react";

const LeftPanel = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  return (
    <>
      <Card sx={{ height: "100%", width: "100%", minWidth: "288px" }}>
        <SimpleBar style={{ height: "100%", padding: 24 }}>
          <Box sx={{ position: "relative" }}>
            <Button
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="contained"
              color="success"
              fullWidth>
              <LuFilePlus2 style={{ marginRight: "6px" }} /> Create New
            </Button>
          </Box>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuList sx={{ py: 0 }}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LuFolder />
                </ListItemIcon>
                <ListItemText>Folder</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LuFile />
                </ListItemIcon>
                <ListItemText>File</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LuFileBadge />
                </ListItemIcon>
                <ListItemText>Document</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LuShare />
                </ListItemIcon>
                <ListItemText>Choose File</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
          <Box sx={{ mt: "20px" }}>
            <Typography
              component={"p"}
              sx={{
                px: "6px",
                py: "12px",
                color: "grey.600",
                display: "flex",
                alignItems: "center",
                "&:hover": { color: "grey.700" },
              }}>
              <LuFolders size={18} />
              <Typography sx={{ marginLeft: "10px" }} component={"span"} variant="subtitle1">
                My Files
              </Typography>
            </Typography>
            <Typography
              component={"p"}
              sx={{
                px: "6px",
                py: "12px",
                color: "grey.600",
                display: "flex",
                alignItems: "center",
                "&:hover": { color: "grey.700" },
              }}>
              <TbBrandGoogleDrive size={18} />
              <Typography sx={{ marginLeft: "10px" }} component={"span"} variant="subtitle1">
                Google Drive
              </Typography>
            </Typography>
            <Typography
              component={"p"}
              sx={{
                px: "6px",
                py: "12px",
                color: "grey.600",
                display: "flex",
                alignItems: "center",
                "&:hover": { color: "grey.700" },
              }}>
              <TbDrone size={18} />
              <Typography sx={{ marginLeft: "10px" }} component={"span"} variant="subtitle1">
                DropBox
              </Typography>
            </Typography>
            <Typography
              component={"p"}
              sx={{
                px: "6px",
                py: "12px",
                color: "grey.600",
                display: "flex",
                alignItems: "center",
                "&:hover": { color: "grey.700" },
              }}>
              <LuUsers size={18} />
              <Typography sx={{ marginLeft: "10px" }} component={"span"} variant="subtitle1">
                Share With Me
              </Typography>
            </Typography>
            <Typography
              component={"p"}
              sx={{
                px: "6px",
                py: "12px",
                color: "grey.600",
                display: "flex",
                alignItems: "center",
                "&:hover": { color: "grey.700" },
              }}>
              <LuClock3 size={18} />
              <Typography sx={{ marginLeft: "10px" }} component={"span"} variant="subtitle1">
                Recent
              </Typography>
            </Typography>
            <Typography
              component={"p"}
              sx={{
                px: "6px",
                py: "12px",
                color: "grey.600",
                display: "flex",
                alignItems: "center",
                "&:hover": { color: "grey.700" },
              }}>
              <LuStar size={18} />
              <Typography sx={{ marginLeft: "10px" }} component={"span"} variant="subtitle1">
                Starred
              </Typography>
            </Typography>
            <Typography
              component={"p"}
              sx={{
                px: "6px",
                py: "12px",
                color: "grey.600",
                display: "flex",
                alignItems: "center",
                "&:hover": { color: "grey.700" },
              }}>
              <LuTrash2 size={18} />
              <Typography sx={{ marginLeft: "10px" }} component={"span"} variant="subtitle1">
                Deleted files
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ mt: "64px" }}>
            <Typography
              component={"span"}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                py: "2px",
                px: "12px",
                borderRadius: "50rem",
                fontWeight: 600,
                color: "grey.700",
                bgcolor: "#11182733",
              }}>
              FREE
            </Typography>
            <Typography
              component={"h6"}
              sx={{ textTransform: "uppercase", mt: "12px", fontSize: "12px", fontWeight: 600, color: "grey.600" }}>
              Storage
            </Typography>
            <LinearProgress
              sx={{ width: "100%", height: "6px", borderRadius: "50rem", mt: "10px" }}
              variant="determinate"
              color="success"
              value={46}
            />
          </Box>
          <Typography component={"p"} sx={{ color: "grey.600", mt: "16px", fontSize: "10px" }}>
            7.02 GB (46%) of 15 GB used
          </Typography>
        </SimpleBar>
      </Card>
    </>
  );
};

export default LeftPanel;
