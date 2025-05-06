
import QRCode from 'qrcode'

export const generateQRCode = async (
  conservadorId: string,
  clienteInfo?: any,
  conservadorInfo?: any,
  options: QRCode.QRCodeToDataURLOptions = {}
) => {
  // Base URL for the conservador
  const baseUrl = `${window.location.origin}/conservador/${conservadorId}`
  
  // Create a URL with query parameters for Odoo integration
  // This is a placeholder - actual Odoo integration would require proper URL structure
  const odooParams = clienteInfo ? `?cliente=${encodeURIComponent(clienteInfo.nombre || '')}` : ''
  const url = `${baseUrl}${odooParams}`
  
  try {
    // @ts-ignore - ignoring TS error for module resolution
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
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
  
  // Create a URL with query parameters for Odoo integration
  // This is a placeholder - actual Odoo integration would require proper URL structure
  const odooParams = clienteInfo ? `?cliente=${encodeURIComponent(clienteInfo.nombre || '')}` : ''
  const url = `${baseUrl}${odooParams}`
  
  try {
    // @ts-ignore - ignoring TS error for module resolution
    const qrSvg = await QRCode.toString(url, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      ...options,
    })
    return qrSvg
  } catch (err) {
    console.error('Error generating QR code SVG:', err)
    throw err
  }
}
