import { Avatar, Badge, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import {
  LuTrash2,
  LuHeart,
  LuKeyboard,
  LuMusic2,
  LuThumbsUp,
  LuMail,
  LuTrash,
  LuXCircle,
  LuLaugh,
  LuSmile,
} from "react-icons/lu";

// assets
import avatar1 from "@src/assets/images/avatars/avatar1.png";
import avatar2 from "@src/assets/images/avatars/avatar2.png";
import avatar3 from "@src/assets/images/avatars/avatar3.png";

const DefaultBadges = () => {
  return (
    <ComponentContainerCard
      title="Default"
      description="Examples of badges containing Icons, using color variants. The badge is applied to its children."
      stackProps={{ direction: "row", sx: { gap: 3 } }}>
      <Badge badgeContent={4} color="primary">
        <LuMail size={24} />
      </Badge>
      <Badge badgeContent={4} color="secondary">
        <LuHeart size={24} />
      </Badge>
      <Badge badgeContent={4} color="success">
        <LuMusic2 size={24} />
      </Badge>
      <Badge badgeContent={4} color="error">
        <LuThumbsUp size={24} />
      </Badge>
      <Badge badgeContent={4} color="warning">
        <LuTrash2 size={24} />
      </Badge>
      <Badge badgeContent={4} color="info">
        <LuKeyboard size={24} />
      </Badge>
    </ComponentContainerCard>
  );
};

const TextBadges = () => {
  return (
    <ComponentContainerCard
      title="Text"
      description="Examples of badges containing text, using color variants."
      stackProps={{ direction: "row", sx: { gap: 3 } }}>
      <Badge badgeContent={4} color="primary">
        <Typography variant="h4">Attex</Typography>
      </Badge>
      <Badge badgeContent={4} color="secondary">
        <Typography variant="h4">Attex</Typography>
      </Badge>
      <Badge badgeContent={4} color="success">
        <Typography variant="h4">Attex</Typography>
      </Badge>
      <Badge badgeContent={4} color="error">
        <Typography variant="h4">Attex</Typography>
      </Badge>
      <Badge badgeContent={4} color="warning">
        <Typography variant="h4">Attex</Typography>
      </Badge>
      <Badge badgeContent={4} color="info">
        <Typography variant="h4">Attex</Typography>
      </Badge>
    </ComponentContainerCard>
  );
};

const OutlinedChips = () => {
  return (
    <ComponentContainerCard title="Outlined Chips" description="Outline variant Chips with colored text">
      <Chip color="primary" variant="outlined" label="Primary" />
      <Chip color="secondary" variant="outlined" label="Secondary" />
      <Chip color="success" variant="outlined" label="Success" />
      <Chip color="error" variant="outlined" label="Error" />
      <Chip color="warning" variant="outlined" label="Warning" />
      <Chip color="info" variant="outlined" label="Info" />
      <Chip variant="outlined" label="Default" />
    </ComponentContainerCard>
  );
};

const FilledChips = () => {
  return (
    <ComponentContainerCard title="Filled Chips" description="Filled variant Chips">
      <Chip color="primary" variant="filled" label="Primary" />
      <Chip color="secondary" variant="filled" label="Secondary" />
      <Chip color="success" variant="filled" label="Success" />
      <Chip color="error" variant="filled" label="Error" />
      <Chip color="warning" variant="filled" label="Warning" />
      <Chip color="info" variant="filled" label="Info" />
      <Chip variant="filled" label="Default" />
    </ComponentContainerCard>
  );
};

const AdornmentChips = () => {
  return (
    <ComponentContainerCard
      title="Adornments Chips"
      description="You can add ornaments to the beginning of the component.">
      <Chip color="primary" variant="outlined" label="Avatar" avatar={<Avatar>S</Avatar>} clickable />
      <Chip color="secondary" variant="outlined" label="Avatar" avatar={<Avatar>K</Avatar>} clickable />
      <Chip color="success" variant="outlined" label="Avatar" avatar={<Avatar src={avatar1} />} clickable />
      <Chip color="error" variant="outlined" label="Avatar" avatar={<Avatar src={avatar2} />} clickable />
      <Chip
        color="warning"
        variant="outlined"
        label="Avatar"
        avatar={
          <Avatar>
            <LuLaugh />
          </Avatar>
        }
        clickable
      />
      <Chip
        color="info"
        variant="outlined"
        label="Avatar"
        avatar={
          <Avatar>
            <LuSmile />
          </Avatar>
        }
        clickable
      />
      <Chip
        variant="outlined"
        label="Avatar & Delete"
        avatar={<Avatar src={avatar3} />}
        onDelete={() => {}}
        clickable
      />
    </ComponentContainerCard>
  );
};

const BadgeAlignment = () => {
  return (
    <ComponentContainerCard
      title="Alignment"
      description="Examples of badges with different alignments"
      stackProps={{ direction: "row", sx: { gap: 3 } }}>
      <Stack direction={"row"} spacing={3}>
        <Badge badgeContent={4} color="primary" anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <LuMail size={24} />
        </Badge>
        <Badge badgeContent={4} color="secondary" anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
          <LuHeart size={24} />
        </Badge>
        <Badge badgeContent={4} color="success" anchorOrigin={{ vertical: "top", horizontal: "left" }}>
          <LuMusic2 size={24} />
        </Badge>
        <Badge badgeContent={4} color="error" anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <LuThumbsUp size={24} />
        </Badge>
      </Stack>
    </ComponentContainerCard>
  );
};

const PositionedBadges = () => {
  return (
    <ComponentContainerCard
      title="Positioned Badges"
      description="Use the anchorOrigin prop to change the position of the Badge according to its vertical (top or bottom) and horizontal (left or right) placement. "
      stackProps={{ direction: "row", sx: { gap: 3 } }}>
      <Badge badgeContent={1024} max={999} color="primary">
        <Button variant="contained" color="primary">
          Inbox
        </Button>
      </Badge>
      <Badge badgeContent={8} color="secondary">
        <Button variant="contained" color="primary">
          Notification
        </Button>
      </Badge>
      <Badge badgeContent={"42k"} color="success">
        <Button variant="contained" color="primary">
          Likes
        </Button>
      </Badge>
      <Badge badgeContent={"73M"} color="error">
        <Button variant="contained" color="primary">
          Total Views
        </Button>
      </Badge>
      <Badge badgeContent={16} color="warning">
        <Button variant="contained" color="primary">
          Messages
        </Button>
      </Badge>
      <Badge badgeContent={"$69,758"} color="info">
        <Button variant="contained" color="primary">
          Today's Revenue
        </Button>
      </Badge>
    </ComponentContainerCard>
  );
};

const DeletableChips = () => {
  return (
    <ComponentContainerCard
      title="Filled Chips"
      description="Chips are most frequently used in two main use cases: as pills of informative content or as filtering options.">
      <Chip color="primary" label="Deletable" onDelete={() => {}} />
      <Chip color="secondary" label="Deletable" onDelete={() => {}} />
      <Chip color="success" label="Deletable & Clickable" onDelete={() => {}} clickable />
      <Chip color="error" label="Deletable & Clickable" onDelete={() => {}} clickable />
      <Chip color="warning" label="Custom Delete Icon" onDelete={() => {}} deleteIcon={<LuTrash />} />
      <Chip color="info" label="Custom Delete Icon" onDelete={() => {}} deleteIcon={<LuXCircle />} />
      <Chip label="Deletable" onDelete={() => {}} />
    </ComponentContainerCard>
  );
};

const Badges = () => {
  return (
    <>
      <PageBreadcrumb title="Badges" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <DefaultBadges />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextBadges />
        </Grid>

        <Grid item md={6} xs={12}>
          <OutlinedChips />
        </Grid>

        <Grid item md={6} xs={12}>
          <FilledChips />
        </Grid>

        <Grid item md={6} xs={12}>
          <AdornmentChips />
        </Grid>

        <Grid item md={6} xs={12}>
          <BadgeAlignment />
        </Grid>

        <Grid item lg={6} xs={12}>
          <PositionedBadges />
        </Grid>

        <Grid item lg={6} xs={12}>
          <DeletableChips />
        </Grid>
      </Grid>
    </>
  );
};

export default Badges;
