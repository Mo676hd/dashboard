import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RepairItem {
  item: string
  action: string
  estimatedCost: string
}

interface DamageAssessmentTabProps {
  repairs: RepairItem[]
}

export function DamageAssessmentTab({ repairs }: DamageAssessmentTabProps) {
  const totalCost = repairs.reduce((sum, repair) => {
    return sum + parseFloat(repair.estimatedCost.replace(/[$,]/g, ""))
  }, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Damage Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                    <p className="text-2xl font-bold">{repairs.length}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    All
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Repairable</p>
                    <p className="text-2xl font-bold">
                      {repairs.filter(r => r.action === "Repair").length}
                    </p>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Repair
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Replace</p>
                    <p className="text-2xl font-bold">
                      {repairs.filter(r => r.action === "Replace").length}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Replace
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Repair Items List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Repair/Replace Items</h4>
            {repairs.map((repair, index) => (
              <Card key={index} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="font-medium">{repair.item}</p>
                      <Badge
                        variant={repair.action === "Repair" ? "default" : "outline"}
                        className={repair.action === "Repair"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "text-orange-600 border-orange-600"
                        }
                      >
                        {repair.action}
                      </Badge>
                    </div>
                    <p className="font-semibold text-lg">{repair.estimatedCost}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Total Cost */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Estimated Total</p>
                <p className="text-2xl font-bold text-primary">${totalCost.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}