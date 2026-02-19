/**
 * Entrada del IDE en el navegador (build Vite).
 * Pestañas: API, Lumino CRUD, Rete.js Modelo.
 */

import { APP_ID, runHealthCheck } from "./index";
import { mountCrudDemo } from "@prodaric/layout";
import { mountModelEditorDemo } from "@prodaric/node-canvas";

const app = document.getElementById("app");
if (!app) throw new Error("#app no encontrado");

type TabId = "api" | "lumino" | "rete";

let unmountLumino: (() => void) | null = null;
let unmountRete: (() => void) | null = null;

function renderApiPanel(container: HTMLElement): void {
  container.innerHTML = `
    <h2>API</h2>
    <p>Prodaric Framework — comprobar que el API responde.</p>
    <button type="button" id="health-btn">Probar API (health)</button>
    <pre id="health-result"></pre>
  `;
  const resultEl = container.querySelector("#health-result") as HTMLPreElement;
  container.querySelector("#health-btn")?.addEventListener("click", async () => {
    if (!resultEl) return;
    resultEl.textContent = "Cargando…";
    try {
      const health = await runHealthCheck();
      resultEl.textContent = JSON.stringify(health, null, 2);
    } catch (e) {
      resultEl.textContent = `Error: ${e instanceof Error ? e.message : String(e)}`;
    }
  });
}

function renderLuminoPanel(container: HTMLElement): void {
  container.innerHTML = "";
  container.style.minHeight = "200px";
  unmountLumino = mountCrudDemo(container);
}

async function renderRetePanel(container: HTMLElement): Promise<void> {
  container.innerHTML = "";
  container.style.minHeight = "400px";
  container.style.width = "100%";
  unmountRete = await mountModelEditorDemo(container);
}

async function showTab(tabId: TabId): Promise<void> {
  const content = document.getElementById("tab-content");
  const tabs = document.querySelectorAll("[data-tab]");
  if (!content) return;

  tabs.forEach((t) => t.classList.toggle("active", t.getAttribute("data-tab") === tabId));

  if (unmountLumino) {
    unmountLumino();
    unmountLumino = null;
  }
  if (unmountRete) {
    unmountRete();
    unmountRete = null;
  }

  content.innerHTML = "";

  if (tabId === "api") renderApiPanel(content);
  else if (tabId === "lumino") renderLuminoPanel(content);
  else if (tabId === "rete") await renderRetePanel(content);
}

app.innerHTML = `
  <h1>${APP_ID}</h1>
  <nav class="tabs" role="tablist">
    <button type="button" data-tab="api" role="tab" class="active">API</button>
    <button type="button" data-tab="lumino" role="tab">Lumino CRUD</button>
    <button type="button" data-tab="rete" role="tab">Rete.js Modelo</button>
  </nav>
  <div id="tab-content"></div>
`;

const style = document.createElement("style");
style.textContent = `
  .tabs { display: flex; gap: 0.5rem; margin: 0.5rem 0; }
  .tabs [data-tab] { padding: 0.4rem 0.8rem; cursor: pointer; border: 1px solid #ccc; background: #f5f5f5; border-radius: 4px; }
  .tabs [data-tab].active { background: #0078d4; color: #fff; border-color: #0078d4; }
  #tab-content { margin-top: 1rem; padding: 0.5rem; border: 1px solid #eee; border-radius: 4px; min-height: 120px; }
  .crud-demo-root .crud-demo-list { margin: 0.5rem 0; }
  .crud-demo-item { display: flex; align-items: center; gap: 0.5rem; margin: 0.25rem 0; }
  .crud-demo-item button { padding: 0.2rem 0.5rem; }
`;
document.head.appendChild(style);

document.querySelectorAll("[data-tab]").forEach((btn) => {
  btn.addEventListener("click", () => {
    void showTab((btn as HTMLElement).getAttribute("data-tab") as TabId);
  });
});

void showTab("api");
