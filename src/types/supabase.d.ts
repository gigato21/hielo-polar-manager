
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

// Define Tables type to fix the "Tables requires between 1 and 2 type arguments" error
export type Tables<T = any> = T;
