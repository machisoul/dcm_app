'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthContext } from './auth-provider'

interface AuthRedirectProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthRedirect({ 
  children, 
  requireAuth = false, 
  redirectTo 
}: AuthRedirectProps) {
  const { isAuthenticated, loading } = useAuthContext()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        // Redirect unauthenticated users to login
        router.replace('/login')
      } else if (!requireAuth && isAuthenticated && pathname === '/login') {
        // Redirect authenticated users away from login page
        router.replace('/dashboard')
      }
    }
  }, [isAuthenticated, loading, router, requireAuth, pathname])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Don't render children if redirecting
  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (!requireAuth && isAuthenticated && pathname === '/login') {
    return null
  }

  return <>{children}</>
}
