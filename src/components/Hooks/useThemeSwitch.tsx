"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useThemeSwitch(): [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
  const preferDarkQuery = "(prefers-color-schema:dark)";
  const storageKey = "theme";

  const toggleTheme = (theme: Theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem(storageKey, theme);
  };

  const getUserPreference = (): Theme => {
    const userPref = window.localStorage.getItem(storageKey);
    if (userPref && (userPref === "dark" || userPref === "light")) {
      return userPref;
    }
    return window.matchMedia(preferDarkQuery).matches ? "dark" : "light";
  };

  const [mode, setMode] = useState<Theme>("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const handleChange = () => {
      const newMode = getUserPreference();
      setMode(newMode);
      toggleTheme(newMode);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    toggleTheme(mode);
  }, [mode]);

  return [mode, setMode];
}
