import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextEditor } from "@/components/rich-text-editor"
import { toast } from "sonner"

interface RemarksTabProps {
  remarks: string
  onRemarksChange: (content: string) => void
}

export function RemarksTab({ remarks, onRemarksChange }: RemarksTabProps) {
  const handleSaveRemarks = () => {
    toast.success("Remarks saved successfully!")
  }

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle>Report Remarks & Corrections</CardTitle>
          <Button onClick={handleSaveRemarks}>
            Save Remarks
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Add additional notes, corrections to AI-generated content, or detailed remarks about this inspection.
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <RichTextEditor
          content={remarks}
          onChange={onRemarksChange}
          placeholder="Add your remarks, corrections, or additional notes here..."
        />
      </CardContent>
    </Card>
  )
}