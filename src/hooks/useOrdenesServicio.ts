
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { EstadoOrden, TipoServicio } from '@/types/supabase'

export const useOrdenesServicio = (conservadorId?: string) => {
  const queryClient = useQueryClient()

  const { data: ordenesServicio, isLoading } = useQuery({
    queryKey: ['ordenes_servicio', conservadorId],
    queryFn: async () => {
      let query = supabase
        .from('ordenes_servicio')
        .select(`
          *,
          conservador:conservadores(
            id,
            numero_serie,
            modelo,
            cliente:clientes(
              id,
              nombre,
              rfc
            )
          ),
          proveedor:proveedores_servicio(
            id,
            razon_social,
            rfc
          ),
          evidencias:evidencias_servicio(
            id,
            tipo,
            url,
            descripcion
          ),
          firmas:firmas_conformidad(
            id,
            nombre_firmante,
            cargo_firmante,
            firma_url,
            fecha_firma
          )
        `)
        .order('fecha_solicitud', { ascending: false })

      if (conservadorId) {
        query = query.eq('conservador_id', conservadorId)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
    enabled: !conservadorId || typeof conservadorId === 'string',
  })

  const createOrdenServicio = useMutation({
    mutationFn: async (newOrden: {
      conservador_id: string;
      proveedor_id: string;
      estado?: EstadoOrden;
      tipo: TipoServicio;
      fecha_solicitud: string;
      fecha_programada?: string | null;
      fecha_inicio?: string | null;
      fecha_fin?: string | null;
      costo_materiales?: number | null;
      costo_mano_obra?: number | null;
      costo_total?: number | null;
      trabajo_realizado?: string | null;
      materiales_utilizados?: string | null;
      descripcion_problema?: string | null;
      diagnostico?: string | null;
      [key: string]: any;
    }) => {
      // Generar número de orden único
      const fecha = new Date()
      const año = fecha.getFullYear()
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0')
      const count = await supabase
        .from('ordenes_servicio')
        .select('id', { count: 'exact' })
        .gte('created_at', `${año}-${mes}-01`)
        .lt('created_at', `${año}-${parseInt(mes) + 1}-01`)

      const numeroSecuencial = ((count?.count || 0) + 1).toString().padStart(3, '0')
      const numeroOrden = `OS-${año}${mes}${numeroSecuencial}`

      const { data, error } = await supabase
        .from('ordenes_servicio')
        .insert({ ...newOrden, numero_orden: numeroOrden })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordenes_servicio'] })
    },
  })

  const updateOrdenServicio = useMutation({
    mutationFn: async ({
      id,
      ...updateData
    }: { 
      id: string;
      conservador_id?: string;
      proveedor_id?: string;
      estado?: EstadoOrden;
      tipo?: TipoServicio;
      fecha_solicitud?: string;
      fecha_programada?: string | null;
      fecha_inicio?: string | null;
      fecha_fin?: string | null;
      costo_materiales?: number | null;
      costo_mano_obra?: number | null;
      costo_total?: number | null;
      fecha_factura?: string | null;
      trabajo_realizado?: string | null;
      materiales_utilizados?: string | null;
      uuid_factura?: string | null;
      pdf_factura_url?: string | null;
      xml_factura_url?: string | null;
      numero_factura?: string | null;
      notas_internas?: string | null;
      descripcion_problema?: string | null;
      diagnostico?: string | null;
      [key: string]: any;
    }) => {
      const { data, error } = await supabase
        .from('ordenes_servicio')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordenes_servicio'] })
    },
  })

  const deleteOrdenServicio = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('ordenes_servicio').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordenes_servicio'] })
    },
  })

  // Función para agregar evidencias
  const addEvidencia = useMutation({
    mutationFn: async (evidencia: {
      orden_servicio_id: string;
      tipo: string;
      url: string;
      descripcion?: string | null;
    }) => {
      const { data, error } = await supabase
        .from('evidencias_servicio')
        .insert(evidencia)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordenes_servicio'] })
    },
  })

  // Función para agregar firma de conformidad
  const addFirma = useMutation({
    mutationFn: async (firma: {
      orden_servicio_id: string;
      nombre_firmante: string;
      cargo_firmante?: string | null;
      firma_url: string;
      fecha_firma: string;
    }) => {
      const { data, error } = await supabase
        .from('firmas_conformidad')
        .insert(firma)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordenes_servicio'] })
    },
  })

  return {
    ordenesServicio,
    isLoading,
    createOrdenServicio,
    updateOrdenServicio,
    deleteOrdenServicio,
    addEvidencia,
    addFirma,
  }
}
