"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Link, Mail, MessageSquare } from "lucide-react"
import { toast } from "sonner"

interface ShareReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reportId: string
}

export function ShareReportDialog({ open, onOpenChange, reportId }: ShareReportDialogProps) {
  const [copied, setCopied] = useState(false)

  const reportUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/reports/${reportId}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(reportUrl)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const handleEmailShare = () => {
    const subject = `Vehicle Inspection Report ${reportId}`
    const body = `Please find the vehicle inspection report ${reportId} at: ${reportUrl}`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Report {reportId}</DialogTitle>
          <DialogDescription>
            Share this report with others using the options below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Report Link
            </Label>
            <Input
              id="link"
              value={reportUrl}
              readOnly
              className="h-9"
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-3"
            onClick={handleCopyLink}
          >
            <span className="sr-only">Copy</span>
            {copied ? (
              <div className="w-4 h-4 bg-green-500 rounded" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className="flex items-center gap-2"
          >
            <Link className="w-4 h-4" />
            Copy Link
          </Button>
          <Button
            variant="outline"
            onClick={handleEmailShare}
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Email
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Message
          </Button>
        </div>

        <DialogFooter className="mt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}