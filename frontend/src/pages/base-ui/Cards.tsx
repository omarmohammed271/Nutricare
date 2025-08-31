import { CSSProperties } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import { red } from "@mui/material/colors";
import { LuChevronFirst, LuChevronLast, LuHeart, LuMoreVertical, LuPlay, LuShare2 } from "react-icons/lu";

import avatar1 from "@src/assets/images/avatars/avatar1.png";
import small1 from "@src/assets/images/small/small-1.jpg";
import small2 from "@src/assets/images/small/small-2.jpg";
import small3 from "@src/assets/images/small/small-3.jpg";
import small4 from "@src/assets/images/small/small-4.jpg";
import small5 from "@src/assets/images/small/small-5.jpg";
import small6 from "@src/assets/images/small/small-6.jpg";
import small7 from "@src/assets/images/small/small-7.jpg";

const Card1 = () => {
  return (
    <Card>
      <CardMedia sx={{ height: 248 }} image={small1} title="Kitchen Drink" />
      <CardContent>
        <Typography gutterBottom variant="h5">
          Vanilla Juice
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Some quick example text to build on the card title and make up the bulk of the card's content. Some quick
          example text to build on the card title and make up
        </Typography>
      </CardContent>
    </Card>
  );
};

const Card2 = () => {
  return (
    <Card>
      <CardMedia sx={{ height: 243 }} image={small2} title="Kitchen Drink" />
      <CardContent>
        <Typography gutterBottom variant="h5">
          Promotion Party 🎉
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Some quick example text to build on card title
        </Typography>
      </CardContent>
      <CardActions sx={{ p: "16px", pt: "0px" }}>
        <Button variant="contained">Share</Button>
        <Button variant="text">Celebrate Together</Button>
      </CardActions>
    </Card>
  );
};

const Card3 = () => {
  return (
    <Card>
      <CardMedia sx={{ height: 248 }} image={small3} title="Kitchen Drink" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Some quick example text to build on the card title and make up the bulk of the card's content. Some quick
        </Typography>
      </CardContent>
      <CardActions sx={{ p: "16px", pt: "0px" }}>
        <Button variant="contained">Share</Button>
      </CardActions>
    </Card>
  );
};

const Card4 = () => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6">
          Finding Nemo 🐠
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Some quick example text to build on the card title and make up the bulk of the card's content Lorem ipsum
          dolor sit amet consectetur, adipisicing elit
        </Typography>
      </CardContent>
      <CardMedia sx={{ height: 258 }} image={small4} title="Kitchen Drink" />
    </Card>
  );
};

const Card5 = ({
  color,
}: {
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}) => {
  return (
    <Card>
      <CardHeader title="Congratulations! 🥳" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Some quick example text to build on the card title and make up the bulk of the card's content. Some quick
          example text to build on the card title and make up
        </Typography>
      </CardContent>
      <CardActions sx={{ p: "16px", pt: "0px" }}>
        <Button sx={{ width: "100%" }} variant="contained" color={color}>
          Do Something
        </Button>
      </CardActions>
    </Card>
  );
};

const Card6 = () => {
  return (
    <Card>
      <CardHeader title="Featured" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Some quick example text to build on the card title and make up the bulk of the card's content. Some quick
          example text to build
        </Typography>
      </CardContent>
      <CardActions sx={{ p: "16px", pt: "0px" }}>
        <Button variant="contained">Do Something</Button>
      </CardActions>
    </Card>
  );
};

const Card7 = () => {
  return (
    <Card>
      <CardHeader title="Quote" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Some quick example text to build on the card title and make up the bulk of the card's content. Some quick
          example text to build
        </Typography>
      </CardContent>
    </Card>
  );
};

const Card8 = () => {
  return (
    <Card>
      <CardHeader title="Project has been assigned to you 🎉" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Some quick example text to build on the card title and make up the bulk of the card's content. Some quick
          example text to build
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ p: "16px" }}>
        <Button variant="contained">Do Something</Button>
      </CardActions>
    </Card>
  );
};

export const ColoredCard = ({ bgColor, style }: { bgColor: string; style?: CSSProperties }) => {
  return (
    <Card sx={{ backgroundColor: bgColor, ...style }}>
      <CardContent>
        <Typography gutterBottom variant="subtitle1" color={"grey.50"}>
          Card title
        </Typography>
        <Typography gutterBottom variant="body2" color={"grey.100"}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores tempora veritatis incidunt quas earum! Odio,
          alias rerum sequi, esse dolor!
        </Typography>
      </CardContent>
    </Card>
  );
};

const Card9 = () => {
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={small5} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
          except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

const UIControlsCard = () => {
  return (
    <Card sx={{ display: "flex", height: "154px", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
            alignSelf: "center",
            width: "100%",
            justifyContent: "space-evenly",
          }}>
          <IconButton aria-label="previous">
            <LuChevronFirst />
          </IconButton>
          <IconButton aria-label="play/pause">
            <LuPlay size={24} />
          </IconButton>
          <IconButton aria-label="next">
            <LuChevronLast />
          </IconButton>
        </Box>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} image={small6} alt="Live from space album cover" />
    </Card>
  );
};

const ComplexInteraction = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <LuMoreVertical />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia component="img" height="194" image={small7} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
          frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <LuHeart color="red" />
        </IconButton>
        <IconButton aria-label="share">
          <LuShare2 />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export const UserProfile = () => {
  return (
    <Card>
      <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Divider>
          <Avatar src={avatar1} sx={{ height: 96, width: 96 }} />
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 6 }}>
          <Box sx={{ flexDirection: "column", alignItems: "center", display: "flex", mt: -4 }}>
            <Typography variant="h5">23.1K</Typography>
            <Typography variant="body2">followers</Typography>
          </Box>
          <Box sx={{ flexDirection: "column", alignItems: "center", display: "flex", mt: 1 }}>
            <Typography fontWeight={600}>Tosha Minner</Typography>
            <Typography variant="caption" gutterBottom>
              @toshabrownie
            </Typography>
          </Box>
          <Box sx={{ flexDirection: "column", alignItems: "center", display: "flex", mt: -4 }}>
            <Typography variant="h5">652</Typography>
            <Typography variant="body2">following</Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ px: 3, mt: 1 }}>
          ✨ Hey there, I am Tosha Minner, experienced ReactJs Developer. I am currently open to work
        </Typography>
      </CardContent>
      <CardActions>
        <Divider />
        <Button variant="outlined" fullWidth>
          Edit Profile
        </Button>
      </CardActions>
    </Card>
  );
};

const Cards = () => {
  return (
    <>
      <PageBreadcrumb title="Cards" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <Card1 />
        </Grid>

        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <Card2 />
        </Grid>

        <Grid item xl={3} lg={4} md={6} xs={12}>
          <Card3 />
        </Grid>

        <Grid item xl={3} lg={4} md={6} xs={12}>
          <Card4 />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Card5 color="primary" />
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Card8 />
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Card5 color="success" />
        </Grid>

        {/* <Grid item lg={4}>
          <Card6 />
        </Grid>

        <Grid item lg={4}>
          <Card7 />
        </Grid> */}

        {/* <Grid item lg={4}>
          <Card8 />
        </Grid> */}

        <Grid item container spacing={3}>
          <Grid item lg={4} sm={6} xs={12}>
            <ColoredCard bgColor="#6c757d" />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <ColoredCard bgColor="#5eb5ff" />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <ColoredCard bgColor="#26c362" />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <ColoredCard bgColor="#02BE6A" />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <ColoredCard bgColor="#fdb906" />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <ColoredCard bgColor="#f15776" />
          </Grid>
        </Grid>

        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <Card9 />
        </Grid>

        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <UIControlsCard />
        </Grid>

        <Grid item xl={3} lg={4} sm={5} xs={12}>
          <ComplexInteraction />
        </Grid>

        <Grid item xl={3} lg={4} sm={7} xs={12}>
          <UserProfile />
        </Grid>
      </Grid>
    </>
  );
};

export default Cards;
