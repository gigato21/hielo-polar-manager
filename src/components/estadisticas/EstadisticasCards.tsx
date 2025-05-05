
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEstadisticas } from '@/hooks/useEstadisticas'
import { TrendingUp, TrendingDown } from 'lucide-react'

type EstadisticasCardsProps = {
  dateRange?: { from: Date; to: Date } | undefined;
}

export function EstadisticasCards({ dateRange }: EstadisticasCardsProps) {
  const { data, loading } = useEstadisticas({ dateRange });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Conservadores</CardTitle>
          <CardDescription>Equipos registrados</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[3.75rem] animate-pulse bg-gray-200 dark:bg-gray-800 rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold">{data.totalConservadores}</p>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                <span className="text-green-500 font-medium">+3%</span>
                <span className="ml-1">vs mes anterior</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Mantenimientos</CardTitle>
          <CardDescription>Período seleccionado</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[3.75rem] animate-pulse bg-gray-200 dark:bg-gray-800 rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold">{data.totalMantenimientos}</p>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                <span className="text-green-500 font-medium flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12%
                </span>
                <span className="ml-1">vs período anterior</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Reparaciones</CardTitle>
          <CardDescription>Período seleccionado</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[3.75rem] animate-pulse bg-gray-200 dark:bg-gray-800 rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold">{data.totalReparaciones}</p>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                <span className="text-red-500 font-medium flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +7%
                </span>
                <span className="ml-1">vs período anterior</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Eficiencia</CardTitle>
          <CardDescription>Mantenimientos completados</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[3.75rem] animate-pulse bg-gray-200 dark:bg-gray-800 rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold">{data.eficiencia}%</p>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                <span className="text-green-500 font-medium flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5%
                </span>
                <span className="ml-1">vs período anterior</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
