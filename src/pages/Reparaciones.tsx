
import { ReparacionesList } from "@/components/reparaciones/ReparacionesList";

export default function Reparaciones() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Reparaciones</h1>
      <ReparacionesList />
    </div>
  );
}
