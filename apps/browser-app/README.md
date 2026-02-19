# Prodaric Framework — aplicación Theia (navegador)

Esta es la aplicación **IDE real** tipo VS Code / Codespaces: editor (Monaco), explorador de archivos, terminal, búsqueda, etc. Se sirve en **http://localhost:3000**.

**Idioma:** La interfaz está en **español** por defecto (`defaultLocale: "es"`). Se usa el paquete `@prodaric/theia-l10n-es` para que Theia acepte las traducciones. Si aún ves la UI en inglés: borra los datos del sitio para localhost:3000 (DevTools → Application → Clear site data) o abre en ventana de incógnito; también puedes usar «Configurar idioma de visualización» (Ctrl+Shift+P) y elegir Español.

## Cómo ejecutarla

Desde la raíz del monorepo:

```bash
npm run ide
```

O desde esta carpeta:

```bash
npm run start:dev   # rebuild + start (primera vez o tras cambiar deps)
npm run start        # solo arrancar (si ya compilaste)
```

## Dónde ver los ejemplos del framework

Cuando el IDE esté abierto en **http://localhost:3000**, mira la **barra de menú de arriba** (donde suele estar Archivo, Edición, etc.). Ahí aparece **Prodaric**. Clic en **Prodaric** → se abre un menú con: Dashboard, Todo list, Reportes, Formularios, CRUD, Gráficos, Docking y Acerca del framework. Cada uno abre un panel de ejemplo en la zona central.

## Empaquetar con Electron (escritorio)

Desde la raíz: `npm run package:electron` o `npm run package:electron:dir`. En Linux (Fedora): `sudo dnf install libX11-devel libxkbfile-devel libsecret-devel libxcrypt-compat`. Al publicar un release, el workflow `.github/workflows/release-electron.yml` genera artefactos para Linux, Windows y macOS.

**RPM en Fedora (recomendado):** Usa el spec propio y rpmbuild: `npm run package:electron:rpm:spec` (genera el RPM en `apps/browser-app/rpmbuild/RPMS/...`). Requiere `rpm-build` y `rpm`; ver [docs/PACKAGING-RPM.md](../../docs/PACKAGING-RPM.md) y opcionalmente `./scripts/setup-rpm-packages.sh` para preparar el equipo con dnf. **Alternativa:** `npm run package:electron:tar` genera `dist/Prodaric-0.0.1.x64.tar.gz`; descomprímelo y ejecuta `./prodaric` desde la carpeta extraída. O usa `npm run package:electron:dir` y ejecuta `./prodaric` en `apps/browser-app/dist/linux-unpacked/`.

## Nota

La app en `apps/ide` (y su build Vite con un botón de prueba) es un punto de entrada mínimo para el API. El producto “Prodaric Framework” que se despliega en `*/console/` será esta aplicación Theia (`browser-app`).
