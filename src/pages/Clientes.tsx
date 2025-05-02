
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
import { Search, Plus, Phone, Mail, MapPin, Package, User, Edit, Trash2, Eye } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useClientes, Cliente } from "@/hooks/useClientes";
import { ClienteDialog } from "@/components/clientes/ClienteDialog";
import { useToast } from "@/hooks/use-toast";

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { clientes, isLoading, createCliente, updateCliente, deleteCliente } = useClientes();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Dialog states
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | undefined>(undefined);

  // Filter clients based on search term
  const filteredClientes = clientes?.filter((cliente) =>
    Object.values(cliente).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  // Handler functions
  const handleCreate = (data: Omit<Cliente, "id">) => {
    createCliente.mutate(data);
  };

  const handleUpdate = (data: Cliente) => {
    if (selectedCliente) {
      updateCliente.mutate({ ...data, id: selectedCliente.id });
    }
  };

  const handleDelete = () => {
    if (selectedCliente) {
      deleteCliente.mutate(selectedCliente.id);
      setOpenDeleteDialog(false);
    }
  };

  const handleViewDetails = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setOpenViewDialog(true);
  };

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setOpenEditDialog(true);
  };

  const handleDeletePrompt = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setOpenDeleteDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Cargando clientes...</p>
      </div>
    );
  }

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
        <Button onClick={() => setOpenCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {filteredClientes.map((cliente) => (
          <Card key={cliente.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>{cliente.nombre}</CardTitle>
              <CardDescription>ID: {cliente.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {cliente.contacto && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{cliente.contacto}</p>
                </div>
              )}
              {cliente.telefono && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{cliente.telefono}</p>
                </div>
              )}
              {cliente.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{cliente.email}</p>
                </div>
              )}
              {cliente.direccion && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">{cliente.direccion}</p>
                </div>
              )}
              {cliente.conservadores !== undefined && (
                <div className="flex items-center gap-2 pt-1">
                  <Package className="h-4 w-4 text-hielo-600" />
                  <p className="text-sm font-medium">{cliente.conservadores} conservadores</p>
                </div>
              )}
              <div className="pt-3 flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(cliente)}
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  Ver
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(cliente)}
                >
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDeletePrompt(cliente)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No se encontraron clientes</h3>
          <p className="text-muted-foreground mt-1">
            Intenta cambiar los términos de búsqueda o crear nuevos clientes
          </p>
        </div>
      )}

      {/* Create Dialog */}
      <ClienteDialog
        title="Crear Cliente"
        description="Ingresa los datos del nuevo cliente"
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onSubmit={handleCreate}
        isSubmitting={createCliente.isPending}
        mode="create"
      />

      {/* View Dialog */}
      <ClienteDialog
        title="Detalles del Cliente"
        description="Información completa del cliente"
        cliente={selectedCliente}
        open={openViewDialog}
        setOpen={setOpenViewDialog}
        mode="view"
      />

      {/* Edit Dialog */}
      <ClienteDialog
        title="Editar Cliente"
        description="Modifica la información del cliente"
        cliente={selectedCliente}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onSubmit={handleUpdate}
        isSubmitting={updateCliente.isPending}
        mode="edit"
      />

      {/* Delete Dialog */}
      <ClienteDialog
        title="Eliminar Cliente"
        description="Esta acción no se puede deshacer"
        cliente={selectedCliente}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        onDelete={handleDelete}
        isSubmitting={deleteCliente.isPending}
        mode="delete"
      />
    </div>
  );
};

export default Clientes;
