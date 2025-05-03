import { useState } from "react"
import { Check, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { OrdenServicioForm } from "@/components/ordenes-servicio/OrdenServicioForm"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { TipoServicio, EstadoOrden, Tables } from '@/types/supabase'

interface OrdenServicio {
  id: string
  numero_orden: string
  tipo: TipoServicio
  estado: EstadoOrden
  fecha_solicitud: string
  cliente: string
  conservador: string
  proveedor: string
}

const ordenesServicioData: OrdenServicio[] = [
  {
    id: "1",
    numero_orden: "OS-2024-001",
    tipo: "mantenimiento_preventivo",
    estado: "pendiente",
    fecha_solicitud: "2024-01-20",
    cliente: "Hielo Polar",
    conservador: "Conservador 1",
    proveedor: "Proveedor A",
  },
  {
    id: "2",
    numero_orden: "OS-2024-002",
    tipo: "reparacion",
    estado: "en_proceso",
    fecha_solicitud: "2024-01-22",
    cliente: "Coca Cola",
    conservador: "Conservador 2",
    proveedor: "Proveedor B",
  },
  {
    id: "3",
    numero_orden: "OS-2024-003",
    tipo: "instalacion",
    estado: "completada",
    fecha_solicitud: "2024-01-25",
    cliente: "Pepsi",
    conservador: "Conservador 3",
    proveedor: "Proveedor C",
  },
]

export function OrdenesServicioList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const filteredOrdenes = ordenesServicioData.filter((orden) => {
    const matchesSearch =
      orden.numero_orden.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.conservador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.proveedor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "todos" || orden.estado === statusFilter

    return matchesSearch && matchesStatus
  })

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId)
        : [...prevSelected, orderId]
    )
  }

  const isAllSelected = filteredOrdenes.every((orden) =>
    selectedOrders.includes(orden.id)
  )

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrdenes.map((orden) => orden.id))
    }
  }

  const getStatusVariant = (estado: EstadoOrden) => {
    switch (estado) {
      case "pendiente":
        return "secondary"
      case "en_proceso":
        return "default"
      case "completada":
        return "success"
      case "cancelada":
        return "destructive"
      case "facturada":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número de orden, cliente..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center">
            <Select
              defaultValue="todos"
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="en_proceso">En Proceso</SelectItem>
                <SelectItem value="completada">Completada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
                <SelectItem value="facturada">Facturada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Nueva Orden
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Órdenes de Servicio</CardTitle>
            <CardDescription>
              Listado de órdenes de servicio registradas
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número de Orden
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Solicitud
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conservador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proveedor
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrdenes.map((orden) => (
                  <tr key={orden.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Checkbox
                        checked={selectedOrders.includes(orden.id)}
                        onCheckedChange={() => toggleOrderSelection(orden.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {orden.numero_orden}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {orden.tipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(orden.estado)}>
                        {orden.estado}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(orden.fecha_solicitud), 'PPP', { locale: es })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{orden.cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{orden.conservador}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{orden.proveedor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredOrdenes.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No se encontraron órdenes de servicio</h3>
          <p className="text-muted-foreground mt-1">
            Intenta cambiar los filtros o términos de búsqueda
          </p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nueva Orden de Servicio</DialogTitle>
            <DialogDescription>
              Completa el formulario para crear una nueva orden de servicio.
            </DialogDescription>
          </DialogHeader>
          <OrdenServicioForm
            onSuccess={() => setIsDialogOpen(false)}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
