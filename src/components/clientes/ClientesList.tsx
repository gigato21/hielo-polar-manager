
import { useState } from "react";
import { Search, Package, Phone, Mail, MapPin, X, Edit, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cliente } from "@/hooks/useClientes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClientesListProps {
  clientes: Cliente[] | null;
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onDelete: (id: string) => void;
  onEdit: (cliente: Cliente) => void;
}

export const ClientesList = ({
  clientes,
  isLoading,
  searchTerm,
  onSearchChange,
  onDelete,
  onEdit,
}: ClientesListProps) => {
  // Filtrar clientes según término de búsqueda
  const filteredClientes = isLoading
    ? []
    : clientes?.filter((cliente) =>
        Object.values(cliente).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) || [];

  console.log("ClientesList - Clientes filtrados:", filteredClientes);

  return (
    <div className="space-y-6">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar clientes..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-10">
          <p>Cargando clientes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClientes && filteredClientes.length > 0 ? (
            filteredClientes.map((cliente) => (
              <Card key={cliente.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {cliente.imagen_url ? (
                          <AvatarImage src={cliente.imagen_url} alt={cliente.nombre} />
                        ) : (
                          <AvatarFallback>{cliente.nombre.charAt(0)}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{cliente.nombre}</CardTitle>
                        {cliente.contacto && (
                          <CardDescription>{cliente.contacto}</CardDescription>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(cliente)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(cliente.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {cliente.telefono && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cliente.telefono}</span>
                    </div>
                  )}
                  {cliente.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cliente.email}</span>
                    </div>
                  )}
                  {cliente.direccion && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cliente.direccion}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{cliente.conservadores || '0'} conservadores</span>
                  </div>
                  {cliente.comodato_url && (
                    <div className="mt-2">
                      <a 
                        href={cliente.comodato_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center"
                      >
                        <Image className="h-3 w-3 mr-1" />
                        Ver contrato de comodato
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center p-10">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No se encontraron clientes que coincidan con la búsqueda."
                  : "No hay clientes registrados."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
