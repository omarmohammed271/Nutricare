import { forwardRef } from "react";
import { Grid, Box, IconButton, Button, CircularProgress, Snackbar, Alert, AlertProps, Tabs, Tab, Rating, Chip, Avatar, Switch, Radio, FormControlLabel, Checkbox, Fab, Stack, TextField, MenuItem, CardHeader, CardContent, Typography } from "@mui/material";
import {
  LuSearch,
  LuTrash2,
  LuSendHorizonal,
  LuHeart,
  LuPhone,
  LuContact2,
  LuPlus,
  LuShoppingCart
} from "react-icons/lu";
import { ContainerBox } from "./Navbar";
import { useToggle, useTabsChange } from "@src/hooks";
import { AvatarBadge } from "../base-ui/Avatars";

import avatar2 from "@src/assets/images/avatars/avatar2.png";
import { UserProfile } from "../base-ui/Cards";
import { alpha } from "@mui/material/styles";
import logo from "@src/assets/images/nutricare-logo.svg";
import logoDark from "@src/assets/images/nutricare-logo.svg";
import { SectionTitle } from "@src/pages/landing/components";

const MuiAlert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <Alert elevation={6} ref={ref} variant="filled" {...props} />
))

const ElementsPreview = () => {

  const { value, handleChange } = useTabsChange();

  const { isOpen, hide, show } = useToggle()

  return (
    <>
      <Box sx={{   backgroundColor: "background.paper"}} id="showcase">
        <SectionTitle name="Helper" title="Components" description="Create your own page with the better components designs." />


        <ContainerBox>
          <Grid container>

            <Grid item lg={6} xs={12} sx={{ order: { lg: 1, xs: 2 } }}>
              <Box sx={{ px: 3, py: 6, gap: 3, display: 'flex', flexDirection: 'column', border: '1px dashed', borderColor: 'divider', borderRadius:1 }}>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                  <Button variant="contained" color="success" endIcon={<LuSendHorizonal />}>
                    Send
                  </Button>
                  <Button variant="outlined" color="error" startIcon={<LuTrash2 />}>
                    Delete
                  </Button>
                  <Fab color="primary" size="small">
                    <LuPlus size={18} />
                  </Fab>
                  <IconButton color="info">
                    <LuSearch />
                  </IconButton>
                  <CircularProgress color="warning" />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab icon={<LuPhone size={20} />} label="Dialer" />
                    <Tab icon={<LuHeart size={20} />} label="Favourites" />
                    <Tab icon={<LuContact2 size={20} />} label="Contacts" />
                  </Tabs>

                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                  <Button variant={"outlined"} color={'warning'} onClick={show}>
                    Open Success snackbar
                  </Button>
                  <Snackbar open={isOpen} autoHideDuration={6000} onClose={hide}>
                    <MuiAlert onClose={hide} severity={'warning'} sx={{ width: "100%" }}>
                      This is a warning message!
                    </MuiAlert>
                  </Snackbar>

                  <Alert action={<Button color="inherit" size="small"> UNDO </Button>}>
                    This is a Warning alert — check it out!
                  </Alert>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                  <AvatarBadge />
                  <Rating defaultValue={3} />
                  <Chip variant="outlined" label="Cant Close?" avatar={<Avatar src={avatar2} />} onDelete={() => null} clickable />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                  <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Switch" />
                  <FormControlLabel control={<Radio checked color="success" />} label="Radio" />
                  <FormControlLabel control={<Checkbox defaultChecked color="error" />} label="Checkbox" />
                </Box>

                <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                  <Grid item md={8} xs={12}>
                    <UserProfile />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <Stack sx={{ gap: 2 }}>
                      <TextField label="Overflowing" defaultValue="Your Bank Balance" error />
                      <TextField
                        label="Temperature"
                        defaultValue="Cool"
                        select
                      >
                        <MenuItem value={'Cool'}>Cool</MenuItem>
                        <MenuItem value={'Normal'}>Normal</MenuItem>
                        <MenuItem value={'Hot'}>Hot</MenuItem>
                      </TextField>
                      <TextField label="Your Address" color={'info'} rows={3} multiline />
                    </Stack>
                  </Grid>
                </Grid>

              </Box>
            </Grid>

            <Grid item lg={6} xs={12} sx={{ order: { lg: 2, xs: 1 } }}>

              <Box sx={{ paddingBottom: '40px', paddingTop: '80px' }} data-aos="fade-up" data-aos-duration={1000}>
                <ContainerBox sx={{ position: 'relative' }}>
                  <Box sx={{ textAlign: 'center', height: '400px', borderRadius: '8px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column'}}>
                    <Box sx={{ mx: 'auto', }}>
                      {/*<img style={{ height: 40 }} src={themeMode == 'light' ? logoDark : logo} />*/}
                      <Typography variant="h1" sx={{ mt: 8, maxWidth: '390px', lineHeight:1.5, color: 'text.primary', "&>span": { color: 'primary.main' } }}>
                        Get <span> Nutricare MUI </span> for yourself to get started with your project now
                      </Typography>
                    </Box>

                    <Box>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<LuShoppingCart size={20} />}
                      >
                        Buy Now
                      </Button>
                    </Box>

                  </Box>
                </ContainerBox>
              </Box>
              {/*<Box sx={{ pr: 3, pl: { lg: 8, xs: 0 }, pt: { lg: 6, xs: 2 } }}>*/}

              {/*  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}>*/}
              {/*    <Typography variant="button" color="text.secondary">*/}
              {/*      Interactive Preview of UI Elements*/}
              {/*    </Typography>*/}
              {/*    <Typography variant="h2" component="h2" color="text.primary" sx={{ fontSize: 58 }}>Plethora of Stylish UI Elements</Typography>*/}
              {/*  </CardContent>*/}

              {/*</Box>*/}
            </Grid>
          </Grid>
        </ContainerBox >
      </Box >
    </>
  )
};

export default ElementsPreview;
