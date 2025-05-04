
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
  conservadores?: string  // Changed from number to string to match Supabase schema
}

export const useClientes = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: clientes, isLoading } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      console.log("Ejecutando queryFn para obtener clientes");
      try {
        const { data, error } = await supabase.from("clientes").select(`
          *,
          conservadores:conservadores(id)
        `);
        
        if (error) {
          console.error("Error en la consulta:", error);
          throw error;
        }
        
        console.log("Datos obtenidos de Supabase:", data);
        
        return data.map(cliente => ({
          ...cliente,
          // Convert conservadores array length to string to maintain type consistency
          conservadores: cliente.conservadores?.length?.toString() || "0"
        })) || [];
      } catch (error) {
        console.error("Error fetching clientes:", error);
        return [];
      }
    },
  })

  const createCliente = useMutation({
    mutationFn: async (newCliente: Omit<Cliente, 'id'>) => {
      console.log("Creando nuevo cliente:", newCliente);
      // Make sure conservadores is a string when sending to Supabase
      const clienteToInsert = {
        ...newCliente,
        // Fixed: Safe type conversion ensuring we have a string
        conservadores: newCliente.conservadores || "0"
      };
      
      const { data, error } = await supabase
        .from('clientes')
        .insert(clienteToInsert)
        .select()
        .single()

      if (error) {
        console.error("Error al crear cliente:", error);
        throw error;
      }
      
      console.log("Cliente creado:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    },
  })

  const updateCliente = useMutation({
    mutationFn: async ({ id, ...updateData }: Cliente) => {
      console.log("Actualizando cliente:", id, updateData);
      // Make sure conservadores is a string when sending to Supabase
      const clienteToUpdate = {
        ...updateData,
        // Fixed: Safe type conversion ensuring we have a string
        conservadores: updateData.conservadores || "0"
      };
      
      const { data, error } = await supabase
        .from('clientes')
        .update(clienteToUpdate)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error("Error al actualizar cliente:", error);
        throw error;
      }
      
      console.log("Cliente actualizado:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    },
  })

  const deleteCliente = useMutation({
    mutationFn: async (id: string) => {
      console.log("Eliminando cliente:", id);
      const { error } = await supabase.from('clientes').delete().eq('id', id)
      if (error) {
        console.error("Error al eliminar cliente:", error);
        throw error;
      }
      console.log("Cliente eliminado con éxito");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
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
