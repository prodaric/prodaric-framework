# Prodaric Framework — aplicación Theia (navegador)

Esta es la aplicación **IDE real** tipo VS Code / Codespaces: editor (Monaco), explorador de archivos, terminal, búsqueda, etc. Se sirve en **http://localhost:3000**.

**Idioma:** La interfaz está en **español** por defecto (`defaultLocale: "es"`). Se usa el paquete `@prodaric/theia-l10n` para que Theia acepte las traducciones. Si aún ves la UI en inglés: borra los datos del sitio para localhost:3000 (DevTools → Application → Clear site data) o abre en ventana de incógnito; también puedes usar «Configurar idioma de visualización» (Ctrl+Shift+P) y elegir Español.

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

## Nota

La app en `apps/ide` (y su build Vite con un botón de prueba) es un punto de entrada mínimo para el API. El producto “Prodaric Framework” que se despliega en `*/console/` será esta aplicación Theia (`browser-app`).
