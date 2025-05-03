
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { formatDate, formatCurrency } from './pdfUtils'
import { OrdenServicioWithDetails } from '@/types/pdf'

/**
 * Render client and provider information section
 */
export const renderClienteProveedorInfo = (
  doc: jsPDF, 
  orden: OrdenServicioWithDetails, 
  startY: number
): number => {
  doc.setFontSize(12);
  doc.text('Datos del Cliente:', 20, startY);
  
  const clienteInfo = [
    ['Nombre:', orden.conservador?.cliente?.nombre || 'N/A'],
    ['RFC:', orden.conservador?.cliente?.rfc || 'N/A'],
  ];
  
  doc.autoTable({
    startY: startY + 5,
    head: [],
    body: clienteInfo,
    theme: 'plain',
    margin: { left: 20 },
  });
  
  let finalY = (doc as any).lastAutoTable.finalY;

  doc.text('Datos del Proveedor:', 20, finalY + 15);
  const proveedorInfo = [
    ['Razón Social:', orden.proveedor?.razon_social || 'N/A'],
    ['RFC:', orden.proveedor?.rfc || 'N/A'],
  ];
  
  doc.autoTable({
    startY: finalY + 20,
    head: [],
    body: proveedorInfo,
    theme: 'plain',
    margin: { left: 20 },
  });
  
  return (doc as any).lastAutoTable.finalY;
};

/**
 * Render conservador information section
 */
export const renderConservadorInfo = (
  doc: jsPDF, 
  orden: OrdenServicioWithDetails, 
  startY: number
): number => {
  doc.setFontSize(12);
  doc.text('Datos del Conservador:', 20, startY);
  
  const conservadorInfo = [
    ['Número de Serie:', orden.conservador?.numero_serie || 'N/A'],
    ['Modelo:', orden.conservador?.modelo || 'N/A'],
  ];
  
  doc.autoTable({
    startY: startY + 5,
    head: [],
    body: conservadorInfo,
    theme: 'plain',
    margin: { left: 20 },
  });
  
  return (doc as any).lastAutoTable.finalY;
};

/**
 * Render service details section
 */
export const renderDetallesServicio = (
  doc: jsPDF, 
  orden: OrdenServicioWithDetails, 
  startY: number
): number => {
  doc.setFontSize(12);
  doc.text('Detalles del Servicio:', 20, startY);
  
  const servicioInfo = [
    ['Tipo de Servicio:', orden.tipo],
    ['Estado:', orden.estado],
    ['Fecha Solicitud:', formatDate(orden.fecha_solicitud)],
    ['Fecha Programada:', formatDate(orden.fecha_programada)],
    ['Fecha Inicio:', formatDate(orden.fecha_inicio)],
    ['Fecha Fin:', formatDate(orden.fecha_fin)],
  ];
  
  doc.autoTable({
    startY: startY + 5,
    head: [],
    body: servicioInfo,
    theme: 'plain',
    margin: { left: 20 },
  });
  
  return (doc as any).lastAutoTable.finalY;
};

/**
 * Render problem description and diagnosis section
 */
export const renderProblemaYDiagnostico = (
  doc: jsPDF, 
  orden: OrdenServicioWithDetails, 
  startY: number
): number => {
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let finalY = startY;
  
  if (orden.descripcion_problema) {
    doc.setFontSize(12);
    doc.text('Descripción del Problema:', margin, finalY);
    doc.setFontSize(10);
    const splitDescripcion = doc.splitTextToSize(orden.descripcion_problema, pageWidth - 2 * margin);
    doc.text(splitDescripcion, margin, finalY + 10);
    finalY = finalY + 10 + splitDescripcion.length * 5;
  }

  if (orden.diagnostico) {
    doc.setFontSize(12);
    doc.text('Diagnóstico:', margin, finalY + 10);
    doc.setFontSize(10);
    const splitDiagnostico = doc.splitTextToSize(orden.diagnostico, pageWidth - 2 * margin);
    doc.text(splitDiagnostico, margin, finalY + 20);
    finalY = finalY + 20 + splitDiagnostico.length * 5;
  }
  
  return finalY;
};

/**
 * Render work done and materials used section
 */
export const renderTrabajoYMateriales = (
  doc: jsPDF, 
  orden: OrdenServicioWithDetails
): number => {
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let finalY = 20;
  
  // Trabajo realizado
  doc.setFontSize(12);
  doc.text('Trabajo Realizado:', margin, finalY);
  if (orden.trabajo_realizado) {
    doc.setFontSize(10);
    const splitTrabajo = doc.splitTextToSize(orden.trabajo_realizado, pageWidth - 2 * margin);
    doc.text(splitTrabajo, margin, finalY + 10);
    finalY = finalY + 10 + splitTrabajo.length * 5;
  } else {
    finalY += 10;
  }

  // Materiales utilizados
  if (orden.materiales_utilizados) {
    doc.setFontSize(12);
    doc.text('Materiales Utilizados:', margin, finalY + 10);
    doc.setFontSize(10);
    const splitMateriales = doc.splitTextToSize(orden.materiales_utilizados, pageWidth - 2 * margin);
    doc.text(splitMateriales, margin, finalY + 20);
    finalY = finalY + 20 + splitMateriales.length * 5;
  }
  
  return finalY;
};

/**
 * Render costs section
 */
export const renderCostos = (
  doc: jsPDF, 
  orden: OrdenServicioWithDetails, 
  startY: number
): number => {
  doc.setFontSize(12);
  doc.text('Costos:', 20, startY);
  
  const costosInfo = [
    ['Materiales:', formatCurrency(orden.costo_materiales)],
    ['Mano de Obra:', formatCurrency(orden.costo_mano_obra)],
    ['Total:', formatCurrency(orden.costo_total)],
  ];
  
  doc.autoTable({
    startY: startY + 5,
    head: [],
    body: costosInfo,
    theme: 'plain',
    margin: { left: 20 },
  });
  
  return (doc as any).lastAutoTable.finalY;
};

/**
 * Render invoice information section
 */
export const renderDatosFacturacion = (
  doc: jsPDF, 
  orden: OrdenServicioWithDetails, 
  startY: number
): number => {
  if (!orden.numero_factura) return startY;
  
  doc.setFontSize(12);
  doc.text('Datos de Facturación:', 20, startY);
  
  const facturaInfo = [
    ['Número de Factura:', orden.numero_factura],
    ['Fecha de Factura:', formatDate(orden.fecha_factura)],
    ['UUID:', orden.uuid_factura || 'N/A'],
  ];
  
  doc.autoTable({
    startY: startY + 5,
    head: [],
    body: facturaInfo,
    theme: 'plain',
    margin: { left: 20 },
  });
  
  return (doc as any).lastAutoTable.finalY;
};

/**
 * Render signatures section
 */
export const renderFirmas = (
  doc: jsPDF, 
  orden: OrdenServicioWithDetails
): void => {
  if (!orden.firmas || orden.firmas.length === 0) return;
  
  doc.setFontSize(12);
  doc.text('Firmas de Conformidad:', 20, 20);

  let yPos = 40;
  orden.firmas.forEach((firma) => {
    // Aquí se podría agregar la imagen de la firma usando doc.addImage
    doc.text(`${firma.nombre_firmante}${firma.cargo_firmante ? ` - ${firma.cargo_firmante}` : ''}`, 20, yPos);
    doc.text(formatDate(firma.fecha_firma), 20, yPos + 10);
    yPos += 40;
  });
};
