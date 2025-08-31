import { useState } from "react";
import { Grid } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import ChatUsers from "./ChatUsers";
import ChatArea from "./ChatArea";

//dummy data
import { ChatUser, users } from "@src/pages/apps/Chat/helper";

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState<ChatUser>(users[1]);

  const onUserChange = (user: ChatUser) => {
    setSelectedUser(user);
    handleChatAreaPanel();
  };

  const [chatAreaOpen, setChatAreaOpen] = useState<boolean>(false);
  const handleChatAreaPanel = () => {
    setChatAreaOpen(!chatAreaOpen);
  };

  return (
    <>
      <PageBreadcrumb title="Chat" subName="Apps" />

      <Grid container spacing={3}>
        <Grid item xl={3} lg={4} xs={12}>
          <ChatUsers onSelectChatUser={onUserChange} selectedChatUser={selectedUser} />
        </Grid>
        <Grid item xl={9} lg={8} xs={12}>
          <ChatArea selectedUser={selectedUser} chatToggler={handleChatAreaPanel} />
        </Grid>
      </Grid>
    </>
  );
};

export default ChatApp;
