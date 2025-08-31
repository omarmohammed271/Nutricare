import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PageBreadcrumb } from "@src/components";

//images
import logoDark from "@src/assets/images/nutricare-logo.svg";
import barCode from "@src/assets/images/barcode.png";
import { LuPrinter } from "react-icons/lu";

const Invoice = () => {
  return (
    <>
      <PageBreadcrumb title="Invoice" subName="Extra Pages" />
      <Card>
        <CardContent sx={{ p: "24px" }}>
          <Box mb={"40px"}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <img src={logoDark} height={"24px"} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "18px", lineHeight: "28px", color: "grey.700" }}>Invoice</Typography>
              </Box>
            </Box>
          </Box>
          <Box mb={"56px"}>
            <Box sx={{ display: "grid", gridTemplateColumns: { sm: "repeat(2, minmax(0, 1fr))", gap: "24px" } }}>
              <Box sx={{ gridColumn: "span 1 / span 1" }}>
                <Typography component={"p"} fontWeight={500} mb={"16px"}>
                  Hello, Tosha Minner
                </Typography>
                <Typography component={"p"} sx={{ fontSize: "12px", lineHeight: "16px", color: "grey.700" }}>
                  
                  Please find below a cost-breakdown for the recent work completed. Please make payment at your earliest
                  convenience, and do not hesitate to contact me with any questions.
                </Typography>
              </Box>
              <Box sx={{ gridColumn: "span 1 / span 1" }}>
                <Box sx={{ "& > *": { mt: "8px" }, display: "flex", justifyContent: { sm: "end" } }}>
                  <Box sx={{ display: "grid", gap: "12px" }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", columnGap: "12px" }}>
                      <Typography
                        component={"h6"}
                        sx={{ gridColumn: "span 2 / span 2", fontWeight: 600, color: "grey.600" }}>
                        Order Date:
                      </Typography>
                      <Typography
                        component={"p"}
                        sx={{ gridColumn: "span 2 / span 2", textAlign: { sm: "end" }, color: "grey.500" }}>
                        Jan 17, 2023
                      </Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", columnGap: "12px" }}>
                      <Typography
                        component={"h6"}
                        sx={{ gridColumn: "span 2 / span 2", fontWeight: 600, color: "grey.600" }}>
                        Order Status:
                      </Typography>
                      <Typography
                        component={"p"}
                        sx={{ gridColumn: "span 2 / span 2", textAlign: { sm: "end" }, color: "grey.500" }}>
                        <Typography
                          component={"span"}
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            px: "4px",
                            borderRadius: "100%",
                            fontSize: "12px",
                            fontWeight: 500,
                            bgcolor: "success.main",
                            color: "white",
                          }}>
                          Paid
                        </Typography>
                      </Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", columnGap: "12px" }}>
                      <Typography
                        component={"h6"}
                        sx={{ gridColumn: "span 2 / span 2", fontWeight: 600, color: "grey.600" }}>
                        Order ID:
                      </Typography>
                      <Typography
                        component={"p"}
                        sx={{ gridColumn: "span 2 / span 2", textAlign: { sm: "end" }, color: "grey.500" }}>
                        #123456
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mb={"40px"}>
            <Box sx={{ display: "grid", gridTemplateColumns: { sm: "repeat(3, minmax(0, 1fr))" }, gap: "24px" }}>
              <Box sx={{ gridColumn: "span 1 / span 1" }}>
                <Typography
                  component={"h6"}
                  sx={{ mb: "12px", fontSize: "12px", lineHeight: "16px", color: "grey.700" }}>
                  Billing Address
                </Typography>
                <Typography component={"address"} color={"grey.600"} fontStyle={"normal"}>
                  
                  Lynne K. Higby <br /> 795 Folsom Ave, Suite 600 <br /> San Francisco, CA 94107 <br /> P: (123)
                  456-7890
                </Typography>
              </Box>
              <Box sx={{ gridColumn: "span 1 / span 1" }}>
                <Typography
                  component={"h6"}
                  sx={{ mb: "12px", fontSize: "12px", lineHeight: "16px", color: "grey.700" }}>
                  Shipping Address
                </Typography>
                <Typography component={"address"} color={"grey.600"} fontStyle={"normal"}>
                  
                  Tosha Minner <br /> 795 Folsom Ave, Suite 600 <br /> San Francisco, CA 94107 <br /> P: (123) 456-7890
                </Typography>
              </Box>
              <Box sx={{ gridColumn: "span 1 / span 1", marginLeft: "auto" }}>
                <img src={barCode} />
              </Box>
            </Box>
          </Box>
          <Box mb={"20px"}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ m: "-6px", overflowX: "hidden" }}>
                <Box sx={{ p: "6px", minWidth: "100%", display: "inline-block", verticalAlign: "middle" }}>
                  <Box sx={{ overflow: "hidden" }}>
                    <Table sx={{ minWidth: "100%" }}>
                      <TableHead
                        sx={{
                          fontWeight: 500,
                          borderBottom: "1px solid",
                          borderBottomColor: "divider",
                          borderTop: "1px solid",
                          borderTopColor: "divider",
                          backgroundColor: "grey.200",
                        }}>
                        <TableCell
                          sx={{
                            px: "24px",
                            py: "8px",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                            fontWeight: 600,
                            color: "grey.700",
                          }}>
                          #
                        </TableCell>
                        <TableCell
                          sx={{
                            px: "24px",
                            py: "8px",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                            fontWeight: 600,
                            color: "grey.700",
                          }}>
                          Item
                        </TableCell>
                        <TableCell
                          sx={{
                            px: "24px",
                            py: "8px",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                            fontWeight: 600,
                            color: "grey.700",
                          }}>
                          Quantity
                        </TableCell>
                        <TableCell
                          sx={{
                            px: "24px",
                            py: "8px",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                            fontWeight: 600,
                            color: "grey.700",
                          }}>
                          Unit Cost
                        </TableCell>
                        <TableCell
                          sx={{
                            px: "24px",
                            py: "8px",
                            whiteSpace: "nowrap",
                            textAlign: "end",
                            fontWeight: 600,
                            color: "grey.700",
                          }}>
                          Total
                        </TableCell>
                        <TableRow></TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ color: "grey.600", transitionDuration: "300ms" }}>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>1</TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>
                            <Typography mb={0} fontWeight={600} color={"grey.700"}>
                              Laptop
                            </Typography>
                            Brand Model VGN-TXN27N/B 11.1" Notebook PC
                          </TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>1</TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>$1799.00</TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap", textAlign: "right" }}>
                            $1799.00
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ color: "grey.600", transitionDuration: "300ms" }}>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>2</TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>
                            <Typography mb={0} fontWeight={600} color={"grey.700"}>
                              Warranty
                            </Typography>
                            Two Year Extended Warranty - Parts and Labor
                          </TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>3</TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>$499.00</TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap", textAlign: "right" }}>
                            $1497.00
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ color: "grey.600", transitionDuration: "300ms" }}>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>2</TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>
                            <Typography mb={0} fontWeight={600} color={"grey.700"}>
                              LED
                            </Typography>
                            80cm (32) HD Ready LED TV
                          </TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>2</TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap" }}>$412.00</TableCell>
                          <TableCell sx={{ px: "24px", py: "8px", whiteSpace: "nowrap", textAlign: "right" }}>
                            $824.00
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: 500, fontSize: "12px", mb: "8px", color: "grey.600" }}>Notes:</Typography>
              <Typography sx={{ fontSize: "10px", color: "grey.600" }}>
                
                All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card
                or direct payment online. If account is not paid within 7 days the credits details supplied as
                confirmation of work undertaken will be charged the agreed quoted fee noted above.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ "& > *": { mt: "8px" }, display: "flex", justifyContent: { sm: "end" } }}>
                <Box sx={{ display: "grid", gap: "12px" }}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", columnGap: "12px" }}>
                    <Typography
                      component={"h6"}
                      sx={{ gridColumn: "span 2 / span 2", fontWeight: 600, color: "grey.600" }}>
                      Sub-total:
                    </Typography>
                    <Typography
                      component={"p"}
                      sx={{ gridColumn: "span 2 / span 2", textAlign: { sm: "end" }, color: "grey.500" }}>
                      $4120.00
                    </Typography>
                  </Box>
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", columnGap: "12px" }}>
                    <Typography
                      component={"h6"}
                      sx={{ gridColumn: "span 2 / span 2", fontWeight: 600, color: "grey.600" }}>
                      VAT (12.5):
                    </Typography>
                    <Typography
                      component={"p"}
                      sx={{ gridColumn: "span 2 / span 2", textAlign: { sm: "end" }, color: "grey.600" }}>
                      $515.00
                    </Typography>
                  </Box>
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", columnGap: "12px" }}>
                    <Typography
                      component={"h6"}
                      sx={{ gridColumn: "span 5 / span 5", fontWeight: 600, color: "grey.600", fontSize: "20px" }}>
                      $4635.00 USD
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box mt={"40px"}>
            <Box sx={{ display: "flex", justifyContent: { sm: "end" }, gap: 2, alignItems: "center" }}>
              <Button variant="outlined" color="primary" onClick={() => window.print()}>
                <LuPrinter style={{ marginRight: "4px" }} /> Print
              </Button>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Invoice;
