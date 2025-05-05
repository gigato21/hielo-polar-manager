
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

type EstadisticasProps = {
  dateRange?: { from: Date; to: Date } | undefined;
}

type EstadisticasData = {
  totalConservadores: number;
  totalMantenimientos: number;
  totalReparaciones: number;
  eficiencia: number;
  conservadoresPorCliente: Array<{name: string, value: number}>;
  serviciosPorMes: Array<{
    name: string;
    mantenimientos: number;
    reparaciones: number;
  }>;
}

export function useEstadisticas({ dateRange }: EstadisticasProps = {}) {
  const [data, setData] = useState<EstadisticasData>({
    totalConservadores: 0,
    totalMantenimientos: 0,
    totalReparaciones: 0,
    eficiencia: 0,
    conservadoresPorCliente: [],
    serviciosPorMes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEstadisticas() {
      try {
        setLoading(true);
        
        // Get total number of conservadores
        const { count: totalConservadores, error: conservadoresError } = await supabase
          .from('conservadores')
          .select('*', { count: 'exact', head: true });
        
        if (conservadoresError) throw conservadoresError;

        // Get total number of mantenimientos in date range
        let mantenimientosQuery = supabase
          .from('mantenimientos')
          .select('*', { count: 'exact', head: true });
          
        if (dateRange?.from && dateRange?.to) {
          mantenimientosQuery = mantenimientosQuery
            .gte('fecha_realizado', dateRange.from.toISOString().split('T')[0])
            .lte('fecha_realizado', dateRange.to.toISOString().split('T')[0]);
        }
        
        const { count: totalMantenimientos, error: mantenimientosError } = await mantenimientosQuery;
        if (mantenimientosError) throw mantenimientosError;

        // Get total number of reparaciones in date range
        let reparacionesQuery = supabase.from('reparaciones')
          .select('*', { count: 'exact', head: true });
          
        if (dateRange?.from && dateRange?.to) {
          reparacionesQuery = reparacionesQuery
            .gte('fecha_reporte', dateRange.from.toISOString().split('T')[0])
            .lte('fecha_reporte', dateRange.to.toISOString().split('T')[0]);
        }
        
        const { count: totalReparaciones, error: reparacionesError } = await reparacionesQuery;
        if (reparacionesError) throw reparacionesError;

        // Get conservadores count by client (top 5)
        const { data: clientesData, error: clientesError } = await supabase
          .from('conservadores')
          .select(`
            cliente:clientes (
              id,
              nombre
            ),
            count
          `)
          .not('cliente_id', 'is', null)
          .group('cliente_id, cliente:clientes(id, nombre)')
          .order('count', { ascending: false })
          .limit(5);
          
        if (clientesError) throw clientesError;

        // Transform client data for chart
        const conservadoresPorCliente = (clientesData || []).map(item => ({
          name: item.cliente?.nombre || 'Sin Cliente',
          value: Number(item.count) || 0
        }));

        // Add "Otros" if there are more than 5 clients
        if (totalConservadores && conservadoresPorCliente.length > 0) {
          const totalInChart = conservadoresPorCliente.reduce((sum, item) => sum + item.value, 0);
          if (totalInChart < totalConservadores) {
            conservadoresPorCliente.push({
              name: 'Otros',
              value: totalConservadores - totalInChart
            });
          }
        }

        // Calculate efficiency (completed mantenimientos / total mantenimientos)
        let eficiencia = 0;
        if (totalMantenimientos && totalMantenimientos > 0) {
          const { count: completedMantenimientos, error: completedError } = await supabase
            .from('mantenimientos')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'completado');
            
          if (completedError) throw completedError;
          
          eficiencia = completedMantenimientos ? 
            Math.round((completedMantenimientos / totalMantenimientos) * 100) : 0;
        }

        setData({
          totalConservadores: totalConservadores || 0,
          totalMantenimientos: totalMantenimientos || 0,
          totalReparaciones: totalReparaciones || 0,
          eficiencia,
          conservadoresPorCliente,
          serviciosPorMes: [], // To be implemented if needed
        });
        
      } catch (err) {
        console.error('Error fetching estadisticas:', err);
        setError('Error al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    }

    fetchEstadisticas();
  }, [dateRange]);

  return {
    data,
    loading,
    error
  };
}
