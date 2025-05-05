
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Ene', mantenimientos: 20, reparaciones: 12 },
  { name: 'Feb', mantenimientos: 15, reparaciones: 10 },
  { name: 'Mar', mantenimientos: 25, reparaciones: 8 },
  { name: 'Abr', mantenimientos: 22, reparaciones: 15 },
  { name: 'May', mantenimientos: 30, reparaciones: 18 },
  { name: 'Jun', mantenimientos: 27, reparaciones: 12 },
  { name: 'Jul', mantenimientos: 40, reparaciones: 20 },
  { name: 'Ago', mantenimientos: 35, reparaciones: 22 },
  { name: 'Sep', mantenimientos: 42, reparaciones: 15 },
  { name: 'Oct', mantenimientos: 30, reparaciones: 14 },
  { name: 'Nov', mantenimientos: 35, reparaciones: 16 },
  { name: 'Dic', mantenimientos: 25, reparaciones: 10 },
];

export function ServiciosChart() {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Servicios por Mes</CardTitle>
        <CardDescription>Mantenimientos y reparaciones durante el año</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="mantenimientos" 
                stroke="#2563eb" 
                strokeWidth={2} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="reparaciones" 
                stroke="#dc2626" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
