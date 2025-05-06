
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MantenimientoStatusBadge } from "./MantenimientoStatusBadge";

interface MantenimientoCardProps {
  mantenimiento: any;
  onUpdate: (mantenimiento: any) => void;
  onDelete: (mantenimiento: any) => void;
}

export function MantenimientoCard({ mantenimiento, onUpdate, onDelete }: MantenimientoCardProps) {
  return (
    <Card key={mantenimiento.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {mantenimiento.tipo_servicio}
            </CardTitle>
            <CardDescription>
              Conservador: {mantenimiento.conservador?.numero_serie || "No asignado"}
            </CardDescription>
          </div>
          {mantenimiento.status && <MantenimientoStatusBadge status={mantenimiento.status} />}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {mantenimiento.descripcion && (
          <div className="space-y-1 mb-4">
            <p className="text-sm font-medium">Descripción:</p>
            <p className="text-sm text-muted-foreground">{mantenimiento.descripcion}</p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-sm font-medium">Fecha programada:</p>
            <p className="text-sm text-muted-foreground">
              {mantenimiento.fecha_programada ? 
                format(new Date(mantenimiento.fecha_programada), "dd/MM/yyyy", { locale: es }) : 
                "No programado"}
            </p>
          </div>
          {mantenimiento.fecha_realizado && (
            <div>
              <p className="text-sm font-medium">Fecha realizado:</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(mantenimiento.fecha_realizado), "dd/MM/yyyy", { locale: es })}
              </p>
            </div>
          )}
        </div>
        {(mantenimiento.tecnico || mantenimiento.costo !== null) && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            {mantenimiento.tecnico && (
              <div>
                <p className="text-sm font-medium">Técnico:</p>
                <p className="text-sm text-muted-foreground">{mantenimiento.tecnico}</p>
              </div>
            )}
            {mantenimiento.costo !== null && (
              <div>
                <p className="text-sm font-medium">Costo:</p>
                <p className="text-sm text-muted-foreground">
                  ${mantenimiento.costo.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" onClick={() => onUpdate(mantenimiento)}>
          Editar
        </Button>
        <Button variant="destructive" onClick={() => onDelete(mantenimiento)}>
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
