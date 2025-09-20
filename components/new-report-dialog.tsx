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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface NewReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const carMakes = [
  "Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Nissan",
  "Lexus", "Hyundai", "Kia", "Volkswagen", "Subaru", "Mazda"
]

const carModels = {
  "Toyota": ["Camry", "Corolla", "RAV4", "Highlander", "Prius"],
  "Honda": ["Civic", "Accord", "CR-V", "Pilot", "HR-V"],
  "Ford": ["Mustang", "F-150", "Escape", "Explorer", "Focus"],
  "BMW": ["X5", "X3", "3 Series", "5 Series", "X1"],
  "Mercedes": ["C300", "E300", "GLC", "GLE", "A-Class"],
  "Audi": ["A4", "A6", "Q5", "Q7", "A3"],
  "Nissan": ["Altima", "Rogue", "Sentra", "Pathfinder", "Versa"],
  "Lexus": ["ES350", "RX350", "NX300", "GX460", "IS300"],
  "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"],
  "Kia": ["Optima", "Sorento", "Sportage", "Soul", "Forte"],
  "Volkswagen": ["Jetta", "Passat", "Tiguan", "Atlas", "Golf"],
  "Subaru": ["Outback", "Forester", "Impreza", "Crosstrek", "Ascent"],
  "Mazda": ["CX-5", "Mazda3", "CX-9", "Mazda6", "CX-3"]
}

export function NewReportDialog({ open, onOpenChange }: NewReportDialogProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerNumber: "",
    chassisNumber: "",
    make: "",
    model: "",
    year: "",
    color: "",
    plateNumber: "",
    images: [] as File[]
  })

  const availableYears = Array.from({ length: 36 }, (_, i) => (2024 - i).toString())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New report submitted:", formData)
    // Reset form
    setFormData({
      customerName: "",
      customerNumber: "",
      chassisNumber: "",
      make: "",
      model: "",
      year: "",
      color: "",
      plateNumber: "",
      images: []
    })
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (field === "make") {
      setFormData(prev => ({ ...prev, model: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({ ...prev, images: files }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
          <DialogDescription>
            Enter the details for the new report. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 py-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerNumber">Customer Number</Label>
                <Input
                  id="customerNumber"
                  value={formData.customerNumber}
                  onChange={(e) => handleInputChange("customerNumber", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chassisNumber">Chassis Number</Label>
                <Input
                  id="chassisNumber"
                  value={formData.chassisNumber}
                  onChange={(e) => handleInputChange("chassisNumber", e.target.value)}
                  placeholder="VIN"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Select value={formData.make} onValueChange={(value) => handleInputChange("make", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {carMakes.map((make) => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select
                  value={formData.model}
                  onValueChange={(value) => handleInputChange("model", value)}
                  disabled={!formData.make}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.make ? "Select model" : "Select make first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.make && carModels[formData.make as keyof typeof carModels]?.map((model) => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  placeholder="e.g., Silver, Black, White"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plateNumber">Plate Number</Label>
                <Input
                  id="plateNumber"
                  value={formData.plateNumber}
                  onChange={(e) => handleInputChange("plateNumber", e.target.value)}
                  placeholder="ABC-1234"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Upload Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="text-gray-400 mb-2">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">
                      {formData.images.length > 0
                        ? `${formData.images.length} file(s) selected`
                        : "Click to upload images or drag and drop"
                      }
                    </span>
                    <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB each</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Report</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}