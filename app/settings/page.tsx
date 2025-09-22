"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { PageProtection } from "@/components/page-protection"
import Link from "next/link"
import {
  Palette,
  Bell,
  FileText,
  Users,
  Shield,
  Database,
  Moon,
  Sun,
  Globe,
  Mail,
  MessageSquare,
} from "lucide-react"

export default function SettingsPage() {
  const [systemTheme, setSystemTheme] = useState("light")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [defaultReportTemplate, setDefaultReportTemplate] = useState("standard")

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNewReports: true,
    emailReportUpdates: true,
    emailSystemAlerts: true,
    emailWeeklyDigest: false,
    pushNewReports: true,
    pushReportUpdates: true,
    pushSystemAlerts: true,
    pushReminders: false,
  })

  const mockUsers = [
    { id: 1, name: "John Smith", email: "john@company.com", role: "Admin" },
    { id: 2, name: "Sarah Johnson", email: "sarah@company.com", role: "User" },
    { id: 3, name: "Mike Davis", email: "mike@company.com", role: "User" },
  ]

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!")
  }

  const handleExportData = () => {
    toast.success("Data export started! You'll receive an email when it's ready.")
  }

  const handleImportData = () => {
    toast.info("Data import feature coming soon!")
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: checked
    }))
  }

  
  return (
    <PageProtection requiredRoute="settings">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
              <p className="text-muted-foreground">
                Manage application-wide settings and configurations
              </p>
            </div>
            <Button onClick={handleSaveSettings}>
              Save All Settings
            </Button>
          </div>
        </div>

        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">System Theme</Label>
                  <Select value={systemTheme} onValueChange={setSystemTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          Light Mode
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          Dark Mode
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          System Default
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact Mode</p>
                      <p className="text-sm text-muted-foreground">Use more compact UI elements</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">High Contrast</p>
                      <p className="text-sm text-muted-foreground">Improve readability</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Master Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Real-time browser alerts</p>
                      </div>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>

                <Separator />

                {/* Email Notification Preferences */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <Label className="font-medium">Email Notification Types</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email-new-reports"
                        checked={notificationSettings.emailNewReports}
                        onCheckedChange={(checked) => handleNotificationChange("emailNewReports", checked as boolean)}
                        disabled={!emailNotifications}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="email-new-reports"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          New Reports
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Get notified when new reports are created
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email-report-updates"
                        checked={notificationSettings.emailReportUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("emailReportUpdates", checked as boolean)}
                        disabled={!emailNotifications}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="email-report-updates"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Report Updates
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Changes to existing reports
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email-system-alerts"
                        checked={notificationSettings.emailSystemAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("emailSystemAlerts", checked as boolean)}
                        disabled={!emailNotifications}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="email-system-alerts"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          System Alerts
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Important system notifications
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email-weekly-digest"
                        checked={notificationSettings.emailWeeklyDigest}
                        onCheckedChange={(checked) => handleNotificationChange("emailWeeklyDigest", checked as boolean)}
                        disabled={!emailNotifications}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="email-weekly-digest"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Weekly Digest
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Summary of weekly activity
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Push Notification Preferences */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <Label className="font-medium">Push Notification Types</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="push-new-reports"
                        checked={notificationSettings.pushNewReports}
                        onCheckedChange={(checked) => handleNotificationChange("pushNewReports", checked as boolean)}
                        disabled={!pushNotifications}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="push-new-reports"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          New Reports
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Instant notifications for new reports
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="push-report-updates"
                        checked={notificationSettings.pushReportUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("pushReportUpdates", checked as boolean)}
                        disabled={!pushNotifications}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="push-report-updates"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Report Updates
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Real-time report changes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="push-system-alerts"
                        checked={notificationSettings.pushSystemAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("pushSystemAlerts", checked as boolean)}
                        disabled={!pushNotifications}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="push-system-alerts"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          System Alerts
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Critical system notifications
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="push-reminders"
                        checked={notificationSettings.pushReminders}
                        onCheckedChange={(checked) => handleNotificationChange("pushReminders", checked as boolean)}
                        disabled={!pushNotifications}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="push-reminders"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Reminders
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Task and deadline reminders
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Report Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template">Default Report Template</Label>
                  <Select value={defaultReportTemplate} onValueChange={setDefaultReportTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select default template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Inspection Report</SelectItem>
                      <SelectItem value="detailed">Detailed Analysis Report</SelectItem>
                      <SelectItem value="summary">Quick Summary Report</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    This template will be pre-selected when creating new reports
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Template Management</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Manage Existing Templates
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Create Custom Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Import Template
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Auto-numbering Settings</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="prefix" className="text-sm">Report Prefix</Label>
                      <Input id="prefix" placeholder="RPT" defaultValue="RPT" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="separator" className="text-sm">Separator</Label>
                      <Select defaultValue="-">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="-">Hyphen (-)</SelectItem>
                          <SelectItem value="_">Underscore (_)</SelectItem>
                          <SelectItem value="/">Slash (/)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Example: RPT-001, RPT-002, RPT-003...
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Link href="/team">
                  <Button className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Manage All Users
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleExportData}>
                    Export Data
                  </Button>
                  <Button variant="outline" onClick={handleImportData}>
                    Import Data
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Data Retention Policy</Label>
                  <Select defaultValue="12months">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="12months">12 Months</SelectItem>
                      <SelectItem value="24months">24 Months</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Password Policy</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (6+ chars)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, numbers, letters)</SelectItem>
                      <SelectItem value="strong">Strong (12+ chars, special chars)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageProtection>
  )
}