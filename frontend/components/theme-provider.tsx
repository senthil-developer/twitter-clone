"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { DarkModeToggle } from "./darkModeToggle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <div className="absolute top-2 right-2 z-10">
          <DarkModeToggle />
        </div>
        {children}
        <Toaster />
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
