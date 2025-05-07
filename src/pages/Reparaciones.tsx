
import { ReparacionesList } from "@/components/reparaciones/ReparacionesList";
import { Tool } from "lucide-react";

export default function Reparaciones() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-3 mb-6">
        <Tool className="h-6 w-6 text-blue-600" />
        <h1 className="text-3xl font-bold">Reparaciones</h1>
      </div>
      <ReparacionesList />
    </div>
  );
}
