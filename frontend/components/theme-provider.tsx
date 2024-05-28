"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { DarkModeToggle } from "./darkModeToggle";
import SideBar from "@/components/common/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const Authenticated = dynamic(() => import("@/lib/utils/Authenticated"), {
    ssr: false,
  });

  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <Authenticated />
        <div className="absolute top-2 right-2">
          <DarkModeToggle />
        </div>

        {children}
        <Toaster />
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
