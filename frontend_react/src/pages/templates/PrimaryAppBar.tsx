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

export const PrimaryAppBar = () => {
  const theme = useTheme();
  const [sideMenu, setSideMenu] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen]);

  // @ts-ignore
  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setSideMenu(open);
  };

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
            {[...Array(100)].map((_, i) => (
              <Typography key={i} paragraph>
                {i + 1}
              </Typography>
            ))}
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
        </Toolbar>
      </AppBar>
    </>
  );
};
