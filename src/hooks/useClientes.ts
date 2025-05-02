
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from "@/hooks/use-toast"

export interface Cliente {
  id: string
  nombre: string
  contacto?: string
  email?: string
  telefono?: string
  direccion?: string
  conservadores?: number
}

export const useClientes = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: clientes, isLoading } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("clientes").select(`
          *,
          conservadores:conservadores(id)
        `)
        
        if (error) throw error;
        
        return data.map(cliente => ({
          ...cliente,
          conservadores: cliente.conservadores?.length || 0
        })) || [];
      } catch (error) {
        console.error("Error fetching clientes:", error);
        return [];
      }
    },
  })

  const createCliente = useMutation({
    mutationFn: async (newCliente: Omit<Cliente, 'id'>) => {
      const { data, error } = await supabase
        .from('clientes')
        .insert(newCliente)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
      toast({
        title: "Cliente creado",
        description: "El cliente ha sido creado exitosamente.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo crear el cliente: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const updateCliente = useMutation({
    mutationFn: async ({ id, ...updateData }: Cliente) => {
      const { data, error } = await supabase
        .from('clientes')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
      toast({
        title: "Cliente actualizado",
        description: "El cliente ha sido actualizado exitosamente.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo actualizar el cliente: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const deleteCliente = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('clientes').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
      toast({
        title: "Cliente eliminado",
        description: "El cliente ha sido eliminado exitosamente.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo eliminar el cliente: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  return {
    clientes,
    isLoading,
    createCliente,
    updateCliente,
    deleteCliente,
  }
}
