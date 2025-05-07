import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Configuracion = () => {
  const [notificacionesEmail, setNotificacionesEmail] = useState(true);
  const [notificacionesApp, setNotificacionesApp] = useState(true);
  const [diasAnticipacion, setDiasAnticipacion] = useState("7");

  const handleSaveGeneral = () => {
    console.log("Guardando configuración general...");
    // Aquí puedes agregar lógica para guardar los datos en un backend o almacenamiento local
  };

  const handleSaveNotificaciones = () => {
    console.log("Guardando configuración de notificaciones...");
    // Aquí puedes agregar lógica para guardar los datos en un backend o almacenamiento local
  };

  const handleSaveEmpresa = () => {
    console.log("Guardando datos de la empresa...");
    // Aquí puedes agregar lógica para guardar los datos en un backend o almacenamiento local
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-muted-foreground">
            Personaliza la aplicación según tus preferencias
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="empresa">Datos de Empresa</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>
                Ajusta la configuración general de la aplicación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lenguaje">Idioma</Label>
                <Select defaultValue="es">
                  <SelectTrigger id="lenguaje">
                    <SelectValue placeholder="Seleccionar idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">Inglés</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zona-horaria">Zona Horaria</Label>
                <Select defaultValue="america-mexico-city">
                  <SelectTrigger id="zona-horaria">
                    <SelectValue placeholder="Seleccionar zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-mexico-city">Ciudad de México (UTC-6)</SelectItem>
                    <SelectItem value="america-monterrey">Monterrey (UTC-6)</SelectItem>
                    <SelectItem value="america-tijuana">Tijuana (UTC-8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="formato-fecha">Formato de Fecha</Label>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger id="formato-fecha">
                    <SelectValue placeholder="Seleccionar formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="modo-oscuro">Modo Oscuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Cambiar entre tema claro y oscuro
                  </p>
                </div>
                <Switch id="modo-oscuro" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>
                Personaliza cómo y cuándo recibir alertas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif">Notificaciones por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe alertas de mantenimiento por correo
                  </p>
                </div>
                <Switch 
                  id="email-notif" 
                  checked={notificacionesEmail} 
                  onCheckedChange={setNotificacionesEmail} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="app-notif">Notificaciones en Aplicación</Label>
                  <p className="text-sm text-muted-foreground">
                    Muestra alertas dentro de la aplicación
                  </p>
                </div>
                <Switch 
                  id="app-notif" 
                  checked={notificacionesApp} 
                  onCheckedChange={setNotificacionesApp} 
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="anticipo">Días de Anticipación</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  ¿Con cuántos días de anticipación quieres recibir alertas de mantenimiento?
                </p>
                <Select value={diasAnticipacion} onValueChange={setDiasAnticipacion}>
                  <SelectTrigger id="anticipo">
                    <SelectValue placeholder="Seleccionar días" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 día</SelectItem>
                    <SelectItem value="3">3 días</SelectItem>
                    <SelectItem value="5">5 días</SelectItem>
                    <SelectItem value="7">7 días</SelectItem>
                    <SelectItem value="14">14 días</SelectItem>
                    <SelectItem value="30">30 días</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-reportes">Email para Reportes</Label>
                <Input id="email-reportes" placeholder="correo@ejemplo.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificaciones}>Guardar Preferencias</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="empresa">
          <Card>
            <CardHeader>
              <CardTitle>Datos de Empresa</CardTitle>
              <CardDescription>
                Información de tu empresa para reportes y documentos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre-empresa">Nombre de la Empresa</Label>
                  <Input id="nombre-empresa" placeholder="Hielo Polar S.A. de C.V." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rfc">RFC</Label>
                  <Input id="rfc" placeholder="XAXX010101000" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input id="direccion" placeholder="Calle, número, colonia" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input id="ciudad" placeholder="Ciudad" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input id="estado" placeholder="Estado" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cp">Código Postal</Label>
                  <Input id="cp" placeholder="00000" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="(123) 456-7890" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-empresa">Email</Label>
                  <Input id="email-empresa" placeholder="contacto@ejemplo.com" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveEmpresa}>Guardar Información</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Administra los usuarios que tienen acceso al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white dark:bg-black p-6 rounded-md border">
                <p className="text-muted-foreground">La gestión de usuarios se implementará próximamente.</p>
                <p className="text-muted-foreground mt-2">Aquí podrás crear, editar y eliminar usuarios, así como asignar roles y permisos.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracion;
