import { useState } from "react"
import { Camera, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Photo {
  id: number
  name: string
  url?: string
}

interface PhotosTabProps {
  images: Photo[]
  onUploadPhotos?: () => void
}

export function PhotosTab({ images, onUploadPhotos }: PhotosTabProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (images.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
          <Camera className="w-16 h-16 text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No photos uploaded yet</h3>
            <p className="text-muted-foreground">Upload photos to document the vehicle condition and damage</p>
          </div>
          <Button onClick={onUploadPhotos} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upload Photos
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Vehicle Photos</h3>
          <p className="text-sm text-muted-foreground">
            <Badge variant="secondary">{images.length} photos</Badge>
          </p>
        </div>
        <Button onClick={onUploadPhotos} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Upload Photos
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card
            key={image.id}
            className="group cursor-pointer hover:shadow-md transition-all duration-200 overflow-hidden"
            onClick={() => setSelectedImage(image.id)}
          >
            <div className="aspect-square bg-muted flex items-center justify-center relative">
              {image.url ? (
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-muted-foreground" />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate">{image.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {images.find(img => img.id === selectedImage)?.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Camera className="w-16 h-16 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}