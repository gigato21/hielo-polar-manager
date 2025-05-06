
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { MantenimientoFormData } from "./MantenimientoFormSchema";

interface TipoServicioFieldProps {
  control: Control<MantenimientoFormData>;
}

export function TipoServicioField({ control }: TipoServicioFieldProps) {
  return (
    <FormField
      control={control}
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
  );
}
