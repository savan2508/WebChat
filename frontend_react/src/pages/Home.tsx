import { Box, CssBaseline } from "@mui/material";
import { PrimaryAppBar } from "./templates/PrimaryAppBar.tsx";
import { PrimaryDraw } from "./templates/PrimaryDraw.tsx";
import { SecondaryDraw } from "./templates/SecondaryDraw.tsx";
import { MainComponent } from "./templates/MainComponent.tsx";
import { PopularChannels } from "../components/primaryDraw/PopularChannels.tsx";
import { ExploreCategories } from "../components/secondaryDraw/ExploreCategories.tsx";

export const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDraw>
          <PopularChannels />
        </PrimaryDraw>
        <SecondaryDraw>
          <ExploreCategories />
        </SecondaryDraw>
        <MainComponent></MainComponent>
      </Box>
    </>
  );
};
