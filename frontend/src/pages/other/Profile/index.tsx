import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Popover,
  PopoverReference,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,

  
} from "@mui/material";
import {
  LuBook,
  LuBriefcase,
  LuBuilding,
  LuCamera,
  LuCircleDot,
  LuGithub,
  LuGlobe,
  LuHeart,
  LuLoader,
  LuMapPin,
  LuMonitor,
  LuMoreVertical,
  LuReply,
  LuSave,
  LuShare2,
  LuSticker,
  LuTwitter,
} from "react-icons/lu";
import { ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react";
import { PageBreadcrumb } from "@src/components";
import { FiAtSign, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { TbBrandGoogle } from "react-icons/tb";
import Chart, { type ChartItem } from "chart.js/auto";


//image
import avatar1 from "@src/assets/images/users/avatar-1.jpg";
import avatar2 from "@src/assets/images/users/avatar-2.jpg";
import avatar3 from "@src/assets/images/users/avatar-3.jpg";
import avatar4 from "@src/assets/images/users/avatar-4.jpg";
import avatar6 from "@src/assets/images/users/avatar-6.jpg";

import { experienceData, messages, productConfig, projectTableData } from "./data";
import { grey } from "@mui/material/colors";

type StateType = {
  open: boolean;
  positionTop: number;
  positionLeft: number;
  anchorReference: PopoverReference;
};
type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};
const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
const Profile = () => {
  useEffect(() => {
    const productTag = document.getElementById("high-performing-product") as ChartItem;
    const chart = new Chart(productTag, productConfig);

    return () => {
      chart.destroy();
    };
  }, []);

  const anchorRef = useRef(null);

  const [state, setState] = useState<StateType>({
    open: false,
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: "anchorEl",
  });
  const { open, anchorReference } = state;
  const handleClickButton = () => {
    setState({
      ...state,
      open: true,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <>
      <PageBreadcrumb title="Profile" subName="Extra Pages" />
      <Grid container spacing={3}>
        <Grid item container spacing={3} xs={12} xl={4} lg={5}>
          <Grid item xs={12}>
            <Card sx={{ textAlign: "center" }}>
              <CardContent sx={{ padding: "24px" }}>
                <Avatar variant="circular" src={avatar1} sx={{ width: "86px", height: "86px", marginX: "auto" }} />
                <Typography
                  component={"h4"}
                  marginBottom={"4px"}
                  marginTop={"12px"}
                  fontSize={"18px"}
                  lineHeight={"28px"}>
                  Tosha Minner
                </Typography>
                <Typography component={"p"} color={"grey.600"}>
                  Founder
                </Typography>
                <Box display={"flex"} paddingTop={"10px"} flexWrap={"wrap"} justifyContent={"center"} gap={1}>
                  <Button size="small" variant="contained" color="success">
                    Follow
                  </Button>
                  <Button size="small" variant="contained" color="primary">
                    Message
                  </Button>
                </Box>
                <Box textAlign={"start"} marginTop={"24px"}>
                  <Typography
                    component={"h4"}
                    fontSize={"14px"}
                    marginBottom={"10px"}
                    color={"grey.700"}
                    fontWeight={500}
                    textTransform={"uppercase"}
                    lineHeight={"20px"}>
                    About Me :
                  </Typography>
                  <Typography component={"p"} marginBottom={"24px"} color={"grey.500"}>
                    Hi I'm Tosha Minner,has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type.
                  </Typography>
                  <Typography
                    display={"flex"}
                    fontWeight={600}
                    color={"grey.600"}
                    component={"p"}
                    marginBottom={"12px"}>
                    Full Name :
                    <Typography marginLeft={"8px"} variant="body1">
                      Tosha K. Minner
                    </Typography>
                  </Typography>
                  <Typography
                    display={"flex"}
                    fontWeight={600}
                    color={"grey.600"}
                    component={"p"}
                    marginBottom={"12px"}>
                    Mobile :
                    <Typography marginLeft={"8px"} variant="body1">
                      (123) 123 1234
                    </Typography>
                  </Typography>
                  <Typography
                    display={"flex"}
                    fontWeight={600}
                    color={"grey.600"}
                    component={"p"}
                    marginBottom={"12px"}>
                    Email :
                    <Typography marginLeft={"8px"} variant="body1">
                      user@email.domain
                    </Typography>
                  </Typography>
                  <Typography
                    display={"flex"}
                    fontWeight={600}
                    color={"grey.600"}
                    component={"p"}
                    marginBottom={"12px"}>
                    Location :
                    <Typography marginLeft={"8px"} variant="body1">
                      USA
                    </Typography>
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "24px" }}>
                  <Box sx={{ marginRight: "8px", display: "inline-block" }}>
                    <IconButton
                      sx={{
                        height: "32px",
                        width: "32px",
                        lineHeight: "28px",
                        border: "2px solid #3e61d5",
                        borderRadius: "100%",
                      }}>
                      <FiFacebook size={24} />
                    </IconButton>
                  </Box>
                  <Box sx={{ marginRight: "8px", display: "inline-block" }}>
                    <IconButton
                      sx={{
                        height: "32px",
                        width: "32px",
                        lineHeight: "28px",
                        border: "2px solid #f15776",
                        borderRadius: "100%",
                      }}>
                      <TbBrandGoogle size={24} />
                    </IconButton>
                  </Box>
                  <Box sx={{ marginRight: "8px", display: "inline-block" }}>
                    <IconButton
                      sx={{
                        height: "32px",
                        width: "32px",
                        lineHeight: "28px",
                        border: "2px solid #16a6e9",
                        borderRadius: "100%",
                      }}>
                      <LuTwitter size={24} />
                    </IconButton>
                  </Box>
                  <Box sx={{ marginRight: "8px", display: "inline-block" }}>
                    <IconButton
                      sx={{
                        height: "32px",
                        width: "32px",
                        lineHeight: "28px",
                        border: "2px solid #6c757d",
                        borderRadius: "100%",
                      }}>
                      <LuGithub size={24} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ marginTop: "24px" }}>
              <CardContent sx={{ padding: "24px" }}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"12px"}>
                  <Typography
                    component={"h4"}
                    fontSize={"16px"}
                    lineHeight={"24px"}
                    marginBottom={"8px"}
                    color={"grey.700"}>
                    Messages
                  </Typography>
                  <IconButton ref={anchorRef} onClick={handleClickButton}>
                    <LuMoreVertical size={16} />
                  </IconButton>
                  <Popover
                    open={open}
                    anchorEl={anchorRef.current}
                    anchorReference={anchorReference}
                    anchorPosition={{
                      top: 200,
                      left: 400,
                    }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    onClose={handleClose}>
                    <Typography paddingX={"20px"} paddingY={"10px"}>
                      Settings
                    </Typography>
                    <Typography paddingX={"20px"} paddingBottom={"10px"}>
                      Action
                    </Typography>
                  </Popover>
                </Box>
                {(messages || []).map((item) => (
                  <Box key={item.id} overflow={"hidden"} paddingTop={"10px"} position={"relative"}>
                    <Box
                      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
                      overflow={"hidden"}
                      paddingY={"10px"}
                      position={"relative"}>
                      <Box sx={{ width: "100%", display: "flex" }}>
                        <Avatar variant="circular" src={item.img} sx={{ marginRight: "14px" }} />
                        <Box>
                          <Typography color={"grey.700"} marginBottom={"2px"}>
                            {item.sender}
                          </Typography>
                          <Typography color={"grey.400"}>{item.message}</Typography>
                        </Box>
                        <Box sx={{ position: "absolute", top: "12px", right: "4px" }}>
                          <Button variant="text" color="info">
                            Reply
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid item container spacing={3} xs={12} xl={8} lg={7}>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ padding: "24px" }}>
                <Typography fontSize={"16px"} lineHeight={"24px"} color={"grey.700"} marginBottom={"24px"}>
                  Orders &amp; Revenue
                </Typography>
                <Box sx={{ height: "260px" }}>
                  <canvas id="high-performing-product"></canvas>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example">
                    <Tab label="About" />
                    <Tab label="Timeline" />
                    <Tab label="Settings" />
                  </Tabs>
                </AppBar>
                <Box sx={{ mt: 2 }}>
                  {value === 0 && (
                    <CustomTabPanel value={value} index={0}>
                      <Typography
                        component={"h5"}
                        sx={{
                          paddingTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "16px",
                          lineHeight: "24px",
                          textTransform: "uppercase",
                          marginBottom: "24px",
                        }}>
                        <LuBriefcase style={{ marginRight: "10px" }} /> Projects
                      </Typography>
                      <Box sx={{ overflowX: "auto" }}>
                        <Box sx={{ verticalAlign: "middle", display: "inline-block", minWidth: "100%" }}>
                          <Box sx={{ overflow: "hidden" }}>
                            <Table sx={{ minWidth: "100%", fontSize: "14px" }}>
                              <TableHead
                                sx={{
                                  fontWeight: 500,
                                  borderBottom: "1px solid",
                                  borderTop: "1px solid",
                                  borderTopColor: "divider",
                                  borderBottomColor: "divider",
                                  backgroundColor: "grey.200",
                                }}>
                                <TableRow>
                                  <TableCell sx={{ padding: 1, fontSize: "16px", textAlign: "left", border: "0px" }}>
                                    #
                                  </TableCell>
                                  <TableCell sx={{ padding: 1, fontSize: "16px", textAlign: "left", border: "0px" }}>
                                    Clients
                                  </TableCell>
                                  <TableCell sx={{ padding: 1, fontSize: "16px", textAlign: "left", border: "0px" }}>
                                    Project Name
                                  </TableCell>
                                  <TableCell sx={{ padding: 1, fontSize: "16px", textAlign: "left", border: "0px" }}>
                                    Start Date
                                  </TableCell>
                                  <TableCell sx={{ padding: 1, fontSize: "16px", textAlign: "left", border: "0px" }}>
                                    Due Date
                                  </TableCell>
                                  <TableCell sx={{ padding: 1, fontSize: "16px", textAlign: "left", border: "0px" }}>
                                    Status
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {projectTableData.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell sx={{ padding: "8px" }}>{item.id}</TableCell>
                                    <TableCell sx={{ padding: "8px", whiteSpace: "nowrap", display: "flex" }}>
                                      <Avatar variant="circular" src={item.img} sx={{ height: "24px", width: "24px" }} />
                                      <Typography sx={{ marginLeft: "8px", fontWeight: 500 }} variant="body1">
                                        {item.name}
                                      </Typography>
                                    </TableCell>
                                    <TableCell sx={{ padding: "8px", whiteSpace: "nowrap" }}>{item.project}</TableCell>
                                    <TableCell sx={{ padding: "8px", whiteSpace: "nowrap" }}>{item.start_date}</TableCell>
                                    <TableCell sx={{ padding: "8px", whiteSpace: "nowrap" }}>{item.end_date}</TableCell>
                                    <TableCell sx={{ padding: "8px", whiteSpace: "nowrap", color: item.status }}>
                                      {item.status_message}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Box>
                      </Box>
                      <Typography
                        component={"h5"}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "16px",
                          lineHeight: "24px",
                          textTransform: "uppercase",
                          marginBottom: "10px",
                          marginTop: "36px",
                        }}>
                        <LuMonitor style={{ marginRight: "10px" }} /> Experience
                      </Typography>
                      <Box sx={{ paddingY: "20px", position: "relative" }}>
                        {experienceData.map((item) => (
                          <Box key={item.id} sx={{ position: "relative" }}>
                            <Box
                              sx={{
                                position: "absolute",
                                backgroundColor: "divider",
                                bottom: 0,
                                left: "9px",
                                top: "20px",
                                width: "2px",
                                zIndex: -1,
                              }}
                            />
                            <LuCircleDot
                              style={{
                                background: item.variant,
                                float: "left",
                                height: "16px",
                                width: "16px",
                                borderRadius: "100%",
                                border: "2px solid transparent",
                                fontSize: "12px",
                                textAlign: "center",
                                lineHeight: "16px",
                                color: "white",
                              }}
                            />
                            <Box marginLeft={"32px"}>
                              <Typography component={"h5"} fontSize={"16px"}>
                                {item.title}
                              </Typography>
                              <Typography component={"p"} fontSize={"14px"} lineHeight={"28px"}>
                                {item.companyName}
                                <Typography variant={"body2"} component={"span"} marginLeft={"12px"} fontSize={"12px"}>
                                  Year: {item.year}
                                </Typography>
                              </Typography>
                              <Typography
                                component={"p"}
                                sx={{ color: "grey.600", marginTop: "12px", paddingBottom: "24px" }}>
                                {item.description}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </CustomTabPanel>
                  )}
                  
                  {value === 1 && (
                    <CustomTabPanel value={value} index={1}>
                      <Box sx={{ mt: "12px", mb: "24px" }}>
                        <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: "5px" }}>
                          <TextField
                            id="outlined-multiline-static"
                            multiline
                            fullWidth
                            rows={4}
                            defaultValue="Write Something..."
                          />
                          <Box
                            sx={{
                              p: "8px",
                              bgcolor: "divider",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}>
                            <Box>
                              <IconButton sx={{ px: "8px" }}>
                                <LuBook size={16} />
                              </IconButton>
                              <IconButton sx={{ px: "8px" }}>
                                <LuMapPin size={16} />
                              </IconButton>
                              <IconButton sx={{ px: "8px" }}>
                                <LuCamera size={16} />
                              </IconButton>
                              <IconButton sx={{ px: "8px" }}>
                                <LuSticker size={16} />
                              </IconButton>
                            </Box>
                            <Button variant="contained" color="secondary">
                              Post
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{ border: "1px solid", borderColor: "divider", borderRadius: "4px", p: "12px", mb: "12px" }}>
                        <Box display={"flex"}>
                          <Avatar variant="circular" sx={{ mr: "12px", height: "32px", width: "32px" }} src={avatar4} />
                          <Box>
                            <Typography component={"h5"}>Thelma Fridley</Typography>
                            <Typography component={"p"} mb={"16px"} fontSize={"10px"}>
                              about 1 hour ago
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: "center", fontStyle: "italic", color: "dark.main" }}>
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras
                          purus odio, vestibulum in vulputate at, tempus viverra turpis. Duis sagittis ipsum. Praesent
                          mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                        </Box>
                        <Box sx={{ mx: "-12px", p: "12px", mt: "24px", bgcolor: "grey.100" }}>
                          <Box display={"flex"}>
                            <Avatar variant="circular" sx={{ mr: "12px", height: "32px", width: "32px" }} src={avatar3} />
                            <Box>
                              <Typography component={"h5"} mb={"4px"}>
                                Jeremy Tomlinson
                                <Typography variant="body2" component={"span"} ml={"5px"}>
                                  about 2 minuts ago
                                </Typography>
                              </Typography>
                              <Typography color={"grey.500"} mb={"12px"}>
                                Nice work, makes me think of The Money Pit.
                              </Typography>
                              <Typography>
                                <LuReply /> Reply
                              </Typography>
                              <Box display={"flex"} mt={"24px"}>
                                <Avatar
                                  variant="circular"
                                  src={avatar4}
                                  sx={{ mr: "12px", height: "32px", width: "32px" }}
                                />
                                <Box>
                                  <Typography component={"h5"} mb={"4px"}>
                                    Thelma Fridley
                                    <Typography variant="body2" component={"span"} ml={"5px"}>
                                      5 hours ago
                                    </Typography>
                                  </Typography>
                                  <Typography color={"grey.500"} mb={"12px"}>
                                    i'm in the middle of a timelapse animation myself! (Very different though.) Awesome
                                    stuff.
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          <Box display={"flex"} mt={"12px"}>
                            <Avatar variant="circular" src={avatar1} sx={{ mr: "12px", height: "32px", width: "32px" }} />
                            <TextField id="full-width" size="small" placeholder="Add Comment" fullWidth />
                          </Box>
                        </Box>
                        <Box sx={{ mt: "8px" }}>
                          <Button size="small" sx={{ mr: "4px" }} startIcon={<LuHeart size={14} />} color="error">
                            
                            Like(28)
                          </Button>
                          <Button size="small" startIcon={<LuShare2 size={14} />} color="secondary">
                            
                            Share
                          </Button>
                        </Box>
                      </Box>
                      <Box
                        sx={{ border: "1px solid", borderColor: "divider", borderRadius: "4px", p: "12px", mb: "24px" }}>
                        <Box display={"flex"}>
                          <Avatar variant="circular" sx={{ mr: "12px", height: "32px", width: "32px" }} src={avatar3} />
                          <Box>
                            <Typography component={"h5"}>Jeremy Tomlinson</Typography>
                            <Typography component={"p"} mb={"16px"} fontSize={"10px"}>
                              3 hours ago
                            </Typography>
                          </Box>
                        </Box>
                        <Typography component={"p"} fontSize={"12px"} color={"grey.600"} mb={"16px"}>
                          Story based around the idea of time lapse, animation to post soon!
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                          <Avatar variant="rounded" sx={{ height: "64px", width: "64px" }} src={avatar1} />
                          <Avatar variant="rounded" sx={{ height: "64px", width: "64px" }} src={avatar2} />
                          <Avatar variant="rounded" sx={{ height: "64px", width: "64px" }} src={avatar3} />
                        </Box>
                        <Box mt={"8px"} px={"10px"}>
                          <Button size="small" sx={{ mr: "4px" }} startIcon={<LuReply size={14} />} color="secondary">
                            Reply
                          </Button>
                          <Button size="small" sx={{ mr: "4px" }} startIcon={<LuHeart size={14} />} color="secondary">
                            
                            Like
                          </Button>
                          <Button size="small" sx={{ mr: "4px" }} startIcon={<LuShare2 size={14} />} color="secondary">
                            
                            Share
                          </Button>
                        </Box>
                      </Box>
                      <Box
                        sx={{ border: "1px solid", borderColor: "divider", borderRadius: "4px", p: "12px", mb: "24px" }}>
                        <Box display={"flex"}>
                          <Avatar variant="circular" sx={{ mr: "12px", height: "32px", width: "32px" }} src={avatar6} />
                          <Box>
                            <Typography component={"h5"}>Martin Williamson</Typography>
                            <Typography component={"p"} mb={"16px"} fontSize={"10px"}>
                              15 hours ago
                            </Typography>
                          </Box>
                        </Box>
                        <Typography component={"p"} fontSize={"12px"} color={"grey.600"} mb={"16px"}>
                          The parallax is a little odd but O.o that house build is awesome!!
                        </Typography>
                        <iframe src="https://player.vimeo.com/video/87993762" style={{ border: "1px solid" }}></iframe>
                      </Box>
                      <Box textAlign={"center"}>
                        <Button
                          size="small"
                          sx={{
                            "& > svg": {
                              "@keyframes spin": {
                                from: {
                                  transform: "rotate(0deg)",
                                },
                                to: {
                                  transform: "rotate(360deg)",
                                },
                              },
                            },
                          }}>
                          <LuLoader size={16} style={{ marginRight: "6px", animation: "spin 1.5s linear infinite" }} />
                          Load More
                        </Button>
                      </Box>
                    </CustomTabPanel>
                  )}
                  
                  {value === 2 && (
                    <CustomTabPanel value={value} index={2}>
                      <Typography
                        pt={"10px"}
                        component={"h5"}
                        sx={{ display: "flex", alignItems: "center", mb: "36px", textTransform: "uppercase" }}>
                        <LuBook size={20} style={{ marginRight: "6px" }} />
                        <Typography component={"span"} fontSize={"16px"} variant="body1">
                          Personal Info
                        </Typography>
                      </Typography>
                      <Grid container spacing={2} mb={"24px"}>
                        <Grid item xs={12} lg={6}>
                          <InputLabel sx={{ pb: "5px" }}>First Name</InputLabel>
                          <OutlinedInput fullWidth placeholder="Enter first name" size="small" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <InputLabel sx={{ pb: "5px" }}>Last Name</InputLabel>
                          <OutlinedInput fullWidth placeholder="Enter last name" size="small" />
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel sx={{ pb: "5px" }}>Bio</InputLabel>
                          <OutlinedInput fullWidth placeholder="Write Something..." multiline rows={4} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <InputLabel sx={{ pb: "5px" }}>Enter email</InputLabel>
                          <OutlinedInput fullWidth placeholder="Enter last name" size="small" />
                          <Typography component={"span"} fontSize={"10px"} color={"grey.600"}>
                            If you want to change email please click here.
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <InputLabel sx={{ pb: "5px" }}>Password</InputLabel>
                          <OutlinedInput fullWidth placeholder="Enter Password" size="small" />
                          <Typography component={"span"} fontSize={"10px"} color={"grey.600"}>
                            If you want to change password please click here.
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        bgcolor={"grey.200"}
                        component={"h5"}
                        sx={{ p: "8px", display: "flex", alignItems: "center", mb: "36px", textTransform: "uppercase" }}>
                        <LuBuilding size={20} style={{ marginRight: "6px" }} />
                        <Typography component={"span"} fontSize={"16px"} variant="body1">
                          COMPANY INFO
                        </Typography>
                      </Typography>
                      <Grid container spacing={2} mb={"24px"}>
                        <Grid item xs={12} lg={6}>
                          <InputLabel sx={{ pb: "5px" }}>Company Name</InputLabel>
                          <OutlinedInput fullWidth placeholder="Enter company name" size="small" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <InputLabel sx={{ pb: "5px" }}>Website</InputLabel>
                          <OutlinedInput fullWidth placeholder="Enter website url" size="small" />
                        </Grid>
                      </Grid>
                      <Typography
                        bgcolor={"grey.200"}
                        component={"h5"}
                        sx={{ p: "8px", display: "flex", alignItems: "center", mb: "36px", textTransform: "uppercase" }}>
                        <LuGlobe size={20} style={{ marginRight: "6px" }} />
                        <Typography component={"span"} fontSize={"16px"} variant="body1">
                          
                          SOCIAL
                        </Typography>
                      </Typography>
                      <Grid container spacing={2} mb={"24px"}>
                        <Grid item xs={12} lg={6} mb={"12px"}>
                          <InputLabel sx={{ pb: "5px" }}>Facebook</InputLabel>
                          <TextField
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FiFacebook size={20} />
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            placeholder="Url"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} lg={6} mb={"12px"}>
                          <InputLabel sx={{ pb: "5px" }}>Twitter</InputLabel>
                          <TextField
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LuTwitter size={20} />
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            placeholder="username"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} lg={6} mb={"12px"}>
                          <InputLabel sx={{ pb: "5px" }}>Instagram</InputLabel>
                          <TextField
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FiInstagram size={20} />
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            placeholder="username"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} lg={6} mb={"12px"}>
                          <InputLabel sx={{ pb: "5px" }}>Linkedin</InputLabel>
                          <TextField
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FiLinkedin size={20} />
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            placeholder="username"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} lg={6} mb={"12px"}>
                          <InputLabel sx={{ pb: "5px" }}>Thread</InputLabel>
                          <TextField
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FiAtSign size={20} />
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            placeholder="username"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} lg={6} mb={"12px"}>
                          <InputLabel sx={{ pb: "5px" }}>Github</InputLabel>
                          <TextField
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LuGithub size={20} />
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            placeholder="username"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                      <Box textAlign={"right"}>
                        <Button variant="contained" color="success">
                          <LuSave size={18} style={{ marginRight: "6px" }} /> Save
                        </Button>
                      </Box>
                    </CustomTabPanel>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
