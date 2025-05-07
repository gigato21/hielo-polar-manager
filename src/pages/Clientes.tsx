
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClienteForm } from "@/components/clientes/ClienteForm";
import { ClientesList } from "@/components/clientes/ClientesList";
import { ClienteDialog } from "@/components/clientes/ClienteDialog";
import { useClientes, Cliente } from "@/hooks/useClientes";
import { useToast } from "@/hooks/use-toast";

const Clientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [clienteToEdit, setClienteToEdit] = useState<Cliente | null>(null);
  const { clientes, isLoading, createCliente, updateCliente, deleteCliente } = useClientes();
  const { toast } = useToast();

  const handleSaveCliente = (data: any) => {
    console.log("Guardando cliente:", data);
    if (clienteToEdit) {
      updateCliente.mutate(
        { id: clienteToEdit.id, ...data },
        {
          onSuccess: () => {
            toast({
              title: "Cliente actualizado",
              description: `Los datos de ${data.nombre} han sido actualizados correctamente.`
            });
            setClienteToEdit(null);
            setIsDialogOpen(false);
          },
          onError: (error) => {
            console.error("Error al actualizar cliente:", error);
            toast({
              title: "Error",
              description: "No se pudo actualizar el cliente. Inténtelo de nuevo.",
              variant: "destructive"
            });
          }
        }
      );
    } else {
      createCliente.mutate(
        data,
        {
          onSuccess: () => {
            toast({
              title: "Cliente creado",
              description: `${data.nombre} ha sido registrado correctamente.`
            });
            setIsDialogOpen(false);
          },
          onError: (error) => {
            console.error("Error al crear cliente:", error);
            toast({
              title: "Error",
              description: "No se pudo crear el cliente. Inténtelo de nuevo.",
              variant: "destructive"
            });
          }
        }
      );
    }
  };

  const handleFormSuccess = (formData: any) => {
    console.log("Datos del formulario completo:", formData);
    
    // Transformar los datos del formulario al formato esperado por la API
    const clienteData = {
      nombre: formData.negocio.nombre,
      contacto: `${formData.responsable.nombre} ${formData.responsable.apellidos}`,
      email: formData.contacto.email,
      telefono: formData.contacto.telefono,
      direccion: `${formData.ubicacion.calle} ${formData.ubicacion.numero_ext}, ${formData.ubicacion.colonia}, ${formData.ubicacion.municipio}, ${formData.ubicacion.estado}, CP: ${formData.ubicacion.cp}`,
      rfc: formData.negocio.rfc,
      imagen: formData.negocio.imagen,
      comodato: formData.documentacion.contrato_comodato
    };

    createCliente.mutate(
      clienteData,
      {
        onSuccess: () => {
          toast({
            title: "Cliente creado",
            description: `${clienteData.nombre} ha sido registrado correctamente.`
          });
          setIsFormDialogOpen(false);
        },
        onError: (error) => {
          console.error("Error al crear cliente:", error);
          toast({
            title: "Error",
            description: "No se pudo crear el cliente. Inténtelo de nuevo.",
            variant: "destructive"
          });
        }
      }
    );
  };

  const handleDeleteCliente = (id: string) => {
    if (confirm("¿Está seguro de eliminar este cliente?")) {
      deleteCliente.mutate(id, {
        onSuccess: () => {
          toast({
            title: "Cliente eliminado",
            description: "El cliente ha sido eliminado correctamente."
          });
        },
        onError: (error) => {
          console.error("Error al eliminar cliente:", error);
          toast({
            title: "Error",
            description: "No se pudo eliminar el cliente. Inténtelo de nuevo.",
            variant: "destructive"
          });
        }
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setClienteToEdit(null);
              setIsDialogOpen(true);
            }}
            className="bg-polar-600 hover:bg-polar-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Cliente Rápido
          </Button>
          <Button
            onClick={() => {
              setIsFormDialogOpen(true);
            }}
            variant="outline"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Cliente Detallado
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list-view" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="list-view">Lista de Clientes</TabsTrigger>
          <TabsTrigger value="add-client">Registrar Cliente</TabsTrigger>
        </TabsList>

        <TabsContent value="list-view">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>
                Visualice todos los clientes registrados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClientesList 
                clientes={clientes}
                isLoading={isLoading}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onDelete={handleDeleteCliente}
                onEdit={(cliente) => {
                  setClienteToEdit(cliente);
                  setIsDialogOpen(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-client">
          <Card>
            <CardHeader>
              <CardTitle>Registrar Nuevo Cliente</CardTitle>
              <CardDescription>
                Complete el formulario para registrar un nuevo cliente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClienteForm
                onSuccess={handleFormSuccess}
                onCancel={() => setIsFormDialogOpen(false)}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog for quick client creation/edit */}
      <ClienteDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveCliente}
        cliente={clienteToEdit}
      />

      {/* Dialog for detailed form */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Registrar Cliente Detallado</DialogTitle>
          </DialogHeader>
          <ClienteForm
            onSuccess={handleFormSuccess}
            onCancel={() => setIsFormDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clientes;
