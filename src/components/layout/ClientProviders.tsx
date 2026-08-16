"use client";

import { ReactNode } from "react";
import { CursorProvider } from "@/hooks/useCursorContext";
import { ThemeProvider } from "@/hooks/useTheme";
import CustomCursor from "@/components/ui/CustomCursor";
import NavigationHUD from "@/components/ui/NavigationHUD";
import FooterSection from "@/components/sections/FooterSection";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CursorProvider>
        <CustomCursor />
        <div className="scan-line" />
        <NavigationHUD />
        <div className="content-layer">{children}</div>
        <FooterSection />
      </CursorProvider>
    </ThemeProvider>
  );
}
