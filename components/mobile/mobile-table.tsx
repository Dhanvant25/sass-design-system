"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface MobileTableProps {
  data: any[]
  columns: {
    key: string
    label: string
    primary?: boolean
    render?: (value: any, row: any) => React.ReactNode
  }[]
  actions?: {
    label: string
    onClick: (row: any) => void
    variant?: "default" | "destructive"
  }[]
  className?: string
}

export function MobileTable({ data, columns, actions, className }: MobileTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRows(newExpanded)
  }

  const primaryColumns = columns.filter((col) => col.primary)
  const secondaryColumns = columns.filter((col) => !col.primary)

  return (
    <div className={cn("space-y-3", className)}>
      {data.map((row, index) => {
        const isExpanded = expandedRows.has(index)

        return (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Primary Row - Always Visible */}
              <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleRow(index)}>
                <div className="flex-1 space-y-1">
                  {primaryColumns.map((column) => (
                    <div key={column.key} className="flex items-center gap-2">
                      {column.render ? (
                        column.render(row[column.key], row)
                      ) : (
                        <span className="font-medium text-foreground">{row[column.key]}</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {actions && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {actions.map((action, actionIndex) => (
                          <DropdownMenuItem
                            key={actionIndex}
                            onClick={() => action.onClick(row)}
                            className={cn(action.variant === "destructive" && "text-destructive")}
                          >
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  {secondaryColumns.length > 0 && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </div>

              {/* Secondary Row - Expandable */}
              <AnimatePresence>
                {isExpanded && secondaryColumns.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-border/50"
                  >
                    <div className="p-4 pt-3 space-y-3 bg-muted/20">
                      {secondaryColumns.map((column) => (
                        <div key={column.key} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{column.label}</span>
                          <div className="text-sm font-medium">
                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
