
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { MantenimientoFormData } from "./MantenimientoFormSchema";

interface CostoFieldProps {
  control: Control<MantenimientoFormData>;
}

export function CostoField({ control }: CostoFieldProps) {
  return (
    <FormField
      control={control}
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
  );
}
