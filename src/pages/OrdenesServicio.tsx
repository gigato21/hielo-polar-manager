
import { OrdenesServicioList } from "@/components/ordenes-servicio/OrdenesServicioList";

export function OrdenesServicioPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Órdenes de Servicio</h1>
      <OrdenesServicioList />
    </div>
  )
}
