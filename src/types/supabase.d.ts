
export type TipoServicio = 
  | 'mantenimiento_preventivo'
  | 'mantenimiento_correctivo'
  | 'reparacion'
  | 'instalacion'
  | 'desinstalacion'
  | 'otro';

export type EstadoOrden = 
  | 'borrador'
  | 'pendiente'
  | 'en_proceso'
  | 'completada'
  | 'cancelada'
  | 'facturada';

// Define specific row types for tables
export interface Tables {
  clientes: {
    Row: {
      id: string;
      nombre: string;
      razon_social: string;
      rfc: string | null;
      direccion_fiscal: string;
      telefono: string;
      email: string;
      notas?: string | null;
      created_at?: string;
      updated_at?: string;
      contrato_comodato?: any;
    };
    Insert: {
      id?: string;
      nombre: string;
      razon_social: string;
      rfc?: string | null;
      direccion_fiscal: string;
      telefono: string;
      email: string;
      notas?: string | null;
      contrato_comodato?: any;
    };
    Update: {
      nombre?: string;
      razon_social?: string;
      rfc?: string | null;
      direccion_fiscal?: string;
      telefono?: string;
      email?: string;
      notas?: string | null;
      contrato_comodato?: any;
    };
  };
  
  conservadores: {
    Row: {
      id: string;
      numero_serie: string;
      modelo?: string | null;
      capacidad?: number | null;
      status?: string;
      cliente_id?: string | null;
      notas?: string | null;
      created_at?: string;
      updated_at?: string;
      qr_code?: string | null;
    };
    Insert: {
      id?: string;
      numero_serie: string;
      modelo?: string | null;
      capacidad?: number | null;
      status?: string;
      cliente_id?: string | null;
      notas?: string | null;
      qr_code?: string | null;
    };
    Update: {
      numero_serie?: string;
      modelo?: string | null;
      capacidad?: number | null;
      status?: string;
      cliente_id?: string | null;
      notas?: string | null;
      qr_code?: string | null;
    };
  };
  
  mantenimientos: {
    Row: {
      id: string;
      conservador_id?: string | null;
      tipo_servicio: string;
      fecha_programada?: string | null;
      fecha_realizado?: string | null;
      costo?: number | null;
      status?: string;
      tecnico?: string | null;
      notas?: string | null;
      descripcion?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Insert: {
      id?: string;
      conservador_id?: string | null;
      tipo_servicio: string;
      fecha_programada?: string | null;
      fecha_realizado?: string | null;
      costo?: number | null;
      status?: string;
      tecnico?: string | null;
      notas?: string | null;
      descripcion?: string | null;
    };
    Update: {
      conservador_id?: string | null;
      tipo_servicio?: string;
      fecha_programada?: string | null;
      fecha_realizado?: string | null;
      costo?: number | null;
      status?: string;
      tecnico?: string | null;
      notas?: string | null;
      descripcion?: string | null;
    };
  };
  
  proveedores_servicio: {
    Row: {
      id: string;
      razon_social: string;
      rfc: string;
      regimen_fiscal: string;
      direccion_fiscal: string;
      telefono?: string | null;
      email?: string | null;
      contacto_nombre?: string | null;
      notas?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Insert: {
      id?: string;
      razon_social: string;
      rfc: string;
      regimen_fiscal: string;
      direccion_fiscal: string;
      telefono?: string | null;
      email?: string | null;
      contacto_nombre?: string | null;
      notas?: string | null;
    };
    Update: {
      razon_social?: string;
      rfc?: string;
      regimen_fiscal?: string;
      direccion_fiscal?: string;
      telefono?: string | null;
      email?: string | null;
      contacto_nombre?: string | null;
      notas?: string | null;
    };
  };
  
  ordenes_servicio: {
    Row: {
      id: string;
      numero_orden: string;
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
      created_at?: string;
      updated_at?: string;
    };
    Insert: {
      id?: string;
      numero_orden?: string;
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
    };
    Update: {
      numero_orden?: string;
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
    };
  };
  
  evidencias_servicio: {
    Row: {
      id: string;
      orden_servicio_id: string;
      tipo: string;
      url: string;
      descripcion?: string | null;
      created_at?: string;
    };
    Insert: {
      id?: string;
      orden_servicio_id: string;
      tipo: string;
      url: string;
      descripcion?: string | null;
    };
    Update: {
      orden_servicio_id?: string;
      tipo?: string;
      url?: string;
      descripcion?: string | null;
    };
  };
  
  firmas_conformidad: {
    Row: {
      id: string;
      orden_servicio_id: string;
      nombre_firmante: string;
      cargo_firmante?: string | null;
      firma_url: string;
      fecha_firma: string;
      created_at?: string;
    };
    Insert: {
      id?: string;
      orden_servicio_id: string;
      nombre_firmante: string;
      cargo_firmante?: string | null;
      firma_url: string;
      fecha_firma: string;
    };
    Update: {
      orden_servicio_id?: string;
      nombre_firmante?: string;
      cargo_firmante?: string | null;
      firma_url?: string;
      fecha_firma?: string;
    };
  };
}
