
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
import { useReparaciones, Reparacion } from "@/hooks/useReparaciones";
import { ReparacionForm } from "./ReparacionForm";
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

export function ReparacionesList() {
  const { reparaciones, isLoading, createReparacion, updateReparacion, deleteReparacion } = useReparaciones();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedReparacion, setSelectedReparacion] = useState<Reparacion | null>(null);

  // Filter reparaciones based on search term
  const filteredReparaciones = reparaciones?.filter(reparacion => 
    reparacion.descripcion_problema?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reparacion.conservador?.numero_serie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reparacion.conservador?.cliente?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reparacion.tecnico?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (formData: any) => {
    createReparacion.mutate({
      ...formData,
      fecha_reporte: format(formData.fecha_reporte, "yyyy-MM-dd"),
      fecha_reparacion: formData.fecha_reparacion ? format(formData.fecha_reparacion, "yyyy-MM-dd") : null,
    }, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      }
    });
  };

  const handleUpdate = (formData: any) => {
    if (!selectedReparacion) return;

    updateReparacion.mutate({
      id: selectedReparacion.id,
      ...formData,
      fecha_reporte: format(formData.fecha_reporte, "yyyy-MM-dd"),
      fecha_reparacion: formData.fecha_reparacion ? format(formData.fecha_reparacion, "yyyy-MM-dd") : null,
    }, {
      onSuccess: () => {
        setIsUpdateDialogOpen(false);
        setSelectedReparacion(null);
      }
    });
  };

  const handleDelete = () => {
    if (!selectedReparacion) return;
    
    deleteReparacion.mutate(selectedReparacion.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setSelectedReparacion(null);
      }
    });
  };

  const openUpdateDialog = (reparacion: Reparacion) => {
    setSelectedReparacion(reparacion);
    setIsUpdateDialogOpen(true);
  };

  const openDeleteDialog = (reparacion: Reparacion) => {
    setSelectedReparacion(reparacion);
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
      case "completada":
        return <Badge variant="outline" className="bg-green-100 text-green-800">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Completada
        </Badge>;
      case "cancelada":
        return <Badge variant="outline" className="bg-red-100 text-red-800">
          <X className="mr-1 h-3 w-3" /> Cancelada
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
            placeholder="Buscar reparaciones..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="whitespace-nowrap"
        >
          <Plus className="mr-2 h-4 w-4" /> Nueva reparación
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-10">
          <p>Cargando reparaciones...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReparaciones && filteredReparaciones.length > 0 ? (
            filteredReparaciones.map((reparacion) => (
              <Card key={reparacion.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {reparacion.conservador?.numero_serie || "Sin conservador"} 
                      </CardTitle>
                      <CardDescription>
                        {reparacion.conservador?.cliente?.nombre || "Cliente no asignado"}
                      </CardDescription>
                    </div>
                    {getStatusBadge(reparacion.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Problema:</p>
                    <p className="text-sm text-muted-foreground">{reparacion.descripcion_problema}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-medium">Fecha de reporte:</p>
                      <p className="text-sm text-muted-foreground">
                        {reparacion.fecha_reporte ? 
                          format(new Date(reparacion.fecha_reporte), "dd/MM/yyyy", { locale: es }) : 
                          "No disponible"}
                      </p>
                    </div>
                    {reparacion.fecha_reparacion && (
                      <div>
                        <p className="text-sm font-medium">Fecha reparación:</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(reparacion.fecha_reparacion), "dd/MM/yyyy", { locale: es })}
                        </p>
                      </div>
                    )}
                  </div>
                  {(reparacion.tecnico || reparacion.costo !== null) && (
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {reparacion.tecnico && (
                        <div>
                          <p className="text-sm font-medium">Técnico:</p>
                          <p className="text-sm text-muted-foreground">{reparacion.tecnico}</p>
                        </div>
                      )}
                      {reparacion.costo !== null && (
                        <div>
                          <p className="text-sm font-medium">Costo:</p>
                          <p className="text-sm text-muted-foreground">
                            ${reparacion.costo.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => openUpdateDialog(reparacion)}>
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => openDeleteDialog(reparacion)}>
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center p-10">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No se encontraron reparaciones que coincidan con la búsqueda."
                  : "No hay reparaciones registradas."}
              </p>
            </div>
          )}
        </div>
      )}

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
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la reparación y no se puede deshacer.
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
