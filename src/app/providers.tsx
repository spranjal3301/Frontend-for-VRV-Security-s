// "use client";
import { NextPage } from "next";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip";


interface Props {
  children: React.ReactNode;
}

const Providers: NextPage<Props> = ({ children }) => {
  return (
    <>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          {children}
        </TooltipProvider>
          <Toaster />
      </NextThemesProvider>
    </>
  );
};

export default Providers;
