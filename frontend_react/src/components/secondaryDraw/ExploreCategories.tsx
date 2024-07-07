import useCrud from "../../hooks/useCrud.ts";
import { useEffect } from "react";
import {
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MEDIA_URL } from "../../config.ts";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export const ExploreCategories = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { dataCrud, error, isLoading, fetchData } = useCrud<Category>(
    [],
    "/server/category/",
  );

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Box
        sx={{
          height: 50,
          p: 2,
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        Explore Categories
      </Box>
      <List sx={{ py: 0 }}>
        {dataCrud.map((server) => (
          <ListItem
            disablePadding
            key={server.id}
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/explore/${server.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemAvatar>
                  <img
                    alt="Server icon"
                    src={`${MEDIA_URL}${server.icon}`}
                    style={{
                      width: 24,
                      height: 24,
                      display: "block",
                      margin: "auto",
                      filter: isDarkMode ? "invert(100%)" : "none",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      textAlign="start"
                      paddingLeft={1}
                      textTransform={"capitalize"}
                    >
                      {server.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};
