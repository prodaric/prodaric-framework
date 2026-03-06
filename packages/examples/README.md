# @prodaric/examples

**Paquete único de ejemplos** del framework Prodaric. Incluye:

- **Framework:** Dashboard, Todo list, Reportes (BIRT), Formularios (JSON Schema), CRUD, Gráficos (ECharts), Docking, Rete.js Modelo, JSON Schema (ajv), Acerca.
- **Web Components:** Shoelace (sl-*), FAST (fast-*), Vaadin (vaadin-*).

## Instalación (npm / GitHub Packages)

Publicado en GitHub Packages. Para instalarlo:

1. Crea o edita `~/.npmrc` y añade (sustituye `TU_TOKEN` por un token con `read:packages`):

   ```
   //npm.pkg.github.com/:_authToken=TU_TOKEN
   @prodaric:registry=https://npm.pkg.github.com/
   ```

2. Instala en tu proyecto:

   ```bash
   npm install @prodaric/examples
   ```

La publicación se hace automáticamente al crear un **release** en el repo [prodaric/examples](https://github.com/prodaric/examples) (workflow *Publish to GitHub Packages*).

## Cómo ver los ejemplos

1. Arranca el IDE: desde la raíz del monorepo, `npm run ide` (o `npm run start` para solo navegador).
2. En la barra de menú, abre **Prodaric**.
3. Elige cualquier ítem: cada uno abre un panel en el área principal.

## Dependencias

- `@prodaric/layout`, `@prodaric/node-canvas`, `@prodaric/shell`, `@prodaric/ui-engine` — framework.
- `ajv`, `echarts` — formularios/validación y gráficos.
- `@shoelace-style/shoelace`, `@microsoft/fast-components`, `@vaadin/*` — Web Components.

Los WC se registran al cargar el frontend en `register-wc-libs.ts`.
