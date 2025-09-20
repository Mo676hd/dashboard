"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import { UserSearch, LogIn } from "lucide-react"

export function UserSwitcher() {
  const { user, login, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const success = await login(email, password)
    setIsLoading(false)
    if (success) {
      setShowLogin(false)
      setEmail("")
      setPassword("")
    } else {
      alert("Invalid credentials. Use 'password' as the password.")
    }
  }

  const switchUser = (userEmail: string) => {
    setEmail(userEmail)
    setPassword("password")
    setShowLogin(true)
  }

  if (showLogin) {
    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-lg">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading} className="flex-1">
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowLogin(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <UserSearch className="w-5 h-5" />
          User Switcher (Demo)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <Badge className={user.role === 'superuser' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                {user.role === 'superuser' ? 'Super User' : 'Regular User'}
              </Badge>
            </div>
            <Button onClick={logout} variant="outline" className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <p className="text-gray-500">Not logged in</p>
        )}

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">Quick Switch:</p>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => switchUser("admin@company.com")}
              className="w-full justify-start"
            >
              Switch to Admin
              <Badge className="ml-auto bg-purple-100 text-purple-800">Super User</Badge>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => switchUser("sarah@company.com")}
              className="w-full justify-start"
            >
              Switch to Sarah
              <Badge className="ml-auto bg-blue-100 text-blue-800">Regular User</Badge>
            </Button>
          </div>
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <p className="font-medium mb-1">Demo Credentials:</p>
          <p>Admin: admin@company.com / password</p>
          <p>User: sarah@company.com / password</p>
        </div>
      </CardContent>
    </Card>
  )
}