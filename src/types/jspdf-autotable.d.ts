
import 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
    getNumberOfPages: () => number;
    getTextDimensions: (text: string) => { w: number; h: number };
  }
}
