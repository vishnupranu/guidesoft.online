import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Download, Star, Palette, Code2 } from 'lucide-react'
import Link from 'next/link'

interface TemplateCardProps {
  id: string
  name: string
  description: string
  techStack: string[]
  features: string[]
  category: string
  imageUrl?: string
  previewUrl?: string
  rating?: number
  useCount?: number
}

export function TemplateCard({
  id,
  name,
  description,
  techStack,
  features,
  category,
  imageUrl,
  previewUrl,
  rating = 0,
  useCount = 0,
}: TemplateCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-video bg-muted overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Code2 className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-2">
        <h3 className="font-semibold text-base">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-1">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {rating > 0 && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {rating}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            {useCount} uses
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/templates/${id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Template
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}