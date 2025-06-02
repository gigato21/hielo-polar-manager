
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useReparaciones } from "@/hooks/useReparaciones";
import { ReparacionForm } from "./ReparacionForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Plus, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ReparacionesList() {
  const { reparaciones, isLoading, createReparacion, updateReparacion, deleteReparacion } = useReparaciones();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReparacion, setSelectedReparacion] = useState<any>(null);

  const handleCreate = (formData: any) => {
    createReparacion.mutate(formData, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        toast.success("Reparación creada correctamente");
      },
      onError: (error) => {
        toast.error(`Error al crear reparación: ${error.message}`);
      }
    });
  };

  const handleUpdate = (formData: any) => {
    if (!selectedReparacion) return;

    const updateData = {
      ...formData,
      id: selectedReparacion.id,
    };

    updateReparacion.mutate(updateData, {
      onSuccess: () => {
        setIsUpdateDialogOpen(false);
        setSelectedReparacion(null);
        toast.success("Reparación actualizada correctamente");
      },
      onError: (error) => {
        toast.error(`Error al actualizar reparación: ${error.message}`);
      }
    });
  };

  const handleDelete = () => {
    if (!selectedReparacion) return;
    
    deleteReparacion.mutate(selectedReparacion.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setSelectedReparacion(null);
        toast.success("Reparación eliminada correctamente");
      },
      onError: (error) => {
        toast.error(`Error al eliminar reparación: ${error.message}`);
      }
    });
  };

  const openUpdateDialog = (reparacion: any) => {
    setSelectedReparacion(reparacion);
    setIsUpdateDialogOpen(true);
  };

  const openDeleteDialog = (reparacion: any) => {
    setSelectedReparacion(reparacion);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completada':
        return 'default';
      case 'en_proceso':
        return 'secondary';
      case 'pendiente':
        return 'outline';
      case 'cancelada':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <p>Cargando reparaciones...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lista de Reparaciones</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Reparación
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reparaciones && reparaciones.length > 0 ? (
          reparaciones.map((reparacion) => (
            <Card key={reparacion.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {reparacion.conservador?.numero_serie || 'Sin conservador'}
                  </CardTitle>
                  <Badge variant={getStatusBadgeVariant(reparacion.status)}>
                    {reparacion.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Problema:</strong> {reparacion.descripcion_problema}
                </p>
                <p className="text-sm">
                  <strong>Fecha reporte:</strong> {format(new Date(reparacion.fecha_reporte), 'dd/MM/yyyy')}
                </p>
                {reparacion.fecha_reparacion && (
                  <p className="text-sm">
                    <strong>Fecha reparación:</strong> {format(new Date(reparacion.fecha_reparacion), 'dd/MM/yyyy')}
                  </p>
                )}
                {reparacion.tecnico && (
                  <p className="text-sm">
                    <strong>Técnico:</strong> {reparacion.tecnico}
                  </p>
                )}
                {reparacion.costo && (
                  <p className="text-sm">
                    <strong>Costo:</strong> ${reparacion.costo}
                  </p>
                )}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openUpdateDialog(reparacion)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDeleteDialog(reparacion)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center p-10">
            <p className="text-muted-foreground">No hay reparaciones registradas.</p>
          </div>
        )}
      </div>

      {/* Create Dialog */}
      <ReparacionForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
        isLoading={createReparacion.isPending}
      />

      {/* Update Dialog */}
      {selectedReparacion && (
        <ReparacionForm
          open={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          onSubmit={handleUpdate}
          initialData={selectedReparacion}
          isLoading={updateReparacion.isPending}
        />
      )}

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la reparación.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
