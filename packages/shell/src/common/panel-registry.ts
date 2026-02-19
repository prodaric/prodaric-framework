/**
 * Contrato del registro de paneles (shell Prodaric).
 * Usado por Lumino para registrar factories de widgets.
 */

export interface PanelDescriptor {
  id: string;
  label: string;
  area?: 'main' | 'left' | 'right' | 'bottom';
}

export interface IPanelRegistry {
  register(descriptor: PanelDescriptor, factory: () => unknown): void;
  getPanelIds(): string[];
}
