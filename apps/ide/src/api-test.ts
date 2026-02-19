/**
 * Helpers para probar un API REST desde el IDE (health, OpenAPI).
 * Sin dependencia de @prodaric/api-client; usa fetch al origen configurado.
 * Si en el futuro Prodaric consume otro API, aquí se puede cambiar el origen o la ruta.
 */

/** Origen del API (ej. "https://api.ejemplo.com"). Vacío = mismo origen que la app. */
let apiOrigin = "";

/** Respuesta típica GET /api/health */
export interface HealthResponse {
  ok?: boolean;
  service?: string;
  namespace?: string;
  timestamp?: string;
  [key: string]: unknown;
}

/** Especificación OpenAPI (objeto JSON). */
export type OpenApiSpec = Record<string, unknown>;

/** Define el origen del API (opcional). En producción suele usarse el mismo origen. */
export function setApiOrigin(origin: string): void {
  apiOrigin = origin.replace(/\/$/, "");
}

/** Devuelve el origen actual del API. */
export function getApiOrigin(): string {
  return apiOrigin;
}

/** Base URL para peticiones (origen + "" o mismo origen si no está definido). */
export function getApiBaseUrl(): string {
  if (apiOrigin) return apiOrigin;
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return "";
}

/** Cliente mínimo para compatibilidad con código que esperaba createCodericEngineClient(). */
export interface MinimalApiClient {
  getHealth(): Promise<HealthResponse>;
  getOpenApiSpec(useCache?: boolean): Promise<OpenApiSpec>;
}

let openApiCache: OpenApiSpec | null = null;

const client: MinimalApiClient = {
  async getHealth(): Promise<HealthResponse> {
    const base = getApiBaseUrl();
    const url = base ? `${base}/api/health` : "/api/health";
    const res = await fetch(url, { method: "GET", headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()) as HealthResponse;
  },
  async getOpenApiSpec(useCache = true): Promise<OpenApiSpec> {
    if (useCache && openApiCache) return openApiCache;
    const base = getApiBaseUrl();
    const url = base ? `${base}/api/openapi.json` : "/api/openapi.json";
    const res = await fetch(url, { method: "GET", headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const spec = (await res.json()) as OpenApiSpec;
    openApiCache = spec;
    return spec;
  },
};

/** En desarrollo, el host puede definir window.__CODERIC_API_ORIGIN__ para fijar el API. */
declare global {
  interface Window {
    __CODERIC_API_ORIGIN__?: string | null;
  }
}

/**
 * Inicializa el origen del API para el IDE.
 * Si en el navegador existe window.__CODERIC_API_ORIGIN__, lo usa (desarrollo).
 */
export function initApiForConsole(): void {
  if (typeof window === "undefined") return;
  const origin = window.__CODERIC_API_ORIGIN__;
  if (origin !== undefined && origin !== null && origin !== "") {
    setApiOrigin(origin);
  }
}

/** Cliente del API para usar desde el IDE (Test API, etc.). */
export function getApiClient(): MinimalApiClient {
  return client;
}

/** Ejecuta GET /api/health. */
export async function runHealthCheck(): Promise<HealthResponse> {
  return client.getHealth();
}

/** Obtiene la especificación OpenAPI del origen actual. */
export async function fetchOpenApiForConsole(useCache = true): Promise<OpenApiSpec> {
  return client.getOpenApiSpec(useCache);
}

/** Invalida la caché de OpenAPI. */
export function clearApiCache(): void {
  openApiCache = null;
}
