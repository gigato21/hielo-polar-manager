
import { MantenimientosList } from "@/components/mantenimiento/MantenimientosList";

export function MantenimientoPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Mantenimiento</h1>
      <MantenimientosList />
    </div>
  )
}
