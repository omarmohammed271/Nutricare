/*
 * Copyright (c) 2023.
 * File Name: Avatars.tsx
 * Author: Coderthemes
 */

import { Avatar, AvatarGroup, Badge, Grid } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { deepOrange, deepPurple, cyan, lime, teal, red, blueGrey, lightBlue, indigo } from "@mui/material/colors";
import {
  LuBoxes,
  LuCastle,
  LuCompass,
  LuHeart,
  LuKeyboard,
  LuMusic2,
  LuPersonStanding,
  LuShieldCheck,
  LuTent,
  LuThumbsUp,
} from "react-icons/lu";
import { styled } from "@mui/material/styles";

import avatar1 from "@src/assets/images/avatars/avatar1.png";
import avatar2 from "@src/assets/images/avatars/avatar2.png";
import avatar3 from "@src/assets/images/avatars/avatar3.png";
import avatar4 from "@src/assets/images/avatars/avatar4.png";
import avatar5 from "@src/assets/images/avatars/avatar5.png";
import avatar6 from "@src/assets/images/avatars/avatar6.png";
import avatar7 from "@src/assets/images/avatars/avatar7.png";
import avatar8 from "@src/assets/images/avatars/avatar8.png";
import avatar9 from "@src/assets/images/avatars/avatar9.png";
import avatar10 from "@src/assets/images/avatars/avatar10.png";
import small4 from "@src/assets/images/small/small-4.jpg";

export const AvatarBadge = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  return (
    <>
      <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
        <Avatar alt="Remy Sharp" src={avatar1} />
      </StyledBadge>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={<SmallAvatar alt="Remy Sharp" src={avatar2} />}>
        <Avatar alt="Travis Howard" src={avatar3} />
      </Badge>
    </>
  );
};

const ImageAvatars = () => {
  return (
    <ComponentContainerCard
      title="Image Avatars"
      description="Image avatars can be created by passing standard img props src or srcSet to the component.">
      <Avatar alt="Mavis Berry" src={avatar1} />
      <Avatar alt="Selma Knight" src={avatar2} />
      <Avatar alt="Maria Joyce" src={avatar3} />
      <Avatar alt="Tisha Norton" src={avatar4} />
      <Avatar alt="Emma Berger" src={avatar5} />
      <Avatar alt="Mary Cruz" src={avatar6} />
      <Avatar alt="Kim Armstrong" src={avatar7} />
      <Avatar alt="Hollie Stevens" src={avatar8} />
      <Avatar alt="Shyla Bandhu" src={avatar9} />
      <Avatar alt="Sarika Jain" src={avatar10} />
    </ComponentContainerCard>
  );
};

const GroupedAvatars = () => {
  return (
    <ComponentContainerCard
      title="Grouped Avatars"
      description="AvatarGroup renders its children as a stack. Use the max prop to limit the number of avatars.">
      <AvatarGroup max={7}>
        <Avatar alt="Mavis Berry" src={avatar1} />
        <Avatar alt="Selma Knight" src={avatar2} />
        <Avatar alt="Maria Joyce" src={avatar3} />
        <Avatar alt="Tisha Norton" src={avatar4} />
        <Avatar alt="Emma Berger" src={avatar5} />
        <Avatar alt="Mary Cruz" src={avatar6} />
        <Avatar alt="Kim Armstrong" src={avatar7} />
        <Avatar alt="Hollie Stevens" src={avatar8} />
        <Avatar alt="Shyla Bandhu" src={avatar9} />
        <Avatar alt="Sarika Jain" src={avatar10} />
      </AvatarGroup>
    </ComponentContainerCard>
  );
};

const LetterAvatars = () => {
  return (
    <ComponentContainerCard
      title="Letter Avatars"
      description="Avatars containing simple characters can be created by passing a string as children.">
      <Avatar alt="Mavis Berry">S</Avatar>
      <Avatar alt="Selma Knight" sx={{ bgcolor: deepOrange[500] }}>
        U
      </Avatar>
      <Avatar alt="Maria Joyce" sx={{ bgcolor: deepPurple[500] }}>
        P
      </Avatar>
      <Avatar alt="Tisha Norton" sx={{ bgcolor: cyan[500] }}>
        E
      </Avatar>
      <Avatar alt="Emma Berger" sx={{ bgcolor: lime[500] }}>
        R
      </Avatar>
      <Avatar alt="Mary Cruz" sx={{ bgcolor: teal[500] }}>
        K
      </Avatar>
      <Avatar alt="Kim Armstrong" sx={{ bgcolor: red[500] }}>
        E
      </Avatar>
      <Avatar alt="Hollie Stevens" sx={{ bgcolor: blueGrey[500] }}>
        N
      </Avatar>
      <Avatar alt="Shyla Bandhu" sx={{ bgcolor: lightBlue[500] }}>
        I
      </Avatar>
      <Avatar alt="Sarika Jain" sx={{ bgcolor: indigo[500] }}>
        L
      </Avatar>
    </ComponentContainerCard>
  );
};

const IconAvatars = () => {
  return (
    <ComponentContainerCard title="Icon Avatars" description="Icon avatars are created by passing an icon as children.">
      <Avatar alt="Mavis Berry">
        <LuHeart />
      </Avatar>
      <Avatar alt="Selma Knight" sx={{ bgcolor: deepOrange[500] }}>
        <LuBoxes />
      </Avatar>
      <Avatar alt="Maria Joyce" sx={{ bgcolor: deepPurple[500] }}>
        <LuMusic2 />
      </Avatar>
      <Avatar alt="Tisha Norton" sx={{ bgcolor: cyan[500] }}>
        <LuShieldCheck />
      </Avatar>
      <Avatar alt="Emma Berger" sx={{ bgcolor: lime[500] }}>
        <LuThumbsUp />
      </Avatar>
      <Avatar alt="Mary Cruz" sx={{ bgcolor: teal[500] }}>
        <LuKeyboard />
      </Avatar>
      <Avatar alt="Kim Armstrong" sx={{ bgcolor: red[500] }}>
        <LuCastle />
      </Avatar>
      <Avatar alt="Hollie Stevens" sx={{ bgcolor: blueGrey[500] }}>
        <LuCompass />
      </Avatar>
      <Avatar alt="Shyla Bandhu" sx={{ bgcolor: lightBlue[500] }}>
        <LuPersonStanding />
      </Avatar>
      <Avatar alt="Sarika Jain" sx={{ bgcolor: indigo[500] }}>
        <LuTent />
      </Avatar>
    </ComponentContainerCard>
  );
};

const AvatarSizes = () => {
  return (
    <ComponentContainerCard
      title="Sizes Avatars"
      description="You can change the size of the avatar with the height and width CSS properties.">
      <Avatar alt="Mavis Berry" src={avatar1} sx={{ width: 32, height: 32 }} />
      <Avatar alt="Selma Knight" src={avatar2} sx={{ width: 48, height: 48 }} />
      <Avatar alt="Emma Berger" src={avatar3} sx={{ width: 64, height: 64 }} />
      <Avatar alt="Shyla Bandhu" src={avatar4} sx={{ width: 96, height: 96 }} />
      <Avatar alt="Maria Joyce" src={avatar5} sx={{ width: 128, height: 128 }} />
    </ComponentContainerCard>
  );
};

const AvatarVariants = () => {
  return (
    <ComponentContainerCard
      title="Variant Avatars"
      description="If you need square or rounded avatars, use the variant prop.">
      <Avatar variant="square" alt="Shyla Bandhu" src={small4} sx={{ width: 128, height: 128 }} />
      <Avatar variant="rounded" alt="Hollie Stevens" src={avatar8} sx={{ width: 128, height: 128 }} />
      <Avatar variant="circular" alt="Sarika Jain" src={avatar10} sx={{ width: 128, height: 128 }} />
    </ComponentContainerCard>
  );
};

const AvatarsWithBadges = () => {
  return (
    <ComponentContainerCard title="Avatars With badge" description="Avatar with badges, and custom badge">
      <AvatarBadge />
    </ComponentContainerCard>
  );
};

const Avatars = () => {
  return (
    <>
      <PageBreadcrumb title="Avatars" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <ImageAvatars />
        </Grid>

        <Grid item md={6} xs={12}>
          <GroupedAvatars />
        </Grid>

        <Grid item md={6} xs={12}>
          <LetterAvatars />
        </Grid>

        <Grid item md={6} xs={12}>
          <IconAvatars />
        </Grid>

        <Grid item lg={6} xs={12}>
          <AvatarSizes />
        </Grid>

        <Grid item md={6} xs={12}>
          <AvatarVariants />
        </Grid>

        <Grid item md={6} xs={12}>
          <AvatarsWithBadges />
        </Grid>
      </Grid>
    </>
  );
};

export default Avatars;
