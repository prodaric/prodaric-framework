# Persistencia de layout (stateless)

El framework persiste el estado del layout en **backend o localStorage**; no en variables globales (ver [ARQUITECTURA.md](./ARQUITECTURA.md), Stateless Container).

## Contrato localStorage

- **Prefijo de clave:** `prodaric:layout:{scope}`
- **Valor:** JSON serializable (objeto de estado que defina la capa que lo use).
- **Scopes de ejemplo:** `ide-tab` (tab activo en apps/ide), `lumino-dock` (futuro: disposición de paneles Lumino cuando @prodaric/layout lo soporte).

## Implementación en apps/ide

El módulo `apps/ide/src/layout-persistence.ts` expone:

- `saveLayoutState(scope, state)` — guarda en `localStorage`
- `restoreLayoutState<T>(scope)` — lee y parsea, o devuelve `null`
- `clearLayoutState(scope)` — borra la clave

Uso actual: el tab activo (API / Lumino CRUD / Rete.js) se persiste en el scope `ide-tab` y se restaura al recargar.

## Integración con shell/layout

Cuando el paquete `@prodaric/shell` o `@prodaric/layout` ofrezca un callback o interfaz para persistencia (por ejemplo `ILayoutPersistence`), la aplicación puede pasar una implementación que use este contrato (localStorage con la clave `prodaric:layout:{scope}`) o una que llame al backend.
