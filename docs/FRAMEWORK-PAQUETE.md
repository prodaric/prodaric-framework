# @prodaric/framework — versionado y consumo

El meta-paquete `@prodaric/framework` agrupa la base común del framework (shell, theia-l10n-es, layout, ui-engine) para que las aplicaciones cliente (Prodaric ERP, CRM, POS, Accounting, HRM, etc.) lo instalen como una sola dependencia versionada.

## Versionado (semver)

- **Major**: cambios incompatibles en la API o en el conjunto de paquetes que expone.
- **Minor**: nuevas funcionalidades compatibles.
- **Patch**: correcciones y mejoras compatibles.

Los paquetes subyacentes (`@prodaric/shell`, etc.) pueden seguir su propio ciclo; el meta-paquete fija rangos compatibles (p. ej. `^0.0.1`) y al hacer una nueva versión del framework se actualizan esos rangos si hace falta y se hace bump de `@prodaric/framework`.

## Publicación

1. Desde la raíz del monorepo, en el paquete `packages/framework`:
   ```bash
   cd packages/framework
   npm version patch   # o minor / major
   npm publish
   ```
2. Requiere autenticación en GitHub Packages (token con `write:packages`). Configuración en `.npmrc`:
   ```
   @prodaric:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=TU_TOKEN
   ```
3. Opcional: automatizar con GitHub Actions (similar a `packages/examples/.github/workflows/publish.yml`).

## Consumo desde una aplicación cliente

Una aplicación cliente Prodaric (por ejemplo Prodaric Accounting) se construye sobre el framework así:

1. **Dependencia** en `package.json`:
   ```json
   {
     "dependencies": {
       "@prodaric/framework": "^1.0.0",
       "@theia/core": "^1.50.0",
       ...
     }
   }
   ```

2. **Registro npm** en `.npmrc` (en el repo de la aplicación cliente):
   ```
   @prodaric:registry=https://npm.pkg.github.com/
   ```

3. **Instalación**:
   ```bash
   npm install
   ```

Así la aplicación cliente no clona el monorepo del framework sino que lo instala por versión desde GitHub Packages. Para generar un nuevo proyecto desde la plantilla, usar el repositorio [prodaric-scaffolding](https://github.com/prodaric/prodaric-scaffolding) ("Use this template" o `degit`).
