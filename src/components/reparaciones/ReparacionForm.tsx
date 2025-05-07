
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, SaveIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Reparacion } from "@/hooks/useReparaciones";

// Schema for form validation
const reparacionSchema = z.object({
  conservador_id: z.string().min(1, "Seleccione un conservador"),
  descripcion_problema: z.string().min(1, "Describa el problema"),
  fecha_reporte: z.date(),
  fecha_reparacion: z.date().nullable().optional(),
  costo: z.preprocess(
    (a) => (a === "" ? null : Number(a)),
    z.number().nonnegative().nullable().optional()
  ),
  repuestos_utilizados: z.string().nullable().optional(),
  tecnico: z.string().nullable().optional(),
  status: z.enum(["pendiente", "en_proceso", "completada", "cancelada"]).default("pendiente"),
  notas: z.string().nullable().optional(),
});

type FormData = z.infer<typeof reparacionSchema>;

interface ReparacionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormData) => void;
  initialData?: Reparacion;
  isLoading?: boolean;
}

export function ReparacionForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading = false,
}: ReparacionFormProps) {
  const [conservadores, setConservadores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize form with default values or initialData if editing
  const form = useForm<FormData>({
    resolver: zodResolver(reparacionSchema),
    defaultValues: {
      conservador_id: initialData?.conservador_id || "",
      descripcion_problema: initialData?.descripcion_problema || "",
      fecha_reporte: initialData?.fecha_reporte ? new Date(initialData.fecha_reporte) : new Date(),
      fecha_reparacion: initialData?.fecha_reparacion ? new Date(initialData.fecha_reparacion) : null,
      costo: initialData?.costo || null,
      repuestos_utilizados: initialData?.repuestos_utilizados || "",
      tecnico: initialData?.tecnico || "",
      status: initialData?.status || "pendiente",
      notas: initialData?.notas || "",
    },
  });

  // Fetch conservadores when the form opens
  useEffect(() => {
    const fetchConservadores = async () => {
      try {
        setLoading(true);
        const { data } = await import("@/hooks/useConservadores").then(module => {
          return { data: module.useConservadores().conservadores || [] };
        });
        setConservadores(data);
      } catch (error) {
        console.error("Error al cargar conservadores:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchConservadores();
    }
  }, [open]);

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Reparación" : "Nueva Reparación"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Conservador Field */}
            <FormField
              control={form.control}
              name="conservador_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conservador</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un conservador" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loading ? (
                        <div className="flex justify-center py-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) : (
                        conservadores.map((conservador) => (
                          <SelectItem key={conservador.id} value={conservador.id}>
                            {conservador.numero_serie} - {conservador.modelo || "Sin modelo"}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descripción del Problema */}
            <FormField
              control={form.control}
              name="descripcion_problema"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción del Problema</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describa el problema en detalle"
                      className="resize-none min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha Reporte and Fecha Reparación */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fecha_reporte"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Reporte</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Seleccionar fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={es}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fecha_reparacion"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Reparación</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Seleccionar fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          locale={es}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status and Técnico */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en_proceso">En proceso</SelectItem>
                        <SelectItem value="completada">Completada</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tecnico"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Técnico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre del técnico"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Costo and Repuestos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="costo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        value={field.value === null ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? null : parseFloat(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repuestos_utilizados"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repuestos Utilizados</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lista de repuestos"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notas */}
            <FormField
              control={form.control}
              name="notas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas Adicionales</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Notas adicionales sobre la reparación"
                      className="resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <SaveIcon className="mr-2 h-4 w-4" />
                {initialData ? "Actualizar" : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
