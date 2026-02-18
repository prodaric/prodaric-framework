# Coderic IDE

Entorno de desarrollo integrado profesional basado en web. Centro de control unificado del ecosistema Coderic (`.cloud`, `.net`, `.com`, `.dev`).

**Repositorio:** `coderic-console` · **Producto:** Coderic IDE.

## Stack

- **Shell:** Eclipse Theia
- **Layout:** Lumino
- **Nodos visuales:** Rete.js v2
- **UI:** Web Components nativos
- **DI:** InversifyJS
- **Comunicación:** JSON-RPC 2.0 · Backend: Coderic Engine

## Monorepo

```
packages/     shell, layout, ui-engine, node-canvas, api-client, plugins
apps/ide      aplicación Theia que ensambla todo
config/       tsconfig.base, jest, eslint
```

## Arquitectura y estimación

- **Documento de arquitectura (fuente de verdad):** [docs/ARQUITECTURA.md](./docs/ARQUITECTURA.md).  
- **TODO list para estimar** construcción o refactorización: [ARQUITECTURA-TODO.md](./ARQUITECTURA-TODO.md) (prioridad, estimación en h/días, estado por ítem).

## Ver el IDE (editor tipo VS Code / Theia en localhost)

El IDE real tipo **VS Code en el navegador** (editor, archivos, terminal, etc.) es la aplicación **Theia** en `apps/browser-app`. Para arrancarlo:

```bash
npm install
npm run ide
```

Abre **http://localhost:3000** en el navegador. Verás el IDE completo: explorador de archivos, editor de código (Monaco), terminal, búsqueda, preferencias, etc.

- **Solo iniciar** (si ya compilaste antes): `npm run ide:start`
- **Recompilar y luego iniciar**: `npm run ide:build` y en otra terminal `npm run ide:start`
- **Desde la carpeta de la app**: `cd apps/browser-app && npm run start:dev`

La **página con un botón** que había antes corresponde a `apps/ide` (build Vite mínimo para probar el API). El producto “Coderic IDE” que se sirve en producción será el de `apps/browser-app` (Theia).

## Cómo compilar y dónde queda el resultado

- **Build por defecto (TypeScript → CommonJS):** desde la raíz del monorepo:
  ```bash
  npm run build
  ```
  El resultado va a **`lib/`** en cada paquete (no a `dist/`): `apps/ide/lib/`, `packages/api-client/lib/`, etc.

- **Build del IDE Theia (browser-app):** el resultado del build de Theia queda en `apps/browser-app/lib/` (backend) y en los assets generados por webpack. No hay un único `dist/`; el servidor sirve desde la propia app con `theia start`.

- **Build mínimo Vite (solo para probar API):** en `apps/ide`, `npm run build:browser` genera **`apps/ide/dist/`**. Sirve con `npm run preview` (http://localhost:4173). Es solo una página de prueba, no el IDE completo.

## GitHub Pages (build automático)

En cada push a `master` o `main`, el workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) compila el IDE en modo browser y publica el frontend en GitHub Pages.

1. En el repo **Settings → Pages**: origen **GitHub Actions**.
2. Tras el primer despliegue, el frontend estará en `https://<org>.github.io/coderic-console/`.

**Nota:** En Pages solo se sirve el frontend estático; no hay backend. Para usar el IDE completo (archivos, terminal, etc.) hay que ejecutarlo en local (`npm run ide`) o desplegar backend y frontend en un host que soporte Node.

## Desarrollo

```bash
npm install
npm run build   # desde root o por paquete
```

## Licencia

Eclipse Public License 2.0 / GPL-2.0 con Classpath Exception (Theia). Coderic © 2004–2025.
