/**
 * Entrada del IDE en el navegador (build Vite).
 * Carga el IDE y muestra una mínima UI para comprobar que arranca y el API responde.
 */

import { APP_ID, runHealthCheck } from "./index";

const app = document.getElementById("app");
if (!app) throw new Error("#app no encontrado");

app.innerHTML = `
  <h1>${APP_ID}</h1>
  <p>Coderic IDE — build para navegador.</p>
  <button type="button" id="health-btn">Probar API (health)</button>
  <pre id="health-result"></pre>
`;

const resultEl = document.getElementById("health-result") as HTMLPreElement;
document.getElementById("health-btn")?.addEventListener("click", async () => {
  if (!resultEl) return;
  resultEl.textContent = "Cargando…";
  try {
    const health = await runHealthCheck();
    resultEl.textContent = JSON.stringify(health, null, 2);
  } catch (e) {
    resultEl.textContent = `Error: ${e instanceof Error ? e.message : String(e)}`;
  }
});
