import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'

// Define the conservador status type
type ConservadorStatus = 'activo' | 'mantenimiento' | 'inactivo';

export const useConservadores = () => {
  const queryClient = useQueryClient()

  const { data: conservadores, isLoading } = useQuery({
    queryKey: ['conservadores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conservadores')
        .select(`
          *,
          cliente:clientes(id, nombre, rfc, direccion_fiscal),
          ubicaciones:ubicaciones_conservador(id, latitud, longitud, direccion, fecha_registro)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })

  const createConservador = useMutation({
    mutationFn: async (newConservador: {
      numero_serie: string;
      modelo?: string | null;
      capacidad?: number | null;
      status?: ConservadorStatus;
      cliente_id?: string | null;
      notas?: string | null;
      qr_code?: string | null;
    }) => {
      const { data, error } = await supabase
        .from('conservadores')
        .insert(newConservador)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conservadores'] })
    },
  })

  const updateConservador = useMutation({
    mutationFn: async ({
      id,
      ...updateData
    }: {
      id: string;
      numero_serie?: string;
      modelo?: string | null;
      capacidad?: number | null;
      status?: ConservadorStatus;
      cliente_id?: string | null;
      notas?: string | null;
      qr_code?: string | null;
    }) => {
      const { data, error } = await supabase
        .from('conservadores')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conservadores'] })
    },
  })

  const deleteConservador = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('conservadores').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conservadores'] })
    },
  })

  return {
    conservadores,
    isLoading,
    createConservador,
    updateConservador,
    deleteConservador,
  }
}
