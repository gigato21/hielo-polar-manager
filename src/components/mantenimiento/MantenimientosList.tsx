
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Search, Plus, AlertCircle, CheckCircle2, Clock, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMantenimientos } from "@/hooks/useMantenimientos";
import { MantenimientoForm } from "./MantenimientoForm";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function MantenimientosList() {
  const { mantenimientos, isLoading, createMantenimiento, updateMantenimiento, deleteMantenimiento } = useMantenimientos();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState<any>(null);

  // Filter mantenimientos based on search term
  const filteredMantenimientos = mantenimientos ? mantenimientos.filter((mantenimiento) => 
    mantenimiento.tipo_servicio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mantenimiento.conservador?.numero_serie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mantenimiento.tecnico?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleCreate = (formData: any) => {
    createMantenimiento.mutate({
      ...formData,
      fecha_programada: formData.fecha_programada ? format(formData.fecha_programada, "yyyy-MM-dd") : null,
      fecha_realizado: formData.fecha_realizado ? format(formData.fecha_realizado, "yyyy-MM-dd") : null,
    }, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        toast.success("Mantenimiento creado correctamente");
      },
      onError: (error) => {
        toast.error(`Error al crear mantenimiento: ${error.message}`);
      }
    });
  };

  const handleUpdate = (formData: any) => {
    if (!selectedMantenimiento) return;

    updateMantenimiento.mutate({
      id: selectedMantenimiento.id,
      ...formData,
      fecha_programada: formData.fecha_programada ? format(formData.fecha_programada, "yyyy-MM-dd") : null,
      fecha_realizado: formData.fecha_realizado ? format(formData.fecha_realizado, "yyyy-MM-dd") : null,
    }, {
      onSuccess: () => {
        setIsUpdateDialogOpen(false);
        setSelectedMantenimiento(null);
        toast.success("Mantenimiento actualizado correctamente");
      },
      onError: (error) => {
        toast.error(`Error al actualizar mantenimiento: ${error.message}`);
      }
    });
  };

  const handleDelete = () => {
    if (!selectedMantenimiento) return;
    
    deleteMantenimiento.mutate(selectedMantenimiento.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setSelectedMantenimiento(null);
        toast.success("Mantenimiento eliminado correctamente");
      },
      onError: (error) => {
        toast.error(`Error al eliminar mantenimiento: ${error.message}`);
      }
    });
  };

  const openUpdateDialog = (mantenimiento: any) => {
    setSelectedMantenimiento(mantenimiento);
    setIsUpdateDialogOpen(true);
  };

  const openDeleteDialog = (mantenimiento: any) => {
    setSelectedMantenimiento(mantenimiento);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          <AlertCircle className="mr-1 h-3 w-3" /> Pendiente
        </Badge>;
      case "en_proceso":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">
          <Clock className="mr-1 h-3 w-3" /> En proceso
        </Badge>;
      case "completado":
        return <Badge variant="outline" className="bg-green-100 text-green-800">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Completado
        </Badge>;
      case "cancelado":
        return <Badge variant="outline" className="bg-red-100 text-red-800">
          <X className="mr-1 h-3 w-3" /> Cancelado
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar mantenimientos..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="whitespace-nowrap"
        >
          <Plus className="mr-2 h-4 w-4" /> Nuevo mantenimiento
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-10">
          <p>Cargando mantenimientos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMantenimientos.length > 0 ? (
            filteredMantenimientos.map((mantenimiento) => (
              <Card key={mantenimiento.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {mantenimiento.tipo_servicio}
                      </CardTitle>
                      <CardDescription>
                        Conservador: {mantenimiento.conservador?.numero_serie || "No asignado"}
                      </CardDescription>
                    </div>
                    {mantenimiento.status && getStatusBadge(mantenimiento.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  {mantenimiento.descripcion && (
                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-medium">Descripción:</p>
                      <p className="text-sm text-muted-foreground">{mantenimiento.descripcion}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm font-medium">Fecha programada:</p>
                      <p className="text-sm text-muted-foreground">
                        {mantenimiento.fecha_programada ? 
                          format(new Date(mantenimiento.fecha_programada), "dd/MM/yyyy", { locale: es }) : 
                          "No programado"}
                      </p>
                    </div>
                    {mantenimiento.fecha_realizado && (
                      <div>
                        <p className="text-sm font-medium">Fecha realizado:</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(mantenimiento.fecha_realizado), "dd/MM/yyyy", { locale: es })}
                        </p>
                      </div>
                    )}
                  </div>
                  {(mantenimiento.tecnico || mantenimiento.costo !== null) && (
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {mantenimiento.tecnico && (
                        <div>
                          <p className="text-sm font-medium">Técnico:</p>
                          <p className="text-sm text-muted-foreground">{mantenimiento.tecnico}</p>
                        </div>
                      )}
                      {mantenimiento.costo !== null && (
                        <div>
                          <p className="text-sm font-medium">Costo:</p>
                          <p className="text-sm text-muted-foreground">
                            ${mantenimiento.costo.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => openUpdateDialog(mantenimiento)}>
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => openDeleteDialog(mantenimiento)}>
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center p-10">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No se encontraron mantenimientos que coincidan con la búsqueda."
                  : "No hay mantenimientos registrados."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create Dialog */}
      <MantenimientoForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
        isLoading={createMantenimiento.isPending}
      />

      {/* Update Dialog */}
      {selectedMantenimiento && (
        <MantenimientoForm
          open={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          onSubmit={handleUpdate}
          initialData={selectedMantenimiento}
          isLoading={updateMantenimiento.isPending}
        />
      )}

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el registro de mantenimiento y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
