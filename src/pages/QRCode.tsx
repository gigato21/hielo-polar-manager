
import React, { useState } from "react";
import { QrCodeGenerator } from "@/components/qr/QrCodeGenerator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConservadores } from "@/hooks/useConservadores";
import { QrBatchGenerator } from "@/components/qr/QrBatchGenerator";
import { generateQRCode } from "@/lib/qr";
import { toast } from "sonner";

const QRCode = () => {
  const [conservadorId, setConservadorId] = useState("");
  const [qrValue, setQrValue] = useState("");
  const { conservadores, isLoading } = useConservadores();

  const handleGenerate = async () => {
    if (conservadorId) {
      try {
        // Buscar el conservador en la base de datos
        const conservador = conservadores?.find(c => c.numero_serie === conservadorId || c.id === conservadorId);
        
        if (conservador) {
          const qrDataUrl = await generateQRCode(
            conservador.id,
            conservador.cliente,
            conservador
          );
          setQrValue(qrDataUrl);
          toast.success("Código QR generado exitosamente");
        } else {
          // Si no se encuentra, generar con ID manual
          const qrDataUrl = await generateQRCode(conservadorId);
          setQrValue(qrDataUrl);
          toast.success("Código QR generado exitosamente");
        }
      } catch (error) {
        console.error("Error generando QR:", error);
        toast.error("Error al generar el código QR");
      }
    }
  };

  const downloadQR = () => {
    if (qrValue) {
      const link = document.createElement('a');
      link.download = `qr-conservador-${conservadorId}.png`;
      link.href = qrValue;
      link.click();
      toast.success("QR descargado exitosamente");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Códigos QR</h1>
      </div>

      <Tabs defaultValue="generar" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="generar">Generar QR</TabsTrigger>
          <TabsTrigger value="lote">Generación por Lote</TabsTrigger>
        </TabsList>

        <TabsContent value="generar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generar Código QR</CardTitle>
                <CardDescription>
                  Ingrese el ID o número de serie del conservador para generar un código QR único
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="conservador-id">ID o Número de Serie del Conservador</Label>
                  <Input
                    id="conservador-id"
                    placeholder="Ej. C1234 o número de serie"
                    value={conservadorId}
                    onChange={(e) => setConservadorId(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleGenerate} 
                  className="w-full" 
                  disabled={!conservadorId || isLoading}
                >
                  {isLoading ? "Cargando..." : "Generar QR"}
                </Button>
              </CardContent>
            </Card>

            {qrValue && (
              <Card>
                <CardHeader>
                  <CardTitle>Código QR Generado</CardTitle>
                  <CardDescription>
                    Conservador #{conservadorId}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <img src={qrValue} alt="QR Code" className="border rounded-md" />
                  <div className="flex gap-2">
                    <Button onClick={() => window.print()}>Imprimir</Button>
                    <Button variant="outline" onClick={downloadQR}>
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="lote">
          <QrBatchGenerator conservadores={conservadores || []} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QRCode;
