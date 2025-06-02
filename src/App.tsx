
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

// Pages
import Dashboard from "@/pages/Dashboard";
import Clientes from "@/pages/Clientes";
import Conservadores from "@/pages/Conservadores";
import { MantenimientoPage } from "@/pages/Mantenimiento";
import Reparaciones from "@/pages/Reparaciones";
import { OrdenesServicioPage } from "@/pages/OrdenesServicio";
import Configuracion from "@/pages/Configuracion";
import { EstadisticasPage } from "@/pages/Estadisticas";
import QRCode from "@/pages/QRCode";
import { Reportes } from "@/pages/Reportes";
import Login from "@/pages/Login";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

const queryClient = new QueryClient();

function App() {
  const { user } = useSupabaseAuth();

  // Si no hay usuario autenticado, mostrar el login
  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/conservadores" element={<Conservadores />} />
              <Route path="/mantenimiento" element={<MantenimientoPage />} />
              <Route path="/reparaciones" element={<Reparaciones />} />
              <Route path="/ordenes-servicio" element={<OrdenesServicioPage />} />
              <Route path="/configuracion" element={<Configuracion />} />
              <Route path="/estadisticas" element={<EstadisticasPage />} />
              <Route path="/qr" element={<QRCode />} />
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
