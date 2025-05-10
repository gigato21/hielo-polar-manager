import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, MapPin, User, HardDrive } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConservadorForm } from "./ConservadorForm";

interface ConservadorData {
  id: string;
  modelo: string;
  capacidad: string;
  cliente: string;
  ubicacion: string;
  estado: string;
  ultimoMantenimiento: string;
}

export function ConservadorCard({ conservador }: { conservador: ConservadorData }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getStatusVariant = () => {
    switch (conservador.estado) {
      case "activo":
        return "default";
      case "mantenimiento":
        return "secondary";
      case "inactivo":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{conservador.modelo}</CardTitle>
            <Badge variant={getStatusVariant()}>
              {conservador.estado.toUpperCase()}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            ID: {conservador.id} | {conservador.capacidad}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{conservador.cliente}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{conservador.ubicacion}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Último mantenimiento: {conservador.ultimoMantenimiento}</span>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowDetails(true)}
            >
              <FileText className="h-4 w-4 mr-1" />
              Detalles
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal de detalles */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Conservador</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <h4 className="text-sm font-medium col-span-1">ID:</h4>
              <p className="text-sm col-span-3">{conservador.id}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <h4 className="text-sm font-medium col-span-1">Modelo:</h4>
              <p className="text-sm col-span-3">{conservador.modelo}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <h4 className="text-sm font-medium col-span-1">Capacidad:</h4>
              <p className="text-sm col-span-3">{conservador.capacidad}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <h4 className="text-sm font-medium col-span-1">Cliente:</h4>
              <p className="text-sm col-span-3">{conservador.cliente}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <h4 className="text-sm font-medium col-span-1">Ubicación:</h4>
              <p className="text-sm col-span-3">{conservador.ubicacion}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <h4 className="text-sm font-medium col-span-1">Estado:</h4>
              <p className="text-sm col-span-3">
                <Badge variant={getStatusVariant()}>
                  {conservador.estado.toUpperCase()}
                </Badge>
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <h4 className="text-sm font-medium col-span-1">
                Último mantenimiento:
              </h4>
              <p className="text-sm col-span-3">{conservador.ultimoMantenimiento}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de edición */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Conservador</DialogTitle>
          </DialogHeader>
          <ConservadorForm
            onSuccess={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
            defaultValues={conservador}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}