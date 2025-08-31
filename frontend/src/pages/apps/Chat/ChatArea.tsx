import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SimpleBar from "simplebar-react";
import SimpleBarCore from "simplebar-core";
import { Avatar, Badge, Box, Card, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import { LuChevronLeft, LuPaperclip, LuSendHorizonal } from "react-icons/lu";
import { FormInput } from "@src/components";
import { chatHeaderOptions, ChatMessage, ChatUser, messages } from "@src/pages/apps/Chat/helper";
import { UserMessage } from "./components/UserMessage";

import avatar1 from "@src/assets/images/avatars/avatar1.png";

interface ChatAreaProps {
  selectedUser: ChatUser;
  chatToggler: () => void;
}

const ChatArea = ({ selectedUser, chatToggler }: ChatAreaProps) => {
  const [userMessages, setUserMessages] = useState<ChatMessage[]>([]);
  const simplebarRef = useRef<SimpleBarCore>();

  const [toUser] = useState<ChatUser>({
    id: 9,
    name: "Tosha Minner",
    avatar: avatar1,
    email: "support@coderthemes.com",
    phone: "+1 456 9595 9594",
    location: "California, USA",
    languages: "English, German, Spanish",
    groups: "Work, Friends",
  });

  /*
   *  Fetches the messages for selected user
   */
  const getMessagesForUser = useCallback(() => {
    if (selectedUser) {
      setUserMessages(
        [...messages].filter(
          (m) =>
            (m.to.id === toUser.id && m.from.id === selectedUser.id) ||
            (toUser.id === m.from.id && m.to.id === selectedUser.id),
        ),
      );
    }
  }, [selectedUser, toUser]);

  useEffect(() => {
    getMessagesForUser();
  }, [getMessagesForUser]);

  const messageFormSchema = yup.object({
    newMessage: yup.string().required("Please enter a message"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(messageFormSchema),
  });

  /**
   * sends the chat message
   */
  const sendChatMessage = (values: { newMessage: string }) => {
    const newUserMessages = [...userMessages];
    newUserMessages.push({
      id: userMessages.length + 1,
      from: toUser,
      to: selectedUser,
      message: { type: "text", value: values.newMessage },
      sendOn: new Date().getHours() + ":" + new Date().getMinutes(),
    });
    setTimeout(() => {
      const otherNewMessages = [...newUserMessages];
      otherNewMessages.push({
        id: userMessages.length + 1,
        from: selectedUser,
        to: toUser,
        message: { type: "text", value: values.newMessage },
        sendOn: new Date().getHours() + ":" + new Date().getMinutes(),
      });
      setUserMessages(otherNewMessages);
    }, 1000);
    setUserMessages(newUserMessages);
    reset({ newMessage: "" });
  };

  const scrollToBottom = () => {
    if (simplebarRef?.current?.contentEl && simplebarRef?.current?.contentWrapperEl) {
      const contentHeight = simplebarRef.current.contentEl.clientHeight;
      simplebarRef.current.contentWrapperEl.scrollTo({
        top: contentHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [simplebarRef.current, userMessages]);

  return (
    <Card>
      <CardContent sx={{ py: "12px", px: "24px", borderBottomWidth: "1px" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", py: "6px" }}>
          <Box sx={{ width: { sm: "60%" } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconButton sx={{ display: { lg: "none", xs: "block" } }} onClick={chatToggler}>
                <LuChevronLeft></LuChevronLeft>
              </IconButton>

              <Avatar
                sx={{ height: "36px", width: "36px", marginRight: 1 }}
                variant="circular"
                src={selectedUser.avatar}
                alt={selectedUser.name}
              />
              <div>
                <Typography variant="body1" color={"text.primary"} fontWeight={500}>
                  {selectedUser.name}
                </Typography>
                <Typography
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  variant={"caption"}
                  color={"text.disabled"}>
                  <Badge color="error" variant="dot" />
                  Offline
                </Typography>
              </div>
            </Box>
          </Box>

          <div>
            {(chatHeaderOptions || []).map((item, idx) => {
              const Icon = item.icon;
              return (
                <Tooltip key={idx} title={item.title}>
                  <IconButton>
                    <Icon size={18} />
                  </IconButton>
                </Tooltip>
              );
            })}
          </div>
        </Box>
      </CardContent>

      <Box
        sx={{
          "& > [data-simplebar]": {
            height: { lg: "calc(100vh - 420px);", xs: "100%" },
          },
        }}>
        <SimpleBar style={{ padding: 24 }} ref={simplebarRef as MutableRefObject<SimpleBarCore>}>
          <Box
            sx={{
              "& > *:not(:nth-last-of-type(1))": {
                mt: 2,
              },
            }}>
            {userMessages.map((message, idx) => (
              <UserMessage key={idx} message={message} toUser={toUser} />
            ))}
          </Box>
        </SimpleBar>
      </Box>

      <Box
        sx={{
          display: "flex",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          position: { lg: "static", xs: "sticky" },
        }}>
        <Box sx={{ bgcolor: "grey.100", py: 1, px: 2, width: "100%" }}>
          <form onSubmit={handleSubmit(sendChatMessage)}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <FormInput
                type="text"
                name="newMessage"
                placeholder="Send message quickly"
                control={control}
                containerSx={{ marginBottom: "8px", width: "100%" }}
                autoFocus
              />
              <IconButton>
                <LuPaperclip />
              </IconButton>
              <IconButton type="submit" color="primary">
                <LuSendHorizonal />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Card>
  );
};

export default ChatArea;
