"use client";

import { createContext, useContext, useCallback, useState, useRef, useEffect } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "dark", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const hydrated = useRef(false);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    [],
  );

  // Hydrate from localStorage after mount (avoid React Compiler warning)
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored === "light" ? "light" : "dark";
    // Apply directly to DOM and state together
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(initial);
    setTheme(initial);
  }, []);

  // Sync theme changes to DOM and localStorage
  useEffect(() => {
    if (!hydrated.current) return;
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
