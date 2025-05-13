import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NegocioSection } from "./form-sections/NegocioSection";
import { ResponsableSection } from "./form-sections/ResponsableSection";
import { ContactoSection } from "./form-sections/ContactoSection";
import { UbicacionSection } from "./form-sections/UbicacionSection";
import { DocumentacionSection } from "./form-sections/DocumentacionSection";
import { ClienteFormActions } from "./form-sections/ClienteFormActions";
import { clienteFormDefaultValues, ClienteFormData } from "./form-sections/ClienteFormSchema";
import { useClientes } from '@/hooks/useClientes';

interface ClienteFormProps {
  onSuccess: (formData: ClienteFormData) => void;
  onCancel: () => void;
}

export function ClienteForm({ onSuccess, onCancel }: ClienteFormProps) {
  const form = useForm<ClienteFormData>({
    defaultValues: clienteFormDefaultValues,
  });

  const { createCliente } = useClientes();

  const onSubmit = async (data: ClienteFormData) => {
    try {
      const formattedData = {
        nombre: data.negocio.nombre,
        contacto: data.contacto.email,
        telefono: data.contacto.telefono,
        direccion: `${data.ubicacion.calle}, ${data.ubicacion.numero_ext}, ${data.ubicacion.colonia}, ${data.ubicacion.municipio}, ${data.ubicacion.estado}, ${data.ubicacion.cp}`,
        rfc: data.negocio.rfc,
        imagen: data.negocio.imagen || undefined, // Ajustar si es un archivo
        comodato: data.documentacion.contrato_comodato || undefined, // Ajustar si es un archivo
        notas: data.notas || "",
      };

      console.log("Datos formateados para guardar:", formattedData);

      await createCliente.mutateAsync(formattedData);
      onSuccess(data);
    } catch (error) {
      console.error('Error al guardar el cliente:', error);
    }
  };

  return (
    <ScrollArea className="h-[80vh]">
      <div className="p-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda - Datos del Negocio y Responsable */}
            <div className="space-y-6">
              <NegocioSection control={form.control} />
              <ResponsableSection control={form.control} />
            </div>

            {/* Columna derecha - Contacto, Ubicación y Documentación */}
            <div className="space-y-6">
              <ContactoSection control={form.control} />
              <UbicacionSection control={form.control} />
              <DocumentacionSection control={form.control} />
            </div>

            {/* Botones de acción */}
            <div className="md:col-span-2">
              <ClienteFormActions 
                onCancel={onCancel} 
                isSubmitting={form.formState.isSubmitting} 
              />
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}
