import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'

// Define the mantenimiento status type
type MantenimientoStatus = 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';

export const useMantenimientos = (conservadorId?: string) => {
  const queryClient = useQueryClient()

  const { data: mantenimientos, isLoading } = useQuery({
    queryKey: ['mantenimientos', conservadorId],
    queryFn: async () => {
      let query = supabase
        .from('mantenimientos')
        .select(`
          *,
          conservador:conservadores(
            id,
            numero_serie,
            modelo
          )
        `)
        .order('fecha_programada', { ascending: false })

      if (conservadorId) {
        query = query.eq('conservador_id', conservadorId)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
    enabled: !conservadorId || typeof conservadorId === 'string',
  })

  const createMantenimiento = useMutation({
    mutationFn: async (newMantenimiento: {
      conservador_id?: string | null;
      tipo_servicio: string;
      fecha_programada?: string | null;
      fecha_realizado?: string | null;
      costo?: number | null;
      status?: MantenimientoStatus;
      tecnico?: string | null;
      notas?: string | null;
      descripcion?: string | null;
    }) => {
      const { data, error } = await supabase
        .from('mantenimientos')
        .insert(newMantenimiento)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mantenimientos'] })
    },
  })

  const updateMantenimiento = useMutation({
    mutationFn: async ({
      id,
      ...updateData
    }: { 
      id: string;
      conservador_id?: string | null;
      tipo_servicio?: string;
      fecha_programada?: string | null;
      fecha_realizado?: string | null;
      costo?: number | null;
      status?: MantenimientoStatus;
      tecnico?: string | null;
      notas?: string | null;
      descripcion?: string | null;
    }) => {
      const { data, error } = await supabase
        .from('mantenimientos')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mantenimientos'] })
    },
  })

  const deleteMantenimiento = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('mantenimientos').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mantenimientos'] })
    },
  })

  return {
    mantenimientos,
    isLoading,
    createMantenimiento,
    updateMantenimiento,
    deleteMantenimiento,
  }
}
