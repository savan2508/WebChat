import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

interface ToggleColorModeProps {
  children: React.ReactNode;
}

export const ToggleColorMode: React.FC<ToggleColorModeProps> = ({
  children,
}) => {
  const [mode, setMode] =
    useState<"light" | "dark">(
      () => localStorage.getItem("colorMode") as "light" | "dark",
    ) || (useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light");

  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, []);

  return <></>;
};
