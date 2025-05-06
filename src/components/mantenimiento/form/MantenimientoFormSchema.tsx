
import { z } from "zod";

export const mantenimientoSchema = z.object({
  conservador_id: z.string().optional().nullable(),
  tipo_servicio: z.string().min(1, "El tipo de servicio es requerido"),
  fecha_programada: z.date().optional().nullable(),
  fecha_realizado: z.date().optional().nullable(),
  costo: z.preprocess(
    (a) => (a === "" ? null : Number(a)),
    z.number().nonnegative().optional().nullable()
  ),
  status: z.enum(["pendiente", "en_proceso", "completado", "cancelado"]).default("pendiente"),
  tecnico: z.string().optional().nullable(),
  notas: z.string().optional().nullable(),
  descripcion: z.string().optional().nullable(),
});

export type MantenimientoFormData = z.infer<typeof mantenimientoSchema>;

export const defaultValues: MantenimientoFormData = {
  conservador_id: "",
  tipo_servicio: "",
  fecha_programada: null,
  fecha_realizado: null,
  costo: null,
  status: "pendiente",
  tecnico: "",
  notas: "",
  descripcion: "",
};
