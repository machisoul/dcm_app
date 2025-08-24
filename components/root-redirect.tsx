'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from './auth-provider'

export function RootRedirect() {
  const { isAuthenticated, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace('/dashboard')
      } else {
        router.replace('/login')
      }
    }
  }, [isAuthenticated, loading, router])

  // Show loading state while determining redirect
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return null
}
