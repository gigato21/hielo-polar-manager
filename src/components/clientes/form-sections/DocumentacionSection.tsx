
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Control } from "react-hook-form";

interface DocumentacionSectionProps {
  control: Control<any>;
}

export function DocumentacionSection({ control }: DocumentacionSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Documentación</CardTitle>
            <CardDescription>Archivos requeridos</CardDescription>
          </div>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="documentacion.contrato_comodato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contrato Comodato*</FormLabel>
              <FormControl>
                <FileUpload
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={field.onChange}
                  value={field.value}
                  label=""
                  placeholder="Seleccionar archivo..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentacion.identificacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identificación Oficial*</FormLabel>
              <FormControl>
                <FileUpload
                  accept=".pdf,.jpg,.jpeg,.png, webp"
                  onChange={field.onChange}
                  value={field.value}
                  label=""
                  placeholder="Seleccionar archivo..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentacion.comprobante_domicilio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comprobante de Domicilio*</FormLabel>
              <FormControl>
                <FileUpload
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={field.onChange}
                  value={field.value}
                  label=""
                  placeholder="Seleccionar archivo..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
