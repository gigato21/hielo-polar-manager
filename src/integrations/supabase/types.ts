export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clientes: {
        Row: {
          contacto: string | null
          created_at: string
          direccion: string | null
          email: string | null
          id: string
          nombre: string
          rfc: string | null
          telefono: string | null
          updated_at: string
        }
        Insert: {
          contacto?: string | null
          created_at?: string
          direccion?: string | null
          email?: string | null
          id?: string
          nombre: string
          rfc?: string | null
          telefono?: string | null
          updated_at?: string
        }
        Update: {
          contacto?: string | null
          created_at?: string
          direccion?: string | null
          email?: string | null
          id?: string
          nombre?: string
          rfc?: string | null
          telefono?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      conservadores: {
        Row: {
          capacidad: number | null
          cliente_id: string | null
          created_at: string
          id: string
          modelo: string | null
          notas: string | null
          numero_serie: string
          qr_code: string | null
          status: Database["public"]["Enums"]["conservador_status"] | null
          updated_at: string
        }
        Insert: {
          capacidad?: number | null
          cliente_id?: string | null
          created_at?: string
          id?: string
          modelo?: string | null
          notas?: string | null
          numero_serie: string
          qr_code?: string | null
          status?: Database["public"]["Enums"]["conservador_status"] | null
          updated_at?: string
        }
        Update: {
          capacidad?: number | null
          cliente_id?: string | null
          created_at?: string
          id?: string
          modelo?: string | null
          notas?: string | null
          numero_serie?: string
          qr_code?: string | null
          status?: Database["public"]["Enums"]["conservador_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conservadores_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      evidencias_servicio: {
        Row: {
          created_at: string
          descripcion: string | null
          id: string
          orden_servicio_id: string
          tipo: string
          url: string
        }
        Insert: {
          created_at?: string
          descripcion?: string | null
          id?: string
          orden_servicio_id: string
          tipo: string
          url: string
        }
        Update: {
          created_at?: string
          descripcion?: string | null
          id?: string
          orden_servicio_id?: string
          tipo?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidencias_servicio_orden_servicio_id_fkey"
            columns: ["orden_servicio_id"]
            isOneToOne: false
            referencedRelation: "ordenes_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      firmas_conformidad: {
        Row: {
          cargo_firmante: string | null
          created_at: string
          fecha_firma: string
          firma_url: string
          id: string
          nombre_firmante: string
          orden_servicio_id: string
        }
        Insert: {
          cargo_firmante?: string | null
          created_at?: string
          fecha_firma?: string
          firma_url: string
          id?: string
          nombre_firmante: string
          orden_servicio_id: string
        }
        Update: {
          cargo_firmante?: string | null
          created_at?: string
          fecha_firma?: string
          firma_url?: string
          id?: string
          nombre_firmante?: string
          orden_servicio_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "firmas_conformidad_orden_servicio_id_fkey"
            columns: ["orden_servicio_id"]
            isOneToOne: false
            referencedRelation: "ordenes_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      mantenimientos: {
        Row: {
          conservador_id: string | null
          costo: number | null
          created_at: string
          descripcion: string | null
          fecha_programada: string | null
          fecha_realizado: string | null
          id: string
          notas: string | null
          status: Database["public"]["Enums"]["maintenance_status"] | null
          tecnico: string | null
          tipo_servicio: string
          updated_at: string
        }
        Insert: {
          conservador_id?: string | null
          costo?: number | null
          created_at?: string
          descripcion?: string | null
          fecha_programada?: string | null
          fecha_realizado?: string | null
          id?: string
          notas?: string | null
          status?: Database["public"]["Enums"]["maintenance_status"] | null
          tecnico?: string | null
          tipo_servicio: string
          updated_at?: string
        }
        Update: {
          conservador_id?: string | null
          costo?: number | null
          created_at?: string
          descripcion?: string | null
          fecha_programada?: string | null
          fecha_realizado?: string | null
          id?: string
          notas?: string | null
          status?: Database["public"]["Enums"]["maintenance_status"] | null
          tecnico?: string | null
          tipo_servicio?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mantenimientos_conservador_id_fkey"
            columns: ["conservador_id"]
            isOneToOne: false
            referencedRelation: "conservadores"
            referencedColumns: ["id"]
          },
        ]
      }
      ordenes_servicio: {
        Row: {
          conservador_id: string
          costo_mano_obra: number | null
          costo_materiales: number | null
          costo_total: number | null
          created_at: string
          descripcion_problema: string | null
          diagnostico: string | null
          estado: Database["public"]["Enums"]["estado_orden"] | null
          fecha_factura: string | null
          fecha_fin: string | null
          fecha_inicio: string | null
          fecha_programada: string | null
          fecha_solicitud: string
          id: string
          materiales_utilizados: string | null
          notas_internas: string | null
          numero_factura: string | null
          numero_orden: string
          pdf_factura_url: string | null
          proveedor_id: string
          trabajo_realizado: string | null
          updated_at: string
          uuid_factura: string | null
          xml_factura_url: string | null
        }
        Insert: {
          conservador_id: string
          costo_mano_obra?: number | null
          costo_materiales?: number | null
          costo_total?: number | null
          created_at?: string
          descripcion_problema?: string | null
          diagnostico?: string | null
          estado?: Database["public"]["Enums"]["estado_orden"] | null
          fecha_factura?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          fecha_programada?: string | null
          fecha_solicitud: string
          id?: string
          materiales_utilizados?: string | null
          notas_internas?: string | null
          numero_factura?: string | null
          numero_orden: string
          pdf_factura_url?: string | null
          proveedor_id: string
          trabajo_realizado?: string | null
          updated_at?: string
          uuid_factura?: string | null
          xml_factura_url?: string | null
        }
        Update: {
          conservador_id?: string
          costo_mano_obra?: number | null
          costo_materiales?: number | null
          costo_total?: number | null
          created_at?: string
          descripcion_problema?: string | null
          diagnostico?: string | null
          estado?: Database["public"]["Enums"]["estado_orden"] | null
          fecha_factura?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          fecha_programada?: string | null
          fecha_solicitud?: string
          id?: string
          materiales_utilizados?: string | null
          notas_internas?: string | null
          numero_factura?: string | null
          numero_orden?: string
          pdf_factura_url?: string | null
          proveedor_id?: string
          trabajo_realizado?: string | null
          updated_at?: string
          uuid_factura?: string | null
          xml_factura_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ordenes_servicio_conservador_id_fkey"
            columns: ["conservador_id"]
            isOneToOne: false
            referencedRelation: "conservadores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ordenes_servicio_proveedor_id_fkey"
            columns: ["proveedor_id"]
            isOneToOne: false
            referencedRelation: "proveedores_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      proveedores_servicio: {
        Row: {
          contacto_nombre: string | null
          created_at: string
          direccion_fiscal: string
          email: string | null
          id: string
          notas: string | null
          razon_social: string
          regimen_fiscal: string
          rfc: string
          telefono: string | null
          updated_at: string
        }
        Insert: {
          contacto_nombre?: string | null
          created_at?: string
          direccion_fiscal: string
          email?: string | null
          id?: string
          notas?: string | null
          razon_social: string
          regimen_fiscal: string
          rfc: string
          telefono?: string | null
          updated_at?: string
        }
        Update: {
          contacto_nombre?: string | null
          created_at?: string
          direccion_fiscal?: string
          email?: string | null
          id?: string
          notas?: string | null
          razon_social?: string
          regimen_fiscal?: string
          rfc?: string
          telefono?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ubicaciones: {
        Row: {
          conservador_id: string | null
          created_at: string
          direccion: string | null
          fecha_registro: string
          id: string
          latitud: number | null
          longitud: number | null
        }
        Insert: {
          conservador_id?: string | null
          created_at?: string
          direccion?: string | null
          fecha_registro?: string
          id?: string
          latitud?: number | null
          longitud?: number | null
        }
        Update: {
          conservador_id?: string | null
          created_at?: string
          direccion?: string | null
          fecha_registro?: string
          id?: string
          latitud?: number | null
          longitud?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ubicaciones_conservador_id_fkey"
            columns: ["conservador_id"]
            isOneToOne: false
            referencedRelation: "conservadores"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      conservador_status: "activo" | "mantenimiento" | "inactivo"
      estado_orden:
        | "borrador"
        | "pendiente"
        | "en_proceso"
        | "completada"
        | "cancelada"
        | "facturada"
      maintenance_status:
        | "pendiente"
        | "en_proceso"
        | "completado"
        | "cancelado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      conservador_status: ["activo", "mantenimiento", "inactivo"],
      estado_orden: [
        "borrador",
        "pendiente",
        "en_proceso",
        "completada",
        "cancelada",
        "facturada",
      ],
      maintenance_status: [
        "pendiente",
        "en_proceso",
        "completado",
        "cancelado",
      ],
    },
  },
} as const
