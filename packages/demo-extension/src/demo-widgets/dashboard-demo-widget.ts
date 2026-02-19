/**
 * Widget de ejemplo: Dashboard.
 * Muestra un panel tipo dashboard con tarjetas de resumen (layout, composición, tema).
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

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
  header.innerHTML = '<h2>Dashboard de ejemplo</h2><p>Composición de vistas con tarjetas y secciones. Así puedes montar un panel de control con el framework.</p>';

  const grid = document.createElement('div');
  grid.className = 'prodaric-dashboard-grid';

  const cards = [
    { title: 'Resumen', value: '12', subtitle: 'ítems activos', icon: '📊' },
    { title: 'Pendientes', value: '3', subtitle: 'tareas hoy', icon: '✓' },
    { title: 'Accesos rápidos', value: '—', subtitle: 'Reportes · Formularios · CRUD', icon: '⚡' },
  ];

  cards.forEach((c) => {
    const card = document.createElement('div');
    card.className = 'prodaric-dashboard-card';
    card.innerHTML = `
      <span class="card-icon">${c.icon}</span>
      <div class="card-body">
        <span class="card-value">${c.value}</span>
        <span class="card-title">${c.title}</span>
        <span class="card-subtitle">${c.subtitle}</span>
      </div>
    `;
    grid.appendChild(card);
  });

  const section = document.createElement('div');
  section.className = 'prodaric-dashboard-section';
  section.innerHTML = `
    <h3>Actividad reciente</h3>
    <ul class="activity-list">
      <li>Formulario guardado — hace 5 min</li>
      <li>Reporte generado — hace 1 h</li>
      <li>Tarea completada — hace 2 h</li>
    </ul>
  `;

  const styles = document.createElement('style');
  styles.textContent = `
    .prodaric-dashboard-root { padding: 1rem; font-family: inherit; }
    .prodaric-dashboard-header h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-dashboard-header p { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .prodaric-dashboard-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
    .prodaric-dashboard-card { background: var(--prodaric-bg-elevated, #f8fafc); border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 8px; padding: 1rem; display: flex; align-items: flex-start; gap: 0.75rem; box-shadow: var(--prodaric-shadow-sm, 0 1px 2px rgba(0,0,0,0.05)); }
    .prodaric-dashboard-card .card-icon { font-size: 1.5rem; }
    .prodaric-dashboard-card .card-body { display: flex; flex-direction: column; gap: 0.25rem; }
    .prodaric-dashboard-card .card-value { font-size: 1.5rem; font-weight: 700; color: var(--prodaric-color-primary, #2563eb); }
    .prodaric-dashboard-card .card-title { font-weight: 600; font-size: 0.875rem; color: var(--prodaric-text, #0f172a); }
    .prodaric-dashboard-card .card-subtitle { font-size: 0.75rem; color: var(--prodaric-text-muted, #64748b); }
    .prodaric-dashboard-section h3 { margin: 0 0 0.5rem 0; font-size: 1rem; }
    .prodaric-dashboard-section .activity-list { margin: 0; padding-left: 1.25rem; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
  `;

  root.appendChild(styles);
  root.appendChild(header);
  root.appendChild(grid);
  root.appendChild(section);
  w.node.appendChild(root);
  return w;
}
