# Prodaric Framework — TODO list para agente

Lista de tareas para que un agente (o desarrollador) pueda ver y marcar progreso.  
**Estados:** `pendiente` | `en curso` | `hecho` | `bloqueado`

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
- [ ] **A2** Definir tokens y contenedor InversifyJS en shell — `shell` — Alta — pendiente

### Layout
- [ ] **A3** Integración Lumino: widgets base y docking — `layout` — Alta — pendiente
- [ ] **A4** Registro de widgets (registry) y paneles predefinidos — `layout` — Media — pendiente

### UI y formularios
- [ ] **A5** Web Components base y tema (CSS variables, paleta oscura) — `ui-engine` — Alta — pendiente
- [ ] **A6** Form Engine: render desde LayoutSchema (/api/resource/layout) — `ui-engine` — Alta — pendiente

### Node canvas
- [ ] **A7** Widget Rete.js v2 envuelto en Lumino — `node-canvas` — Alta — pendiente

### API y backend
- [ ] **A8** Clientes REST: layout, acl, data (tres endpoints) — `api-client` — Alta — pendiente
- [ ] **A9** Cliente JSON-RPC 2.0 hacia Dicon Engine — `api-client` — Alta — pendiente

### Ensamblado y persistencia
- [ ] **A12** App IDE: ensamblar shell + layout + plugins — `apps/ide` — Alta — pendiente
- [ ] **A13** Persistencia layout (backend o localStorage, stateless) — `shell` / `api-client` — Media — pendiente

### Calidad
- [ ] **A14** Tests unitarios por paquete (Jest) — todos — Media — pendiente

---

## Tareas — Nuevas tecnologías del stack

- [ ] **E1** Integrar Apache ECharts (gráficos en paneles) — `ui-engine` o nuevo `@prodaric/charts` — pendiente
- [ ] **E2** Integrar BIRT (reportes) — módulo o plugin — pendiente
- [ ] **E3** Backend NestJS + Drizzle ORM (si aplica) — servicio/API — pendiente
- [ ] **E4** Soporte Sparkplug (MQTT industrial) — `api-client` o módulo — pendiente
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

## Cómo actualizar esta lista

- Marcar con `[x]` cuando una tarea esté **hecho**.
- Cambiar `pendiente` por `en curso` o `hecho` en la misma línea si lo prefieres.
- Añadir nuevas filas con el mismo formato (ID, descripción, paquete, prioridad, estado).
- La lista de estimación detallada sigue en [ARQUITECTURA-TODO.md](./ARQUITECTURA-TODO.md).
