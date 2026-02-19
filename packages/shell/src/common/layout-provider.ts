/**
 * Contrato del proveedor de layout (shell Prodaric).
 * Implementaciones: localStorage, backend /api/resource/layout, etc.
 */

import type { LayoutSchema } from './layout-schema';

export interface ILayoutProvider {
  getLayout(resource: string): Promise<LayoutSchema | null>;
  setLayout(resource: string, schema: LayoutSchema): Promise<void>;
}
