
import { useState, useEffect } from 'react'
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
import { supabase } from '@/integrations/supabase/client'
import { format, subMonths, startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns'
import { es } from 'date-fns/locale'

type ServiciosChartProps = {
  dateRange?: { from: Date; to: Date } | undefined;
}

export function ServiciosChart({ dateRange }: ServiciosChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiciosData = async () => {
      try {
        setLoading(true);

        // Default to last 12 months if no date range provided
        const endDate = dateRange?.to || new Date();
        const startDate = dateRange?.from || subMonths(endDate, 11);
        
        // Generate array of all months in the range
        const monthsRange = eachMonthOfInterval({ 
          start: startOfMonth(startDate), 
          end: endOfMonth(endDate) 
        });
        
        // Initialize data structure with all months
        const monthsData = monthsRange.map(date => ({
          date,
          name: format(date, 'MMM', { locale: es }),
          mantenimientos: 0,
          reparaciones: 0
        }));

        // Fetch mantenimientos by month
        const { data: mantenimientosData, error: mantenimientosError } = await supabase
          .from('mantenimientos')
          .select('fecha_realizado')
          .gte('fecha_realizado', startDate.toISOString().split('T')[0])
          .lte('fecha_realizado', endDate.toISOString().split('T')[0])
          .not('fecha_realizado', 'is', null);
          
        if (mantenimientosError) throw mantenimientosError;
        
        // Count mantenimientos by month
        if (mantenimientosData) {
          mantenimientosData.forEach(item => {
            if (item.fecha_realizado) {
              const date = new Date(item.fecha_realizado);
              const monthIndex = monthsData.findIndex(m => 
                m.date.getMonth() === date.getMonth() && 
                m.date.getFullYear() === date.getFullYear()
              );
              
              if (monthIndex !== -1) {
                monthsData[monthIndex].mantenimientos += 1;
              }
            }
          });
        }
        
        // Fetch reparaciones by month
        const { data: reparacionesData, error: reparacionesError } = await supabase
          .from('reparaciones')
          .select('fecha_reparacion')
          .gte('fecha_reparacion', startDate.toISOString().split('T')[0])
          .lte('fecha_reparacion', endDate.toISOString().split('T')[0])
          .not('fecha_reparacion', 'is', null);
          
        if (reparacionesError) throw reparacionesError;
        
        // Count reparaciones by month
        if (reparacionesData) {
          reparacionesData.forEach(item => {
            if (item.fecha_reparacion) {
              const date = new Date(item.fecha_reparacion);
              const monthIndex = monthsData.findIndex(m => 
                m.date.getMonth() === date.getMonth() && 
                m.date.getFullYear() === date.getFullYear()
              );
              
              if (monthIndex !== -1) {
                monthsData[monthIndex].reparaciones += 1;
              }
            }
          });
        }

        // Format data for the chart (remove the date object)
        setData(monthsData.map(({ date, ...rest }) => rest));
      } catch (err) {
        console.error('Error fetching servicios data:', err);
        setError('Error al cargar los datos de servicios');
      } finally {
        setLoading(false);
      }
    };

    fetchServiciosData();
  }, [dateRange]);

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Servicios por Mes</CardTitle>
        <CardDescription>Mantenimientos y reparaciones durante el período</CardDescription>
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
          ) : (
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
                  name="Mantenimientos"
                  stroke="#2563eb" 
                  strokeWidth={2} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="reparaciones" 
                  name="Reparaciones"
                  stroke="#dc2626" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
