/**
 * @prodaric/api-client — Cliente del API Coderic Engine (OpenAPI, multi-tenant por dominio).
 * En producción (console en https://coderic.org/console/) usa rutas relativas /api/*.
 * En desarrollo se puede fijar el origen con setApiOrigin('https://coderic.org').
 */

export const API_CLIENT_PACKAGE = "@prodaric/api-client";

export {
  setApiOrigin,
  getApiOrigin,
  getApiBaseUrl,
} from "./config";

export {
  fetchOpenApiSpec,
  clearOpenApiCache,
} from "./openapi";

export {
  CodericEngineClient,
  createCodericEngineClient,
  type RequestOptions,
} from "./client";

export type {
  ApiNamespace,
  HealthResponse,
  User,
  ListMeta,
  AccountProfile,
  ProjectsResponse,
  OpenApiSpec,
} from "./types";
