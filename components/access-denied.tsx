"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldX, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AccessDeniedProps {
  title?: string
  message?: string
  showBackButton?: boolean
}

export function AccessDenied({
  title = "Access Denied",
  message = "You don't have permission to access this page.",
  showBackButton = true
}: AccessDeniedProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldX className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-xl text-red-600">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">{message}</p>
          <div className="space-y-2">
            {showBackButton && (
              <Button asChild className="w-full">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            )}
            <p className="text-xs text-gray-500">
              Contact your administrator if you believe this is an error.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}