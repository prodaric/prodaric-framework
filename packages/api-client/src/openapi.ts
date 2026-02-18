/**
 * Carga de la especificación OpenAPI desde el Engine.
 * Cada dominio devuelve solo los paths de su namespace (multi-tenant).
 */

import type { OpenApiSpec } from "./types";
import { getApiBaseUrl } from "./config";

let cachedSpec: OpenApiSpec | null = null;

/**
 * Obtiene la especificación OpenAPI del dominio actual (o el origen configurado).
 * Opcionalmente usa caché para no repetir la petición.
 */
export async function fetchOpenApiSpec(useCache = true): Promise<OpenApiSpec> {
  if (useCache && cachedSpec) {
    return cachedSpec;
  }
  const base = getApiBaseUrl();
  const url = base.endsWith("/api") ? `${base}/openapi.json` : `${base.replace(/\/?$/, "")}/openapi.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`OpenAPI: ${res.status} ${res.statusText}`);
  }
  const spec = (await res.json()) as OpenApiSpec;
  if (useCache) {
    cachedSpec = spec;
  }
  return spec;
}

/** Invalida la caché de OpenAPI (útil si se cambia de dominio en runtime). */
export function clearOpenApiCache(): void {
  cachedSpec = null;
}
