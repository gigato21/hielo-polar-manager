
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

interface ConservadorFieldProps {
  control: Control<MantenimientoFormData>;
  conservadores: any[];
  conservadoresLoading: boolean;
}

export function ConservadorField({ control, conservadores, conservadoresLoading }: ConservadorFieldProps) {
  return (
    <FormField
      control={control}
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
  );
}
