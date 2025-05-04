
import { useState } from "react";
import { useClientes, Cliente } from "@/hooks/useClientes";
import { useToast } from "@/hooks/use-toast";
import { ClientesList } from "@/components/clientes/ClientesList";
import { ClienteDialog } from "@/components/clientes/ClienteDialog";

const Clientes = () => {
  const { clientes, isLoading, createCliente, deleteCliente } = useClientes();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Función para agregar un nuevo cliente
  const agregarCliente = (nuevoCliente: Omit<Cliente, 'id'>) => {
    console.log("Agregando cliente:", nuevoCliente);
    createCliente.mutate(nuevoCliente, {
      onSuccess: () => {
        console.log("Cliente agregado con éxito");
        setIsDialogOpen(false);
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

  console.log("Estado de carga:", isLoading);
  console.log("Clientes disponibles:", clientes);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="w-full md:w-96">
          {/* Espacio para el search que ahora está dentro de ClientesList */}
        </div>
        <ClienteDialog
          onSave={agregarCliente}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>

      <ClientesList
        clientes={clientes}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onDelete={eliminarCliente}
      />
    </div>
  );
};

export default Clientes;
