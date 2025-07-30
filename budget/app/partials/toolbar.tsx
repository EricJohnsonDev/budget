import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

export default function BudgetToolbar() {
  const muiTheme = useTheme();
  const toolbarZee = "!z-[" + (muiTheme.zIndex.drawer + 1) + "]"; // !important
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="Home" disablePadding>
          <ListItemButton href="/">
            <ListItemIcon>
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem key="View" disablePadding>
          <ListItemButton href="view">
            <ListItemIcon>
              <Icon>search</Icon>
            </ListItemIcon>
            <ListItemText primary="View" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Add" disablePadding>
          <ListItemButton href="add">
            <ListItemIcon>
              <Icon>add</Icon>
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box className="flex">
      <CssBaseline />
      <AppBar className={`fixed ${toolbarZee}`}>
        <Toolbar>
          <IconButton
            className="!mr-2 sm:!hidden"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            EDJ Dev Budget
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" className="sm:w-[240px] sm:shrink-0">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          className="block sm:hidden [&_.MuiDrawer-paper]:box-border [&_.MuiDrawer-paper]:w-[240px]"
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          className="hidden *:box-border *:w-[240px] sm:block"
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" className="grow-1 p-3 sm:w-[calc(100%-240px)]">
        <Toolbar />
      </Box>
    </Box>
  );
}
