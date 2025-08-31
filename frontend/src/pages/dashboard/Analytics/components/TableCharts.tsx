import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { records } from "./data";
import { LuDownload } from "react-icons/lu";

const TableCharts = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          className="tableParent"
          lg={4}
          xs={12}
          md={6}
          sx={{ ".MuiCardContent-root": { paddingBottom: "0px" } }}>
          <Card>
            <Box
              display={"flex"}
              paddingX={"24px"}
              paddingY={"12px"}
              borderBottom={"1px solid"}
              borderColor={"divider"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Typography component={"h4"} fontWeight={500} color={"grey.700"}>
                Channels
              </Typography>
              <Button
                variant="contained"
                sx={{ paddingY: "6px" }}
                size="small"
                color="primary"
                endIcon={<LuDownload />}>
                Export
              </Button>
            </Box>
            <CardContent sx={{ padding: "0px" }}>
              <Box overflow={"auto"}>
                <Table sx={{ width: "100%", paddingBottom: "0px" }}>
                  <TableHead sx={{ backgroundColor: "grey.100" }}>
                    <TableRow>
                      <TableCell sx={{ padding: 1, textAlign: "start" }}>Channel</TableCell>
                      <TableCell sx={{ padding: 1, textAlign: "start" }}>Visits</TableCell>
                      <TableCell sx={{ padding: 1, textAlign: "start" }} width={"40%"}>
                        Progress
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(records || []).map((record, idx) => {
                      return (
                        <TableRow key={idx}>
                          <TableCell sx={{ padding: 1 }}>{record.channel}</TableCell>
                          <TableCell sx={{ padding: 1 }}> {record.visits}</TableCell>
                          <TableCell sx={{ padding: 1 }}>
                            
                            <LinearProgress variant="determinate" color={record.color} value={record.now} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          className="tableParent"
          lg={4}
          xs={12}
          md={6}
          sx={{ ".MuiCardContent-root": { paddingBottom: "0px" } }}>
          <Card>
            <Box
              display={"flex"}
              paddingX={"24px"}
              paddingY={"12px"}
              borderBottom={"1px solid"}
              borderColor={"divider"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Typography component={"h4"} fontWeight={500} color={"grey.700"}>
                Social Media Traffic
              </Typography>
              <Button
                variant="contained"
                sx={{ paddingY: "6px" }}
                size="small"
                color="primary"
                endIcon={<LuDownload />}>
                Export
              </Button>
            </Box>
            <CardContent sx={{ padding: "0px" }}>
              <Box overflow={"auto"}>
                <Table sx={{ width: "100%", paddingBottom: "0px" }}>
                  <TableHead sx={{ backgroundColor: "grey.100" }}>
                    <TableRow>
                      <TableCell sx={{ padding: 1, textAlign: "start" }}>Network</TableCell>
                      <TableCell sx={{ padding: 1, textAlign: "start" }}>Visits</TableCell>
                      <TableCell sx={{ padding: 1, textAlign: "start" }} width={"40%"}>
                        Progress
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(records || []).map((record, idx) => {
                      return (
                        <TableRow key={idx}>
                          <TableCell sx={{ padding: 1 }}>{record.network}</TableCell>
                          <TableCell sx={{ padding: 1 }}> {record.visits}</TableCell>
                          <TableCell sx={{ padding: 1 }}>
                            
                            <LinearProgress variant="determinate" color="primary" value={record.now} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          className="tableParent"
          lg={4}
          xs={12}
          md={6}
          sx={{ ".MuiCardContent-root": { paddingBottom: "0px" } }}>
          <Card>
            <Box
              display={"flex"}
              paddingX={"24px"}
              paddingY={"12px"}
              borderBottom={"1px solid"}
              borderColor={"divider"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Typography component={"h4"} fontWeight={500} color={"grey.700"}>
                Engagement Overview
              </Typography>
              <Button variant="contained" sx={{ py: "6px" }} size="small" color="primary" endIcon={<LuDownload />}>
                Export
              </Button>
            </Box>
            <CardContent sx={{ padding: "0px" }}>
              <Box overflow={"auto"} padding={"0px"}>
                <Table sx={{ width: "100%", paddingBottom: "0px" }}>
                  <TableHead sx={{ backgroundColor: "grey.100" }}>
                    <TableRow>
                      <TableCell sx={{ padding: 1, textAlign: "start" }} width={"33.33%"}>
                        Duration (Secs)
                      </TableCell>
                      <TableCell sx={{ padding: 1, textAlign: "start" }} width={"33.33%"}>
                        Sessions
                      </TableCell>
                      <TableCell sx={{ padding: 1, textAlign: "start" }} width={"33.33%"}>
                        Views
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(records || []).map((record, idx) => {
                      return (
                        <TableRow key={idx}>
                          <TableCell sx={{ padding: 1 }}>{record.duration}</TableCell>
                          <TableCell sx={{ padding: 1 }}> {record.session}</TableCell>
                          <TableCell sx={{ padding: 1 }}> {record.views}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TableCharts;
