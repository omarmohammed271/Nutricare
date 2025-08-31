import { Badge, Box, Button, Card, LinearProgress, Typography } from "@mui/material";
import { LuBookmark, LuClock3, LuFileText, LuInbox, LuMailX, LuSend, LuStar, LuTrash2 } from "react-icons/lu";
import SimpleBar from "simplebar-react";
import ComposeMail from "./ComposeMail";
import { useToggle } from "@src/hooks";

type LeftPanelProps = {
  totalUnreadEmails: number;
  showAllEmails?: () => void;
  showStarredEmails?: () => void;
  showInDrawer?: boolean;
};

const LeftPanel = ({ totalUnreadEmails, showAllEmails, showStarredEmails, showInDrawer }: LeftPanelProps) => {
  const { hide, isOpen, show } = useToggle();

  return (
    <Card sx={{ minWidth: showInDrawer ? "320px" : "unset", height: "100%", minHeight: "100%" }}>
      <SimpleBar style={{ height: "100%", padding: 24 }}>
        <Button onClick={show} type="button" color="primary" variant="contained" fullWidth>
          Compose
        </Button>

        <Box sx={{ cursor: "pointer", mt: "24px" }}>
          <Typography
            onClick={showAllEmails}
            sx={{ my: "12px", px: "6px", display: "flex", alignItems: "center", color: "error.light" }}>
            <LuInbox style={{ marginInlineEnd: 8 }} /> Inbox
            <Typography
              variant="caption"
              sx={{
                py: "2px",
                px: "6px",
                borderRadius: "4px",
                bgcolor: "#f157761a",
                color: "#f15776",
                marginInlineStart: "auto",
              }}>
              {totalUnreadEmails}
            </Typography>
          </Typography>
          <Typography onClick={showStarredEmails} sx={{ my: "12px", px: "6px", display: "flex", alignItems: "center" }}>
            <LuStar style={{ marginInlineEnd: 8, color: "#fec25a" }} /> Starred
          </Typography>
          <Typography sx={{ my: "12px", px: "6px", display: "flex", alignItems: "center", color: "grey.700" }}>
            <LuClock3 style={{ marginInlineEnd: 8 }} /> Snoozed
          </Typography>
          <Typography sx={{ my: "12px", px: "6px", display: "flex", alignItems: "center", color: "grey.700" }}>
            <LuFileText style={{ marginInlineEnd: 8 }} /> Draft
          </Typography>
          <Typography sx={{ my: "12px", px: "6px", display: "flex", alignItems: "center", color: "grey.700" }}>
            <LuSend style={{ marginInlineEnd: 8 }} /> Sent Mail
          </Typography>
          <Typography sx={{ my: "12px", px: "6px", display: "flex", alignItems: "center", color: "grey.700" }}>
            <LuTrash2 style={{ marginInlineEnd: 8 }} /> Trash
          </Typography>
          <Typography sx={{ my: "12px", px: "6px", display: "flex", alignItems: "center", color: "grey.700" }}>
            <LuBookmark style={{ marginInlineEnd: 8 }} /> Important
          </Typography>
          <Typography sx={{ my: "12px", px: "6px", display: "flex", alignItems: "center", color: "grey.700" }}>
            <LuMailX style={{ marginInlineEnd: 8 }} /> Spam
          </Typography>
        </Box>

        <Box sx={{ mt: "36px" }}>
          <Typography variant="h6">LABELS</Typography>
          <Box sx={{ mt: "16px" }}>
            <Typography sx={{ display: "flex", gap: 2, alignItems: "center", my: 1 }}>
              <Badge color="info" variant="dot" /> Updated
            </Typography>
            <Typography sx={{ display: "flex", gap: 2, alignItems: "center", my: 1 }}>
              <Badge color="warning" variant="dot" /> Friends
            </Typography>
            <Typography sx={{ display: "flex", gap: 2, alignItems: "center", my: 1 }}>
              <Badge color="success" variant="dot" /> Family
            </Typography>
            <Typography sx={{ display: "flex", gap: 2, alignItems: "center", my: 1 }}>
              <Badge color="primary" variant="dot" /> Social
            </Typography>
            <Typography sx={{ display: "flex", gap: 2, alignItems: "center", my: 1 }}>
              <Badge color="error" variant="dot" /> Important
            </Typography>
            <Typography sx={{ display: "flex", gap: 2, alignItems: "center", my: 1 }}>
              <Badge color="secondary" variant="dot" /> Promotions
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography variant="button" sx={{ bgcolor: "grey.200", py: "3px", px: "12px", borderRadius: "20px" }}>
            FREE
          </Typography>
          <Typography variant="body1" sx={{ mt: 1.5 }}>
            Storage
          </Typography>
          <LinearProgress color="success" variant="determinate" value={46} sx={{ mt: 2 }} />
          <Typography variant="body2" component={"p"} sx={{ mt: 2 }}>
            7.02 GB (46%) of 15 GB used
          </Typography>
        </Box>
      </SimpleBar>

      <ComposeMail isComposeOpen={isOpen} hideComposeMail={hide} />
    </Card>
  );
};

export default LeftPanel;
