import { Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ReactApexChart from "react-apexcharts";

// components
import { PageBreadcrumb } from "@src/components";

// data
import {
  chart1Opts,
  chart2Opts,
  chart3Opts,
  chart4Opts,
  chart5Opts,
  chart6Opts,
  chart7Opts,
  chart8Opts,
  spark1Opts,
  spark2Opts,
  spark3Opts,
} from "./data";

const SparklinesApex = () => {
  return (
    <>
      <PageBreadcrumb title="Sparklines Charts" subName="Apex" />

      <Card>
        <CardContent sx={{ p: "24px" }}>
          <Grid container spacing={4}>
            <Grid item xl={4} xs={12}>
              <Box width={"100%"}>
                <ReactApexChart
                  className="apex-charts"
                  options={spark1Opts}
                  height={160}
                  series={spark1Opts.series}
                  type="area"
                />
              </Box>
            </Grid>
            <Grid item xl={4} xs={12}>
              <Box width={"100%"}>
                <ReactApexChart
                  className="apex-charts"
                  options={spark2Opts}
                  height={160}
                  series={spark2Opts.series}
                  type="area"
                />
              </Box>
            </Grid>
            <Grid item xl={4} xs={12}>
              <Box width={"100%"}>
                <ReactApexChart
                  className="apex-charts"
                  options={spark3Opts}
                  height={160}
                  series={spark3Opts.series}
                  type="area"
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", flexDirection: "column", mt: "20px" }}>
            <Box sx={{ m: "-6px", overflowX: { xl: "hidden", xs: "auto" } }}>
              <Box sx={{ p: "6px", minWidth: "100%", display: "inline-block", verticalAlign: "middle" }}>
                <Box overflow={"hidden"}>
                  <Table sx={{ minWidth: "100%" }}>
                    <TableHead sx={{ bgcolor: "grey.200" }}>
                      <TableRow>
                        <TableCell
                          sx={{ px: "24px", py: "12px", textAlign: "start", fontWeight: 600, color: "grey.700" }}>
                          Total Value
                        </TableCell>
                        <TableCell
                          sx={{ px: "24px", py: "12px", textAlign: "start", fontWeight: 600, color: "grey.700" }}>
                          Percentage of Portfolio
                        </TableCell>
                        <TableCell
                          sx={{ px: "24px", py: "12px", textAlign: "start", fontWeight: 600, color: "grey.700" }}>
                          Last 10 days
                        </TableCell>
                        <TableCell
                          sx={{ px: "24px", py: "12px", textAlign: "start", fontWeight: 600, color: "grey.700" }}>
                          Volume
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          $32,554
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          15%
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          <ReactApexChart
                            options={chart1Opts}
                            series={chart1Opts.series}
                            type="line"
                            width={140}
                            height={60}
                          />
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          <ReactApexChart
                            options={chart5Opts}
                            series={chart5Opts.series}
                            type="bar"
                            width={100}
                            height={60}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          $23,533
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          7%
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          <ReactApexChart
                            options={chart2Opts}
                            series={chart2Opts.series}
                            type="line"
                            width={140}
                            height={60}
                          />
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          <ReactApexChart
                            options={chart6Opts}
                            series={chart6Opts.series}
                            type="bar"
                            width={100}
                            height={60}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          $54,276
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          9%
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          <ReactApexChart
                            options={chart3Opts}
                            series={chart3Opts.series}
                            type="line"
                            width={140}
                            height={60}
                          />
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          <ReactApexChart
                            options={chart7Opts}
                            series={chart7Opts.series}
                            type="bar"
                            width={100}
                            height={60}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          $11,533
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          2%
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          <ReactApexChart
                            options={chart4Opts}
                            series={chart4Opts.series}
                            type="line"
                            width={140}
                            height={60}
                          />
                        </TableCell>
                        <TableCell sx={{ px: "24px", py: "16px", whiteSpace: "nowrap", borderColor: "grey.200" }}>
                          <ReactApexChart
                            options={chart8Opts}
                            series={chart8Opts.series}
                            type="bar"
                            width={100}
                            height={60}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SparklinesApex;
