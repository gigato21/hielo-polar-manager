
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

// Define Tables type properly to fix the "Tables requires between 1 and 2 type arguments" error
export interface Tables {
  clientes: {
    Row: any;
    Insert: any;
    Update: any;
  };
  conservadores: {
    Row: any;
    Insert: any;
    Update: any;
  };
  mantenimientos: {
    Row: any;
    Insert: any;
    Update: any;
  };
  proveedores_servicio: {
    Row: any;
    Insert: any;
    Update: any;
  };
  ordenes_servicio: {
    Row: any;
    Insert: any;
    Update: any;
  };
}
