
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Control } from "react-hook-form";

interface UbicacionSectionProps {
  control: Control<any>;
}

export function UbicacionSection({ control }: UbicacionSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Ubicación del Negocio</CardTitle>
            <CardDescription>Dirección física</CardDescription>
          </div>
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="ubicacion.calle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calle</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la calle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="ubicacion.numero_ext"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número Exterior</FormLabel>
                <FormControl>
                  <Input placeholder="Número exterior" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="ubicacion.numero_int"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número Interior (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Número interior" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="ubicacion.colonia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colonia</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la colonia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="ubicacion.municipio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Municipio/Comunidad</FormLabel>
                <FormControl>
                  <Input placeholder="Municipio o comunidad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="ubicacion.estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder="Estado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="ubicacion.cp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código Postal</FormLabel>
              <FormControl>
                <Input placeholder="5 dígitos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="ubicacion.referencias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referencias (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Referencias para ubicar el negocio"
                  className="resize-none"
                  {...field}
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
