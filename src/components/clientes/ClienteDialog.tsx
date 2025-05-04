
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Cliente } from "@/hooks/useClientes";

interface ClienteDialogProps {
  onSave: (cliente: Omit<Cliente, 'id'>) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ClienteDialog = ({ 
  onSave, 
  isOpen, 
  onOpenChange 
}: ClienteDialogProps) => {
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

  const handleSave = () => {
    console.log("ClienteDialog - Guardando cliente:", nuevoCliente);
    onSave(nuevoCliente);
    setNuevoCliente({
      nombre: '',
      contacto: '',
      email: '',
      telefono: '',
      direccion: '',
      conservadores: 0
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar Cliente</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
