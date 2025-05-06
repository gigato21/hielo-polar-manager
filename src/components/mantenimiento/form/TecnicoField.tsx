
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { MantenimientoFormData } from "./MantenimientoFormSchema";

interface TecnicoFieldProps {
  control: Control<MantenimientoFormData>;
}

export function TecnicoField({ control }: TecnicoFieldProps) {
  return (
    <FormField
      control={control}
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
  );
}
