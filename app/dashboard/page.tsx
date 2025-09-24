import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { RoleSwitcher } from "@/components/role-switcher"

import data from "./data.json"

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <RoleSwitcher />
      <SectionCards />
      <div className="px-4 lg:px-6">
        <h2 className="text-2xl font-bold tracking-tight">Recent Reports</h2>
        <p className="text-muted-foreground">
          Latest 10 inspection reports
        </p>
      </div>
      <div className="px-4 lg:px-6">
        <DataTable data={data} />
      </div>
    </div>
  )
}
