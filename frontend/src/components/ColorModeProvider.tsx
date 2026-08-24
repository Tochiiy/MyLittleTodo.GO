import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface ColorModeContextValue {
  colorMode: 'light' | 'dark'
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextValue>({
  colorMode: 'light',
  toggleColorMode: () => {},
})

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('chakra-ui-color-mode')
    return saved === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', colorMode === 'dark')
    root.style.colorScheme = colorMode
    localStorage.setItem('chakra-ui-color-mode', colorMode)
  }, [colorMode])

  const toggleColorMode = () =>
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  return useContext(ColorModeContext)
}
