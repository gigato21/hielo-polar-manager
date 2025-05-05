
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { estado: 'Activo', cantidad: 85 },
  { estado: 'Mantenimiento', cantidad: 12 },
  { estado: 'Reparación', cantidad: 8 },
  { estado: 'Inactivo', cantidad: 15 },
  { estado: 'Retirado', cantidad: 7 },
];

export function EstadoConservadoresChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de Conservadores</CardTitle>
        <CardDescription>Distribución por estado actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="estado" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
