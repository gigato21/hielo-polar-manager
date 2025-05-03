
import { EstadoOrden, TipoServicio } from '@/types/supabase'

export interface OrdenServicioWithDetails {
  id: string;
  numero_orden: string;
  conservador_id: string;
  proveedor_id: string;
  estado: EstadoOrden;
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
  conservador?: {
    id: string;
    numero_serie: string;
    modelo: string | null;
    cliente?: {
      id: string;
      nombre: string;
      rfc: string | null;
    } | null;
  } | null;
  proveedor?: {
    id: string;
    razon_social: string;
    rfc: string;
  } | null;
  evidencias?: {
    id: string;
    tipo: string;
    url: string;
    descripcion: string | null;
  }[];
  firmas?: {
    id: string;
    nombre_firmante: string;
    cargo_firmante: string | null;
    firma_url: string;
    fecha_firma: string;
  }[];
}
