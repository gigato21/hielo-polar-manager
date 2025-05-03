
import jsPDF from 'jspdf'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

/**
 * Add page footer with pagination to all pages of the PDF document
 */
export const addPageFooter = (doc: jsPDF): void => {
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(10);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Generado el ${format(new Date(), 'PPpp', { locale: es })}`,
      20,
      doc.internal.pageSize.height - 10
    );
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 10,
      { align: 'right' }
    );
  }
};

/**
 * Format date with localization
 */
export const formatDate = (date: string | null | undefined): string => {
  if (!date) return 'N/A';
  return format(new Date(date), 'PPP', { locale: es });
};

/**
 * Format currency as Mexican Pesos
 */
export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount === undefined || amount === null) return 'N/A';
  return `$${amount.toFixed(2)}`;
};
