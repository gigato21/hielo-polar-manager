
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ClienteForm } from "./ClienteForm"
import { Cliente } from "@/hooks/useClientes"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Package, User } from "lucide-react"

interface ClienteDialogProps {
  title: string
  description: string
  cliente?: Cliente
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit?: (data: any) => void
  isSubmitting?: boolean
  mode: "create" | "edit" | "view" | "delete"
  onDelete?: () => void
}

export function ClienteDialog({
  title,
  description,
  cliente,
  open,
  setOpen,
  onSubmit,
  isSubmitting = false,
  mode,
  onDelete,
}: ClienteDialogProps) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {mode === "view" && cliente && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{cliente.nombre}</h3>
              <p className="text-sm text-muted-foreground">ID: {cliente.id}</p>
            </div>

            {cliente.contacto && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <p>{cliente.contacto}</p>
              </div>
            )}

            {cliente.telefono && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p>{cliente.telefono}</p>
              </div>
            )}

            {cliente.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p>{cliente.email}</p>
              </div>
            )}

            {cliente.direccion && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <p>{cliente.direccion}</p>
              </div>
            )}

            {cliente.conservadores !== undefined && (
              <div className="flex items-center gap-2 pt-1">
                <Package className="h-4 w-4 text-hielo-600" />
                <p>{cliente.conservadores} conservadores</p>
              </div>
            )}

            <div className="flex justify-end">
              <DialogClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DialogClose>
            </div>
          </div>
        )}

        {mode === "delete" && cliente && (
          <div className="space-y-4">
            <p>¿Estás seguro que deseas eliminar el cliente "{cliente.nombre}"?</p>
            <p className="text-sm text-muted-foreground">
              Esta acción no se puede deshacer y eliminará todos los datos asociados a este cliente.
            </p>

            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button 
                variant="destructive" 
                onClick={onDelete} 
                disabled={isSubmitting}
              >
                Eliminar
              </Button>
            </div>
          </div>
        )}

        {(mode === "create" || mode === "edit") && (
          <ClienteForm
            cliente={cliente}
            onSubmit={(data) => {
              onSubmit && onSubmit(data)
              if (!isSubmitting) {
                handleClose()
              }
            }}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
