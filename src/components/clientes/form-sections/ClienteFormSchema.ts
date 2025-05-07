
// Form schema and default values for the ClienteForm

export const clienteFormDefaultValues = {
  negocio: {
    nombre: "",
    tipo_negocio: "",
    rfc: "",
    giro: "",
    imagen: null,
  },
  responsable: {
    nombre: "",
    apellidos: "",
    puesto: "",
  },
  contacto: {
    email: "",
    telefono: "",
    whatsapp: "",
  },
  ubicacion: {
    calle: "",
    numero_ext: "",
    numero_int: "",
    colonia: "",
    municipio: "",
    estado: "",
    cp: "",
    referencias: "",
  },
  documentacion: {
    contrato_comodato: null,
    identificacion: null,
    comprobante_domicilio: null,
  },
  notas: "",
};

export type ClienteFormData = typeof clienteFormDefaultValues;
