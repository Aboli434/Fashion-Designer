"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
}>({
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
});

export function ThemeProvider({ children, defaultTheme = "system" }: any) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (newTheme !== "system") {
      localStorage.setItem("theme", newTheme);
    } else {
      localStorage.removeItem("theme");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let activeTheme: "dark" | "light" = theme === "system" ? "light" : theme;

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      activeTheme = systemTheme;
      
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        if (theme === "system") {
          root.classList.remove("light", "dark");
          root.classList.add(e.matches ? "dark" : "light");
          setResolvedTheme(e.matches ? "dark" : "light");
        }
      };
      mediaQuery.addEventListener("change", handler);
      
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
      
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      root.classList.add(theme);
      setResolvedTheme(theme);
    }
  }, [theme, mounted]);

  // Prevent hydration mismatch by rendering transparently before mount
  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
