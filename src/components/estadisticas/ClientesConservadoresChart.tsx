
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { useEstadisticas } from '@/hooks/useEstadisticas'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed'];

type ClientesConservadoresChartProps = {
  dateRange?: { from: Date; to: Date } | undefined;
}

export function ClientesConservadoresChart({ dateRange }: ClientesConservadoresChartProps) {
  const { data, loading, error } = useEstadisticas({ dateRange });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conservadores por Cliente</CardTitle>
        <CardDescription>Distribución de equipos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse text-muted-foreground">Cargando datos...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500">
              {error}
            </div>
          ) : data.conservadoresPorCliente.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.conservadoresPorCliente}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.conservadoresPorCliente.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No hay datos disponibles
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
