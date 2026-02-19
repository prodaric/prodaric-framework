/**
 * IDs y definición de comandos de la extensión de demostración Prodaric.
 */

export const DemoCommands = {
  /** Abre el widget de ejemplo CRUD (Lumino). */
  OPEN_CRUD_DEMO: 'prodaric.demo.openCrudDemo',
  /** Abre un panel de docking con un widget de ejemplo. */
  OPEN_DOCK_DEMO: 'prodaric.demo.openDockDemo',
  /** Abre el panel "Acerca del framework". */
  OPEN_ABOUT: 'prodaric.demo.openAbout',
} as const;

export const DEMO_MENU_PATH = ['menubar', 'prodaric-demo'];
