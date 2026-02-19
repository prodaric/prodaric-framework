# @prodaric/theia-l10n

- **Backend:** Marca el idioma **español** como `languagePack: true` para que Theia use las traducciones de `@theia/core`.
- **Frontend (preload):** Aporta `TextReplacementContribution` con reemplazos para cadenas que aún no tienen clave en los paquetes de idioma (p. ej. "New Terminal" → "Nuevo Terminal", y otras del menú Terminal y comunes).

Si ves alguna cadena todavía en inglés, se puede añadir a `REPLACEMENTS_ES` en `src/browser/coderic-text-replacement.ts`.
