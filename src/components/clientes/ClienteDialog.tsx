
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Cliente } from "@/hooks/useClientes";
import { FileUpload } from "@/components/ui/file-upload";

type ClienteFormData = {
  nombre: string;
  contacto?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  imagen?: File | null;
  comodato?: File | null;
  imagen_url?: string;
  comodato_url?: string;
  rfc?: string;
  id?: string;
};

interface ClienteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ClienteFormData) => void;
  cliente?: Cliente | null;
}

export function ClienteDialog({
  isOpen,
  onOpenChange,
  onSave,
  cliente,
}: ClienteDialogProps) {
  const [formData, setFormData] = useState<ClienteFormData>({
    nombre: "",
    contacto: "",
    email: "",
    telefono: "",
    direccion: "",
    imagen: null,
    comodato: null,
    imagen_url: "",
    comodato_url: "",
    rfc: "",
  });

  // Actualizar el formulario cuando se proporciona un cliente para editar
  useEffect(() => {
    if (cliente) {
      setFormData({
        id: cliente.id,
        nombre: cliente.nombre || "",
        contacto: cliente.contacto || "",
        email: cliente.email || "",
        telefono: cliente.telefono || "",
        direccion: cliente.direccion || "",
        imagen_url: cliente.imagen_url || "",
        comodato_url: cliente.comodato_url || "",
        rfc: cliente.rfc || "",
        imagen: null,
        comodato: null,
      });
    } else {
      // Reiniciar el formulario cuando no hay cliente para editar
      setFormData({
        nombre: "",
        contacto: "",
        email: "",
        telefono: "",
        direccion: "",
        imagen: null,
        comodato: null,
        imagen_url: "",
        comodato_url: "",
        rfc: "",
      });
    }
  }, [cliente, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{cliente ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
            <DialogDescription>
              {cliente
                ? "Actualiza la información del cliente."
                : "Introduce los datos para el nuevo cliente."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Nombre del cliente"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contacto">Persona de Contacto</Label>
              <Input
                id="contacto"
                name="contacto"
                placeholder="Nombre del contacto"
                value={formData.contacto}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rfc">RFC</Label>
              <Input
                id="rfc"
                name="rfc"
                placeholder="RFC"
                value={formData.rfc}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                name="telefono"
                placeholder="Teléfono de contacto"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email de contacto"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Textarea
                id="direccion"
                name="direccion"
                placeholder="Dirección completa"
                value={formData.direccion}
                onChange={handleChange}
                rows={2}
              />
            </div>
            
            <FileUpload
              label="Imagen del Cliente/Negocio"
              accept="image/*"
              onChange={(file) => setFormData(prev => ({ ...prev, imagen: file }))}
              value={formData.imagen || formData.imagen_url}
              variant="image"
              placeholder="Subir imagen..."
            />
            
            <FileUpload
              label="Contrato de Comodato"
              accept=".pdf,.doc,.docx"
              onChange={(file) => setFormData(prev => ({ ...prev, comodato: file }))}
              value={formData.comodato || formData.comodato_url}
              placeholder="Subir contrato..."
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {cliente ? "Guardar Cambios" : "Crear Cliente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
