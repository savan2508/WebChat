import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const SecondaryDraw = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minWidth: `${theme.secondaryDraw.width}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        mt: `${theme.primaryAppBar.height}px`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: { xs: "none", sm: "block" },
        overflow: "auto",

        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        // borderRight: "1px solid #ccc",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "4px",
        },
      }}
    >
      Secondary Draw
      {[...Array(100)].map((_, i) => (
        <Box key={i} sx={{ padding: theme.spacing(2) }}>
          {i}
        </Box>
      ))}
    </Box>
  );
};
