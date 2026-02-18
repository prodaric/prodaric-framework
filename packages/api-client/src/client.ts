/**
 * Cliente HTTP para Coderic Engine.
 * Multi-tenant por dominio: el host determina el namespace (organization, development, etc.).
 */

import { getApiBaseUrl } from "./config";
import type {
  HealthResponse,
  User,
  AccountProfile,
  ProjectsResponse,
  ListMeta,
  OpenApiSpec,
} from "./types";

const API_CLIENT_PACKAGE = "@coderic/api-client";

/** Opciones por petición (auth, etc.) */
export interface RequestOptions {
  /** Token JWT (Auth0, audience Coderic) para rutas protegidas. */
  token?: string | null;
}

function getHeaders(options?: RequestOptions): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (options?.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }
  return headers;
}

function ensureOk(res: Response): Response {
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res;
}

/** Extrae metadatos de paginación de las cabeceras X-* y Link. */
function parseListMeta(res: Response): ListMeta {
  return {
    totalCount: res.headers.get("X-Total-Count")
      ? parseInt(res.headers.get("X-Total-Count")!, 10)
      : undefined,
    totalPages: res.headers.get("X-Total-Pages")
      ? parseInt(res.headers.get("X-Total-Pages")!, 10)
      : undefined,
    currentPage: res.headers.get("X-Current-Page")
      ? parseInt(res.headers.get("X-Current-Page")!, 10)
      : undefined,
    pageSize: res.headers.get("X-Page-Size")
      ? parseInt(res.headers.get("X-Page-Size")!, 10)
      : undefined,
    link: res.headers.get("Link") ?? undefined,
  };
}

/**
 * Cliente del API Coderic Engine.
 * Usa getApiBaseUrl() (mismo origen en producción, override en dev).
 */
export class CodericEngineClient {
  constructor(private options: RequestOptions = {}) {}

  private base(): string {
    return getApiBaseUrl();
  }

  private url(path: string): string {
    const base = this.base();
    const p = path.startsWith("/") ? path : `/${path}`;
    return base.endsWith("/") ? `${base.replace(/\/$/, "")}${p}` : `${base}${p}`;
  }

  private async get<T>(path: string, opts?: RequestOptions): Promise<T> {
    const res = await fetch(this.url(path), {
      method: "GET",
      headers: getHeaders({ ...this.options, ...opts }),
    });
    ensureOk(res);
    return res.json() as Promise<T>;
  }

  /** GET /api/health — estado del worker y namespace del dominio. */
  async getHealth(): Promise<HealthResponse> {
    return this.get<HealthResponse>("/health");
  }

  /** GET /api/users — listado global, paginado. */
  async listUsers(params?: { page?: number; limit?: number }, opts?: RequestOptions): Promise<{ data: User[]; meta: ListMeta }> {
    const search = new URLSearchParams();
    if (params?.page != null) search.set("page", String(params.page));
    if (params?.limit != null) search.set("limit", String(params.limit));
    const q = search.toString();
    const path = q ? `/users?${q}` : "/users";
    const res = await fetch(this.url(path), {
      method: "GET",
      headers: getHeaders({ ...this.options, ...opts }),
    });
    ensureOk(res);
    const data = (await res.json()) as User[];
    return { data, meta: parseListMeta(res) };
  }

  /** GET /api/users/:id */
  async getUser(id: string, opts?: RequestOptions): Promise<User> {
    return this.get<User>(`/users/${encodeURIComponent(id)}`, opts);
  }

  /** GET /api/account/profile — requiere Bearer token. */
  async getAccountProfile(opts?: RequestOptions): Promise<AccountProfile> {
    return this.get<AccountProfile>("/account/profile", { ...this.options, ...opts });
  }

  /** GET /api/projects — listado por namespace (según dominio). */
  async listProjects(opts?: RequestOptions): Promise<ProjectsResponse> {
    return this.get<ProjectsResponse>("/projects", opts);
  }

  /** GET /api/projects/:id */
  async getProject(id: string, opts?: RequestOptions): Promise<unknown> {
    return this.get(`/projects/${encodeURIComponent(id)}`, opts);
  }

  /** GET /api/documents — solo coderic.org (organization). En otros dominios 404. */
  async listDocuments(opts?: RequestOptions): Promise<unknown> {
    return this.get("/documents", opts);
  }

  /** GET /api/documents/:id */
  async getDocument(id: string, opts?: RequestOptions): Promise<unknown> {
    return this.get(`/documents/${encodeURIComponent(id)}`, opts);
  }

  /** GET /api/openapi.json — especificación OpenAPI del dominio actual. */
  async getOpenApiSpec(useCache = true): Promise<OpenApiSpec> {
    const { fetchOpenApiSpec } = await import("./openapi");
    return fetchOpenApiSpec(useCache);
  }
}

/** Cliente por defecto (sin token). El IDE puede inyectar token después. */
export function createCodericEngineClient(options?: RequestOptions): CodericEngineClient {
  return new CodericEngineClient(options);
}

export { API_CLIENT_PACKAGE };
