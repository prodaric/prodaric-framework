# Plantillas de reportes (demos BIRT)

Plantillas `.rptdesign` para el servidor de reportes on demand. Cada una es un demo que puedes descargar en PDF desde el IDE (Prodaric → Reportes).

| Reporte   | Fichero              | Descripción                                      |
|-----------|----------------------|--------------------------------------------------|
| Productos | `productos.rptdesign`| Listado de productos (vista previa en el widget).|
| Resumen   | `resumen.rptdesign`  | Resumen ejecutivo.                               |
| Ventas    | `ventas.rptdesign`   | Reporte de ventas.                               |

Para probar: `./scripts/report-on-demand.sh --output /tmp/out.pdf --report productos` (o `resumen`, `ventas`).

Para añadir más demos: crea un `.rptdesign` aquí y añade su id en el widget de reportes (`REPORT_DEMOS` en `report-demo-widget.ts`).
