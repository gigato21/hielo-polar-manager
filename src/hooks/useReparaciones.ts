
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from "@/hooks/use-toast"

// Define the reparación status type
type ReparacionStatus = 'pendiente' | 'en_proceso' | 'completada' | 'cancelada';

export interface Reparacion {
  id: string;
  conservador_id: string;
  descripcion_problema: string;
  fecha_reporte: string;
  fecha_reparacion?: string | null;
  costo?: number | null;
  repuestos_utilizados?: string | null;
  tecnico?: string | null;
  status: ReparacionStatus;
  notas?: string | null;
  conservador?: {
    id: string;
    numero_serie: string;
    modelo: string | null;
    cliente?: {
      id: string;
      nombre: string;
    } | null;
  } | null;
}

export const useReparaciones = (conservadorId?: string) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: reparaciones, isLoading } = useQuery({
    queryKey: ['reparaciones', conservadorId],
    queryFn: async () => {
      console.log("Ejecutando queryFn para obtener reparaciones");
      try {
        // Use the client without type checking for the table
        let queryStr = `
          id,
          conservador_id,
          descripcion_problema,
          fecha_reporte,
          fecha_reparacion,
          costo,
          repuestos_utilizados,
          tecnico,
          status,
          notas,
          conservador:conservador_id (
            id,
            numero_serie,
            modelo,
            cliente:cliente_id (
              id,
              nombre
            )
          )
        `
        
        let query = supabase.from('reparaciones').select(queryStr)
          .order('fecha_reporte', { ascending: false })

        if (conservadorId) {
          query = query.eq('conservador_id', conservadorId)
        }

        const { data, error } = await query
        
        if (error) {
          console.error("Error en la consulta:", error);
          throw error;
        }
        
        console.log("Datos obtenidos de Supabase:", data);
        return data as Reparacion[] || []
      } catch (error) {
        console.error("Error fetching reparaciones:", error);
        return [];
      }
    },
    enabled: !conservadorId || typeof conservadorId === 'string',
  })

  const createReparacion = useMutation({
    mutationFn: async (newReparacion: Omit<Reparacion, 'id' | 'conservador'>) => {
      console.log("Creando nueva reparación:", newReparacion);
      
      const { data, error } = await supabase
        .from('reparaciones')
        .insert(newReparacion)
        .select()
        .single()

      if (error) {
        console.error("Error al crear reparación:", error);
        throw error;
      }
      
      console.log("Reparación creada:", data);
      return data as Reparacion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reparaciones'] })
      toast({
        title: "Reparación creada",
        description: "La reparación se ha registrado correctamente.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo crear la reparación: ${error.message}`,
        variant: "destructive"
      })
    }
  })

  const updateReparacion = useMutation({
    mutationFn: async ({ id, ...updateData }: Reparacion) => {
      console.log("Actualizando reparación:", id, updateData);
      
      const { data, error } = await supabase
        .from('reparaciones')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error("Error al actualizar reparación:", error);
        throw error;
      }
      
      console.log("Reparación actualizada:", data);
      return data as Reparacion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reparaciones'] })
      toast({
        title: "Reparación actualizada",
        description: "Los datos de la reparación se actualizaron correctamente.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo actualizar la reparación: ${error.message}`,
        variant: "destructive"
      })
    }
  })

  const deleteReparacion = useMutation({
    mutationFn: async (id: string) => {
      console.log("Eliminando reparación:", id);
      const { error } = await supabase.from('reparaciones').delete().eq('id', id)
      if (error) {
        console.error("Error al eliminar reparación:", error);
        throw error;
      }
      console.log("Reparación eliminada con éxito");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reparaciones'] })
      toast({
        title: "Reparación eliminada",
        description: "La reparación se ha eliminado correctamente.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo eliminar la reparación: ${error.message}`,
        variant: "destructive"
      })
    }
  })

  return {
    reparaciones: reparaciones as Reparacion[] | undefined,
    isLoading,
    createReparacion,
    updateReparacion,
    deleteReparacion,
  }
}
