
import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent } from "@/components/ui/card";

interface QrCodeGeneratorProps {
  value: string;
  size?: number;
  clienteInfo?: any;
  conservadorInfo?: any;
  showDetails?: boolean;
}

export const QrCodeGenerator = ({ 
  value, 
  size = 128,
  clienteInfo,
  conservadorInfo,
  showDetails = true
}: QrCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrUrl, setQrUrl] = useState<string>(value);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Crear URL más funcional con parámetros
    let finalUrl = value;
    
    if (clienteInfo || conservadorInfo) {
      const params = new URLSearchParams();
      
      if (clienteInfo?.nombre) {
        params.append('cliente', clienteInfo.nombre);
      }
      if (clienteInfo?.id) {
        params.append('cliente_id', clienteInfo.id);
      }
      if (conservadorInfo?.numero_serie) {
        params.append('serie', conservadorInfo.numero_serie);
      }
      if (conservadorInfo?.modelo) {
        params.append('modelo', conservadorInfo.modelo);
      }
      
      const queryString = params.toString();
      finalUrl = queryString ? `${value}?${queryString}` : value;
    }
    
    setQrUrl(finalUrl);
    
    const generateQR = async () => {
      try {
        // @ts-ignore - ignoring TS error for module resolution
        await QRCode.toCanvas(canvasRef.current, finalUrl, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'M',
        });
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };

    generateQR();
  }, [value, size, clienteInfo, conservadorInfo]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <canvas ref={canvasRef} className="border rounded-md" />
          
          {showDetails && (
            <div className="mt-4 text-sm text-muted-foreground w-full">
              <p className="font-medium text-foreground mb-1 text-center">QR para acceso rápido</p>
              
              {clienteInfo && (
                <div className="mt-2 space-y-1 text-xs">
                  <p><span className="font-semibold">Cliente:</span> {clienteInfo.nombre || 'N/A'}</p>
                  {clienteInfo.contacto && (
                    <p><span className="font-semibold">Contacto:</span> {clienteInfo.contacto}</p>
                  )}
                  {clienteInfo.telefono && (
                    <p><span className="font-semibold">Teléfono:</span> {clienteInfo.telefono}</p>
                  )}
                </div>
              )}

              {conservadorInfo && (
                <div className="mt-2 space-y-1 text-xs">
                  <p><span className="font-semibold">Serie:</span> {conservadorInfo.numero_serie || 'N/A'}</p>
                  <p><span className="font-semibold">Modelo:</span> {conservadorInfo.modelo || 'N/A'}</p>
                  {conservadorInfo.capacidad && (
                    <p><span className="font-semibold">Capacidad:</span> {conservadorInfo.capacidad}</p>
                  )}
                  {conservadorInfo.status && (
                    <p><span className="font-semibold">Estado:</span> {conservadorInfo.status}</p>
                  )}
                </div>
              )}

              <p className="mt-2 text-xs text-center break-all">
                <span className="font-semibold">URL:</span> {qrUrl}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
