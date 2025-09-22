"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User as UserIcon, Shield } from "lucide-react"

export function RoleSwitcher() {
  const { user, switchRole } = useAuth()

  if (!user) return null

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Role Testing (Demo Only)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            <span className="font-medium">Current Role:</span>
            <span className="px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800">
              {user.role}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={user.role === 'user' ? 'default' : 'outline'}
              onClick={() => switchRole('user')}
            >
              User
            </Button>
            <Button
              size="sm"
              variant={user.role === 'superuser' ? 'default' : 'outline'}
              onClick={() => switchRole('superuser')}
            >
              Superuser
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Switch roles to test different access levels. Superuser can access all pages, User can only access Dashboard, Reports, and Account.
        </p>
      </CardContent>
    </Card>
  )
}