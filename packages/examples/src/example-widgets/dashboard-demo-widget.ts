/**
 * Widget de ejemplo: Dashboard.
 * Demuestra capacidades de layout: KPIs, tabla resumen, filtro de período y actividad reciente.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

const KPI_DATA = [
  { title: 'Ítems activos', value: '12', subtitle: 'este mes', icon: '📊', trend: '+2' },
  { title: 'Tareas pendientes', value: '3', subtitle: 'hoy', icon: '✓', trend: '' },
  { title: 'Reportes generados', value: '7', subtitle: 'última semana', icon: '📄', trend: '+1' },
  { title: 'Accesos rápidos', value: '—', subtitle: 'Reportes · Formularios · CRUD', icon: '⚡', trend: '' },
];

const RECENT_ACTIVITY = [
  { text: 'Formulario guardado', time: 'hace 5 min', type: 'form' },
  { text: 'Reporte Productos generado', time: 'hace 1 h', type: 'report' },
  { text: 'Tarea "Revisar docs" completada', time: 'hace 2 h', type: 'todo' },
  { text: 'Gráfico actualizado', time: 'hace 3 h', type: 'chart' },
];

const SUMMARY_ROWS = [
  { concept: 'Ventas Ene', amount: '12.450 €', status: 'ok' },
  { concept: 'Ventas Feb', amount: '14.200 €', status: 'ok' },
  { concept: 'Ventas Mar', amount: '11.800 €', status: 'warn' },
];

export function createDashboardDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-dashboard-demo-${UUID.uuid4()}`;
  w.title.label = 'Dashboard (ejemplo)';
  w.title.closable = true;
  w.addClass('prodaric-demo-dashboard');

  const root = document.createElement('div');
  root.className = 'prodaric-dashboard-root';

  const header = document.createElement('div');
  header.className = 'prodaric-dashboard-header';
  header.innerHTML = `
    <h2>Dashboard de ejemplo</h2>
    <p>Demuestra capacidades del framework: tarjetas KPI, tabla resumen, filtro de período y actividad reciente. Todo con variables CSS del tema (light/dark).</p>
  `;

  const periodBar = document.createElement('div');
  periodBar.className = 'prodaric-dashboard-period';
  periodBar.innerHTML = `
    <span class="period-label">Período:</span>
    <button type="button" class="period-btn active" data-period="month">Mes</button>
    <button type="button" class="period-btn" data-period="week">Semana</button>
    <button type="button" class="period-btn" data-period="day">Hoy</button>
  `;
  periodBar.querySelectorAll('.period-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      periodBar.querySelectorAll('.period-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const grid = document.createElement('div');
  grid.className = 'prodaric-dashboard-grid';
  KPI_DATA.forEach((c) => {
    const card = document.createElement('div');
    card.className = 'prodaric-dashboard-card';
    card.innerHTML = `
      <span class="card-icon">${c.icon}</span>
      <div class="card-body">
        <span class="card-value">${c.value}</span>
        ${c.trend ? `<span class="card-trend">${c.trend}</span>` : ''}
        <span class="card-title">${c.title}</span>
        <span class="card-subtitle">${c.subtitle}</span>
      </div>
    `;
    grid.appendChild(card);
  });

  const twoCol = document.createElement('div');
  twoCol.className = 'prodaric-dashboard-twocol';
  const sectionActivity = document.createElement('div');
  sectionActivity.className = 'prodaric-dashboard-section';
  sectionActivity.innerHTML = `
    <h3>Actividad reciente</h3>
    <ul class="activity-list">
      ${RECENT_ACTIVITY.map((a) => `<li><span class="activity-text">${a.text}</span> <span class="activity-time">${a.time}</span></li>`).join('')}
    </ul>
  `;
  const sectionTable = document.createElement('div');
  sectionTable.className = 'prodaric-dashboard-section';
  sectionTable.innerHTML = `
    <h3>Resumen (ejemplo)</h3>
    <table class="prodaric-dashboard-table" role="grid" aria-label="Resumen de ventas">
      <thead>
        <tr><th scope="col">Concepto</th><th scope="col" class="num">Importe</th><th scope="col">Estado</th></tr>
      </thead>
      <tbody>
        ${SUMMARY_ROWS.map((r) => `<tr><td>${r.concept}</td><td class="num">${r.amount}</td><td><span class="status status-${r.status}">${r.status}</span></td></tr>`).join('')}
      </tbody>
    </table>
  `;
  twoCol.appendChild(sectionActivity);
  twoCol.appendChild(sectionTable);

  const styles = document.createElement('style');
  styles.textContent = `
    .prodaric-dashboard-root { padding: 1rem; font-family: inherit; }
    .prodaric-dashboard-header h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-dashboard-header p { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .prodaric-dashboard-period { margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
    .prodaric-dashboard-period .period-label { font-size: 0.875rem; color: var(--prodaric-text-muted, #64748b); }
    .prodaric-dashboard-period .period-btn { padding: 0.35rem 0.75rem; border-radius: 6px; border: 1px solid var(--prodaric-border, #e2e8f0); background: var(--prodaric-bg-elevated, #f8fafc); cursor: pointer; font-size: 0.875rem; }
    .prodaric-dashboard-period .period-btn:hover { background: var(--prodaric-bg-hover, #e2e8f0); }
    .prodaric-dashboard-period .period-btn.active { background: var(--prodaric-color-primary, #2563eb); color: #fff; border-color: transparent; }
    .prodaric-dashboard-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
    .prodaric-dashboard-card { background: var(--prodaric-bg-elevated, #f8fafc); border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 8px; padding: 1rem; display: flex; align-items: flex-start; gap: 0.75rem; box-shadow: var(--prodaric-shadow-sm, 0 1px 2px rgba(0,0,0,0.05)); }
    .prodaric-dashboard-card .card-icon { font-size: 1.5rem; }
    .prodaric-dashboard-card .card-body { display: flex; flex-direction: column; gap: 0.25rem; }
    .prodaric-dashboard-card .card-value { font-size: 1.5rem; font-weight: 700; color: var(--prodaric-color-primary, #2563eb); }
    .prodaric-dashboard-card .card-trend { font-size: 0.75rem; color: var(--prodaric-success, #15803d); }
    .prodaric-dashboard-card .card-title { font-weight: 600; font-size: 0.875rem; color: var(--prodaric-text, #0f172a); }
    .prodaric-dashboard-card .card-subtitle { font-size: 0.75rem; color: var(--prodaric-text-muted, #64748b); }
    .prodaric-dashboard-twocol { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    @media (max-width: 640px) { .prodaric-dashboard-twocol { grid-template-columns: 1fr; } }
    .prodaric-dashboard-section h3 { margin: 0 0 0.5rem 0; font-size: 1rem; }
    .prodaric-dashboard-section .activity-list { margin: 0; padding-left: 1.25rem; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .prodaric-dashboard-section .activity-time { color: var(--prodaric-text-muted, #94a3b8); font-size: 0.8125rem; }
    .prodaric-dashboard-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    .prodaric-dashboard-table th, .prodaric-dashboard-table td { padding: 0.5rem 0.75rem; text-align: left; border-bottom: 1px solid var(--prodaric-border, #e2e8f0); }
    .prodaric-dashboard-table th { background: var(--prodaric-surface, #f1f5f9); font-weight: 600; }
    .prodaric-dashboard-table .num { text-align: right; font-variant-numeric: tabular-nums; }
    .prodaric-dashboard-table .status { padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.75rem; }
    .prodaric-dashboard-table .status-ok { background: var(--prodaric-success, #dcfce7); color: var(--prodaric-success, #15803d); }
    .prodaric-dashboard-table .status-warn { background: #fef3c7; color: #b45309; }
  `;

  root.appendChild(styles);
  root.appendChild(header);
  root.appendChild(periodBar);
  root.appendChild(grid);
  root.appendChild(twoCol);
  w.node.appendChild(root);
  return w;
}
