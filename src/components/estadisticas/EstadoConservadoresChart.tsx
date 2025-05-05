
import { useEffect, useState } from 'react'
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
import { supabase } from '@/integrations/supabase/client'

type EstadoCount = {
  estado: string;
  cantidad: number;
};

export function EstadoConservadoresChart() {
  const [data, setData] = useState<EstadoCount[]>([
    { estado: 'Activo', cantidad: 0 },
    { estado: 'Mantenimiento', cantidad: 0 },
    { estado: 'Reparación', cantidad: 0 },
    { estado: 'Inactivo', cantidad: 0 },
    { estado: 'Retirado', cantidad: 0 },
  ]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEstadoConservadores() {
      try {
        setLoading(true);
        
        // Get count of conservadores by status
        const { data: conservadores, error } = await supabase
          .from('conservadores')
          .select('status, count(*)')
          .group('status');
          
        if (error) {
          throw error;
        }
        
        // Process the data for the chart
        if (conservadores) {
          // Create a map of the initial data structure
          const statusMap: Record<string, number> = {
            'activo': 0,
            'mantenimiento': 0,
            'reparacion': 0, 
            'inactivo': 0,
            'retirado': 0,
          };
          
          // Update counts from database results
          conservadores.forEach((item) => {
            if (item.status && item.count) {
              statusMap[item.status] = Number(item.count);
            }
          });
          
          // Transform to expected format with Spanish labels
          const chartData: EstadoCount[] = [
            { estado: 'Activo', cantidad: statusMap['activo'] || 0 },
            { estado: 'Mantenimiento', cantidad: statusMap['mantenimiento'] || 0 },
            { estado: 'Reparación', cantidad: statusMap['reparacion'] || 0 },
            { estado: 'Inactivo', cantidad: statusMap['inactivo'] || 0 },
            { estado: 'Retirado', cantidad: statusMap['retirado'] || 0 },
          ];
          
          setData(chartData);
        }
      } catch (err) {
        console.error('Error fetching conservadores data:', err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    }
    
    fetchEstadoConservadores();
    
    // Set up realtime subscription for updates
    const channel = supabase
      .channel('conservadores-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conservadores'
        },
        () => {
          // Refresh data when any changes happen to conservadores
          fetchEstadoConservadores();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de Conservadores</CardTitle>
        <CardDescription>Distribución por estado actual</CardDescription>
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
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="estado" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
