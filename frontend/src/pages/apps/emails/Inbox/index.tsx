import { PageBreadcrumb } from "@src/components";
import LeftPanel from "../LeftPanel";
import { useInbox } from "../useInbox";
import { Box, Button, ButtonGroup, Card, CardContent, Drawer, Grid, Stack, Typography } from "@mui/material";
import TopMenuCollapse from "../TopMenuCollapse";
import EmailsList from "./EmailsList";
import { useToggle, useViewPort } from "@src/hooks";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const EmailInbox = () => {
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

  const { width } = useViewPort();

  const { isOpen, hide, toggleOpen } = useToggle();

  return (
    <>
      <PageBreadcrumb title="Email Inbox" subName="Apps" />

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
                showInDrawer={isOpen}
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

              <EmailsList emails={emails} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "24px", px: "16px" }}>
                <Typography variant="body1">
                  Showing {startIndex} - {endIndex} of {totalEmails}
                </Typography>
                <ButtonGroup sx={{ height: 30 }}>
                  <Button variant="contained" disabled={page == 1} onClick={getPrevPage}>
                    <LuChevronLeft />
                  </Button>
                  <Button variant="contained" disabled={!(page < totalPages)} onClick={getNextPage}>
                    <LuChevronRight />
                  </Button>
                </ButtonGroup>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailInbox;
