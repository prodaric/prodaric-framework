# @prodaric/hello-world-extension

Extensión **Hello World** del framework Prodaric. Sirve para demostrar el potencial del framework: añade el menú **Prodaric** en la barra principal con ejemplos de caso de uso (dashboard, todo list, reportes, formularios, CRUD, gráficos, docking, acerca del framework).

## Uso en desarrollo / evaluación

La extensión se carga automáticamente en la aplicación Theia (`@prodaric/browser-app`). Tras arrancar el IDE, abrir el menú **Prodaric** y elegir cualquier ítem para ver los ejemplos.

## Uso en producción: eliminar Hello World

**Para usar el framework en un producto real**, debes eliminar o desactivar esta extensión. Hello World es solo de demostración y no debe formar parte de la aplicación final.

Cómo eliminarla:

1. Quitar la dependencia de `@prodaric/hello-world-extension` en `apps/browser-app/package.json`.
2. Ejecutar `npm install` en la raíz del monorepo.
3. Reconstruir la aplicación: `npm run rebuild -w @prodaric/browser-app` (o el flujo de build que uses).

A partir de ahí, la aplicación arranca sin el menú de ejemplos; puedes añadir tus propias extensiones al framework.

## Contenido del menú Prodaric (solo en modo demo)

| Opción | Descripción |
|--------|-------------|
| **Dashboard (ejemplo)** | Panel tipo dashboard con tarjetas de resumen (métricas, accesos rápidos) y sección de actividad. |
| **Todo list (ejemplo)** | Lista de tareas: añadir, marcar completado y eliminar. |
| **Reportes (ejemplo)** | Demos de reportes BIRT (on demand): Productos, Resumen, Ventas. |
| **Formularios (ejemplo)** | Formulario con campos típicos (texto, email, fecha, select, checkbox). |
| **CRUD (ejemplo)** | Listado con añadir y eliminar ítems (Lumino). |
| **Gráficos (ejemplo)** | Gráfico interactivo (barras / líneas) con Apache ECharts. |
| **Docking (ejemplo)** | Panel con pestañas (Lumino DockPanel) y widgets dentro. |
| **Acerca del framework** | Resumen del stack y de las capacidades que cubren estos ejemplos. |

## Dependencias

- `@theia/core` — ApplicationShell, CommandContribution, MenuContribution.
- `@prodaric/shell` — integración con el shell.
- `@prodaric/layout` — CRUD demo, DockPanel, addWidgetToDock.
- `@prodaric/ui-engine` — tema y Web Components (opcional en demos).
- `echarts` — gráficos en el ejemplo de Gráficos.
