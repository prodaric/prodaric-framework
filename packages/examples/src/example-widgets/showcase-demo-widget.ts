/**
 * Showcase: todo lo que puedes usar con Prodaric Framework.
 * Una sola vista WOW: KPIs, reportes, formularios, Grid, gráficos, layout y Web Components.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';
import * as echarts from 'echarts';

const REPORT_ON_DEMAND_BASE = 'http://127.0.0.1:8082/generate';
const GRID_DATA = [
  { nombre: 'María García', rol: 'Desarrolladora', estado: 'Activo', fecha: '2024-01-15' },
  { nombre: 'Carlos López', rol: 'Arquitecto', estado: 'Activo', fecha: '2024-02-20' },
  { nombre: 'Ana Martínez', rol: 'QA', estado: 'Vacaciones', fecha: '2024-03-10' },
  { nombre: 'Pedro Sánchez', rol: 'DevOps', estado: 'Activo', fecha: '2024-01-08' },
  { nombre: 'Laura Fernández', rol: 'UX', estado: 'Activo', fecha: '2024-04-01' },
];
const CHART_CATEGORIES = ['Ene', 'Feb', 'Mar', 'Abr', 'May'];
const CHART_VALUES = [42, 78, 55, 90, 63];

export function createShowcaseDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-showcase-${UUID.uuid4()}`;
  w.title.label = 'Showcase — Todo lo que puedes usar';
  w.title.closable = true;
  w.addClass('prodaric-showcase');

  const root = document.createElement('div');
  root.className = 'showcase-root';

  // —— Hero ——
  const hero = document.createElement('div');
  hero.className = 'showcase-hero';
  hero.innerHTML = `
    <h1>Todo lo que puedes usar</h1>
    <p class="showcase-hero-sub">Un solo lugar para ver las capacidades del framework: vistas, reportes, formularios, datos, gráficos, layout y Web Components.</p>
  `;
  root.appendChild(hero);

  // —— KPIs ——
  const kpiSection = document.createElement('section');
  kpiSection.className = 'showcase-section';
  kpiSection.innerHTML = `
    <h2>Vistas y estado</h2>
    <div class="showcase-kpis">
      <div class="showcase-kpi"><span class="kpi-value">12</span><span class="kpi-label">Ítems activos</span></div>
      <div class="showcase-kpi"><span class="kpi-value">3</span><span class="kpi-label">Pendientes</span></div>
      <div class="showcase-kpi"><span class="kpi-value">7</span><span class="kpi-label">Reportes</span></div>
    </div>
    <p class="showcase-hint">Menú Prodaric → Dashboard, Todo list</p>
  `;
  root.appendChild(kpiSection);

  // —— Reportes ——
  const reportSection = document.createElement('section');
  reportSection.className = 'showcase-section';
  const reportStatus = document.createElement('span');
  reportStatus.className = 'showcase-status';
  reportStatus.setAttribute('aria-live', 'polite');
  reportSection.innerHTML = `
    <h2>Reportes BIRT</h2>
    <p>Generación bajo demanda: un proceso por petición, descarga PDF.</p>
    <button type="button" class="showcase-btn showcase-btn-primary" id="showcase-download-pdf">Descargar PDF (productos)</button>
  `;
  reportSection.appendChild(reportStatus);
  const pdfBtn = reportSection.querySelector('#showcase-download-pdf');
  pdfBtn?.addEventListener('click', async () => {
    reportStatus.textContent = 'Generando…';
    reportStatus.className = 'showcase-status';
    try {
      const res = await fetch(`${REPORT_ON_DEMAND_BASE}?name=productos`);
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte-productos.pdf';
      a.click();
      URL.revokeObjectURL(url);
      reportStatus.textContent = '✓ Descargado';
      reportStatus.className = 'showcase-status success';
    } catch (e) {
      reportStatus.textContent = 'Servidor no disponible. Ejecuta: npm run report-on-demand';
      reportStatus.className = 'showcase-status error';
    }
  });
  root.appendChild(reportSection);

  // —— Formularios ——
  const formSection = document.createElement('section');
  formSection.className = 'showcase-section';
  formSection.innerHTML = `
    <h2>Formularios y validación</h2>
    <p>JSON Schema (ajv), mensajes por campo. Formularios con LayoutSchema.</p>
    <p class="showcase-hint">Menú Prodaric → Formularios, JSON Schema</p>
  `;
  root.appendChild(formSection);

  // —— Grid (Vaadin) ——
  const gridSection = document.createElement('section');
  gridSection.className = 'showcase-section';
  gridSection.innerHTML = `
    <h2>Datos y listados</h2>
    <p>Vaadin Grid: ordenación, scroll, tema Lumo. Ideal para tablas de datos.</p>
    <div id="showcase-vaadin-grid-wrap" class="showcase-grid-wrap"></div>
  `;
  const gridWrap = gridSection.querySelector('#showcase-vaadin-grid-wrap') as HTMLElement;
  const grid = document.createElement('vaadin-grid');
  grid.setAttribute('theme', 'compact');
  grid.style.height = '200px';
  grid.style.width = '100%';
  const colNombre = document.createElement('vaadin-grid-column');
  colNombre.setAttribute('path', 'nombre');
  colNombre.setAttribute('header', 'Nombre');
  const colRol = document.createElement('vaadin-grid-column');
  colRol.setAttribute('path', 'rol');
  colRol.setAttribute('header', 'Rol');
  const colEstado = document.createElement('vaadin-grid-column');
  colEstado.setAttribute('path', 'estado');
  colEstado.setAttribute('header', 'Estado');
  const colFecha = document.createElement('vaadin-grid-column');
  colFecha.setAttribute('path', 'fecha');
  colFecha.setAttribute('header', 'Fecha');
  grid.appendChild(colNombre);
  grid.appendChild(colRol);
  grid.appendChild(colEstado);
  grid.appendChild(colFecha);
  (grid as unknown as { items: unknown[] }).items = GRID_DATA;
  gridWrap?.appendChild(grid);
  root.appendChild(gridSection);

  // —— Gráfico inline ——
  const chartSection = document.createElement('section');
  chartSection.className = 'showcase-section';
  const chartDiv = document.createElement('div');
  chartDiv.className = 'showcase-chart-inline';
  chartDiv.style.height = '220px';
  chartSection.innerHTML = '<h2>Gráficos</h2><p>Apache ECharts: barras, líneas, tortas, interactivos.</p>';
  chartSection.appendChild(chartDiv);
  root.appendChild(chartSection);

  let chartInstance: echarts.ECharts | null = null;
  setTimeout(() => {
    chartInstance = echarts.init(chartDiv);
    chartInstance.setOption({
      grid: { left: '8%', right: '4%', bottom: '8%', top: '8%', containLabel: true },
      xAxis: { type: 'category', data: CHART_CATEGORIES },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: CHART_VALUES, itemStyle: { color: '#2563eb' } }],
    });
  }, 100);
  w.disposed.connect(() => chartInstance?.dispose());

  const chartResize = new ResizeObserver(() => chartInstance?.resize());
  chartResize.observe(chartDiv);

  // —— Layout ——
  const layoutSection = document.createElement('section');
  layoutSection.className = 'showcase-section';
  layoutSection.innerHTML = `
    <h2>Layout y edición</h2>
    <p>CRUD (Lumino), Docking (pestañas movibles), Rete.js (editor de nodos).</p>
    <p class="showcase-hint">Menú Prodaric → CRUD, Docking, Rete.js Modelo</p>
  `;
  root.appendChild(layoutSection);

  // —— Web Components (tres columnas) ——
  const wcSection = document.createElement('section');
  wcSection.className = 'showcase-section showcase-wc';
  wcSection.innerHTML = `
    <h2>Web Components</h2>
    <p>Tres librerías en un mismo IDE: Shoelace, FAST (Microsoft), Vaadin. Sin conflicto.</p>
    <div class="showcase-wc-grid">
      <div class="showcase-wc-col">
        <h3>Shoelace <small>(sl-*)</small></h3>
        <div id="showcase-shoelace"></div>
      </div>
      <div class="showcase-wc-col">
        <h3>FAST <small>(fast-*)</small></h3>
        <div id="showcase-fast"></div>
      </div>
      <div class="showcase-wc-col">
        <h3>Vaadin <small>(vaadin-*)</small></h3>
        <div id="showcase-vaadin"></div>
      </div>
    </div>
  `;
  const slRoot = wcSection.querySelector('#showcase-shoelace') as HTMLElement;
  if (slRoot) {
    const slBtn = document.createElement('sl-button');
    slBtn.setAttribute('variant', 'primary');
    slBtn.textContent = 'Botón';
    const slInput = document.createElement('sl-input');
    slInput.setAttribute('placeholder', 'Input');
    slInput.setAttribute('size', 'small');
    const slBadge = document.createElement('sl-badge');
    slBadge.textContent = '3';
    slBadge.setAttribute('variant', 'primary');
    slRoot.appendChild(slBtn);
    slRoot.appendChild(slInput);
    slRoot.appendChild(slBadge);
  }
  const fastRoot = wcSection.querySelector('#showcase-fast') as HTMLElement;
  if (fastRoot) {
    const fastBtn = document.createElement('fast-button');
    fastBtn.setAttribute('appearance', 'accent');
    fastBtn.textContent = 'Botón FAST';
    const fastCard = document.createElement('fast-card');
    fastCard.innerHTML = '<p>Card</p>';
    fastRoot.appendChild(fastBtn);
    fastRoot.appendChild(fastCard);
  }
  const vaadinRoot = wcSection.querySelector('#showcase-vaadin') as HTMLElement;
  if (vaadinRoot) {
    const vaadinBtn = document.createElement('vaadin-button');
    vaadinBtn.setAttribute('theme', 'primary');
    vaadinBtn.textContent = 'Botón Vaadin';
    const vaadinField = document.createElement('vaadin-text-field');
    vaadinField.setAttribute('placeholder', 'TextField');
    vaadinRoot.appendChild(vaadinBtn);
    vaadinRoot.appendChild(vaadinField);
  }
  root.appendChild(wcSection);

  // —— CTA ——
  const cta = document.createElement('div');
  cta.className = 'showcase-cta';
  cta.innerHTML = `
    <p><strong>Menú Prodaric</strong> — Cada ítem abre un ejemplo completo. <strong>Acerca del framework</strong> lista todas las capacidades.</p>
  `;
  root.appendChild(cta);

  // Estilos
  const style = document.createElement('style');
  style.textContent = `
    .showcase-root { padding: 1.5rem; font-family: inherit; max-width: 56rem; margin: 0 auto; }
    .showcase-hero { text-align: center; margin-bottom: 2rem; padding: 2rem 1rem; background: linear-gradient(135deg, var(--prodaric-bg-elevated, #f8fafc) 0%, var(--prodaric-surface, #f1f5f9) 100%); border-radius: 12px; border: 1px solid var(--prodaric-border, #e2e8f0); }
    .showcase-hero h1 { margin: 0 0 0.5rem 0; font-size: 1.75rem; color: var(--prodaric-text, #0f172a); }
    .showcase-hero-sub { margin: 0; font-size: 1rem; color: var(--prodaric-text-muted, #64748b); max-width: 36rem; margin-left: auto; margin-right: auto; }
    .showcase-section { margin-bottom: 2rem; }
    .showcase-section h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; color: var(--prodaric-text, #0f172a); }
    .showcase-section h3 { margin: 0 0 0.5rem 0; font-size: 1rem; }
    .showcase-section p { margin: 0 0 0.75rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .showcase-hint { font-size: 0.8125rem !important; color: var(--prodaric-text-muted, #94a3b8) !important; }
    .showcase-kpis { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
    .showcase-kpi { background: var(--prodaric-bg-elevated, #f8fafc); border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 8px; padding: 1rem 1.25rem; min-width: 7rem; text-align: center; }
    .showcase-kpi .kpi-value { display: block; font-size: 1.5rem; font-weight: 700; color: var(--prodaric-color-primary, #2563eb); }
    .showcase-kpi .kpi-label { font-size: 0.8125rem; color: var(--prodaric-text-muted, #64748b); }
    .showcase-btn { padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.875rem; border: 1px solid var(--prodaric-border, #e2e8f0); background: var(--prodaric-bg-elevated, #f8fafc); }
    .showcase-btn-primary { background: var(--prodaric-color-primary, #2563eb); color: #fff; border-color: transparent; }
    .showcase-btn:hover { filter: brightness(0.97); }
    .showcase-status { display: block; margin-top: 0.5rem; font-size: 0.8125rem; min-height: 1.25rem; }
    .showcase-status.success { color: var(--prodaric-success, #15803d); }
    .showcase-status.error { color: var(--prodaric-error, #dc2626); }
    .showcase-grid-wrap { border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 8px; overflow: hidden; }
    .showcase-chart-inline { width: 100%; border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 8px; }
    .showcase-wc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 0.75rem; }
    @media (max-width: 640px) { .showcase-wc-grid { grid-template-columns: 1fr; } }
    .showcase-wc-col { background: var(--prodaric-bg-elevated, #f8fafc); border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 8px; padding: 1rem; }
    .showcase-wc-col h3 { margin: 0 0 0.75rem 0; }
    .showcase-wc-col sl-button, .showcase-wc-col fast-button, .showcase-wc-col vaadin-button { margin-right: 0.5rem; margin-bottom: 0.5rem; }
    .showcase-wc-col sl-input, .showcase-wc-col fast-text-field, .showcase-wc-col vaadin-text-field { display: block; margin: 0.5rem 0; }
    .showcase-cta { margin-top: 2rem; padding: 1rem; background: var(--prodaric-bg-elevated, #f8fafc); border-radius: 8px; border: 1px solid var(--prodaric-border, #e2e8f0); font-size: 0.875rem; color: var(--prodaric-text-muted, #64748b); }
  `;
  root.insertBefore(style, root.firstChild);

  w.node.appendChild(root);
  return w;
}
