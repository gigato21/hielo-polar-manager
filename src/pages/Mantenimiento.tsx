
import { MantenimientosList } from "@/components/mantenimiento/MantenimientosList";
import { Wrench } from "lucide-react";

export function MantenimientoPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-3 mb-6">
        <Wrench className="h-6 w-6 text-blue-600" />
        <h1 className="text-3xl font-bold">Mantenimiento</h1>
      </div>
      <MantenimientosList />
    </div>
  );
}
