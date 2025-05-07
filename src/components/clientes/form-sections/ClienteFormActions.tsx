
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ClienteFormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ClienteFormActions({ onCancel, isSubmitting = false }: ClienteFormActionsProps) {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        <Save className="h-4 w-4 mr-1" />
        Guardar Cliente
      </Button>
    </div>
  );
}
