# Prodaric Framework — Arquitectura y TODO list de estimación

**Fuente de verdad:** [docs/ARQUITECTURA.md](./docs/ARQUITECTURA.md) (derivado de *prodaric-framework-arquitectura.xml*).  
Este archivo es la **TODO list para estimar** tiempos de construcción o refactorización.

---

## Resumen de arquitectura (referencia)

| Capa | Tecnología | Paquete |
|------|------------|---------|
| Shell / Comandos | Eclipse Theia | `@prodaric/shell` |
| Layout y docking | Lumino | `@prodaric/layout` |
| Motor de nodos visual | Rete.js v2 | `@prodaric/node-canvas` |
| UI | Web Components nativos | `@prodaric/ui-engine` |
| DI | InversifyJS | (en shell / apps/ide) |
| Comunicación | REST (fetch desde apps/ide si aplica) | — |
| Backend referencia | Dicon Engine / Coderic Engine | (consumido, no construido aquí; paquete api-client eliminado) |

**Contratos:** `LayoutSchema`, `AclSchema`, `CodericPlugin` en `packages/shell/src/common/`.

---

## Cómo usar esta TODO list

- **Construcción:** desglosa por paquete o feature y asigna **Estimación** (h o días) por ítem.
- **Refactorización:** lista cambios por capa y estima cada uno.
- **Estado:** `pendiente` | `en curso` | `hecho` | `bloqueado`.
- Revisa y actualiza estimaciones cuando cambie el alcance.

---

## Fase 1 — Inicialización (completada)

| ID | Tarea | Estado |
|----|--------|--------|
| F1.1 | Monorepo npm workspaces | hecho |
| F1.2 | package.json por paquete con dependencias | hecho |
| F1.3 | TypeScript estricto e imports @prodaric/* | hecho |
| F1.4 | index.ts por paquete, exports tipados | hecho |
| F1.5 | Interfaces en packages/shell/src/common/ | hecho |
| F1.6 | Build (tsc) sin errores | hecho |

---

## TODO list — Construcción / Refactorización (estimación)

**Estado alineado con [AGENT-TODO.md](./AGENT-TODO.md).** Los ítem en `pendiente` (A12, A13) están en la **Cola de tareas para procesar** del agente; no están sin asignar.

| ID | Tarea | Capa/Paquete | Prioridad | Estimación | Estado | Notas |
|----|--------|----------------|-----------|------------|--------|--------|
| A1 | Integrar Eclipse Theia en shell (customización mínima) | shell | Alta | — h | hecho | |
| A2 | Definir tokens y contenedor InversifyJS en shell | shell | Alta | — h | hecho | |
| A3 | Integración Lumino: widgets base y docking | layout | Alta | — h | hecho | |
| A4 | Registro de widgets (registry) y paneles predefinidos | layout | Media | — h | hecho | |
| A5 | Web Components base y tema (CSS variables, paleta oscura) | ui-engine | Alta | — h | hecho | |
| A6 | Form Engine: render desde LayoutSchema (/api/resource/layout) | ui-engine | Alta | — h | hecho | |
| A7 | Widget Rete.js v2 envuelto en Lumino | node-canvas | Alta | — h | hecho | |
| A8 | (Eliminado) Clientes REST Coderic — paquete api-client eliminado. | — | — | — | eliminado | |
| A9 | (Eliminado) Cliente JSON-RPC Dicon — paquete api-client eliminado. | — | — | — | eliminado | |
| (Plugins .cloud, .net, .com, .dev) | Eliminados en Prodaric; no aplican. | — | — | — | — | |
| A12 | App IDE: ensamblar shell + layout + plugins | apps/ide | Alta | — h | pendiente | |
| A13 | Persistencia layout (backend o localStorage, stateless) | shell | Media | — h | pendiente | |
| A14 | Tests unitarios por paquete (Jest) | todos | Media | — h | hecho | layout; resto pendiente |

---

## Plantilla para añadir ítems

```markdown
| ID | Tarea | Capa/Paquete | Prioridad | Estimación | Estado | Notas |
|----|--------|----------------|-----------|------------|--------|--------|
|    |        |                |           |            |        |        |
```

---

## Estimación total

- Suma la columna **Estimación** de ítems `pendiente` o `en curso`.
- Ajusta por riesgo o dependencias (p. ej. +20 % si hay bloqueos externos).
- **Refactorización:** mismo formato; ítems tipo «Migrar X a Y» o «Extraer Z a @prodaric/foo».

---

*Arquitectura: [docs/ARQUITECTURA.md](./docs/ARQUITECTURA.md). Origen: prodaric-framework-arquitectura.xml. Prodaric Framework · prodaric-framework.*
