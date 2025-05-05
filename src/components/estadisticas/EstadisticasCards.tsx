
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function EstadisticasCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Conservadores</CardTitle>
          <CardDescription>Equipos registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">127</p>
          <div className="text-xs text-muted-foreground mt-1 flex items-center">
            <span className="text-green-500 font-medium">+3%</span>
            <span className="ml-1">vs mes anterior</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Mantenimientos</CardTitle>
          <CardDescription>Último mes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">42</p>
          <div className="text-xs text-muted-foreground mt-1 flex items-center">
            <span className="text-green-500 font-medium">+12%</span>
            <span className="ml-1">vs mes anterior</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Reparaciones</CardTitle>
          <CardDescription>Último mes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">18</p>
          <div className="text-xs text-muted-foreground mt-1 flex items-center">
            <span className="text-red-500 font-medium">+7%</span>
            <span className="ml-1">vs mes anterior</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Eficiencia</CardTitle>
          <CardDescription>Promedio general</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">87%</p>
          <div className="text-xs text-muted-foreground mt-1 flex items-center">
            <span className="text-green-500 font-medium">+5%</span>
            <span className="ml-1">vs mes anterior</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
