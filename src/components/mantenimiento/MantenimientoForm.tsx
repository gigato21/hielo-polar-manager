
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConservadores } from "@/hooks/useConservadores";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

// Import the form schema and fields
import { mantenimientoSchema, defaultValues, MantenimientoFormData } from "./form/MantenimientoFormSchema";
import { ConservadorField } from "./form/ConservadorField";
import { TipoServicioField } from "./form/TipoServicioField";
import { DateField } from "./form/DateField";
import { StatusField } from "./form/StatusField";
import { CostoField } from "./form/CostoField";
import { TecnicoField } from "./form/TecnicoField";
import { TextareaField } from "./form/TextareaField";

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
    defaultValues,
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
      form.reset(defaultValues);
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
            <ConservadorField 
              control={form.control} 
              conservadores={conservadores || []} 
              conservadoresLoading={conservadoresLoading} 
            />

            <TipoServicioField control={form.control} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateField 
                control={form.control} 
                name="fecha_programada" 
                label="Fecha programada" 
              />
              
              <DateField 
                control={form.control} 
                name="fecha_realizado" 
                label="Fecha realizado" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatusField control={form.control} />
              <CostoField control={form.control} />
            </div>

            <TecnicoField control={form.control} />

            <TextareaField
              control={form.control}
              name="descripcion"
              label="Descripción"
              placeholder="Descripción del mantenimiento"
            />

            <TextareaField
              control={form.control}
              name="notas"
              label="Notas"
              placeholder="Notas adicionales"
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
