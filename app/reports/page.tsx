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
import { Plus, Search } from "lucide-react"
import { NewReportDialog } from "@/components/new-report-dialog"
import { Input } from "@/components/ui/input"

const mockReports = [
  {
    id: "RP001",
    customerName: "John Doe",
    customerContact: "+1 (555) 123-4567",
    plateNumber: "ABC-1234",
    chassisNumber: "1HGBH41JXMN109186",
    make: "Toyota",
    model: "Camry",
    color: "Silver",
    status: "Pending",
    date: "2024-01-15"
  },
  {
    id: "RP002",
    customerName: "Jane Smith",
    customerContact: "+1 (555) 234-5678",
    plateNumber: "XYZ-5678",
    chassisNumber: "2HGBP26F1XM543210",
    make: "Honda",
    model: "Civic",
    color: "Blue",
    status: "In Progress",
    date: "2024-01-14"
  },
  {
    id: "RP003",
    customerName: "Bob Johnson",
    customerContact: "+1 (555) 345-6789",
    plateNumber: "DEF-9012",
    chassisNumber: "1FAFP404XYF123456",
    make: "Ford",
    model: "Mustang",
    color: "Red",
    status: "Completed",
    date: "2024-01-13"
  },
  {
    id: "RP004",
    customerName: "Alice Brown",
    customerContact: "+1 (555) 456-7890",
    plateNumber: "GHI-3456",
    chassisNumber: "5UXKR0C54B098765",
    make: "BMW",
    model: "X5",
    color: "Black",
    status: "Pending",
    date: "2024-01-12"
  },
  {
    id: "RP005",
    customerName: "Charlie Wilson",
    customerContact: "+1 (555) 567-8901",
    plateNumber: "JKL-7890",
    chassisNumber: "WDDGF81X56A543210",
    make: "Mercedes",
    model: "C300",
    color: "White",
    status: "In Progress",
    date: "2024-01-11"
  },
  {
    id: "RP006",
    customerName: "Diana Martinez",
    customerContact: "+1 (555) 678-9012",
    plateNumber: "MNO-1234",
    chassisNumber: "WAUVC68T48A123456",
    make: "Audi",
    model: "A4",
    color: "Gray",
    status: "Completed",
    date: "2024-01-10"
  },
  {
    id: "RP007",
    customerName: "Edward Taylor",
    customerContact: "+1 (555) 789-0123",
    plateNumber: "PQR-5678",
    chassisNumber: "JTHBJ46G775123456",
    make: "Lexus",
    model: "ES350",
    color: "Gold",
    status: "Pending",
    date: "2024-01-09"
  },
  {
    id: "RP008",
    customerName: "Fiona Davis",
    customerContact: "+1 (555) 890-1234",
    plateNumber: "STU-9012",
    chassisNumber: "1HGCM82633A123456",
    make: "Honda",
    model: "Accord",
    color: "Silver",
    status: "In Progress",
    date: "2024-01-08"
  },
  {
    id: "RP009",
    customerName: "George Brown",
    customerContact: "+1 (555) 901-2345",
    plateNumber: "VWX-3456",
    chassisNumber: "2T3BF4DV8BW098765",
    make: "Toyota",
    model: "RAV4",
    color: "Blue",
    status: "Completed",
    date: "2024-01-07"
  },
  {
    id: "RP010",
    customerName: "Helen Johnson",
    customerContact: "+1 (555) 012-3456",
    plateNumber: "YZA-7890",
    chassisNumber: "1N4AA6AP7CC123456",
    make: "Nissan",
    model: "Altima",
    color: "White",
    status: "Pending",
    date: "2024-01-06"
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

export default function ReportsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReports = mockReports.filter(report =>
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.customerContact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by Report ID, Plate Number, or Customer Contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Contact Number</TableHead>
                <TableHead>Plate Number</TableHead>
                <TableHead>Chassis Number</TableHead>
                <TableHead>Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((reportItem) => (
                <TableRow key={reportItem.id}>
                  <TableCell className="font-medium">
                    <a
                      href={`/reports/${reportItem.id}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {reportItem.id}
                    </a>
                  </TableCell>
                  <TableCell>{reportItem.customerName}</TableCell>
                  <TableCell>{reportItem.customerContact}</TableCell>
                  <TableCell>{reportItem.plateNumber}</TableCell>
                  <TableCell className="font-mono text-sm">{reportItem.chassisNumber}</TableCell>
                  <TableCell>{reportItem.make}</TableCell>
                  <TableCell>{reportItem.model}</TableCell>
                  <TableCell>{reportItem.color}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        reportItem.status
                      )}`}
                    >
                      {reportItem.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NewReportDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}