"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PageProtection } from "@/components/page-protection"
import { Users, Crown, Wrench } from "lucide-react"

const mockTeam = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Super User",
    department: "Management",
    status: "Active",
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Service Advisor",
    department: "Service",
    status: "Active",
    joinDate: "2023-03-20"
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@company.com",
    role: "Service Advisor",
    department: "Service",
    status: "Active",
    joinDate: "2023-05-10"
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily.wilson@company.com",
    role: "Service Advisor",
    department: "Service",
    status: "Active",
    joinDate: "2023-07-08"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@company.com",
    role: "Super User",
    department: "Management",
    status: "Active",
    joinDate: "2022-11-12"
  },
  {
    id: 6,
    name: "Lisa Garcia",
    email: "lisa.garcia@company.com",
    role: "Service Advisor",
    department: "Service",
    status: "Inactive",
    joinDate: "2023-02-28"
  }
]

const getRoleBadgeColor = (role: string) => {
  switch (role.toLowerCase()) {
    case "super user":
      return "bg-purple-100 text-purple-800"
    case "service advisor":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function TeamPage() {
  return (
    <PageProtection requiredRoute="team">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight">Team</h1>
            </div>
            <p className="text-muted-foreground">
              Manage staff members and roles
            </p>
          </div>
        </div>
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Team Members
                </CardTitle>
                <Users className="w-8 h-8 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockTeam.length}</div>
                <p className="text-xs text-muted-foreground">
                  {mockTeam.filter(member => member.status === "Active").length} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Super Users
                </CardTitle>
                <Crown className="w-8 h-8 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockTeam.filter(member => member.role === "Super User").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Administrators
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Service Advisors
                </CardTitle>
                <Wrench className="w-8 h-8 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockTeam.filter(member => member.role === "Service Advisor").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Frontline staff
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTeam.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        {member.name}
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(member.role)}>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(member.status)}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageProtection>
  )
}