
import { Search, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface MantenimientoSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCreateNew: () => void;
  statusFilter: string | null;
  onStatusFilterChange: (status: string | null) => void;
}

export function MantenimientoSearchBar({ 
  searchTerm, 
  onSearchChange, 
  onCreateNew,
  statusFilter,
  onStatusFilterChange
}: MantenimientoSearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex w-full sm:w-auto gap-2">
        <div className="relative flex-1 sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar mantenimientos..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Filter className={statusFilter ? "text-primary" : "text-muted-foreground"} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filtrar por estado</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onStatusFilterChange(null)}
              className={statusFilter === null ? "bg-accent text-accent-foreground" : ""}
            >
              Todos
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusFilterChange("pendiente")}
              className={statusFilter === "pendiente" ? "bg-accent text-accent-foreground" : ""}
            >
              Pendiente
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusFilterChange("en_proceso")}
              className={statusFilter === "en_proceso" ? "bg-accent text-accent-foreground" : ""}
            >
              En proceso
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusFilterChange("completado")}
              className={statusFilter === "completado" ? "bg-accent text-accent-foreground" : ""}
            >
              Completado
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusFilterChange("cancelado")}
              className={statusFilter === "cancelado" ? "bg-accent text-accent-foreground" : ""}
            >
              Cancelado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button 
        onClick={onCreateNew}
        className="whitespace-nowrap w-full sm:w-auto"
      >
        <Plus className="mr-2 h-4 w-4" /> Nuevo mantenimiento
      </Button>
    </div>
  );
}
