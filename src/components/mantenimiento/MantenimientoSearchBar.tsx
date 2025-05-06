
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MantenimientoSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCreateNew: () => void;
}

export function MantenimientoSearchBar({ 
  searchTerm, 
  onSearchChange, 
  onCreateNew 
}: MantenimientoSearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar mantenimientos..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button 
        onClick={onCreateNew}
        className="whitespace-nowrap"
      >
        <Plus className="mr-2 h-4 w-4" /> Nuevo mantenimiento
      </Button>
    </div>
  );
}
