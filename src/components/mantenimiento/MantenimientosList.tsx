
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useMantenimientos } from "@/hooks/useMantenimientos";
import { MantenimientoForm } from "./MantenimientoForm";
import { MantenimientoCard } from "./MantenimientoCard";
import { MantenimientoSearchBar } from "./MantenimientoSearchBar";
import { MantenimientoDeleteDialog } from "./MantenimientoDeleteDialog";

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
    // Convert "null" string to actual null for conservador_id
    const processedData = {
      ...formData,
      conservador_id: formData.conservador_id === "null" ? null : formData.conservador_id,
      fecha_programada: formData.fecha_programada ? format(formData.fecha_programada, "yyyy-MM-dd") : null,
      fecha_realizado: formData.fecha_realizado ? format(formData.fecha_realizado, "yyyy-MM-dd") : null,
    };

    createMantenimiento.mutate(processedData, {
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

    // Convert "null" string to actual null for conservador_id
    const processedData = {
      id: selectedMantenimiento.id,
      ...formData,
      conservador_id: formData.conservador_id === "null" ? null : formData.conservador_id,
      fecha_programada: formData.fecha_programada ? format(formData.fecha_programada, "yyyy-MM-dd") : null,
      fecha_realizado: formData.fecha_realizado ? format(formData.fecha_realizado, "yyyy-MM-dd") : null,
    };

    updateMantenimiento.mutate(processedData, {
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

  return (
    <div className="space-y-6">
      <MantenimientoSearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateNew={() => setIsCreateDialogOpen(true)}
      />

      {isLoading ? (
        <div className="flex justify-center p-10">
          <p>Cargando mantenimientos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMantenimientos.length > 0 ? (
            filteredMantenimientos.map((mantenimiento) => (
              <MantenimientoCard 
                key={mantenimiento.id}
                mantenimiento={mantenimiento}
                onUpdate={openUpdateDialog}
                onDelete={openDeleteDialog}
              />
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
      <MantenimientoDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
      />
    </div>
  );
}
