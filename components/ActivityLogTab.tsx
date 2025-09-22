import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActivityItem {
  status: string
  date: string
  description: string
  isActive?: boolean
}

interface ActivityLogTabProps {
  activities: ActivityItem[]
}

export function ActivityLogTab({ activities }: ActivityLogTabProps) {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "default"
      case "in progress":
        return "default"
      case "pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500"
      case "in progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Status Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 group">
              <div className={`relative mt-1`}>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(activity.status)} ${activity.isActive ? 'ring-4 ring-blue-200' : ''}`}></div>
                {index < activities.length - 1 && (
                  <div className="absolute top-3 left-1.5 w-0.5 h-16 bg-border"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium">{activity.description}</p>
                  <Badge
                    variant={getStatusVariant(activity.status)}
                    className={`shrink-0 ${activity.isActive ? 'bg-blue-500 hover:bg-blue-500' : ''}`}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}