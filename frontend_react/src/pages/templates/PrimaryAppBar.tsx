import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { ExploreCategories } from "../../components/secondaryDraw/ExploreCategories.tsx";
import { AccountButton } from "../../components/PrimaryAppBar/AccountButton.tsx";

export const PrimaryAppBar = () => {
  const theme = useTheme();
  const [sideMenu, setSideMenu] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen]);

  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setSideMenu(open);
    };

  const list = () => (
    <Box
      sx={{
        paddingTop: `${theme.primaryAppBar.height}px`,
        minWidth: 200,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ExploreCategories />
    </Box>
  );

  return (
    <>
      <AppBar
        sx={{
          zIndex: theme.zIndex.drawer + 2,
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            height: theme.primaryAppBar.height,
            minHeight: theme.primaryAppBar.height,
          }}
        >
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(!sideMenu)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
          <Link href="/" underline="none" color="ingerit">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { fontWeight: 700, letterSpacing: "=0,5px" } }}
            >
              WebChat
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }}></Box>
          <AccountButton />
        </Toolbar>
      </AppBar>
    </>
  );
};
