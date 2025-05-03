
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from './pages/Dashboard';  // Changed to default import
import Clientes from './pages/Clientes';
import Conservadores from './pages/Conservadores';
import { MantenimientoPage } from './pages/Mantenimiento';
import { Reportes } from './pages/Reportes';
import QRCode from './pages/QRCode.tsx';  // Fixed import path by adding .tsx extension
// import { EstadisticasPage } from './pages/Estadisticas'; // Commented out since the file doesn't exist
import Configuracion from './pages/Configuracion';

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
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/qr" element={<QRCode />} />
            {/* Commented out Estadisticas route since the file doesn't exist
            <Route path="/estadisticas" element={<EstadisticasPage />} />
            */}
          </Route>
        </Routes>
        <Toaster />
        <Sonner />
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
