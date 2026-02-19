# Prodaric Framework

Entorno de desarrollo integrado profesional basado en web. Centro de control unificado del ecosistema Dicon (`.cloud`, `.net`, `.com`, `.dev`). 
**Repositorio:** `prodaric-framework` · **Producto:** Prodaric Framework.

## Stack

- **Shell:** Eclipse Theia
- **Layout:** Lumino
- **Nodos visuales:** Rete.js v2
- **UI:** Web Components nativos
- **DI:** InversifyJS
- **Comunicación:** JSON-RPC 2.0 · Backend: Dicon Engine (Coderic Engine)

## Monorepo

```
packages/     shell, layout, ui-engine, node-canvas, hello-world-extension, plugins
apps/ide      aplicación Theia que ensambla todo
config/       tsconfig.base, jest, eslint
```

## Arquitectura y estimación

- **Documento de arquitectura (fuente de verdad):** [docs/ARQUITECTURA.md](./docs/ARQUITECTURA.md).  
- **TODO list para estimar** construcción o refactorización: [ARQUITECTURA-TODO.md](./ARQUITECTURA-TODO.md) (prioridad, estimación en h/días, estado por ítem).
- **Reportes BIRT (on demand):** [docs/REPORTES-SERVIDOR.md](./docs/REPORTES-SERVIDOR.md) — PDF bajo demanda (un proceso por petición). `./scripts/report-server.sh ensure` y `npm run report-on-demand`; en el IDE, Prodaric → Reportes → Descargar PDF.

## Ver el IDE (editor tipo VS Code / Theia en localhost)

El IDE real tipo **VS Code en el navegador** (editor, archivos, terminal, etc.) es la aplicación **Theia** en `apps/browser-app`. Para arrancarlo:

```bash
npm install
npm run ide
```

O en un solo paso (install + build + opcional start): `./scripts/run.sh` (solo build) o `./scripts/run.sh --start` (arranca el IDE).

Abre **http://localhost:3000** en el navegador. Verás el IDE completo: explorador de archivos, editor de código (Monaco), terminal, búsqueda, preferencias, etc.

### Dónde están los ejemplos (Dashboard, Todo list, Reportes, etc.)

En la **barra de menú superior** del IDE (arriba de todo) verás la entrada **«Prodaric»**. Haz clic en **Prodaric** y se desplegará un menú con todos los ejemplos:

- **Dashboard (ejemplo)** — panel con tarjetas de resumen  
- **Todo list (ejemplo)** — lista de tareas (añadir, completar, eliminar)  
- **Reportes (ejemplo)** — demos BIRT (Productos, Resumen, Ventas); Descargar PDF on demand  
- **Formularios (ejemplo)** — formulario con varios tipos de campo  
- **CRUD (ejemplo)** — listado con añadir y eliminar  
- **Gráficos (ejemplo)** — gráfico de barras/líneas (ECharts)  
- **Docking (ejemplo)** — panel con pestañas  
- **Acerca del framework** — resumen del stack  

Cada opción abre un panel en el área central del IDE. Si no ves el menú «Prodaric», asegúrate de haber hecho `npm run build` y luego `npm run ide` (o `npm run ide:start`) desde la raíz del proyecto.

**Uso en producción:** los ejemplos del menú Prodaric los aporta la extensión **Hello World** (`@prodaric/hello-world-extension`), pensada solo para demostración. Para un producto real, elimina esa dependencia de `apps/browser-app` y añade tus propias extensiones; ver [packages/hello-world-extension/README.md](packages/hello-world-extension/README.md).

- **Solo iniciar** (si ya compilaste antes): `npm run ide:start`
- **Recompilar y luego iniciar**: `npm run ide:build` y en otra terminal `npm run ide:start`
- **Desde la carpeta de la app**: `cd apps/browser-app && npm run start:dev`

La **página con un botón** que había antes corresponde a `apps/ide` (build Vite mínimo para probar el API). El producto **Prodaric Framework** que se sirve en producción será el de `apps/browser-app` (Theia).

## Cómo compilar y dónde queda el resultado

- **Build por defecto (TypeScript → CommonJS):** desde la raíz del monorepo:
  ```bash
  npm run build
  ```
  El resultado va a **`lib/`** en cada paquete (no a `dist/`): `apps/ide/lib/`, `packages/shell/lib/`, etc.

- **Build del IDE Theia (browser-app):** el resultado del build de Theia queda en `apps/browser-app/lib/` (backend) y en los assets generados por webpack. No hay un único `dist/`; el servidor sirve desde la propia app con `theia start`.

- **Build mínimo Vite (apps/ide):** `npm run build:browser` genera **`apps/ide/dist/`**. Sirve con `npm run preview` (http://localhost:4173). Incluye pestañas de ejemplo: **API**, **Lumino CRUD** (lista añadir/eliminar) y **Rete.js Modelo** (editor de nodos Entidad/Campo, solo demo).

## GitHub Pages (build automático)

En cada push a `master` o `main`, el workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) compila el IDE en modo browser y publica el frontend en GitHub Pages.

1. En el repo **Settings → Pages**: origen **GitHub Actions**.
2. Tras el primer despliegue, el frontend estará en `https://<org>.github.io/prodaric-framework/`.

**Nota:** En Pages solo se sirve el frontend estático; no hay backend. Para usar el IDE completo (archivos, terminal, etc.) hay que ejecutarlo en local (`npm run ide`) o desplegar backend y frontend en un host que soporte Node.

## Docker (Podman / Docker)

Puedes construir y ejecutar el framework como contenedor. El **Dockerfile** en la raíz hace `npm ci`, `npm run build` y arranca con `npm start`. El archivo **`.dockerignore`** excluye `node_modules`, `.git`, `lib`, `dist` y artefactos de desarrollo para builds más rápidos.

**Requisitos:** Docker o Podman.

### Construir la imagen

Desde la raíz del repositorio:

```bash
docker build -t prodaric-framework .
# o con Podman:
podman build -t prodaric-framework .
```

### Ejecutar el contenedor

```bash
docker run -p 3000:3000 prodaric-framework
# o con Podman:
podman run -p 3000:3000 prodaric-framework
```

Abre **http://localhost:3000** en el navegador para usar el IDE.

**Variables de entorno:**

- **`PORT`** (opcional): puerto donde escucha el servidor. Por defecto `3000`. En el contenedor suele exponerse con `-p 3000:3000`; si cambias el puerto interno, ajusta el mapeo (p. ej. `-p 8080:8080` y `-e PORT=8080`).

## Aplicación de escritorio (Electron)

El IDE puede empaquetarse como aplicación de escritorio con **Electron** e **electron-builder**. Los instaladores se generan desde `apps/browser-app`.

**Requisitos:** Node ≥18, npm instalado en la raíz del monorepo (y `npm run build` ya ejecutado para los paquetes). Para generar instaladores **Windows** hace falta ejecutar en Windows; para **Linux**, en Linux (o en un contenedor/CI con las herramientas necesarias).

### Desarrollar en modo Electron (sin instalar)

Desde la raíz del monorepo, tras un build completo:

```bash
cd apps/browser-app
npm run rebuild:electron
npm run build:electron:prod
npm run start:electron
```

Se abre la ventana de Electron con el IDE.

### Generar instaladores

Desde la **raíz del monorepo** (`prodaric-framework/`):

```bash
# RPM para Fedora/RHEL (spec propio, pack de fuentes .tar.gz + rpmbuild)
npm run package:electron:rpm
```

El RPM se genera en **`apps/browser-app/rpmbuild/RPMS/x86_64/prodaric-<version>-1.fc43.x86_64.rpm`**. Instalación: `sudo dnf install --nogpgcheck ./apps/browser-app/rpmbuild/RPMS/x86_64/prodaric-*.rpm`. Para construir e instalar en un paso: `npm run package:electron:rpm:install`. Requisitos: `rpm-build`, `rpm`; ver [docs/PACKAGING-RPM.md](docs/PACKAGING-RPM.md).

Desde `apps/browser-app` (o con `-w @prodaric/browser-app` desde la raíz):

- **Windows (NSIS):** `npm run package:electron` — artefactos en `dist/`.
- **Solo directorio desempaquetado (Linux):** `npm run package:electron:dir` — queda `dist/linux-unpacked/` (útil para pruebas o para alimentar el build RPM).
- **Tarball Linux:** `npm run package:electron:tar` — genera `dist/Prodaric-*.tar.gz`.

**Iconos (opcional):** puedes añadir `apps/browser-app/resources/icon.ico` (Windows) y recursos para Linux/macOS; si no existen, electron-builder usa iconos por defecto.

## Cloud Native Buildpacks (Pack) y Heroku

La fuente está preparada para **Cloud Native Buildpacks** y para **Heroku**:

- **`project.toml`**: descriptor para Pack; define `NODE_ENV=production` en build y metadatos del proyecto.
- **`Procfile`**: proceso `web: npm start` (Heroku y plataformas que lo usan).
- **Scripts**: desde la raíz, `npm run build` hace el build completo (workspaces + Theia en modo producción); `npm start` arranca el backend escuchando en `PORT` (por defecto 3000) y en `0.0.0.0`.

### Construir imagen con Pack

```bash
pack build prodaric-framework --builder paketobuildpacks/builder-jammy-base
```

La plataforma debe exponer la variable **`PORT`** en tiempo de ejecución (Heroku, Cloud Run, etc.). El backend Theia usa `--port` y `--hostname 0.0.0.0` para escuchar en todas las interfaces.

### Desplegar en Heroku

```bash
heroku create
git push heroku main
```

El sistema de archivos en Heroku es efímero; los cambios en el workspace se pierden al reiniciar el dyno.

## Desarrollo

```bash
npm install
npm run build   # desde root o por paquete
```

## Licencia

Eclipse Public License 2.0 / GPL-2.0 con Classpath Exception (Theia). Dicon / Coderic © 2004–2025.
