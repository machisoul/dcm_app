import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for existing login state
    const storedUser = localStorage.getItem('dcm_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('dcm_user')
      }
    }
    setLoading(false)
  }, [])

  const login = (email: string, password: string) => {
    // Default admin account for demo
    const defaultEmail = 'admin@dcm.mcn'
    const defaultPassword = 'admin123'

    // Check if it's the default account or any valid email format
    if (email === defaultEmail && password === defaultPassword) {
      const user: User = {
        id: '1',
        email: defaultEmail,
        name: 'Admin'
      }

      localStorage.setItem('dcm_user', JSON.stringify(user))
      setUser(user)
      return Promise.resolve(user)
    }

    // For demo purposes, accept any valid email format with any password
    if (email.includes('@') && password.length > 0) {
      const user: User = {
        id: '2',
        email,
        name: email.split('@')[0]
      }

      localStorage.setItem('dcm_user', JSON.stringify(user))
      setUser(user)
      return Promise.resolve(user)
    }

    // If credentials don't match, reject
    return Promise.reject(new Error('Invalid credentials'))
  }

  const logout = () => {
    localStorage.removeItem('dcm_user')
    setUser(null)
    // Redirect to login page after logout
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }
}
