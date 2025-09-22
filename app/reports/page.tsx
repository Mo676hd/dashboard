"use client"

import { useState } from "react"
import React from "react"
import { NewReportDialog } from "@/components/new-report-dialog"
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
import { Plus, Search, Eye, Printer, Share2, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ShareReportDialog } from "@/components/share-report-dialog"

const mockReports = [
  {
    id: "RPT-001",
    customerName: "John Doe",
    customerContact: "+973 33393139",
    plateNumber: "ABC-1234",
    chassisNumber: "1HGBH41JXMN109186",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "Silver",
    status: "Pending",
    date: "2024-01-15"
  },
  {
    id: "RPT-002",
    customerName: "Jane Smith",
    customerContact: "+973 33393140",
    plateNumber: "XYZ-5678",
    chassisNumber: "2HGBP26F1XM543210",
    make: "Honda",
    model: "Civic",
    year: 2021,
    color: "Blue",
    status: "In Progress",
    date: "2024-01-14"
  },
  {
    id: "RPT-003",
    customerName: "Bob Johnson",
    customerContact: "+973 33393141",
    plateNumber: "DEF-9012",
    chassisNumber: "1FAFP404XYF123456",
    make: "Ford",
    model: "Mustang",
    year: 2022,
    color: "Red",
    status: "Completed",
    date: "2024-01-13"
  },
  {
    id: "RPT-004",
    customerName: "Alice Brown",
    customerContact: "+973 33393142",
    plateNumber: "GHI-3456",
    chassisNumber: "5UXKR0C54B098765",
    make: "BMW",
    model: "X5",
    year: 2023,
    color: "Black",
    status: "Pending",
    date: "2024-01-12"
  },
  {
    id: "RPT-005",
    customerName: "Charlie Wilson",
    customerContact: "+973 33393143",
    plateNumber: "JKL-7890",
    chassisNumber: "WDDGF81X56A543210",
    make: "Mercedes",
    model: "C300",
    year: 2021,
    color: "White",
    status: "In Progress",
    date: "2024-01-11"
  },
  {
    id: "RPT-006",
    customerName: "Diana Martinez",
    customerContact: "+973 33393144",
    plateNumber: "MNO-1234",
    chassisNumber: "WAUVC68T48A123456",
    make: "Audi",
    model: "A4",
    year: 2022,
    color: "Gray",
    status: "Completed",
    date: "2024-01-10"
  },
  {
    id: "RPT-007",
    customerName: "Edward Taylor",
    customerContact: "+973 33393145",
    plateNumber: "PQR-5678",
    chassisNumber: "JTHBJ46G775123456",
    make: "Lexus",
    model: "ES350",
    year: 2020,
    color: "Gold",
    status: "Pending",
    date: "2024-01-09"
  },
  {
    id: "RPT-008",
    customerName: "Fiona Davis",
    customerContact: "+973 33393146",
    plateNumber: "STU-9012",
    chassisNumber: "1HGCM82633A123456",
    make: "Honda",
    model: "Accord",
    year: 2021,
    color: "Silver",
    status: "In Progress",
    date: "2024-01-08"
  },
  {
    id: "RPT-009",
    customerName: "George Brown",
    customerContact: "+973 33393147",
    plateNumber: "VWX-3456",
    chassisNumber: "2T3BF4DV8BW098765",
    make: "Toyota",
    model: "RAV4",
    year: 2023,
    color: "Blue",
    status: "Completed",
    date: "2024-01-07"
  },
  {
    id: "RPT-010",
    customerName: "Helen Johnson",
    customerContact: "+973 33393148",
    plateNumber: "YZA-7890",
    chassisNumber: "1N4AA6AP7CC123456",
    make: "Nissan",
    model: "Altima",
    year: 2022,
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
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null)

  const handleViewReport = (id: string) => {
    window.location.href = `/reports/${id}`
  }

  const handlePrintReport = (id: string) => {
    toast.info(`Preparing print preview for report ${id}...`)
    // In a real app, this would open print preview
    setTimeout(() => {
      window.open(`/reports/${id}`, '_blank')
    }, 500)
  }

  const handleShareReport = (id: string) => {
    setSelectedReportId(id)
    setShareDialogOpen(true)
  }

  const toggleRowExpansion = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const filteredReports = mockReports.filter(report =>
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.customerContact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
          </div>
          <p className="text-muted-foreground">
            Manage all vehicle inspection reports
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by Report ID, Plate Number, or Customer Contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-6">
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
                  <React.Fragment key={reportItem.id}>
                    <TableRow
                      key={reportItem.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleRowExpansion(reportItem.id)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              expandedRow === reportItem.id ? 'rotate-180' : ''
                            }`}
                          />
                          <span className="text-primary hover:text-primary/80">
                            {reportItem.id}
                          </span>
                        </div>
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

                    <TableRow>
                      <TableCell colSpan={9} className="p-0">
                        <div
                          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top"
                          style={{
                            maxHeight: expandedRow === reportItem.id ? '200px' : '0px',
                            opacity: expandedRow === reportItem.id ? 1 : 0,
                            transform: expandedRow === reportItem.id ? 'translateY(0)' : 'translateY(-10px)'
                          }}
                        >
                          <Card className="m-4">
                          <CardContent className="p-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleViewReport(reportItem.id)
                                }}
                                className="flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePrintReport(reportItem.id)
                                }}
                                className="flex items-center gap-2"
                              >
                                <Printer className="w-4 h-4" />
                                Print
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleShareReport(reportItem.id)
                                }}
                                className="flex items-center gap-2"
                              >
                                <Share2 className="w-4 h-4" />
                                Share
                              </Button>
                            </div>
                          </CardContent>
                          </Card>
                        </div>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <NewReportDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <ShareReportDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        reportId={selectedReportId || ""}
      />
    </div>
  )
}