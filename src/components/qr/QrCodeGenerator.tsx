
import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent } from "@/components/ui/card";

interface QrCodeGeneratorProps {
  value: string;
  size?: number;
  clienteInfo?: any;
  conservadorInfo?: any;
}

export const QrCodeGenerator = ({ 
  value, 
  size = 128,
  clienteInfo,
  conservadorInfo
}: QrCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrUrl, setQrUrl] = useState<string>(value);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Add Odoo link parameters if cliente info is available
    const baseUrl = value;
    const odooParams = clienteInfo ? `?cliente=${encodeURIComponent(clienteInfo.nombre || '')}` : '';
    const urlWithParams = `${baseUrl}${odooParams}`;
    
    setQrUrl(urlWithParams);
    
    const generateQR = async () => {
      try {
        // @ts-ignore - ignoring TS error for module resolution
        await QRCode.toCanvas(canvasRef.current, urlWithParams, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };

    generateQR();
  }, [value, size, clienteInfo]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <canvas ref={canvasRef} className="border rounded-md" />
          
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
                <p><span className="font-semibold">Conservador:</span> {conservadorInfo.modelo || 'N/A'}</p>
                {conservadorInfo.capacidad && (
                  <p><span className="font-semibold">Capacidad:</span> {conservadorInfo.capacidad}</p>
                )}
                {conservadorInfo.estado && (
                  <p><span className="font-semibold">Estado:</span> {conservadorInfo.estado}</p>
                )}
              </div>
            )}

            <p className="mt-2 text-xs text-center">
              <span className="font-semibold">Link:</span> {qrUrl}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
