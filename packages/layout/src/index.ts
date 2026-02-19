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
