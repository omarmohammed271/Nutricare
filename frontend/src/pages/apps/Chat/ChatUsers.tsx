import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LuArchive, LuCircle, LuLogOut, LuSearch, LuSettings, LuSlidersHorizontal, LuTrash } from "react-icons/lu";
import { useDropdownMenu } from "@src/hooks";

// images
import avatar1 from "@src/assets/images/avatars/avatar1.png";

// dummy data
import { ChatUser, users } from "@src/pages/apps/Chat/helper";

interface ChatUsersProps {
  onSelectChatUser: (value: ChatUser) => void;
  selectedChatUser: ChatUser;
}

const ChatUsers = ({ onSelectChatUser, selectedChatUser }: ChatUsersProps) => {
  const [user, setUser] = useState<ChatUser[]>([...users]);

  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  const search = (text: string) => {
    setUser(text ? [...users].filter((u) => u.name!.toLowerCase().indexOf(text.toLowerCase()) >= 0) : [...users]);
  };

  const activateUser = (user: ChatUser) => {
    if (onSelectChatUser) {
      onSelectChatUser(user);
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: "16px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "start", gap: "12px" }}>
            <Avatar src={avatar1} style={{ borderRadius: "9999px", height: "40px" }} alt="Brandon Smith" />
            <Box width={"100%"}>
              <Link to="/pages/profile" style={{ textDecoration: "none" }}>
                <Typography variant="body1" sx={{ color: "grey.700" }}>
                  Tosha Minner
                </Typography>
              </Link>

              <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Badge color="success" variant="dot" />
                Online
              </Typography>
            </Box>
          </Box>

          <IconButton aria-expanded={open} onClick={handleClick}>
            <LuSettings />
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
                  <LuArchive />
                </ListItemIcon>
                <ListItemText>Archive</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <LuSlidersHorizontal />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <LuTrash />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <LuLogOut />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <TextField
          id="input-with-icon-textfield"
          size="small"
          sx={{ mt: 2 }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => search(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuSearch size={20} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="People, groups & messages..."
        />

        <Typography sx={{ mt: 2 }} color={"text.secondary"} fontWeight={500}>
          Group Chats
        </Typography>
        <Box sx={{ mt: 1, ml: 0.5 }}>
          <Typography sx={{ display: "flex", alignItems: "center", marginBottom: "8px", gap: 1 }}>
            <LuCircle color="green" />
            App Development
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center", marginBottom: "8px", gap: 1 }}>
            <LuCircle color="blue" />
            Office Work
          </Typography>
        </Box>
      </CardContent>

      <CardContent sx={{ p: 2, pt: 0 }}>
        <Typography color={"text.secondary"} fontWeight={500}>
          Contacts
        </Typography>

        <SimpleBar style={{ height: "calc(100vh - 530px)", marginTop: "8px" }}>
          <div>
            {(user || []).map((user, idx) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    cursor: "pointer",
                    borderRadius: 1,
                  }}
                  bgcolor={selectedChatUser == user ? "grey.200" : "transparent"}
                  key={idx}
                  onClick={() => activateUser(user)}>
                  <Avatar variant="circular" src={user.avatar} sx={{ height: 40 }} alt={user.name} />
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color={"text.primary"} fontWeight={500}>
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color={"text.secondary"}>
                        {user.lastMessageOn}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography
                        variant="body2"
                        color={"text.secondary"}
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}>
                        {user.lastMessage}
                      </Typography>
                      <Box>
                        {user.totalUnread !== 0 && (
                          <Typography
                            variant="caption"
                            sx={{
                              height: "16px",
                              width: "16px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                            }}
                            bgcolor={"error.lighter"}
                            color={"error.darker"}>
                            {user.totalUnread}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </div>
        </SimpleBar>
      </CardContent>
    </Card>
  );
};

export default ChatUsers;
