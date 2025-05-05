
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EstadisticasHeader } from '@/components/estadisticas/EstadisticasHeader'
import { EstadisticasCards } from '@/components/estadisticas/EstadisticasCards'
import { ServiciosChart } from '@/components/estadisticas/ServiciosChart'
import { ClientesConservadoresChart } from '@/components/estadisticas/ClientesConservadoresChart'
import { EstadoConservadoresChart } from '@/components/estadisticas/EstadoConservadoresChart'

export function EstadisticasPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  })

  return (
    <div className="container mx-auto py-6">
      <EstadisticasHeader dateRange={dateRange} setDateRange={setDateRange} />
      
      <EstadisticasCards />
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="mantenimiento">Mantenimiento</TabsTrigger>
          <TabsTrigger value="reparaciones">Reparaciones</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ServiciosChart />
            <ClientesConservadoresChart />
            <EstadoConservadoresChart />
          </div>
        </TabsContent>
        
        <TabsContent value="mantenimiento">
          <div className="bg-white dark:bg-black p-6 rounded-md border">
            <p className="text-muted-foreground">Las estadísticas detalladas de mantenimiento se implementarán próximamente.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="reparaciones">
          <div className="bg-white dark:bg-black p-6 rounded-md border">
            <p className="text-muted-foreground">Las estadísticas detalladas de reparaciones se implementarán próximamente.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="clientes">
          <div className="bg-white dark:bg-black p-6 rounded-md border">
            <p className="text-muted-foreground">Las estadísticas detalladas por cliente se implementarán próximamente.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
