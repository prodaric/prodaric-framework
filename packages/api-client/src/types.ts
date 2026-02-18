/**
 * Tipos de la API Coderic Engine (OpenAPI 3.0).
 * Alineados con https://coderic.org/api/openapi.json y equivalentes por dominio.
 */

/** Namespace del dominio actual; el Engine lo detecta por Host. */
export type ApiNamespace =
  | "organization"
  | "development"
  | "store"
  | "cloud"
  | "fintech"
  | "commercial"
  | "network";

/** Respuesta GET /api/health */
export interface HealthResponse {
  ok: boolean;
  service: string;
  namespace: ApiNamespace;
  timestamp: string;
}

/** Usuario (schema User del OpenAPI) */
export interface User {
  id: string;
  type: string;
  attributes?: {
    name?: string;
    [key: string]: unknown;
  };
}

/** Metadatos de paginación (cabeceras X-* y Link) */
export interface ListMeta {
  totalCount?: number;
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
  link?: string;
}

/** Payload del JWT (GET /api/account/profile) */
export interface AccountProfile {
  sub: string;
  iss?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

/** Respuesta GET /api/projects */
export interface ProjectsResponse {
  data: unknown[];
  meta: {
    namespace: string;
    domain?: string;
  };
}

/** Especificación OpenAPI 3.0 (reducida para lo que usamos). */
export interface OpenApiSpec {
  openapi: string;
  info: { title?: string; version?: string; description?: string };
  servers?: Array<{ url: string; description?: string }>;
  paths: Record<string, unknown>;
  components?: { schemas?: Record<string, unknown> };
}
