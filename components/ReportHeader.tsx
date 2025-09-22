import { Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ReportHeaderProps {
  report: {
    id: string
    customerName: string
    contact: string
    carMakeModel: string
    plateNumber: string
    color: string
    status: string
    date: string
  }
}

export function ReportHeader({ report }: ReportHeaderProps) {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "default"
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "pending estimate":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left Column - Customer and Vehicle Info */}
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Customer</p>
              <p className="text-lg font-semibold">{report.customerName}</p>
              <p className="text-sm text-muted-foreground">{report.contact}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Vehicle</p>
              <p className="text-lg font-semibold">{report.carMakeModel}</p>
              <p className="text-sm text-muted-foreground">{report.color} • {report.plateNumber}</p>
            </div>
          </div>

          {/* Center Column - Report Metadata */}
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Report ID</p>
              <p className="text-lg font-semibold">{report.id}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={getStatusVariant(report.status)}>
                {report.status}
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Report Date</p>
              <p className="text-sm font-medium">{report.date}</p>
            </div>
          </div>

          {/* Right Column - Action Buttons */}
          <div className="flex flex-col gap-2 lg:items-end">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print Report
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}