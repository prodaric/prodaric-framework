# @prodaric/demo-extension

Extensión de demostración del framework Prodaric. Añade el menú **Prodaric** en la barra principal con **ejemplos de caso de uso** para que el desarrollador vea de forma clara qué puede construir con el framework.

## Contenido del menú Prodaric

| Opción | Descripción |
|--------|-------------|
| **Dashboard (ejemplo)** | Panel tipo dashboard con tarjetas de resumen (métricas, accesos rápidos) y sección de actividad. Muestra composición de vistas y uso del tema. |
| **Todo list (ejemplo)** | Lista de tareas: añadir, marcar completado y eliminar. Ejemplo sencillo de estado e interacción en un panel. |
| **Reportes (ejemplo)** | Vista previa de reporte: tabla de datos y botón "Exportar PDF (simulado)". Ejemplo de lo que permite el módulo de reportes (BIRT / Business Intelligence). |
| **Formularios (ejemplo)** | Formulario con campos típicos (texto, email, fecha, select, checkbox). Muestra el tipo de formularios que se pueden representar con LayoutSchema y el Form Engine. |
| **CRUD (ejemplo)** | Listado con añadir y eliminar ítems (Lumino). Ejemplo de pantallas CRUD en paneles. |
| **Gráficos (ejemplo)** | Gráfico interactivo (barras / líneas) con Apache ECharts. Ejemplo de visualización de datos en paneles. |
| **Docking (ejemplo)** | Panel con pestañas (Lumino DockPanel) y widgets dentro. Ejemplo de layout y organización de vistas. |
| **Acerca del framework** | Resumen del stack y de las capacidades que cubren estos ejemplos. |

## Uso

La extensión se carga automáticamente en la aplicación Theia (`@prodaric/browser-app`). Tras arrancar el IDE, abrir el menú **Prodaric** y elegir cualquier ítem para abrir el ejemplo en el área principal.

## Dependencias

- `@theia/core` — ApplicationShell, CommandContribution, MenuContribution.
- `@prodaric/shell` — integración con el shell.
- `@prodaric/layout` — CRUD demo, DockPanel, addWidgetToDock.
- `@prodaric/ui-engine` — tema y Web Components (opcional en demos).
- `echarts` — gráficos en el ejemplo de Gráficos.
