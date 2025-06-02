
import QRCode from 'qrcode'

export const generateQRCode = async (
  conservadorId: string,
  clienteInfo?: any,
  conservadorInfo?: any,
  options: QRCode.QRCodeToDataURLOptions = {}
) => {
  // Base URL for the conservador with proper routing
  const baseUrl = `${window.location.origin}/conservador/${conservadorId}`
  
  // Create a URL with query parameters for better functionality
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
  const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
  
  try {
    // @ts-ignore - ignoring TS error for module resolution
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
      ...options,
    })
    return qrDataUrl
  } catch (err) {
    console.error('Error generating QR code:', err)
    throw err
  }
}

export const generateQRCodeSVG = async (
  conservadorId: string,
  clienteInfo?: any,
  conservadorInfo?: any,
  options: QRCode.QRCodeToStringOptions = {}
) => {
  // Base URL for the conservador
  const baseUrl = `${window.location.origin}/conservador/${conservadorId}`
  
  // Create a URL with query parameters for better functionality
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
  const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
  
  try {
    // @ts-ignore - ignoring TS error for module resolution
    const qrSvg = await QRCode.toString(url, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
      ...options,
    })
    return qrSvg
  } catch (err) {
    console.error('Error generating QR code SVG:', err)
    throw err
  }
}

// Función para generar múltiples QRs en lote
export const generateBatchQRCodes = async (conservadores: any[]) => {
  const results = [];
  
  for (const conservador of conservadores) {
    try {
      const qrDataUrl = await generateQRCode(
        conservador.id,
        conservador.cliente,
        conservador
      );
      
      results.push({
        conservador,
        qrDataUrl,
        success: true
      });
    } catch (error) {
      console.error(`Error generating QR for conservador ${conservador.id}:`, error);
      results.push({
        conservador,
        qrDataUrl: null,
        success: false,
        error: error
      });
    }
  }
  
  return results;
}
