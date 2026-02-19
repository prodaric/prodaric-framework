/**
 * Registro de widgets del layout (Prodaric Framework).
 * Permite registrar factories por id y crear widgets por id.
 */

import type { Widget } from '@lumino/widgets';

export interface WidgetDescriptor {
  id: string;
  label: string;
}

export type WidgetFactory = () => Widget;

/**
 * Registro de widgets: id → descriptor + factory.
 */
export class WidgetRegistry {
  private readonly entries = new Map<string, { descriptor: WidgetDescriptor; factory: WidgetFactory }>();

  register(id: string, label: string, factory: WidgetFactory): void {
    this.entries.set(id, { descriptor: { id, label }, factory });
  }

  getDescriptor(id: string): WidgetDescriptor | undefined {
    return this.entries.get(id)?.descriptor;
  }

  getIds(): string[] {
    return Array.from(this.entries.keys());
  }

  has(id: string): boolean {
    return this.entries.has(id);
  }

  createWidget(id: string): Widget | undefined {
    const entry = this.entries.get(id);
    return entry ? entry.factory() : undefined;
  }
}
