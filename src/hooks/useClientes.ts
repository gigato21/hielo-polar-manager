
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
  imagen_url?: string     // URL de la imagen del cliente
  comodato_url?: string   // URL del archivo del contrato de comodato
  rfc?: string
}

// Función para subir un archivo al Storage de Supabase
const uploadFile = async (file: File, bucket: string, folder: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};

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
    mutationFn: async (newCliente: Omit<Cliente, 'id'> & { 
      imagen?: File,
      comodato?: File 
    }) => {
      console.log("Creando nuevo cliente:", newCliente);
      
      let imagen_url: string | undefined;
      let comodato_url: string | undefined;
      
      // Subir imagen si existe
      if (newCliente.imagen) {
        try {
          imagen_url = await uploadFile(newCliente.imagen, 'clientes', 'imagenes');
        } catch (error) {
          console.error("Error al subir imagen:", error);
          throw error;
        }
      }
      
      // Subir archivo de comodato si existe
      if (newCliente.comodato) {
        try {
          comodato_url = await uploadFile(newCliente.comodato, 'clientes', 'comodatos');
        } catch (error) {
          console.error("Error al subir comodato:", error);
          throw error;
        }
      }
      
      // Preparar datos para insertar en la base de datos
      const { imagen, comodato, ...clienteData } = newCliente;
      
      // Cliente a insertar con las URLs de los archivos subidos
      const clienteToInsert = {
        ...clienteData,
        imagen_url,
        comodato_url,
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
    mutationFn: async ({ id, ...updateData }: Cliente & { 
      imagen?: File,
      comodato?: File 
    }) => {
      console.log("Actualizando cliente:", id, updateData);
      
      let imagen_url = updateData.imagen_url;
      let comodato_url = updateData.comodato_url;
      
      // Subir imagen si existe una nueva
      if (updateData.imagen) {
        try {
          imagen_url = await uploadFile(updateData.imagen, 'clientes', 'imagenes');
        } catch (error) {
          console.error("Error al subir imagen:", error);
          throw error;
        }
      }
      
      // Subir archivo de comodato si existe uno nuevo
      if (updateData.comodato) {
        try {
          comodato_url = await uploadFile(updateData.comodato, 'clientes', 'comodatos');
        } catch (error) {
          console.error("Error al subir comodato:", error);
          throw error;
        }
      }
      
      // Remover archivos del objeto para la actualización
      const { imagen, comodato, ...clienteData } = updateData;
      
      // Cliente a actualizar con las URLs de los archivos
      const clienteToUpdate = {
        ...clienteData,
        imagen_url,
        comodato_url,
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
