
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { MantenimientoFormData } from "./MantenimientoFormSchema";

interface TextareaFieldProps {
  control: Control<MantenimientoFormData>;
  name: "descripcion" | "notas";
  label: string;
  placeholder: string;
}

export function TextareaField({ control, name, label, placeholder }: TextareaFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="resize-none min-h-[80px]"
              {...field}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
