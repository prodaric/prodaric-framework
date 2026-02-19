/**
 * IDs y definición de comandos de la extensión de demostración Prodaric.
 * Cada comando abre un ejemplo de caso de uso para el desarrollador.
 */

export const DemoCommands = {
  /** Dashboard: panel de resumen con tarjetas y secciones. */
  OPEN_DASHBOARD_DEMO: 'prodaric.demo.openDashboardDemo',
  /** Todo list: tareas con añadir, completar y eliminar. */
  OPEN_TODO_DEMO: 'prodaric.demo.openTodoDemo',
  /** Reportes: reporte tipo BIRT, vista previa y descarga PDF. */
  OPEN_REPORT_DEMO: 'prodaric.demo.openReportDemo',
  /** Formularios: formulario de ejemplo (campos tipo LayoutSchema). */
  OPEN_FORM_DEMO: 'prodaric.demo.openFormDemo',
  /** CRUD: listado con añadir, editar y eliminar (Lumino). */
  OPEN_CRUD_DEMO: 'prodaric.demo.openCrudDemo',
  /** Gráficos: gráfico de ejemplo (ECharts). */
  OPEN_CHART_DEMO: 'prodaric.demo.openChartDemo',
  /** Docking: panel con pestañas (Lumino DockPanel). */
  OPEN_DOCK_DEMO: 'prodaric.demo.openDockDemo',
  /** Rete.js: editor de nodos (Entidad + Campo) envuelto en Lumino. */
  OPEN_RETE_DEMO: 'prodaric.demo.openReteDemo',
  /** Acerca del framework. */
  OPEN_ABOUT: 'prodaric.demo.openAbout',
} as const;

export const DEMO_MENU_PATH = ['menubar', 'prodaric-demo'];
