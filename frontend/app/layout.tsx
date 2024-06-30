import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Twitter',
    template: '%s | Twitter',
  },
  description: 'A Twitter clone built with Next js,Express and MongoDB',
  keywords: [
    'Twitter Clone',
    'Social Media',
    'React',
    'Node',
    'MongoDB',
    'Social Network',
    'Express',
    'twitter clone with next js',
    'nextjs',
    'next js',
    'mern',
    'middleware',
    'next js middleware',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
