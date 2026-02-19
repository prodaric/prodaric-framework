/**
 * Contrato: respuesta de /api/resource/layout (Prodaric Framework).
 */

export interface ValidationRule {
  type: string;
  message?: string;
  value?: unknown;
}

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'boolean' | 'relation' | 'currency';
  required: boolean;
  readOnly: boolean;
  validation?: ValidationRule[];
}

export interface Tab {
  id: string;
  label: string;
  fields: string[];
}

export interface LayoutSchema {
  resource: string;
  tabs: Tab[];
  fields: Field[];
}
