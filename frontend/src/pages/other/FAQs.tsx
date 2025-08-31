import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import { LuMail, LuTwitter } from "react-icons/lu";

const FAQs = () => {
  return (
    <>
      <PageBreadcrumb title="FAQs" subName="Extra Pages" />
      <Card>
        <CardContent sx={{ padding: { sm: "96px", xs: "40px" } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: "64px" }}>
            <Box sx={{ maxWidth: "576px", textAlign: "center" }}>
              <Typography
                component={"h1"}
                sx={{ fontSize: "19px", lineHeight: "28px", fontWeight: 600, mb: "20px", color: "grey.600" }}>
                Frequently Asked Questions
              </Typography>
              <Typography component={"p"} sx={{ fontSize: "12px", color: "grey.600" }}>
                
                Do you have a question about your subscription, a recent order, products, shipping or you want to
                suggest a new magazine? Here you can find some helpful answers to frequently asked questions (FAQ).
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: "24px" }}>
                <Button
                  variant="contained"
                  size="medium"
                  color="success"
                  sx={{ fontSize: "12px" }}
                  startIcon={<LuMail size={16} />}>
                  Email us your question
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  color="info"
                  sx={{ fontSize: "12px" }}
                  startIcon={<LuTwitter size={16} />}>
                  Send us a tweet
                </Button>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid container item spacing={3} xs={12} lg={6}>
              <Grid item>
                <Box display={"flex"} gap={"16px"}>
                  <Box sx={{ color: "primary.main", fontWeight: "500" }}>
                    <Typography
                      component={"p"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "100%",
                        bgcolor: "#3e60d533",
                      }}>
                      Q.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component={"h4"} sx={{ fontWeight: 600, color: "grey.700" }} mb={"4px"}>
                      What does LOREM mean?
                    </Typography>
                    <Typography component={"p"} mb={"16px"} color={"grey.600"}>
                      Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not
                      meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to
                      give an impression of the finished document.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box display={"flex"} gap={"16px"}>
                  <Box sx={{ color: "primary.main", fontWeight: "500" }}>
                    <Typography
                      component={"p"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "100%",
                        bgcolor: "#3e60d533",
                      }}>
                      Q.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component={"h4"} sx={{ fontWeight: 600, color: "grey.700" }} mb={"4px"}>
                      Where can I subscribe to your newsletter?
                    </Typography>
                    <Typography component={"p"} mb={"16px"} color={"grey.600"}>
                      We often send out our newsletter with news and great offers. We will never disclose your data to
                      third parties and you can unsubscribe from the newsletter at any time. Subscribe here to our
                      newsletter.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box display={"flex"} gap={"16px"}>
                  <Box sx={{ color: "primary.main", fontWeight: "500" }}>
                    <Typography
                      component={"p"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "100%",
                        bgcolor: "#3e60d533",
                      }}>
                      Q.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component={"h4"} sx={{ fontWeight: 600, color: "grey.700" }} mb={"4px"}>
                      Where can I edit my billing and shipping address?
                    </Typography>
                    <Typography component={"p"} mb={"16px"} color={"grey.600"}>
                      If you created a new account after or while ordering you can edit both addresses (for billing and
                      shipping) in your customer account.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box display={"flex"} gap={"16px"}>
                  <Box sx={{ color: "primary.main", fontWeight: "500" }}>
                    <Typography
                      component={"p"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "100%",
                        bgcolor: "#3e60d533",
                      }}>
                      Q.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component={"h4"} sx={{ fontWeight: 600, color: "grey.700" }} mb={"4px"}>
                      Can I order a free sample copy of a magazine?
                    </Typography>
                    <Typography component={"p"} mb={"16px"} color={"grey.600"}>
                      Unfortunately, we’re unable to offer free samples. As a retailer, we buy all magazines from their
                      publishers at the regular trade price. However, you could contact the publisher directly.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container item spacing={3} xs={12} lg={6}>
              <Grid item>
                <Box display={"flex"} gap={"16px"}>
                  <Box sx={{ color: "primary.main", fontWeight: "500" }}>
                    <Typography
                      component={"p"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "100%",
                        bgcolor: "#3e60d533",
                      }}>
                      Q.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component={"h4"} sx={{ fontWeight: 600, color: "grey.700" }} mb={"4px"}>
                      Are unsold magazines sent back to the publisher?
                    </Typography>
                    <Typography component={"p"} mb={"16px"} color={"grey.600"}>
                      We usually sell all copies of the magazines offered in our shop. Some publishers and distributors
                      offer the retailer the option of returning any unsold magazines. However, because our range
                      includes magazines from countries such as Australia, the USA and the United Kingdom.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box display={"flex"} gap={"16px"}>
                  <Box sx={{ color: "primary.main", fontWeight: "500" }}>
                    <Typography
                      component={"p"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "100%",
                        bgcolor: "#3e60d533",
                      }}>
                      Q.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component={"h4"} sx={{ fontWeight: 600, color: "grey.700" }} mb={"4px"}>
                      When can be used?
                    </Typography>
                    <Typography component={"p"} mb={"16px"} color={"grey.600"}>
                      We receive up to 20 enquiries per week from publishers all around the world. Because we can’t
                      always respond to each one right away, all enquiries are checked and answered in chronological
                      order.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box display={"flex"} gap={"16px"}>
                  <Box sx={{ color: "primary.main", fontWeight: "500" }}>
                    <Typography
                      component={"p"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "100%",
                        bgcolor: "#3e60d533",
                      }}>
                      Q.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component={"h4"} sx={{ fontWeight: 600, color: "grey.700" }} mb={"4px"}>
                      License & Copyright
                    </Typography>
                    <Typography component={"p"} mb={"16px"} color={"grey.600"}>
                      Wow, we’re happy to see more of your great publication. Please find our address on the contact
                      page.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box display={"flex"} gap={"16px"}>
                  <Box sx={{ color: "primary.main", fontWeight: "500" }}>
                    <Typography
                      component={"p"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "100%",
                        bgcolor: "#3e60d533",
                      }}>
                      Q.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component={"h4"} sx={{ fontWeight: 600, color: "grey.700" }} mb={"4px"}>
                      Do I have to pay customs or import fees?
                    </Typography>
                    <Typography component={"p"} mb={"16px"} color={"grey.600"}>
                      In some countries import fees/taxes may apply to your order. They will be charged from your the
                      carrier or local post service. Please note: We are not responsible for any customs and duties
                      charged to a customer.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default FAQs;
