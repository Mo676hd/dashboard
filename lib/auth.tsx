"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type UserRole = 'superuser' | 'user'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'admin@company.com',
    role: 'superuser'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'user'
  }
]

// Permission definitions
const permissions = {
  superuser: [
    'dashboard:read',
    'reports:read',
    'reports:create',
    'reports:edit',
    'team:read',
    'team:manage',
    'analytics:read',
    'users:manage',
    'settings:read',
    'settings:manage'
  ],
  user: [
    'dashboard:read',
    'reports:read',
    'reports:create',
    'reports:edit'
  ]
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Smith',
    email: 'admin@company.com',
    role: 'superuser'
  })

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    const foundUser = mockUsers.find(u => u.email === email)
    if (foundUser && password === 'password') {
      setUser(foundUser)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return permissions[user.role].includes(permission)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for route protection
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermissions: string[] = []
) {
  return function AuthenticatedComponent(props: P) {
    const { user, hasPermission } = useAuth()

    if (!user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      )
    }

    const hasAllPermissions = requiredPermissions.every(permission => hasPermission(permission))

    if (!hasAllPermissions) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-600">You don&apos;t have permission to access this page.</p>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}