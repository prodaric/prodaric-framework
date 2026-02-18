/**
 * Configuración del origen de la API (multi-tenant por dominio).
 * En producción (console en https://coderic.org/console/) se usan rutas relativas
 * al mismo origen (/api/*) sin CORS. En desarrollo se puede fijar un origen
 * completo (ej. https://coderic.org) para conectar al Engine sin levantar local.
 */

let apiOriginOverride: string | null = null;

/**
 * Establece el origen base del API (ej. https://coderic.org).
 * Si no se llama, en el navegador se usa el origen actual (same-origin).
 */
export function setApiOrigin(origin: string | null): void {
  apiOriginOverride = origin ? origin.replace(/\/+$/, "") : null;
}

/**
 * Devuelve el origen base para las peticiones al API (sin /api).
 * - Con override: la URL configurada (desarrollo contra un dominio concreto).
 * - En navegador sin override: window.location.origin (producción en dominio/console/).
 * - En Node/sin window: '' (el llamador debe haber configurado override si hace fetch).
 */
export function getApiOrigin(): string {
  if (apiOriginOverride !== null && apiOriginOverride !== "") {
    return apiOriginOverride;
  }
  if (typeof window !== "undefined" && window.location && window.location.origin) {
    return window.location.origin;
  }
  return "";
}

/**
 * Devuelve la URL base del API (origen + /api).
 * Ej: https://coderic.org/api o (same-origin) /api no aplica — siempre origen + /api.
 */
export function getApiBaseUrl(): string {
  const origin = getApiOrigin();
  return origin ? `${origin}/api` : "/api";
}
