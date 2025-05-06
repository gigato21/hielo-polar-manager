
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConservadores } from "@/hooks/useConservadores";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const mantenimientoSchema = z.object({
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

type MantenimientoFormData = z.infer<typeof mantenimientoSchema>;

interface MantenimientoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: MantenimientoFormData) => void;
  initialData?: any;
  isLoading?: boolean;
}

export function MantenimientoForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading = false,
}: MantenimientoFormProps) {
  const { conservadores, isLoading: conservadoresLoading } = useConservadores();
  
  const form = useForm<MantenimientoFormData>({
    resolver: zodResolver(mantenimientoSchema),
    defaultValues: {
      conservador_id: "",
      tipo_servicio: "",
      fecha_programada: null,
      fecha_realizado: null,
      costo: null,
      status: "pendiente",
      tecnico: "",
      notas: "",
      descripcion: "",
    },
  });

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        conservador_id: initialData.conservador_id || "",
        tipo_servicio: initialData.tipo_servicio || "",
        fecha_programada: initialData.fecha_programada ? new Date(initialData.fecha_programada) : null,
        fecha_realizado: initialData.fecha_realizado ? new Date(initialData.fecha_realizado) : null,
        costo: initialData.costo,
        status: initialData.status || "pendiente",
        tecnico: initialData.tecnico || "",
        notas: initialData.notas || "",
        descripcion: initialData.descripcion || "",
      });
    } else {
      form.reset({
        conservador_id: "",
        tipo_servicio: "",
        fecha_programada: null,
        fecha_realizado: null,
        costo: null,
        status: "pendiente",
        tecnico: "",
        notas: "",
        descripcion: "",
      });
    }
  }, [initialData, form]);

  const handleSubmit = (data: MantenimientoFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Mantenimiento" : "Nuevo Mantenimiento"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="conservador_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conservador</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || ""}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar conservador" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="null">Sin conservador</SelectItem>
                      {!conservadoresLoading &&
                        conservadores?.map((conservador) => (
                          <SelectItem key={conservador.id} value={conservador.id}>
                            {conservador.numero_serie} - {conservador.modelo || "Sin modelo"}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipo_servicio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de servicio</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mantenimiento_preventivo">Mantenimiento Preventivo</SelectItem>
                      <SelectItem value="mantenimiento_correctivo">Mantenimiento Correctivo</SelectItem>
                      <SelectItem value="limpieza">Limpieza</SelectItem>
                      <SelectItem value="inspeccion">Inspección</SelectItem>
                      <SelectItem value="ajuste">Ajuste</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fecha_programada"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha programada</FormLabel>
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
                          onSelect={(date) => field.onChange(date)}
                          disabled={(date) =>
                            date < new Date("1900-01-01")
                          }
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
                name="fecha_realizado"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha realizado</FormLabel>
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
                          onSelect={(date) => field.onChange(date)}
                          disabled={(date) =>
                            date < new Date("1900-01-01")
                          }
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en_proceso">En proceso</SelectItem>
                        <SelectItem value="completado">Completado</SelectItem>
                        <SelectItem value="cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            </div>

            <FormField
              control={form.control}
              name="tecnico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Técnico</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del técnico" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción del mantenimiento"
                      className="resize-none min-h-[80px]"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Notas adicionales"
                      className="resize-none min-h-[80px]"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
