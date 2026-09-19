"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { theme: "dark" as Theme, toggle: () => {} };
  return ctx;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("ryos-theme") as Theme | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transitioning");
  root.classList.toggle("light", theme === "light");
  localStorage.setItem("ryos-theme", theme);
  // Remove transition class after animation completes
  setTimeout(() => root.classList.remove("theme-transitioning"), 500);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("ryos-theme")) {
        const newTheme = e.matches ? "light" : "dark";
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  // Prevent flash by not rendering children until theme is applied
  if (!mounted) {
    return <>{children}</>;
  }

  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;
}
