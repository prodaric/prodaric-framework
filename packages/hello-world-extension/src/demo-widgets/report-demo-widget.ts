/**
 * Widget de ejemplo: reportes BIRT (report on demand).
 * Demos de todos los reportes: Productos, Resumen, Ventas. Cada uno con Descargar PDF.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

const REPORT_ON_DEMAND_BASE = 'http://127.0.0.1:8082/generate';

/** Reportes de demo disponibles (nombre = fichero en report-templates sin .rptdesign). */
const REPORT_DEMOS = [
  {
    id: 'productos',
    title: 'Productos',
    description: 'Listado de productos con unidades, precio y total. Vista previa en tabla.',
  },
  {
    id: 'resumen',
    title: 'Resumen ejecutivo',
    description: 'Reporte de resumen. Demo BIRT.',
  },
  {
    id: 'ventas',
    title: 'Ventas',
    description: 'Reporte de ventas. Demo BIRT.',
  },
] as const;

const SAMPLE_DATA = [
  { id: 1, producto: 'Producto A', unidades: 120, precioUnit: '10,00 €', total: '1.200,00 €' },
  { id: 2, producto: 'Producto B', unidades: 85, precioUnit: '10,00 €', total: '850,00 €' },
  { id: 3, producto: 'Producto C', unidades: 210, precioUnit: '10,00 €', total: '2.100,00 €' },
  { id: 4, producto: 'Producto D', unidades: 45, precioUnit: '24,50 €', total: '1.102,50 €' },
  { id: 5, producto: 'Producto E', unidades: 320, precioUnit: '5,75 €', total: '1.840,00 €' },
  { id: 6, producto: 'Producto F', unidades: 18, precioUnit: '99,00 €', total: '1.782,00 €' },
  { id: 7, producto: 'Producto G', unidades: 156, precioUnit: '12,30 €', total: '1.918,80 €' },
  { id: 8, producto: 'Producto H', unidades: 67, precioUnit: '18,00 €', total: '1.206,00 €' },
];

const TOTAL_UNIDADES = SAMPLE_DATA.reduce((s, r) => s + r.unidades, 0);
const TOTAL_IMPORTE = SAMPLE_DATA.reduce((s, r) => {
  const n = parseFloat(r.total.replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, ''));
  return s + (Number.isFinite(n) ? n : 0);
}, 0);
const TOTAL_IMPORTE_STR =
  TOTAL_IMPORTE.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

async function downloadReportPdf(reportId: string, statusEl: HTMLElement): Promise<void> {
  statusEl.textContent = 'Generando PDF…';
  statusEl.className = 'prodaric-demo-report-status';
  const url = `${REPORT_ON_DEMAND_BASE}?name=${encodeURIComponent(reportId)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `HTTP ${res.status}`);
    }
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `reporte-${reportId}.pdf`;
    a.click();
    URL.revokeObjectURL(blobUrl);
    statusEl.textContent = 'PDF descargado.';
    statusEl.className = 'prodaric-demo-report-status success';
  } catch (e) {
    statusEl.textContent =
      'Servidor no disponible. Ejecute: npm run report-on-demand (y antes: ./scripts/report-server.sh ensure)';
    statusEl.className = 'prodaric-demo-report-status error';
  }
}

function buildDemoCard(
  demo: (typeof REPORT_DEMOS)[number],
  statusEl: HTMLElement
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'prodaric-demo-report-card';
  card.innerHTML = `
    <div class="prodaric-demo-report-card-header">${demo.title}</div>
    <p class="prodaric-demo-report-card-desc">${demo.description}</p>
    <button type="button" class="prodaric-demo-report-card-btn">Descargar PDF</button>
  `;
  const btn = card.querySelector('button');
  if (btn) {
    btn.addEventListener('click', () => void downloadReportPdf(demo.id, statusEl));
  }
  card.appendChild(statusEl);
  return card;
}

export function createReportDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-report-demo-${UUID.uuid4()}`;
  w.title.label = 'Reportes (ejemplo)';
  w.title.closable = true;
  w.addClass('prodaric-demo-report');

  const root = document.createElement('div');
  root.className = 'prodaric-demo-report-root';

  const header = document.createElement('div');
  header.className = 'prodaric-demo-report-header';
  header.innerHTML = `
    <h2>Reportes BIRT (on demand)</h2>
    <p>Demos de reportes: cada uno se genera bajo demanda (un proceso por petición). Elige un reporte y descarga el PDF.</p>
  `;

  const demosSection = document.createElement('div');
  demosSection.className = 'prodaric-demo-report-demos';
  const demosTitle = document.createElement('h3');
  demosTitle.className = 'prodaric-demo-report-demos-title';
  demosTitle.textContent = 'Demos disponibles';
  demosSection.appendChild(demosTitle);

  const cardsWrap = document.createElement('div');
  cardsWrap.className = 'prodaric-demo-report-cards';
  for (const demo of REPORT_DEMOS) {
    const statusEl = document.createElement('div');
    statusEl.className = 'prodaric-demo-report-status';
    statusEl.setAttribute('aria-live', 'polite');
    cardsWrap.appendChild(buildDemoCard(demo, statusEl));
  }
  demosSection.appendChild(cardsWrap);

  const previewSection = document.createElement('div');
  previewSection.className = 'prodaric-demo-report-preview';
  const previewTitle = document.createElement('h3');
  previewTitle.className = 'prodaric-demo-report-preview-title';
  previewTitle.textContent = 'Vista previa (Productos)';
  previewSection.appendChild(previewTitle);
  const tableWrap = document.createElement('div');
  tableWrap.className = 'prodaric-demo-report-table-wrap';
  const table = document.createElement('table');
  table.setAttribute('role', 'grid');
  table.setAttribute('aria-label', 'Vista previa de reporte de productos');
  table.innerHTML = `
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Producto</th>
        <th scope="col" class="prodaric-demo-report-num">Unidades</th>
        <th scope="col" class="prodaric-demo-report-num">Precio unit.</th>
        <th scope="col" class="prodaric-demo-report-num">Total</th>
      </tr>
    </thead>
    <tbody>
      ${SAMPLE_DATA.map(
        (r, i) => `
        <tr class="${i % 2 === 1 ? 'prodaric-demo-report-row-alt' : ''}">
          <td>${r.id}</td>
          <td>${r.producto}</td>
          <td class="prodaric-demo-report-num">${r.unidades.toLocaleString('es-ES')}</td>
          <td class="prodaric-demo-report-num">${r.precioUnit}</td>
          <td class="prodaric-demo-report-num">${r.total}</td>
        </tr>
      `
      ).join('')}
    </tbody>
    <tfoot>
      <tr class="prodaric-demo-report-footer">
        <td colspan="2"><strong>Total</strong></td>
        <td class="prodaric-demo-report-num"><strong>${TOTAL_UNIDADES.toLocaleString('es-ES')}</strong></td>
        <td class="prodaric-demo-report-num">—</td>
        <td class="prodaric-demo-report-num"><strong>${TOTAL_IMPORTE_STR}</strong></td>
      </tr>
    </tfoot>
  `;
  tableWrap.appendChild(table);
  previewSection.appendChild(tableWrap);

  const styles = document.createElement('style');
  styles.textContent = `
    .prodaric-demo-report-root { padding: 1rem; font-family: inherit; }
    .prodaric-demo-report-header h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-demo-report-header p { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .prodaric-demo-report-demos-title { margin: 0 0 0.75rem 0; font-size: 1rem; }
    .prodaric-demo-report-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
    .prodaric-demo-report-card { border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 8px; padding: 1rem; background: var(--prodaric-bg-elevated, #f8fafc); }
    .prodaric-demo-report-card-header { font-weight: 600; margin-bottom: 0.5rem; }
    .prodaric-demo-report-card-desc { margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--prodaric-text-muted, #64748b); line-height: 1.4; }
    .prodaric-demo-report-card-btn { padding: 0.5rem 1rem; cursor: pointer; border-radius: 6px; border: 1px solid var(--prodaric-border, #e2e8f0); background: var(--prodaric-surface, #f1f5f9); font-size: 0.875rem; }
    .prodaric-demo-report-card-btn:hover { background: var(--prodaric-bg-hover, #e2e8f0); }
    .prodaric-demo-report-status { font-size: 0.8125rem; color: var(--prodaric-text-muted, #64748b); margin-top: 0.5rem; min-height: 1.25rem; }
    .prodaric-demo-report-status.success { color: var(--prodaric-success, #15803d); }
    .prodaric-demo-report-status.error { color: var(--prodaric-error, #b91c1c); }
    .prodaric-demo-report-preview-title { margin: 0 0 0.5rem 0; font-size: 1rem; }
    .prodaric-demo-report-table-wrap { overflow: auto; border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 8px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
    .prodaric-demo-report table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    .prodaric-demo-report th, .prodaric-demo-report td { padding: 0.625rem 0.875rem; text-align: left; border-bottom: 1px solid var(--prodaric-border, #e2e8f0); }
    .prodaric-demo-report-num { text-align: right; font-variant-numeric: tabular-nums; }
    .prodaric-demo-report th { background: var(--prodaric-surface, #f1f5f9); font-weight: 600; color: var(--prodaric-text, #334155); }
    .prodaric-demo-report-row-alt { background: var(--prodaric-bg-subtle, #f8fafc); }
    .prodaric-demo-report tbody tr:hover { background: var(--prodaric-bg-hover, #f1f5f9); }
    .prodaric-demo-report-footer { background: var(--prodaric-surface, #e2e8f0); border-top: 2px solid var(--prodaric-border, #cbd5e1); }
    .prodaric-demo-report-footer td { padding: 0.75rem 0.875rem; }
  `;
  root.appendChild(styles);
  root.appendChild(header);
  root.appendChild(demosSection);
  root.appendChild(previewSection);
  w.node.appendChild(root);
  return w;
}
