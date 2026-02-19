/**
 * Implementación mínima de ILayoutProvider (sin persistencia).
 * Útil para pruebas y hasta integrar cliente REST de layout.
 */

import type { ILayoutProvider } from '../common/layout-provider';
import type { LayoutSchema } from '../common/layout-schema';

export class NoopLayoutProvider implements ILayoutProvider {
  async getLayout(_resource: string): Promise<LayoutSchema | null> {
    return null;
  }

  async setLayout(_resource: string, _schema: LayoutSchema): Promise<void> {
    // Sin persistencia.
  }
}
