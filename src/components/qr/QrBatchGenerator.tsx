
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { generateQRCode } from "@/lib/qr";
import { toast } from "sonner";
import { Download, Printer, QrCode } from "lucide-react";
import JSZip from "jszip";

interface Conservador {
  id: string;
  numero_serie: string;
  modelo?: string;
  capacidad?: number;
  status?: string;
  cliente?: any;
}

interface QrBatchGeneratorProps {
  conservadores: Conservador[];
  isLoading: boolean;
}

interface GeneratedQR {
  id: string;
  conservador: Conservador;
  qrDataUrl: string;
}

export const QrBatchGenerator = ({ conservadores, isLoading }: QrBatchGeneratorProps) => {
  const [selectedConservadores, setSelectedConservadores] = useState<string[]>([]);
  const [generatedQRs, setGeneratedQRs] = useState<GeneratedQR[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedConservadores(conservadores.map(c => c.id));
    } else {
      setSelectedConservadores([]);
    }
  };

  const handleSelectConservador = (conservadorId: string, checked: boolean) => {
    if (checked) {
      setSelectedConservadores(prev => [...prev, conservadorId]);
    } else {
      setSelectedConservadores(prev => prev.filter(id => id !== conservadorId));
    }
  };

  const generateBatchQRs = async () => {
    if (selectedConservadores.length === 0) {
      toast.error("Seleccione al menos un conservador");
      return;
    }

    setIsGenerating(true);
    const generated: GeneratedQR[] = [];

    try {
      for (const conservadorId of selectedConservadores) {
        const conservador = conservadores.find(c => c.id === conservadorId);
        if (conservador) {
          try {
            const qrDataUrl = await generateQRCode(
              conservador.id,
              conservador.cliente,
              conservador
            );
            generated.push({
              id: conservador.id,
              conservador,
              qrDataUrl
            });
          } catch (error) {
            console.error(`Error generando QR para ${conservador.numero_serie}:`, error);
            toast.error(`Error generando QR para ${conservador.numero_serie}`);
          }
        }
      }

      setGeneratedQRs(generated);
      toast.success(`${generated.length} códigos QR generados exitosamente`);
    } catch (error) {
      console.error("Error en generación por lotes:", error);
      toast.error("Error en la generación por lotes");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAllQRs = async () => {
    if (generatedQRs.length === 0) {
      toast.error("No hay códigos QR generados para descargar");
      return;
    }

    try {
      const zip = new JSZip();
      
      for (const qr of generatedQRs) {
        // Convertir data URL a blob
        const response = await fetch(qr.qrDataUrl);
        const blob = await response.blob();
        const filename = `QR_${qr.conservador.numero_serie}_${qr.conservador.modelo || 'conservador'}.png`;
        zip.file(filename, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `codigos_qr_lote_${new Date().toISOString().split('T')[0]}.zip`;
      link.click();
      
      toast.success("Archivo ZIP descargado exitosamente");
    } catch (error) {
      console.error("Error descargando QRs:", error);
      toast.error("Error al descargar los códigos QR");
    }
  };

  const printAllQRs = () => {
    if (generatedQRs.length === 0) {
      toast.error("No hay códigos QR generados para imprimir");
      return;
    }

    // Crear una ventana nueva para impresión
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("No se pudo abrir la ventana de impresión");
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Códigos QR - Impresión por Lotes</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .qr-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
            .qr-item { border: 1px solid #ccc; padding: 15px; text-align: center; page-break-inside: avoid; }
            .qr-item img { max-width: 200px; height: auto; }
            .qr-info { margin-top: 10px; font-size: 12px; }
            @media print { .qr-container { grid-template-columns: repeat(2, 1fr); } }
          </style>
        </head>
        <body>
          <h1>Códigos QR - Lote de ${generatedQRs.length} conservadores</h1>
          <div class="qr-container">
            ${generatedQRs.map(qr => `
              <div class="qr-item">
                <img src="${qr.qrDataUrl}" alt="QR ${qr.conservador.numero_serie}" />
                <div class="qr-info">
                  <strong>${qr.conservador.numero_serie}</strong><br/>
                  ${qr.conservador.modelo || 'N/A'}<br/>
                  ${qr.conservador.cliente?.nombre || 'Sin cliente'}
                </div>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();

    toast.success("Impresión iniciada");
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Cargando conservadores...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generación por Lote de Códigos QR</CardTitle>
          <CardDescription>
            Seleccione los conservadores para generar códigos QR funcionales en lote
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedConservadores.length === conservadores.length && conservadores.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <label className="text-sm font-medium">
                  Seleccionar todos ({conservadores.length} conservadores)
                </label>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedConservadores.length} seleccionados
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto border rounded-md p-4">
              <div className="space-y-2">
                {conservadores.map((conservador) => (
                  <div key={conservador.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedConservadores.includes(conservador.id)}
                        onCheckedChange={(checked) => handleSelectConservador(conservador.id, !!checked)}
                      />
                      <div>
                        <div className="font-medium">{conservador.numero_serie}</div>
                        <div className="text-sm text-muted-foreground">
                          {conservador.modelo} | {conservador.cliente?.nombre || 'Sin cliente'}
                        </div>
                      </div>
                    </div>
                    <Badge variant={conservador.status === 'activo' ? 'default' : 'secondary'}>
                      {conservador.status || 'N/A'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={generateBatchQRs}
              disabled={selectedConservadores.length === 0 || isGenerating}
              className="w-full"
            >
              <QrCode className="h-4 w-4 mr-2" />
              {isGenerating ? "Generando..." : `Generar ${selectedConservadores.length} códigos QR`}
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedQRs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Códigos QR Generados ({generatedQRs.length})</CardTitle>
            <CardDescription>
              Códigos QR funcionales listos para usar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={downloadAllQRs} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Todo (ZIP)
                </Button>
                <Button onClick={printAllQRs} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir Todo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {generatedQRs.map((qr) => (
                  <div key={qr.id} className="border rounded-md p-3 text-center">
                    <img src={qr.qrDataUrl} alt={`QR ${qr.conservador.numero_serie}`} className="w-24 h-24 mx-auto mb-2" />
                    <div className="text-sm">
                      <div className="font-medium">{qr.conservador.numero_serie}</div>
                      <div className="text-muted-foreground">{qr.conservador.modelo}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
