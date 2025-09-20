"use client"

import { useAuth } from "@/lib/auth"
import { AccessDenied } from "./access-denied"
import { useEffect, useState } from "react"

interface PageProtectionProps {
  children: React.ReactNode
  requiredPermissions: string[]
  redirectTo?: string
}

export function PageProtection({ children, requiredPermissions, redirectTo = "/" }: PageProtectionProps) {
  const { user, hasPermission } = useAuth()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Add a small delay to ensure auth state is loaded
    const timer = setTimeout(() => {
      setIsChecking(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <AccessDenied
        title="Authentication Required"
        message="Please log in to access this page."
      />
    )
  }

  const hasAllPermissions = requiredPermissions.every(permission => hasPermission(permission))

  if (!hasAllPermissions) {
    return (
      <AccessDenied
        title="Access Denied"
        message="You don't have permission to access this page."
        showBackButton={true}
      />
    )
  }

  return <>{children}</>
}