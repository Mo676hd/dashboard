import { Car, Camera, FileText, Activity } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "damage", label: "Damage Assessment", icon: Car },
    { id: "photos", label: "Photos", icon: Camera },
    { id: "remarks", label: "Remarks", icon: FileText },
    { id: "activity", label: "Activity Log", icon: Activity },
  ]

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList className="grid w-full grid-cols-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}