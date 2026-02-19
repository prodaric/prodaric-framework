/**
 * Paneles predefinidos del framework Prodaric.
 * Descriptores de paneles y registro de widgets por defecto en el layout.
 */

import type { WidgetRegistry } from './widget-registry';
import { createCrudDemoWidget } from './crud-demo';

export type PanelArea = 'main' | 'left' | 'right' | 'bottom';

export interface PredefinedPanel {
  id: string;
  label: string;
  area: PanelArea;
}

/** Paneles predefinidos que el layout puede crear. */
export const PREDEFINED_PANELS: PredefinedPanel[] = [
  { id: 'crud-demo', label: 'CRUD (demo)', area: 'main' },
  { id: 'propiedades', label: 'Propiedades', area: 'right' },
  { id: 'explorador', label: 'Explorador', area: 'left' },
];

/** IDs de paneles que tienen factory de widget en este paquete. */
const BUILTIN_WIDGET_IDS = ['crud-demo'] as const;

/**
 * Registra en el registry los widgets predefinidos que implementa este paquete.
 * Otros paneles (propiedades, explorador) pueden registrarse desde ui-engine o apps.
 */
export function registerPredefinedWidgets(registry: WidgetRegistry): void {
  registry.register('crud-demo', 'CRUD Ejemplo (Lumino)', createCrudDemoWidget);
}

/**
 * Devuelve los descriptores de paneles predefinidos que tienen factory en este paquete.
 */
export function getBuiltinPredefinedPanels(): PredefinedPanel[] {
  return PREDEFINED_PANELS.filter((p) =>
    (BUILTIN_WIDGET_IDS as readonly string[]).includes(p.id)
  );
}
