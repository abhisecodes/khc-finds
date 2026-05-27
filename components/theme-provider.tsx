"use client"

import React, { createContext, useContext, useEffect } from "react"

type Theme = "light"

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}) {
  useEffect(() => {
    // Force light class on the document root
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add("light")
  }, [])

  const value = {
    theme: "light" as Theme,
    setTheme: () => {}, // No-op since we force light theme
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
