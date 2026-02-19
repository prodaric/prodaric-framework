# @prodaric/demo-extension

Extensión de demostración del framework Prodaric. Añade un menú **Prodaric** en la barra principal con ejemplos de uso del shell y Lumino.

## Contenido

- **Menú Prodaric**
  - **Demo CRUD (Lumino):** abre un widget de lista con añadir/eliminar ítems (`@prodaric/layout`).
  - **Demo Docking:** abre un panel Lumino DockPanel con un widget de ejemplo dentro.
  - **Acerca del framework:** panel con descripción del stack (Shell, Layout, L10n).

## Uso

La extensión se carga automáticamente en la aplicación Theia (`@prodaric/browser-app`). Tras arrancar el IDE, usar **Prodaric** en la barra de menú y elegir una de las opciones.

## Dependencias

- `@theia/core` — ApplicationShell, CommandContribution, MenuContribution.
- `@prodaric/shell` — integración con el shell.
- `@prodaric/layout` — `createCrudDemoWidget`, `createDockPanel`, `addWidgetToDock`.
