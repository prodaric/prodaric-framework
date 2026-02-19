/**
 * Host de docking Lumino para el framework Prodaric.
 * Expone un DockPanel listo para montar y añadir widgets (pestañas, áreas).
 */

import { DockPanel, Widget } from '@lumino/widgets';

export type DockPanelLayoutConfig = DockPanel.ILayoutConfig;
export type DockPanelAddOptions = DockPanel.IAddOptions;

export interface DockHostOptions {
  /** Espacio entre widgets (px). */
  spacing?: number;
  /** Modo: múltiples documentos (pestañas) o documento único. */
  mode?: DockPanel.Mode;
  /** Pestañas movibles por el usuario. */
  tabsMovable?: boolean;
}

/**
 * Crea un DockPanel configurado para uso en el shell Prodaric.
 */
export function createDockPanel(options: DockHostOptions = {}): DockPanel {
  const {
    spacing = 4,
    mode = 'multiple-document',
    tabsMovable = true,
  } = options;

  const panel = new DockPanel({
    spacing,
    mode,
    tabsMovable,
    tabsConstrained: true,
    addButtonEnabled: false,
  });

  panel.id = 'prodaric-dock-host';
  panel.addClass('prodaric-dock-host');
  return panel;
}

/**
 * Añade un widget al dock en la zona indicada (por defecto como nueva pestaña en el centro).
 */
export function addWidgetToDock(
  dock: DockPanel,
  widget: Widget,
  options: DockPanelAddOptions = {}
): void {
  dock.addWidget(widget, options);
}

/**
 * Guarda la configuración del layout del dock (para persistir o restaurar después).
 */
export function saveDockLayout(dock: DockPanel): DockPanelLayoutConfig {
  return dock.saveLayout();
}

/**
 * Restaura un layout previamente guardado.
 * Los widgets que no estén en config quedan sin padre (hay que gestionarlos fuera si se desea).
 */
export function restoreDockLayout(
  dock: DockPanel,
  config: DockPanelLayoutConfig
): void {
  dock.restoreLayout(config);
}
