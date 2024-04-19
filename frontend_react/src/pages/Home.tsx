import { Box, CssBaseline } from "@mui/material";
import { PrimaryAppBar } from "./templates/PrimaryAppBar.tsx";

export const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
        Home
      </Box>
    </>
  );
};
