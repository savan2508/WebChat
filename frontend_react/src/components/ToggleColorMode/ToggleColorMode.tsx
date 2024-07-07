import React, { useEffect, useMemo, useState } from "react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ColorModeContext } from "../../context/ColorModeContext.tsx";
import { createMuiTheme } from "../../theme/Theme.tsx";
import Cookies from "js-cookie";

interface ToggleColorModeProps {
  children: React.ReactNode;
}

export const ToggleColorMode: React.FC<ToggleColorModeProps> = ({
  children,
}) => {
  const prefersColorMode = useMediaQuery("(prefers-color-scheme: light)");
  const localColorMode = Cookies.get("colorMode") as "light" | "dark";
  const [mode, setMode] = useState<"light" | "dark">(
    localColorMode || (prefersColorMode ? "dark" : "light"),
  );

  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    Cookies.set("colorMode", mode);
  }, []);

  const colorMode = useMemo(
    () => ({ toggleColorMode, mode }),
    [toggleColorMode, mode],
  );

  const theme = React.useMemo(() => createMuiTheme(mode || "light"), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
