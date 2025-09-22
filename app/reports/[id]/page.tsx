"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { RichTextEditor } from "@/components/rich-text-editor"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import { ReportHeader } from "@/components/ReportHeader"
import { TabNavigation } from "@/components/TabNavigation"
import { PhotosTab } from "@/components/PhotosTab"
import { DamageAssessmentTab } from "@/components/DamageAssessmentTab"
import { RemarksTab } from "@/components/RemarksTab"
import { ActivityLogTab } from "@/components/ActivityLogTab"

const mockReport = {
  id: "RPT-001",
  customerName: "John Doe",
  contact: "+973 33393139",
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

const mockActivities = [
  { status: "Completed", date: "January 15, 2024", description: "Report Created" },
  { status: "Completed", date: "January 16, 2024", description: "Initial Assessment" },
  { status: "In Progress", date: "January 17, 2024 - Present", description: "Repair Work", isActive: true },
  { status: "Pending", date: "Pending", description: "Quality Check" }
]

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("damage")
  const [remarks, setRemarks] = useState(`
    <h4>Initial Assessment:</h4>
    <p>Front bumper shows significant damage from collision. Passenger side headlight cracked and needs replacement. Minor door dent on driver side.</p>

    <h4>AI Generated Report:</h4>
    <p>Based on the uploaded images, this vehicle has sustained moderate frontal damage. The AI system identified the following issues:</p>
    <ul>
      <li>Front bumper: Requires complete replacement</li>
      <li>Headlight assembly: Cracked, needs replacement</li>
      <li>Driver side door: Minor dent, can be repaired</li>
    </ul>

    <p><em>Use this editor to add corrections, additional remarks, or override AI-generated content.</em></p>
  `)

  const handleUploadPhotos = () => {
    toast.success("Photo upload functionality would be implemented here")
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "damage":
        return <DamageAssessmentTab repairs={mockRepairs} />
      case "photos":
        return <PhotosTab images={mockImages} onUploadPhotos={handleUploadPhotos} />
      case "remarks":
        return <RemarksTab remarks={remarks} onRemarksChange={setRemarks} />
      case "activity":
        return <ActivityLogTab activities={mockActivities} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/reports">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Reports
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">
            Report {mockReport.id}
          </h1>
        </div>

        <ReportHeader report={mockReport} />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <Card className="p-6">
          {renderTabContent()}
        </Card>
      </div>
    </div>
  )
}