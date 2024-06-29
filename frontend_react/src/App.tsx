import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createMuiTheme } from "./theme/Theme.tsx";
import { Explore } from "./pages/Explore.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/explore/:categoryName" element={<Explore />} />
    </Route>,
  ),
);

const App: React.FC = () => {
  const theme = createMuiTheme();
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
