import { cn } from "@/lib/utils"

export function CompanyLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">C</span>
      </div>
      <span className="font-semibold text-lg">CarInspect</span>
    </div>
  )
}