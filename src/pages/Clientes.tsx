
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Phone, Mail, MapPin, Package, X } from "lucide-react";
import { useClientes, Cliente } from "@/hooks/useClientes";
import { useToast } from "@/hooks/use-toast";

const Clientes = () => {
  const { clientes, isLoading, createCliente, deleteCliente } = useClientes();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState<Omit<Cliente, 'id'>>({
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    direccion: '',
    conservadores: 0
  });

  // Función para manejar cambios en los inputs del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({
      ...prev,
      [name]: name === 'conservadores' ? Number(value) : value
    }));
  };

  // Función para agregar un nuevo cliente
  const agregarCliente = () => {
    console.log("Agregando cliente:", nuevoCliente);
    createCliente.mutate(nuevoCliente, {
      onSuccess: () => {
        console.log("Cliente agregado con éxito");
        setIsDialogOpen(false);
        setNuevoCliente({
          nombre: '',
          contacto: '',
          email: '',
          telefono: '',
          direccion: '',
          conservadores: 0
        });
        toast({
          title: "Cliente creado",
          description: "El cliente ha sido agregado exitosamente."
        });
      },
      onError: (error) => {
        console.error("Error al agregar cliente:", error);
        toast({
          title: "Error",
          description: "No se pudo agregar el cliente.",
          variant: "destructive"
        });
      }
    });
  };

  // Función para eliminar un cliente
  const eliminarCliente = (id: string) => {
    console.log("Eliminando cliente:", id);
    deleteCliente.mutate(id, {
      onSuccess: () => {
        console.log("Cliente eliminado con éxito");
        toast({
          title: "Cliente eliminado",
          description: "El cliente ha sido eliminado exitosamente."
        });
      },
      onError: (error) => {
        console.error("Error al eliminar cliente:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar el cliente.",
          variant: "destructive"
        });
      }
    });
  };

  // Filtrar clientes según término de búsqueda
  const filteredClientes = isLoading 
    ? [] 
    : clientes?.filter((cliente) =>
        Object.values(cliente).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) || [];

  console.log("Estado de carga:", isLoading);
  console.log("Clientes disponibles:", clientes);
  console.log("Clientes filtrados:", filteredClientes);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={nuevoCliente.nombre}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contacto" className="text-right">
                  Contacto
                </Label>
                <Input
                  id="contacto"
                  name="contacto"
                  value={nuevoCliente.contacto}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={nuevoCliente.email || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefono" className="text-right">
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  value={nuevoCliente.telefono || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="direccion" className="text-right">
                  Dirección
                </Label>
                <Input
                  id="direccion"
                  name="direccion"
                  value={nuevoCliente.direccion || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="conservadores" className="text-right">
                  Conservadores
                </Label>
                <Input
                  id="conservadores"
                  name="conservadores"
                  type="number"
                  value={nuevoCliente.conservadores || 0}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={agregarCliente}>Guardar Cliente</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-10">
          <p>Cargando clientes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClientes && filteredClientes.length > 0 ? (
            filteredClientes.map((cliente) => (
              <Card key={cliente.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{cliente.nombre}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => eliminarCliente(cliente.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {cliente.contacto && (
                    <CardDescription>{cliente.contacto}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  {cliente.telefono && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cliente.telefono}</span>
                    </div>
                  )}
                  {cliente.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cliente.email}</span>
                    </div>
                  )}
                  {cliente.direccion && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cliente.direccion}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{cliente.conservadores || 0} conservadores</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center p-10">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No se encontraron clientes que coincidan con la búsqueda."
                  : "No hay clientes registrados."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Clientes;
