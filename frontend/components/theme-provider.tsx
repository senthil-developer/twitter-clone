'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'

import { DarkModeToggle } from './darkModeToggle'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <div className="fixed top-2 right-2 z-10 hidden md:block">
          <DarkModeToggle />
        </div>
        <div className="dark:bg-black dark:text-white bg-white text-black w-full">
          {children}
        </div>
        <Toaster />
      </QueryClientProvider>
    </NextThemesProvider>
  )
}
