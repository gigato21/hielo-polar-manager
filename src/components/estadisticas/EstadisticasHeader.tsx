
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Download, FileText, Printer } from 'lucide-react'

type EstadisticasHeaderProps = {
  dateRange: { from: Date; to: Date } | undefined
  setDateRange: (range: { from: Date; to: Date } | undefined) => void
}

export function EstadisticasHeader({ dateRange, setDateRange }: EstadisticasHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
      <div>
        <h1 className="text-3xl font-bold">Estadísticas</h1>
        <p className="text-muted-foreground">
          Análisis de rendimiento y estado del sistema
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>
    </div>
  )
}
