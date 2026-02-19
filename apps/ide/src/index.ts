/**
 * @prodaric/ide — Prodaric Framework aplicación principal (fork Coderic IDE).
 */

import { initApiForConsole } from "./api-test";

export const APP_ID = "prodaric-framework";

/** Inicializa origen del API en navegador (opcional: window.__CODERIC_API_ORIGIN__ en dev). */
initApiForConsole();

export {
  initApiForConsole,
  getApiClient,
  runHealthCheck,
  fetchOpenApiForConsole,
  clearApiCache,
} from "./api-test";
