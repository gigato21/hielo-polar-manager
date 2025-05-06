
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useQueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from './pages/Dashboard'; 
import Clientes from './pages/Clientes';
import Conservadores from './pages/Conservadores';
import { MantenimientoPage } from './pages/Mantenimiento';
import { Reportes } from './pages/Reportes';
import QRCode from './pages/QRCode';
import { EstadisticasPage } from './pages/Estadisticas'; 
import Configuracion from './pages/Configuracion';
import { OrdenesServicioPage } from './pages/OrdenesServicio';
import Reparaciones from './pages/Repairs'; // Import the new page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/conservadores" element={<Conservadores />} />
            <Route path="/mantenimiento" element={<MantenimientoPage />} />
            <Route path="/ordenes-servicio" element={<OrdenesServicioPage />} />
            <Route path="/reparaciones" element={<Reparaciones />} /> {/* Add the new route */}
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/qr" element={<QRCode />} />
            <Route path="/estadisticas" element={<EstadisticasPage />} />
          </Route>
        </Routes>
        <Toaster />
        <Sonner />
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
