// Same-origin by default (works with Vite dev proxy, Docker nginx proxy,
// and Vercel rewrites). Set VITE_API_URL to target the backend directly.
const API_URL = import.meta.env.VITE_API_URL ?? ''

export interface Todo {
  id: string
  body: string
  completed: boolean
}

export interface AuthUser {
  id?: string
  email: string
}

export interface AuthResponse {
  user: AuthUser
  token: string
}

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

function getToken(): string | null {
  return localStorage.getItem('token')
}

export function isLoggedIn(): boolean {
  return !!getToken()
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data.error) message = data.error
    } catch {
      // ignore parse errors
    }
    if (res.status === 401) {
      logout()
    }
    throw new ApiError(message, res.status)
  }

  return res.json()
}

export const api = {
  register: (email: string, password: string) =>
    request<AuthResponse>('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  login: (email: string, password: string) =>
    request<AuthResponse>('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getTodos: () => request<Todo[]>('/api/mylittletodos'),

  createTodo: (body: string) =>
    request<Todo>('/api/mylittletodos', {
      method: 'POST',
      body: JSON.stringify({ body, completed: false }),
    }),

  updateTodo: (id: string, data: Partial<Todo>) =>
    request<{ message: string }>(`/api/mylittletodos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteTodo: (id: string) =>
    request<{ message: string }>(`/api/mylittletodos/${id}`, {
      method: 'DELETE',
    }),
}
