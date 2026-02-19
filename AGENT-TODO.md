# Prodaric Framework — TODO list para agente

Lista de tareas para que un agente (o desarrollador) pueda ver y marcar progreso.  
**Estados:** `pendiente` | `en curso` | `hecho` | `bloqueado`

---

## Cola de tareas para procesar

Orden sugerido para ir cerrando pendientes. Al terminar una, márcala `[x]` y pasa a la siguiente.

| # | ID   | Tarea | Dónde | Prioridad |
|---|------|--------|--------|-----------|
| 1 | A7   | Widget Rete.js v2 envuelto en Lumino | `packages/node-canvas` | hecho |
| 2 | A12  | App IDE: ensamblar shell + layout + plugins | `apps/ide` | Alta |
| 3 | A13  | Persistencia layout (backend o localStorage) | `shell` | Media |
| 4 | I3.1–I3.6 | Electron + instaladores (Windows, Linux, Fedora) | `apps/browser-app` | Alta |
| 5 | E1   | Integrar Apache ECharts (gráficos) | `ui-engine` o `@prodaric/charts` | — |
| 6 | E2–E5 | BIRT, NestJS/Drizzle, Sparkplug, Theia AI | varios | — |

**Referencia de estimación y arquitectura:** [ARQUITECTURA-TODO.md](./ARQUITECTURA-TODO.md).

---

## Stack tecnológico (referencia)

| Tecnología        | Uso en el framework                    |
|-------------------|----------------------------------------|
| Eclipse Theia     | Shell / IDE en el navegador            |
| Lumino            | Layout y docking de paneles            |
| InversifyJS       | Inyección de dependencias              |
| Rete.js           | Motor de nodos visual (node-canvas)     |
| Apache ECharts    | Gráficos y visualización de datos      |
| BIRT              | Reportes / Business Intelligence       |
| JSON-RPC          | Comunicación frontend ↔ backend        |
| Vite              | Build y dev de apps/ide                |
| NestJS             | Backend API (cuando se integre)        |
| Drizzle ORM        | Acceso a datos (cuando se integre)     |
| Sparkplug          | MQTT / IoT industrial (cuando aplique) |
| Theia AI + Claude  | Asistente IA en el IDE                 |

---

## Tareas — Construcción / Integración

### Shell y Theia
- [x] **A1** Integrar Eclipse Theia en shell (customización mínima) — `shell` — Alta — hecho
- [x] **A2** Definir tokens y contenedor InversifyJS en shell — `shell` — Alta — hecho

### Layout
- [x] **A3** Integración Lumino: widgets base y docking — `layout` — Alta — hecho
- [x] **A4** Registro de widgets (registry) y paneles predefinidos — `layout` — Media — hecho

### UI y formularios
- [x] **A5** Web Components base y tema (CSS variables, paleta oscura) — `ui-engine` — Alta — hecho
- [x] **A6** Form Engine: render desde LayoutSchema (/api/resource/layout) — `ui-engine` — Alta — hecho

### Node canvas
- [x] **A7** Widget Rete.js v2 envuelto en Lumino — `node-canvas` — Alta — hecho

### API y backend
- [x] **A8** (Eliminado) Clientes REST Coderic — paquete `api-client` eliminado; no necesario en Prodaric.
- [x] **A9** (Eliminado) Cliente JSON-RPC Dicon — paquete `api-client` eliminado.

### Ensamblado y persistencia
- [ ] **A12** App IDE: ensamblar shell + layout + plugins — `apps/ide` — Alta — pendiente
- [ ] **A13** Persistencia layout (backend o localStorage, stateless) — `shell` — Media — pendiente

### Calidad
- [x] **A14** Tests unitarios por paquete (Jest) — todos — Media — hecho (layout; resto pendiente)

---

## Tareas — Nuevas tecnologías del stack

- [ ] **E1** Integrar Apache ECharts (gráficos en paneles) — `ui-engine` o nuevo `@prodaric/charts` — pendiente
- [ ] **E2** Integrar BIRT (reportes) — módulo o plugin — pendiente
- [ ] **E3** Backend NestJS + Drizzle ORM (si aplica) — servicio/API — pendiente
- [ ] **E4** Soporte Sparkplug (MQTT industrial) — módulo — pendiente
- [ ] **E5** Theia AI + Claude (asistente en el IDE) — extensión Theia — pendiente

---

## Fase 1 — Inicialización (completada)

- [x] **F1.1** Monorepo npm workspaces
- [x] **F1.2** package.json por paquete con dependencias
- [x] **F1.3** TypeScript estricto e imports @prodaric/*
- [x] **F1.4** index.ts por paquete, exports tipados
- [x] **F1.5** Interfaces en packages/shell/src/common/
- [x] **F1.6** Build (tsc) sin errores

---

---

## Checklist — Framework instalable (app + nube)

Objetivo: que el framework sea instalable como aplicación de escritorio y en la nube. Un paso a la vez.

### Fase 1 — Artefacto ejecutable estable
- [x] **I1.1** Build documentado: requisitos (Node ≥18, npm ≥8), comandos `npm ci` y `npm run build` — raíz — Alta — hecho
- [x] **I1.2** Un comando de arranque desde raíz (`npm start`) que sirva backend + frontend — raíz — Alta — hecho
- [x] **I1.3** README: "Cómo ejecutar localmente" (puerto, URL) — raíz / README — Media — hecho
- [ ] **I1.4** Opcional: script `scripts/run.sh` para desarrollo/CI — raíz — Baja — pendiente

### Fase 2 — Instalable en la nube
- [x] **I2.1** Dockerfile (raíz o apps/browser-app): `npm ci`, `npm run build`, `CMD npm start` — raíz — Alta — hecho
- [x] **I2.2** `.dockerignore`: excluir node_modules, .git, artefactos de desarrollo — raíz — Media — hecho
- [x] **I2.3** Documentar: construir imagen y ejecutar contenedor (puerto, env) — docs / README — Media — hecho
- [ ] **I2.4** Opcional: docker-compose.yml si hace falta más de un servicio — raíz — Baja — pendiente
- [ ] **I2.5** Opcional: ejemplo de despliegue en PaaS (Heroku, Cloud Run, etc.) — docs — Baja — pendiente

### Fase 3 — Instalable como aplicación de escritorio
- [ ] **I3.1** Target Electron en browser-app: `@theia/electron`, config Theia `target: electron` — apps/browser-app — Alta — pendiente
- [ ] **I3.2** Scripts de build para Electron (rebuild:electron, build producción) — apps/browser-app — Alta — pendiente
- [ ] **I3.3** electron-builder: producto "Prodaric Framework", iconos — apps/browser-app — Alta — pendiente
- [ ] **I3.4** Instalador Windows (NSIS, .exe) — apps/browser-app — Alta — pendiente
- [ ] **I3.5** Artefacto Linux (AppImage, .deb, .rpm Fedora) — apps/browser-app — Alta — pendiente
- [ ] **I3.6** Documentar: cómo generar instaladores por plataforma — docs / README — Media — pendiente

---

## Cómo actualizar esta lista

- Marcar con `[x]` cuando una tarea esté **hecho**.
- Cambiar `pendiente` por `en curso` o `hecho` en la misma línea si lo prefieres.
- Añadir nuevas filas con el mismo formato (ID, descripción, paquete, prioridad, estado).
- La lista de estimación detallada sigue en [ARQUITECTURA-TODO.md](./ARQUITECTURA-TODO.md).
