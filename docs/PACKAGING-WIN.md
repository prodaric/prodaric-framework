# Instalador Windows (NSIS)

El instalador de Prodaric para Windows se genera con **electron-builder** en formato **NSIS** (`.exe`).

## Requisitos

- **Sistema:** Windows (el instalador NSIS debe construirse en Windows o en un runner CI Windows).
- **Node.js** ≥ 18, **npm** ≥ 8.
- Dependencias del monorepo instaladas (`npm install` en la raíz).

## Comando

Desde la raíz del monorepo:

```bash
npm run package:electron:win
```

O desde `apps/browser-app`:

```bash
npm run package:electron:win
```

El script ejecuta `rebuild:electron`, `build:electron:prod` y `electron-builder --win nsis --publish never`.

## Salida

- **Carpeta:** `apps/browser-app/dist/`
- **Instalador:** `Prodaric-Setup.<version>.exe` (o según `build.nsis.artifactName` en `package.json`).

## Configuración

En `apps/browser-app/package.json`, la sección `build.win` tiene `target: ["nsis"]` y `build.nsis` define instalación no one-click y directorio seleccionable. Opcional: añadir `apps/browser-app/resources/icon.ico` para el icono del instalador.
