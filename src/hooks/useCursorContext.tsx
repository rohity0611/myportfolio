"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type CursorContext = {
  variant: "default" | "hover" | "expand" | "drag" | "text" | "explore";
  label: string;
  setCursor: (variant: CursorContext["variant"], label?: string) => void;
};

const CursorContextProvider = createContext<CursorContext>({
  variant: "default",
  label: "",
  setCursor: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursorState] = useState<{
    variant: CursorContext["variant"];
    label: string;
  }>({ variant: "default", label: "" });

  const setCursor = useCallback((variant: CursorContext["variant"], label = "") => {
    setCursorState({ variant, label });
  }, []);

  return (
    <CursorContextProvider.Provider value={{ ...cursor, setCursor }}>
      {children}
    </CursorContextProvider.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContextProvider);
}
