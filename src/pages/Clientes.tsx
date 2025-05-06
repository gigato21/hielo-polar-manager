
import { useState } from "react";
import { useClientes, Cliente } from "@/hooks/useClientes";
import { useToast } from "@/hooks/use-toast";
import { ClientesList } from "@/components/clientes/ClientesList";
import { ClienteDialog } from "@/components/clientes/ClienteDialog";

const Clientes = () => {
  const { clientes, isLoading, createCliente, updateCliente, deleteCliente } = useClientes();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clienteToEdit, setClienteToEdit] = useState<Cliente | null>(null);

  // Función para abrir el diálogo de edición
  const handleEditCliente = (cliente: Cliente) => {
    setClienteToEdit(cliente);
    setIsDialogOpen(true);
  };
  
  // Función para cerrar el diálogo y limpiar el cliente seleccionado
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setTimeout(() => setClienteToEdit(null), 300); // Limpiar después de la animación
  };

  // Función para guardar un cliente (nuevo o editado)
  const guardarCliente = (data: Omit<Cliente, 'id'> & { id?: string }) => {
    console.log("Guardando cliente:", data);
    
    if (clienteToEdit && data.id) {
      // Estamos editando un cliente existente
      updateCliente.mutate(
        { id: data.id, ...data } as Cliente, 
        {
          onSuccess: () => {
            console.log("Cliente actualizado con éxito");
            handleDialogClose();
            toast({
              title: "Cliente actualizado",
              description: "El cliente ha sido actualizado exitosamente."
            });
          },
          onError: (error) => {
            console.error("Error al actualizar cliente:", error);
            toast({
              title: "Error",
              description: "No se pudo actualizar el cliente.",
              variant: "destructive"
            });
          }
        }
      );
    } else {
      // Estamos creando un nuevo cliente
      createCliente.mutate(data, {
        onSuccess: () => {
          console.log("Cliente agregado con éxito");
          handleDialogClose();
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
    }
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
          cliente={clienteToEdit}
          onSave={guardarCliente}
          isOpen={isDialogOpen}
          onOpenChange={handleDialogClose}
        />
      </div>

      <ClientesList
        clientes={clientes}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onDelete={eliminarCliente}
        onEdit={handleEditCliente}
      />
    </div>
  );
};

export default Clientes;
