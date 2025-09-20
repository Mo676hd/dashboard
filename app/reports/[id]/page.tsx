"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Camera, FileText, CheckCircle } from "lucide-react"
import { SelectTriggerProps } from "@radix-ui/react-select"

const mockReport = {
  id: "CS001",
  customerName: "John Doe",
  contact: "+1 (555) 123-4567",
  carMakeModel: "Toyota Camry 2020",
  plateNumber: "ABC-1234",
  color: "Silver",
  status: "In Progress",
  date: "2024-01-15"
}

const mockImages = [
  { id: 1, name: "Front View" },
  { id: 2, name: "Side View" },
  { id: 3, name: "Rear View" },
  { id: 4, name: "Interior" }
]

const mockRepairs = [
  { item: "Front Bumper", action: "Repair", estimatedCost: "$500" },
  { item: "Headlight", action: "Replace", estimatedCost: "$200" },
  { item: "Door Dent", action: "Repair", estimatedCost: "$300" }
]

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState(mockReport.status)

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/reports">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Report {mockReport.id}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{mockReport.customerName}</p>
            <p className="text-sm text-gray-600">{mockReport.contact}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{mockReport.carMakeModel}</p>
            <p className="text-sm text-gray-600">{mockReport.color} • {mockReport.plateNumber}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="images" className="space-y-4">
        <TabsList>
          <TabsTrigger value="images" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="report" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Report
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Report Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockImages.map((image) => (
                  <div key={image.id} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report">
          <Card>
            <CardHeader>
              <CardTitle>Damage Assessment Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Repair/Replace Items</h4>
                <div className="space-y-2">
                  {mockRepairs.map((repair, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{repair.item}</p>
                        <p className="text-sm text-gray-600">{repair.action}</p>
                      </div>
                      <p className="font-semibold">{repair.estimatedCost}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Notes</h4>
                <p className="text-gray-600">
                  Front bumper shows significant damage from collision. Passenger side headlight cracked and needs replacement.
                  Minor door dent on driver side. Overall repairable condition.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Report Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Report Created</p>
                    <p className="text-sm text-gray-600">January 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Initial Assessment</p>
                    <p className="text-sm text-gray-600">January 16, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">In Progress</p>
                    <p className="text-sm text-gray-600">January 17, 2024 - Present</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}