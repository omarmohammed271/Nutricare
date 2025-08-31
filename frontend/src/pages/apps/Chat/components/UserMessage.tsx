import { ChatMessage, ChatUser } from "@src/pages/apps/Chat/helper";
import { useDropdownMenu } from "@src/hooks";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { LuCopy, LuDownload, LuMoreVertical, LuScissors, LuTrash } from "react-icons/lu";

export const UserMessage = ({ message, toUser }: { message: ChatMessage; toUser: ChatUser }) => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();
  const fromOther = message.from.id === toUser.id;
  return (
    <Box
      sx={{
        flexDirection: fromOther ? "row-reverse" : "row",
        alignItems: "flex-start",
        textAlign: fromOther ? "end" : "start",
        display: "flex",
        gap: "12px",
        "&:hover": {
          "& .chat-bubble-options": {
            visibility: "visible",
          },
        },
        "& .chat-bubble-options": {
          visibility: "hidden",
        },
      }}>
      <Box sx={{ textAlign: "center" }}>
        <Avatar src={message.from.avatar} sx={{ height: "32px", width: "32px" }} />
        <Typography variant={"body2"} sx={{ pt: "4px" }}>
          {message.sendOn}
        </Typography>
      </Box>

      {message.message.type === "text" && (
        <Box
          sx={{
            maxWidth: "75%",
            p: "12px",
            position: "relative",
            borderRadius: "4px",
            borderStartStartRadius: 0,
            backgroundColor: fromOther ? "primary.main" : "grey.200",
            color: fromOther ? "white" : "inherit",
            ":after": {
              top: 0,
              insetInlineStart: "-10px",
              position: "absolute",
              borderWidth: "6px",
              borderTopColor: "white",
              borderInlineEndColor: "white",
              borderColor: "transparent",
            },
          }}>
          <Typography variant="body1" fontWeight={500} sx={{ position: "relative" }}>
            {message.from.name}
          </Typography>
          <Typography variant="body2" sx={{ pt: 0.5 }}>
            {message.message.value}
          </Typography>
        </Box>
      )}

      {message.message.type === "file" && (
        <Box
          sx={{
            my: 1.5,
            borderWidth: "1px",
            borderRadius: "4px",
            p: "12px",
            borderColor: "divider",
            borderStyle: "solid",
          }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Box sx={{ width: "48px", height: "48px" }}>
                <Typography
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    backgroundColor: "primary.main",
                    borderRadius: "4px",
                    color: "white",
                  }}>
                  .ZIP
                </Typography>
              </Box>
              <Box sx={{ textAlign: "start" }}>
                <Typography variant="subtitle2" color={"text.primary"} fontWeight={500}>
                  {message.message.value.file}
                </Typography>
                <Typography variant="body2" color={"text.secondary"}>
                  {message.message.value.size}
                </Typography>
              </Box>
            </Box>
            <LuDownload style={{ cursor: "pointer" }} />
          </Box>
        </Box>
      )}

      <Box>
        <IconButton aria-expanded={open} onClick={handleClick}>
          <LuMoreVertical size={16} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          open={open}
          onClose={handleClose}>
          <MenuList sx={{ py: 0 }}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LuCopy />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <LuScissors />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <LuTrash />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};
