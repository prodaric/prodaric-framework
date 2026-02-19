/**
 * Punto de uso del API Coderic Engine desde el IDE.
 * Pensado para arranque (health) y para la pantalla "Test API" (health, OpenAPI, etc.).
 */

import {
  setApiOrigin,
  createCodericEngineClient,
  clearOpenApiCache,
  type HealthResponse,
  type OpenApiSpec,
} from "@prodaric/api-client";

/** En desarrollo, el host puede definir window.__CODERIC_API_ORIGIN__ (ej. "https://coderic.org") para fijar el API. */
declare global {
  interface Window {
    __CODERIC_API_ORIGIN__?: string | null;
  }
}

const client = createCodericEngineClient();

/**
 * Inicializa el origen del API para el IDE.
 * Si en el navegador existe window.__CODERIC_API_ORIGIN__, lo usa (desarrollo).
 * En producción no se define y se usan rutas relativas al mismo origen.
 */
export function initApiForConsole(): void {
  if (typeof window === "undefined") return;
  const origin = window.__CODERIC_API_ORIGIN__;
  if (origin !== undefined && origin !== null && origin !== "") {
    setApiOrigin(origin);
  }
}

/**
 * Cliente del API para usar desde el IDE (Test API, widgets, etc.).
 */
export function getApiClient(): ReturnType<typeof createCodericEngineClient> {
  return client;
}

/**
 * Ejecuta GET /api/health y devuelve el resultado.
 * Útil para Test API y para comprobar conectividad al arranque.
 */
export async function runHealthCheck(): Promise<HealthResponse> {
  return client.getHealth();
}

/**
 * Obtiene la especificación OpenAPI del dominio actual (multi-tenant).
 */
export async function fetchOpenApiForConsole(useCache = true): Promise<OpenApiSpec> {
  return client.getOpenApiSpec(useCache);
}

/**
 * Invalida la caché de OpenAPI (p. ej. tras cambiar de dominio u origen).
 */
export function clearApiCache(): void {
  clearOpenApiCache();
}
