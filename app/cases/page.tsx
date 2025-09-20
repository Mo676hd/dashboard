"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"
import { NewCaseDialog } from "@/components/new-case-dialog"

const mockCases = [
  {
    id: "CS001",
    customerName: "John Doe",
    carMakeModel: "Toyota Camry 2020",
    plateNumber: "ABC-1234",
    status: "Pending",
    date: "2024-01-15"
  },
  {
    id: "CS002",
    customerName: "Jane Smith",
    carMakeModel: "Honda Civic 2019",
    plateNumber: "XYZ-5678",
    status: "In Progress",
    date: "2024-01-14"
  },
  {
    id: "CS003",
    customerName: "Bob Johnson",
    carMakeModel: "Ford Mustang 2021",
    plateNumber: "DEF-9012",
    status: "Completed",
    date: "2024-01-13"
  },
  {
    id: "CS004",
    customerName: "Alice Brown",
    carMakeModel: "BMW X5 2022",
    plateNumber: "GHI-3456",
    status: "Pending",
    date: "2024-01-12"
  }
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in progress":
      return "bg-blue-100 text-blue-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function CasesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cases</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Case
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Car Make & Model</TableHead>
                <TableHead>Plate Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">
                    <a
                      href={`/cases/${caseItem.id}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {caseItem.id}
                    </a>
                  </TableCell>
                  <TableCell>{caseItem.customerName}</TableCell>
                  <TableCell>{caseItem.carMakeModel}</TableCell>
                  <TableCell>{caseItem.plateNumber}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        caseItem.status
                      )}`}
                    >
                      {caseItem.status}
                    </span>
                  </TableCell>
                  <TableCell>{caseItem.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NewCaseDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}