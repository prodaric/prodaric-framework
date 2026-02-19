# Prodaric Framework — Documento de Arquitectura

**Versión 1.0** · Estado: Blueprint / Fase de Inicialización  
**Paradigma:** Low-Code Metadata-Driven Orchestrator

---

## 1. Resumen del Sistema

Prodaric Framework es un **centro de control unificado** para gestionar el ecosistema Dicon (`.cloud`, `.net`, `.com`, `.dev`). Funciona como un **IDE profesional** que no requiere edición manual de código para la mayoría de sus funciones. 
A diferencia de un panel administrativo tradicional, Prodaric Framework **orquesta flujos de trabajo e infraestructuras mediante metadatos**, adoptando el paradigma *Low-Code Metadata-Driven Orchestrator*. El resultado es una **herramienta de ingeniería de escritorio** corriendo en el navegador.

---

## 2. Stack Tecnológico

El stack garantiza soberanía tecnológica (sin vendor lock-in) y experiencia de clase escritorio en la web. **No negociable** en la fase de inicialización.

| Capa | Tecnología | Razón |
|------|------------|--------|
| Shell / Comandos | Eclipse Theia | Soberanía frente a Microsoft/VS Code |
| Layout y Docking | Lumino (ex-PhosphorJS) | Paneles flotantes, alta densidad |
| Motor de Nodos | Rete.js v2 | Orquestación visual de infraestructura |
| UI Components | Web Components nativos | Sin dependencia de frameworks |
| DI Container | InversifyJS | Inyección de dependencias en Theia |
| Comunicación | JSON-RPC 2.0 | Canal principal frontend ↔ backend |

---

## 3. Arquitectura en Capas

Responsabilidades estrictamente separadas. **Ninguna capa importa directamente de una capa no adyacente.**

### 3.1 Shell Layer (Eclipse Theia)

Menús, comandos, terminales, arquitectura de extensiones. Contenedor InversifyJS y tokens de DI para el resto de paquetes.

### 3.2 Layout Layer (Lumino)

Paneles, pestañas, ventanas flotantes. Todo componente visual es un Widget Lumino. Registro central de widgets disponibles.

### 3.3 UI Engine (Web Components)

Form Engine (formularios desde metadatos) y Web Components. **No conoce** Lumino ni el API. Solo recibe datos y emite eventos.

### 3.4 Node Canvas (Rete.js v2)

Widget Lumino que envuelve Rete.js v2. Orquestación visual de infraestructuras. Cada plugin registra sus tipos de nodos.

### 3.5 API Client Layer

Comunicación con Dicon Engine (Coderic Engine). Tres endpoints de metadatos + cliente JSON-RPC 2.0. **Única capa** que hace llamadas de red.

---

## 4. Protocolo de Metadatos (Tres Endpoints)

El IDE es un cliente “estúpido” altamente capaz; se autoconfigura vía Dicon Engine (Coderic Engine):

- **`/api/resource/layout`** — JSON de UI: campos, tipos, validaciones, tabs. El Form Engine lo interpreta y renderiza.
- **`/api/resource/acl`** — Visibilidad y editabilidad según JWT. Filtro sobre el schema de layout.
- **`/api/resource/data`** — Transaccional: GET, POST, PATCH, DELETE. Solo tras procesar layout y acl.

---

## 5. Estructura del Monorepo

Monorepo npm workspaces; cada paquete bajo scope `@prodaric/`.

| Paquete | Responsabilidad |
|---------|-----------------|
| @prodaric/shell | Theia customizado. Entry points, DI tokens, contratos comunes. |
| @prodaric/layout | Lumino. Widgets base, paneles (sidebar/main/bottom), registro. |
| @prodaric/ui-engine | Web Components + Form Engine. Formularios desde JSON. |
| @prodaric/node-canvas | Widget Rete.js v2 en Lumino. Nodos, conexiones, canvas. |
| (plugins por dominio) | Prodaric no incluye plugins .cloud, .net, .com, .dev; se pueden añadir después si se necesitan. |

**apps/ide/** ensambla todo y configura Theia para producción. **config/** contiene TypeScript, ESLint, Jest compartidos.

---

## 6. Decisiones de Arquitectura Clave

1. **Stateless Container** — Contenedor efímero e inmutable. Layout persistido en backend o localStorage; nunca en variables globales.
2. **Separación de Capas** — ui-engine no conoce Lumino ni Rete. Comunicación solo por Widget Bus o InversifyJS. El API REST (health, OpenAPI) se consume con fetch desde apps/ide si se necesita.
3. **Form-First** — No hay edición de código libre para negocio. Toda UI desde `/api/resource/layout`.
4. **Plugin por Dominio** — Cada dominio es un plugin independiente, cargado por JWT. Expone: nodos Rete, formularios, rutas API.
5. **Identidad Visual** — Paleta oscura, densa, precisa. Referencia: Eclipse RCP, NetSuite. Variables CSS centralizadas.

---

## 7. Contratos de Interfaz

Definidos en código en `packages/shell/src/common/` (LayoutSchema, AclSchema, CodericPlugin). Ver tipos TypeScript en ese paquete. (CodericPlugin se mantiene por compatibilidad con Theia.)

---

## 8. Restricciones Absolutas

- NO React, Vue ni Angular — solo Web Components nativos.
- NO instalar @theia/core sin verificar compatibilidad con Lumino.
- NO mezclar lógica de UI con lógica de API en el mismo módulo.
- NO `any` en TypeScript salvo inevitable (y documentado).
- NO archivos monolíticos — una responsabilidad por paquete.
- NO estado de negocio en el frontend — contenedor efímero.

---

## 9. Objetivo de Fase 1 (Inicialización)

Monorepo que compila con la estructura completa, **sin** lógica de negocio:

- [x] Monorepo con npm workspaces
- [x] package.json por paquete con dependencias
- [x] TypeScript con imports @prodaric/*
- [x] index.ts por paquete, exports tipados
- [x] Interfaces en packages/shell/src/common/
- [x] tsc / build sin errores

**Este documento es la fuente de verdad.** Cualquier decisión que lo contradiga requiere revisión y aprobación explícita.

---

*Prodaric Framework · prodaric-framework · Documento de Arquitectura v1.0*
