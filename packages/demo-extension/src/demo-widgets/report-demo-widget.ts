/**
 * Widget de ejemplo: reporte tipo BIRT.
 * Vista previa en tabla y descarga real del reporte como PDF.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
const TOTAL_IMPORTE_STR = TOTAL_IMPORTE.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

/** Genera y descarga el reporte como PDF (ejemplo tipo BIRT). */
function downloadReportPdf(): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  doc.setFontSize(14);
  doc.text('Reporte de productos (ejemplo BIRT)', 14, 18);
  doc.setFontSize(10);
  doc.text(`Prodaric Framework · ${new Date().toLocaleDateString('es-ES')}`, 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['ID', 'Producto', 'Unidades', 'Precio unit.', 'Total']],
    body: SAMPLE_DATA.map((r) => [
      String(r.id),
      r.producto,
      r.unidades.toLocaleString('es-ES'),
      r.precioUnit,
      r.total,
    ]),
    foot: [['', 'Total', TOTAL_UNIDADES.toLocaleString('es-ES'), '—', TOTAL_IMPORTE_STR]],
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249] },
    footStyles: { fillColor: [226, 232, 240], fontStyle: 'bold' },
  });

  doc.save('reporte-productos.pdf');
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
  header.innerHTML = '<h2>Reporte tipo BIRT</h2><p>Vista previa del reporte y descarga en PDF. Ejemplo de lo que puedes construir con BIRT / Business Intelligence.</p>';

  const toolbar = document.createElement('div');
  toolbar.className = 'prodaric-demo-report-toolbar';
  const exportBtn = document.createElement('button');
  exportBtn.type = 'button';
  exportBtn.textContent = 'Descargar PDF';
  exportBtn.addEventListener('click', () => {
    downloadReportPdf();
  });
  toolbar.appendChild(exportBtn);

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
      ${SAMPLE_DATA.map((r, i) => `
        <tr class="${i % 2 === 1 ? 'prodaric-demo-report-row-alt' : ''}">
          <td>${r.id}</td>
          <td>${r.producto}</td>
          <td class="prodaric-demo-report-num">${r.unidades.toLocaleString('es-ES')}</td>
          <td class="prodaric-demo-report-num">${r.precioUnit}</td>
          <td class="prodaric-demo-report-num">${r.total}</td>
        </tr>
      `).join('')}
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

  const styles = document.createElement('style');
  styles.textContent = `
    .prodaric-demo-report-root { padding: 1rem; font-family: inherit; }
    .prodaric-demo-report-header h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-demo-report-header p { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .prodaric-demo-report-toolbar { margin-bottom: 1rem; }
    .prodaric-demo-report-toolbar button { padding: 0.5rem 1rem; cursor: pointer; border-radius: 6px; border: 1px solid var(--prodaric-border, #e2e8f0); background: var(--prodaric-bg-elevated, #f8fafc); }
    .prodaric-demo-report-toolbar button:hover { background: var(--prodaric-bg-hover, #e2e8f0); }
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
  root.appendChild(toolbar);
  root.appendChild(tableWrap);
  w.node.appendChild(root);
  return w;
}
