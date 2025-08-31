import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import LeftPanel from "../LeftPanel";
import { useToggle, useViewPort } from "@src/hooks";
import { useInbox } from "../useInbox";
import TopMenuCollapse from "../TopMenuCollapse";
import { EmailDetails } from "../types";

// images
import img4 from "@src/assets/images/small/small-4.jpg";
import avatarImg from "@src/assets/images/avatars/avatar1.png";
import { Link } from "react-router-dom";
import { LuDownload, LuForward, LuReply } from "react-icons/lu";

const EmailRead = () => {
  const { width } = useViewPort();

  const {
    emails,
    totalEmails,
    startIndex,
    endIndex,
    page,
    totalPages,
    totalUnreadEmails,
    getPrevPage,
    getNextPage,
    showAllEmails,
    showStarredEmails,
  } = useInbox();

  const { isOpen, hide, toggleOpen } = useToggle();

  const attachments: EmailDetails = {
    avatar: avatarImg,
    subject: "Your elite author Graphic Optimization reward is ready!",
    from_name: "Steven Smith",
    from_email: "jonathan@domain.com",
    received_on: "Jul 24, 2019, 5:17 AM",
    attachments: [
      {
        id: 1,
        name: "Attex-admin-design.zip",
        size: "2.3 MB",
        ext: ".zip",
      },
      {
        id: 2,
        name: "Dashboard-design.jpg",
        size: "3.25 MB",
        ext: ".jpg",
        preview: img4,
      },
      {
        id: 3,
        name: "Admin-bug-report.mp4",
        size: "7.05 MB",
        ext: ".mp4",
      },
    ],
  };

  return (
    <>
      <PageBreadcrumb title="Email Read" subName="Apps" />

      <Grid container spacing={3}>
        <Grid item xl={2.5} lg={4} xs={12}>
          {width >= 1024 ? (
            <LeftPanel
              totalUnreadEmails={totalUnreadEmails}
              showAllEmails={showAllEmails}
              showStarredEmails={showStarredEmails}
            />
          ) : (
            <Drawer open={isOpen} onClose={hide}>
              <LeftPanel
                totalUnreadEmails={totalUnreadEmails}
                showAllEmails={showAllEmails}
                showStarredEmails={showStarredEmails}
              />
            </Drawer>
          )}
        </Grid>

        <Grid item xl={9.5} lg={8} xs={12}>
          <Card>
            <CardContent>
              <TopMenuCollapse toggleLeftPanel={toggleOpen} />

              <Box sx={{ px: "8px", mt: "16px" }}>
                <Typography variant="h4" color={"grey.700"}>
                  Your elite author Graphic Optimization reward is ready!
                </Typography>

                <Divider sx={{ my: "20px" }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: "24px" }}>
                  <Avatar
                    sx={{ width: 32, height: 32, marginInlineEnd: "12px" }}
                    variant="circular"
                    src={attachments.avatar}
                    alt={attachments.from_name}
                  />
                  <Stack sx={{ width: "100%" }}>
                    <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "space-between" }}>
                      {attachments.from_name}
                      <Typography variant="caption">{attachments.received_on}</Typography>
                    </Typography>
                    <Typography variant="caption">From: {attachments.from_email}</Typography>
                  </Stack>
                </Box>

                <Typography variant="body2" color="grey.700" mb={"16px"}>
                  Hi Coderthemes!
                </Typography>
                <Typography variant="body2" color="grey.700" mb={"16px"}>
                  Clicking ‘Order Service’ on the right-hand side of the above page will present you with an order page.
                  This service has the following Briefing Guidelines that will need to be filled before placing your
                  order:
                </Typography>
                <Box sx={{ paddingInlineStart: "40px", mb: "16px" }}>
                  <Typography variant="body2" color="grey.700">
                    
                    1. Your design preferences (Color, style, shapes, Fonts, others)
                  </Typography>
                  <Typography variant="body2" color="grey.700">
                    
                    2. Tell me, why is your item different?
                  </Typography>
                  <Typography variant="body2" color="grey.700">
                    
                    3. Do you want to bring up a specific feature of your item? If yes, please tell me
                  </Typography>
                  <Typography variant="body2" color="grey.700">
                    
                    4. Do you have any preference or specific thing you would Typographyke to change or improve on your
                    item page?
                  </Typography>
                  <Typography variant="body2" color="grey.700">
                    
                    5. Do you want to include your item's or your provider's logo on the page? if yes, please send it to
                    me in vector format (Ai or EPS)
                  </Typography>
                  <Typography variant="body2" color="grey.700">
                    
                    6. Please provide me with the copy or text to display
                  </Typography>
                </Box>
                <Typography variant="body2" color="grey.700" mb={"16px"}>
                  Filling in this form with the above information will ensure that they will be able to start work
                  quickly.
                </Typography>
                <Typography variant="body2" color="grey.700" mb={"16px"}>
                  You can complete your order by putting your coupon code into the Promotional code box and clicking
                  ‘Apply Coupon’.
                </Typography>
                <Typography variant="body2" color="grey.700" mb={"16px"}>
                  <b>Best,</b> <br /> Graphic Studio
                </Typography>

                <Divider sx={{ my: "20px" }} />

                <Typography variant="h5" color={"grey.700"} sx={{ mb: "12px" }}>
                  Attachments
                </Typography>

                <Box sx={{ display: "flex", gap: 3, mb: "24px" }}>
                  {attachments.attachments.map((item, idx) => {
                    return (
                      <Card
                        key={idx}
                        sx={{ width: "100%", borderWidth: "1px", borderColor: "grey.300", borderStyle: "solid" }}>
                        <CardContent sx={{ display: "flex", justifyContent: "space-between", pb: "16px !important" }}>
                          <Box sx={{ display: "flex" }}>
                            {item.preview ? (
                              <Avatar
                                src={item.preview}
                                variant="rounded"
                                alt="file-image"
                                sx={{ mr: 1, width: 40, height: 40 }}
                              />
                            ) : (
                              <Typography
                                sx={{
                                  bgcolor: "#d9dff6",
                                  color: "primary.main",
                                  height: 40,
                                  minWidth: 40,
                                  display: "inline-flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "4px",
                                  mr: 1,
                                }}>
                                {item.ext.toUpperCase()}
                              </Typography>
                            )}

                            <Stack>
                              <Typography variant="subtitle1" color={"grey.700"}>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color={"grey.700"}>
                                {item.size}
                              </Typography>
                            </Stack>
                          </Box>
                          <IconButton>
                            <LuDownload />
                          </IconButton>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Box>
                <Button startIcon={<LuReply />} sx={{ marginInlineEnd: "8px" }} color="secondary" variant="outlined">
                  Reply
                </Button>
                <Button endIcon={<LuForward />} color="secondary" variant="outlined">
                  Forward
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailRead;
