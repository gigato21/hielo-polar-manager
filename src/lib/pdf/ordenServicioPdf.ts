
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { OrdenServicioWithDetails } from '@/types/pdf'
import { addPageFooter } from './pdfUtils'
import {
  renderClienteProveedorInfo,
  renderConservadorInfo,
  renderDetallesServicio,
  renderProblemaYDiagnostico,
  renderTrabajoYMateriales,
  renderCostos,
  renderDatosFacturacion,
  renderFirmas
} from './ordenServicioSections'

export const generateOrdenServicioPDF = async (orden: OrdenServicioWithDetails): Promise<jsPDF> => {
  // Create an instance of jsPDF
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let finalY = 0;

  // Título y número de orden
  doc.setFontSize(20);
  doc.text('Orden de Servicio', pageWidth / 2, 20, { align: 'center' });
  doc.setFontSize(16);
  doc.text(orden.numero_orden, pageWidth / 2, 30, { align: 'center' });

  // Render client and provider information
  finalY = renderClienteProveedorInfo(doc, orden, 45);
  
  // Render conservador information
  finalY = renderConservadorInfo(doc, orden, finalY + 15);
  
  // Render service details
  finalY = renderDetallesServicio(doc, orden, finalY + 15);
  
  // Render problem description and diagnosis
  finalY = renderProblemaYDiagnostico(doc, orden, finalY + 15);
  
  // Create a new page for work and materials
  doc.addPage();
  
  // Render work done and materials used
  finalY = renderTrabajoYMateriales(doc, orden);
  
  // Render costs information
  finalY = renderCostos(doc, orden, finalY + 15);
  
  // Render invoice information if available
  if (orden.numero_factura) {
    finalY = renderDatosFacturacion(doc, orden, finalY + 15);
  }
  
  // Add signatures if available on a new page
  if (orden.firmas && orden.firmas.length > 0) {
    doc.addPage();
    renderFirmas(doc, orden);
  }
  
  // Add page footer with pagination
  addPageFooter(doc);
  
  return doc;
};

// Remove the duplicate export line that was here
