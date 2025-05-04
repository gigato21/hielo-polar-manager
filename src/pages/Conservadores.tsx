
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConservadorCard } from "@/components/conservadores/ConservadorCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConservadorForm } from "@/components/conservadores/ConservadorForm";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConservadorData {
  id: string;
  modelo: string;
  capacidad: string;
  cliente: string;
  ubicacion: string;
  estado: string;
  ultimoMantenimiento: string;
}

// Datos de muestra para desarrollo
const conservadorData: ConservadorData[] = [
  {
    id: "CON-001",
    modelo: "Frigidaire FC-450",
    capacidad: "450 L",
    cliente: "Restaurante El Rincón",
    ubicacion: "Av. Insurgentes Sur 1234, Ciudad de México",
    estado: "activo",
    ultimoMantenimiento: "2025-03-15"
  },
  {
    id: "CON-002",
    modelo: "Whirlpool WP-320",
    capacidad: "320 L",
    cliente: "Tienda Local La Esquina",
    ubicacion: "Calle Reforma 567, Guadalajara",
    estado: "mantenimiento",
    ultimoMantenimiento: "2025-04-10"
  },
  {
    id: "CON-003",
    modelo: "Samsung CF-500",
    capacidad: "500 L",
    cliente: "Supermercado Express",
    ubicacion: "Blvd. Costero 789, Cancún",
    estado: "inactivo",
    ultimoMantenimiento: "2025-02-20"
  },
  {
    id: "CON-004",
    modelo: "LG Commercial 600",
    capacidad: "600 L",
    cliente: "Hotel Playa Azul",
    ubicacion: "Av. Marina 456, Puerto Vallarta",
    estado: "activo",
    ultimoMantenimiento: "2025-04-25"
  },
  {
    id: "CON-005",
    modelo: "Daewoo DF-280",
    capacidad: "280 L",
    cliente: "Farmacia Central",
    ubicacion: "Calle Principal 123, Monterrey",
    estado: "activo",
    ultimoMantenimiento: "2025-03-28"
  }
];

const Conservadores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrar conservadores por términos de búsqueda y estado
  const filteredConservadores = conservadorData.filter((conservador) => {
    const matchesSearch =
      conservador.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conservador.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conservador.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conservador.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" || conservador.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID, cliente o ubicación..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center">
            <Select
              defaultValue="todos"
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="activo">Activos</SelectItem>
                <SelectItem value="mantenimiento">En mantenimiento</SelectItem>
                <SelectItem value="inactivo">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Nuevo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConservadores.map((conservador) => (
          <ConservadorCard key={conservador.id} conservador={conservador} />
        ))}
      </div>

      {filteredConservadores.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No se encontraron conservadores</h3>
          <p className="text-muted-foreground mt-1">
            Intenta cambiar los filtros o términos de búsqueda
          </p>
        </div>
      )}

      {/* Modal para agregar nuevo conservador */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Agregar Nuevo Conservador</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <ConservadorForm 
              onSuccess={() => setIsDialogOpen(false)}
              onCancel={() => setIsDialogOpen(false)}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Conservadores;
