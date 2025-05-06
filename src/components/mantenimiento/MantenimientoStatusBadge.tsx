
import { AlertCircle, CheckCircle2, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type MantenimientoStatus = 'pendiente' | 'en_proceso' | 'completado' | 'cancelado' | string;

interface MantenimientoStatusBadgeProps {
  status: MantenimientoStatus;
}

export function MantenimientoStatusBadge({ status }: MantenimientoStatusBadgeProps) {
  switch (status) {
    case "pendiente":
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
        <AlertCircle className="mr-1 h-3 w-3" /> Pendiente
      </Badge>;
    case "en_proceso":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">
        <Clock className="mr-1 h-3 w-3" /> En proceso
      </Badge>;
    case "completado":
      return <Badge variant="outline" className="bg-green-100 text-green-800">
        <CheckCircle2 className="mr-1 h-3 w-3" /> Completado
      </Badge>;
    case "cancelado":
      return <Badge variant="outline" className="bg-red-100 text-red-800">
        <X className="mr-1 h-3 w-3" /> Cancelado
      </Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}
