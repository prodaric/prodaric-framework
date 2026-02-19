/**
 * @prodaric/layout — Prodaric Framework layout (Lumino).
 */

export const LAYOUT_PACKAGE = '@prodaric/layout';

/** Widgets base y docking (Lumino). */
export {
  Widget,
  DockPanel,
  TabPanel,
  SplitPanel,
  PanelLayout,
  BoxPanel,
} from '@lumino/widgets';

export type { DockPanel as DockPanelType } from '@lumino/widgets';

export {
  createDockPanel,
  addWidgetToDock,
  saveDockLayout,
  restoreDockLayout,
} from './dock-host';
export type {
  DockHostOptions,
  DockPanelLayoutConfig,
  DockPanelAddOptions,
} from './dock-host';

export { createCrudDemoWidget, mountCrudDemo } from './crud-demo';

export { WidgetRegistry } from './widget-registry';
export type { WidgetDescriptor, WidgetFactory } from './widget-registry';

export {
  PREDEFINED_PANELS,
  registerPredefinedWidgets,
  getBuiltinPredefinedPanels,
} from './predefined-panels';
export type { PredefinedPanel, PanelArea } from './predefined-panels';

import { WidgetRegistry } from './widget-registry';
import { registerPredefinedWidgets } from './predefined-panels';

/**
 * Crea un registro de widgets con los paneles predefinidos de este paquete ya registrados.
 */
export function createDefaultWidgetRegistry(): WidgetRegistry {
  const registry = new WidgetRegistry();
  registerPredefinedWidgets(registry);
  return registry;
}
