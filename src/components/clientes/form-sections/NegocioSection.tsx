import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Store } from "lucide-react";
import { Control } from "react-hook-form";

interface NegocioSectionProps {
  control: Control<any>;
}

export function NegocioSection({ control }: NegocioSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Datos del Negocio</CardTitle>
            <CardDescription>Información comercial</CardDescription>
          </div>
          <Store className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="negocio.nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Negocio</FormLabel>
              <FormControl>
                <Input placeholder="Nombre comercial" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="negocio.imagen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen del Negocio</FormLabel>
              <FormControl>
                <FileUpload
                  accept="image/*"
                  onChange={field.onChange}
                  value={field.value}
                  label=""
                  variant="image"
                  placeholder="Seleccionar imagen..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="negocio.tipo_negocio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Negocio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="restaurante">Restaurante</SelectItem>
                  <SelectItem value="abarrotes">Abarrotes</SelectItem>
                  <SelectItem value="vinateria">Vinatería</SelectItem>
                  <SelectItem value="supermercado">Supermercado</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                  <SelectItem value="deposito">Depósito</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="negocio.rfc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RFC (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="RFC del negocio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="negocio.giro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giro (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Giro comercial" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
