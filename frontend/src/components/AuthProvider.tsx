import { createContext, useContext, useState, type ReactNode } from 'react'
import { api, isLoggedIn, logout as apiLogout, type AuthUser } from '../api/client'

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

function getSavedUser(): AuthUser | null {
  if (!isLoggedIn()) return null
  const saved = localStorage.getItem('user')
  return saved ? (JSON.parse(saved) as AuthUser) : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getSavedUser)

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    setUser(res.user)
  }

  const register = async (email: string, password: string) => {
    const res = await api.register(email, password)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    setUser(res.user)
  }

  const logout = () => {
    apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
