
// Define missing types for Supabase

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
