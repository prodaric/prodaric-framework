/**
 * Registro de paneles en memoria (shell Prodaric).
 * Usado hasta integrar Lumino y paneles reales.
 */

import type { IPanelRegistry, PanelDescriptor } from '../common/panel-registry';

type Factory = () => unknown;

export class InMemoryPanelRegistry implements IPanelRegistry {
  private readonly panels = new Map<string, { descriptor: PanelDescriptor; factory: Factory }>();

  register(descriptor: PanelDescriptor, factory: Factory): void {
    this.panels.set(descriptor.id, { descriptor, factory });
  }

  getPanelIds(): string[] {
    return Array.from(this.panels.keys());
  }
}
