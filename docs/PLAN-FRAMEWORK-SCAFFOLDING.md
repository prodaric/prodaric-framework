# Planificación: Framework + Scaffolding (modelo Laravel)

Documento de planificación para mantener **hoy** un único repositorio y, **en el futuro**, separar en motor (framework) y scaffolding (proyecto para empezar), siguiendo el modelo de Laravel.

**Última revisión:** 2026-02-20

---

## 1. Objetivo

- **Modelo de referencia:** Laravel tiene dos repos: `laravel/framework` (motor) y `laravel/laravel` (scaffolding para crear un proyecto).
- **Objetivo Prodaric:**
  - **prodaric/prodaric-framework** = motor del framework (packages + app de referencia).
  - **prodaric/prodaric** = scaffolding para “empezar un proyecto” con Prodaric (equivalente a laravel/laravel).
- **Ahora:** un solo repositorio (`prodaric-framework`). **Futuro:** ejecutar la separación cuando tenga sentido.

---

## 2. Estado actual

- **Repositorio único:** `prodaric/prodaric-framework`.
- **Contenido:** monorepo con:
  - `packages/*`: layout, shell, ui-engine, node-canvas, theia-l10n-es, hello-world-extension (motor).
  - `apps/browser-app`: aplicación IDE Theia/Electron (referencia).
  - `apps/ide`: app Vite de ejemplo.
- **Nombre raíz:** `prodaric-framework` en `package.json`.
- **Scope npm:** `@prodaric/*` para los paquetes del framework.
- No existe hoy un repo “prodaric” como scaffolding.

---

## 3. Estado objetivo (futuro)

| Repositorio | Rol | Contenido |
|-------------|-----|-----------|
| **prodaric/prodaric-framework** | Motor (como laravel/framework) | `packages/*` + aplicación de referencia del IDE (`apps/browser-app`). Opcional: publicar paquetes `@prodaric/*` en npm. |
| **prodaric/prodaric** | Scaffolding (como laravel/laravel) | Proyecto mínimo para empezar: `package.json` que dependa del framework, config básica, README “empezar aquí”. El usuario clona o usa create-project y obtiene una app lista para personalizar. |

---

## 4. Criterios para dar el paso

Decidir el momento de la separación cuando, por ejemplo:

- Se quiera publicar el framework en npm y que terceros (o el scaffolding) dependan por versión.
- Haya demanda clara de “crear un proyecto Prodaric desde cero” sin clonar el monorepo completo.
- El equipo quiera mantener el motor estable y el “starter” iterativo por separado.

No es obligatorio fijar fecha; el plan queda como referencia.

---

## 5. Pasos futuros (checklist)

Cuando se decida ejecutar la separación:

- [ ] Publicar o estabilizar paquetes `@prodaric/*` en npm (si se elige dependencia vía npm).
- [ ] Crear el repositorio `prodaric/prodaric` con contenido mínimo (package.json, config, README).
- [ ] Definir dependencia del scaffolding al framework: **npm** (`@prodaric/...`) o **Git** (submódulo / `github:prodaric/prodaric-framework#...`).
- [ ] Actualizar documentación (README de ambos repos, docs del framework) para dejar claro: framework = motor, prodaric = scaffolding.
- [ ] Ajustar CI, referencias y enlaces (por ejemplo en este repo y en Coderic/jekyll si aplica).

---

## 6. Referencias

- Modelo Laravel: [laravel/framework](https://github.com/laravel/framework), [laravel/laravel](https://github.com/laravel/laravel).
- Repositorio actual: [prodaric/prodaric-framework](https://github.com/prodaric/prodaric-framework).
- Arquitectura del framework: [ARQUITECTURA.md](./ARQUITECTURA.md).

---

*Documento de planificación. No implica cambios inmediatos en el repositorio.*
