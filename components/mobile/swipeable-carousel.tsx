"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SwipeableCarouselProps {
  items: React.ReactNode[]
  className?: string
  showDots?: boolean
  showArrows?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  itemsPerView?: number
}

export function SwipeableCarousel({
  items,
  className,
  showDots = true,
  showArrows = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  itemsPerView = 1,
}: SwipeableCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const maxIndex = Math.max(0, items.length - itemsPerView)
  const itemWidth = 100 / itemsPerView

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isDragging) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, maxIndex, isDragging])

  // Update x position when currentIndex changes
  useEffect(() => {
    x.set(-currentIndex * itemWidth)
  }, [currentIndex, itemWidth, x])

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)

    const threshold = 50
    const velocity = info.velocity.x
    const offset = info.offset.x

    if (Math.abs(velocity) > 500 || Math.abs(offset) > threshold) {
      if (offset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (offset < 0 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }

  const goToPrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Carousel Container */}
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex"
          style={{ x: useTransform(x, (value) => `${value}%`) }}
          drag="x"
          dragConstraints={{ left: -maxIndex * itemWidth, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{ x: `${-currentIndex * itemWidth}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0" style={{ width: `${itemWidth}%` }}>
              <div className="px-2">{item}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <Button
            variant="outline"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
            onClick={goToNext}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && items.length > itemsPerView && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/30",
              )}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Auto-play Progress Bar */}
      {autoPlay && !isDragging && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted-foreground/20">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  )
}
