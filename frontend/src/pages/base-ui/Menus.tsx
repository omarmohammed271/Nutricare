import {
  Avatar,
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  PopoverOrigin,
  Tooltip,
  Typography,
} from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { useDropdownMenu } from "@src/hooks";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  LuArchive,
  LuCheck,
  LuChevronDown,
  LuClipboard,
  LuCloud,
  LuCopy,
  LuLogOut,
  LuMoreHorizontal,
  LuMoreVertical,
  LuPencil,
  LuScissors,
  LuSettings,
  LuUserPlus,
} from "react-icons/lu";

const DefaultMenu = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  return (
    <ComponentContainerCard title="Default" description="Default styled Dropdown">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        Default Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </ComponentContainerCard>
  );
};

const IconMenu = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  return (
    <ComponentContainerCard title="Icon" description="Dropdown Menu with Icons">
      <Button aria-expanded={open ? "true" : undefined} onClick={handleClick}>
        Icon Menu
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuList sx={{ py: 0 }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LuScissors />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LuCopy />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘C
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LuClipboard />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <LuCloud />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </ComponentContainerCard>
  );
};

const DenseMenu = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  return (
    <ComponentContainerCard title="Dense" description="Dense styled Dropdown with less padding">
      <Button onClick={handleClick}>Dense Menu</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuList dense>
          <MenuItem>
            <ListItemText inset>Single</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText inset>1.15</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText inset>Double</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LuCheck />
            </ListItemIcon>
            Custom: 1.2
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText>Add space before paragraph</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Add space after paragraph</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText>Custom spacing...</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </ComponentContainerCard>
  );
};

const SelectedMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    "Show some love to Coderthemes",
    "Show all notification content",
    "Hide sensitive notification content",
    "Hide all notification content",
  ];

  return (
    <ComponentContainerCard
      title="Selected Options"
      description="If used for item selection, when opened, simple menus places the initial focus on the selected menu item. ">
      <List component="nav" aria-label="Device settings" sx={{ bgcolor: "background.paper" }}>
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}>
          <ListItemText primary="When device is locked" secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}>
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </ComponentContainerCard>
  );
};

const PositionedMenu = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  return (
    <ComponentContainerCard
      title="Positioned"
      description="Because the Menu component uses the Popover component to position itself">
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        Dashboard
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </ComponentContainerCard>
  );
};

const AccountMenu = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  return (
    <ComponentContainerCard title="Account" description="Dropdown Menu with Icons">
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LuUserPlus />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LuSettings />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LuLogOut />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </ComponentContainerCard>
  );
};

const CustomDesignedMenu = () => {
  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
    },
  }));

  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  return (
    <ComponentContainerCard title="Custom Designed Menu" description="Here is an example of customizing the component.">
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<LuChevronDown />}>
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleClose} sx={{ gap: 1, color: "text.secondary" }} disableRipple>
          <LuPencil />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ gap: 1, color: "text.secondary" }} disableRipple>
          <LuCopy />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} sx={{ gap: 1, color: "text.secondary" }} disableRipple>
          <LuArchive />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ gap: 1, color: "text.secondary" }} disableRipple>
          <LuMoreHorizontal />
          More
        </MenuItem>
      </StyledMenu>
    </ComponentContainerCard>
  );
};

const MaxHeightMenu = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  const ITEM_HEIGHT = 48;

  const options = [
    "None",
    "Atria",
    "Callisto",
    "Dione",
    "Ganymede",
    "Hangouts Call",
    "Luna",
    "Oberon",
    "Phobos",
    "Pyxis",
    "Sedna",
    "Titania",
    "Triton",
    "Umbriel",
  ];

  return (
    <ComponentContainerCard title="Max Height" description="You can set the maximum height of the menu.">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <LuMoreVertical />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}>
        {options.map((option) => (
          <MenuItem key={option} selected={option === "Pyxis"} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </ComponentContainerCard>
  );
};

const FadeTransitionMenu = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  return (
    <ComponentContainerCard title="Fade Transition" description="Fade Transition Menu Dropdown">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        Dashboard
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </ComponentContainerCard>
  );
};

const ColorVariants = () => {
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  return (
    <ComponentContainerCard title="Color Variants" description="Toggler Color Variants for Dropdown menu">
      <Button onClick={handleClick} variant="contained" color="primary">
        Primary
      </Button>
      <Button onClick={handleClick} variant="contained" color="secondary">
        Secondary
      </Button>
      <Button onClick={handleClick} variant="contained" color="success">
        Success
      </Button>
      <Button onClick={handleClick} variant="contained" color="error">
        Error
      </Button>
      <Button onClick={handleClick} variant="contained" color="warning">
        Warning
      </Button>
      <Button onClick={handleClick} variant="contained" color="info">
        Info
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </ComponentContainerCard>
  );
};

const AlignmentMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const [position, setPosition] = useState<PopoverOrigin>({
    horizontal: "right",
    vertical: "bottom",
  });
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAlignment = (position: PopoverOrigin) => {
    setPosition({
      horizontal: position.horizontal,
      vertical: position.vertical,
    });
  };

  return (
    <ComponentContainerCard title="Positioned" description="You can position the menu with anchorPosition props">
      <Button
        onClick={(e) => {
          handleClick(e);
          handleMenuAlignment({ horizontal: "center", vertical: "bottom" });
        }}>
        Center Bottom
      </Button>
      <Button
        onClick={(e) => {
          handleClick(e);
          handleMenuAlignment({ horizontal: "center", vertical: "center" });
        }}>
        Center Center
      </Button>
      <Button
        onClick={(e) => {
          handleClick(e);
          handleMenuAlignment({ horizontal: "center", vertical: "top" });
        }}>
        Center Top
      </Button>
      <Button
        onClick={(e) => {
          handleClick(e);
          handleMenuAlignment({ horizontal: "left", vertical: "bottom" });
        }}>
        Left Bottom
      </Button>
      <Button
        onClick={(e) => {
          handleClick(e);
          handleMenuAlignment({ horizontal: "left", vertical: "center" });
        }}>
        Left Center
      </Button>
      <Button
        onClick={(e) => {
          handleClick(e);
          handleMenuAlignment({ horizontal: "left", vertical: "top" });
        }}>
        Left Top
      </Button>
      <Button
        onClick={(e) => {
          handleClick(e);
          handleMenuAlignment({ horizontal: "right", vertical: "bottom" });
        }}>
        Right Bottom
      </Button>
      <Button
        onClick={(e) => {
          handleClick(e);
          handleMenuAlignment({ horizontal: "right", vertical: "center" });
        }}>
        Right Center
      </Button>
      <Button
        onClick={(e) => {
          handleClick(e);
          handleMenuAlignment({ horizontal: "right", vertical: "top" });
        }}>
        Right Top
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: position.horizontal,
          vertical: position.vertical,
        }}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </ComponentContainerCard>
  );
};

const ContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <ComponentContainerCard title="Context" description="Right Click anywhere on the text to trigger Context Menu">
      <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit amet vulputate eget,
          porta semper ligula. Donec bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed dolor
          porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam quis vehicula ante, eu finibus est. Proin
          ullamcorper fermentum orci, quis finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus
          ex, sit amet facilisis neque enim sed neque. Quisque accumsan metus vel maximus consequat. Suspendisse lacinia
          tellus a libero volutpat maximus.
        </Typography>
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}>
          <MenuItem onClick={handleClose}>Copy</MenuItem>
          <MenuItem onClick={handleClose}>Print</MenuItem>
          <MenuItem onClick={handleClose}>Highlight</MenuItem>
          <MenuItem onClick={handleClose}>Email</MenuItem>
        </Menu>
      </div>
    </ComponentContainerCard>
  );
};

const Menus = () => {
  return (
    <>
      <PageBreadcrumb title="Menus" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <DefaultMenu />
        </Grid>

        <Grid item xs={12} lg={6}>
          <IconMenu />
        </Grid>

        <Grid item xs={12} lg={6}>
          <DenseMenu />
        </Grid>

        <Grid item xs={12} lg={6}>
          <SelectedMenu />
        </Grid>

        <Grid item xs={12} lg={6}>
          <PositionedMenu />
        </Grid>

        <Grid item xs={12} lg={6}>
          <AccountMenu />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomDesignedMenu />
        </Grid>

        <Grid item xs={12} lg={6}>
          <MaxHeightMenu />
        </Grid>

        <Grid item xs={12} lg={6}>
          <FadeTransitionMenu />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ColorVariants />
        </Grid>

        <Grid item xs={12} lg={6}>
          <AlignmentMenu />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ContextMenu />
        </Grid>
      </Grid>
    </>
  );
};

export default Menus;
