/**
 * Widget de ejemplo: gráficos (Apache ECharts).
 * Demuestra barras, líneas y torta; tooltips y leyenda interactivos.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';
import * as echarts from 'echarts';

const SAMPLE_CATEGORIES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
const SAMPLE_VALUES = [120, 200, 150, 80, 70, 110];
const PIE_DATA = [
  { name: 'A', value: 35 },
  { name: 'B', value: 25 },
  { name: 'C', value: 20 },
  { name: 'D', value: 12 },
  { name: 'E', value: 8 },
];

export function createChartDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-chart-demo-${UUID.uuid4()}`;
  w.title.label = 'Gráficos (ejemplo)';
  w.title.closable = true;
  w.addClass('prodaric-demo-chart');

  const root = document.createElement('div');
  root.className = 'prodaric-demo-chart-root';

  const header = document.createElement('div');
  header.className = 'prodaric-demo-chart-header';
  header.innerHTML = `
    <h2>Gráficos con Apache ECharts</h2>
    <p>Capacidad del framework: gráficos interactivos en paneles. Barras, líneas, torta; tooltips y leyenda. Redimensiona el panel y el gráfico se adapta.</p>
  `;

  const toolbar = document.createElement('div');
  toolbar.className = 'prodaric-demo-chart-toolbar';
  toolbar.innerHTML = `
    <button type="button" class="chart-type-btn active" data-type="bar">Barras</button>
    <button type="button" class="chart-type-btn" data-type="line">Líneas</button>
    <button type="button" class="chart-type-btn" data-type="pie">Torta</button>
  `;

  const chartDiv = document.createElement('div');
  chartDiv.className = 'prodaric-demo-chart-container';
  chartDiv.style.width = '100%';
  chartDiv.style.height = '320px';

  root.appendChild(header);
  root.appendChild(toolbar);
  root.appendChild(chartDiv);

  const styles = document.createElement('style');
  styles.textContent = `
    .prodaric-demo-chart-root { padding: 1rem; font-family: inherit; }
    .prodaric-demo-chart-header h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-demo-chart-header p { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .prodaric-demo-chart-toolbar { margin-bottom: 0.75rem; display: flex; gap: 0.5rem; }
    .prodaric-demo-chart-toolbar .chart-type-btn { padding: 0.35rem 0.75rem; cursor: pointer; border-radius: 6px; border: 1px solid var(--prodaric-border, #e2e8f0); background: var(--prodaric-bg-elevated, #f8fafc); }
    .prodaric-demo-chart-toolbar .chart-type-btn.active { background: var(--prodaric-color-primary, #2563eb); color: #fff; border-color: transparent; }
  `;
  root.appendChild(styles);
  w.node.appendChild(root);

  let chart: echarts.ECharts | null = null;

  function initChart(type: 'bar' | 'line' | 'pie'): void {
    if (!chart) {
      chart = echarts.init(chartDiv);
    }
    if (type === 'pie') {
      chart.setOption(
        {
          tooltip: { trigger: 'item' },
          legend: { bottom: '0%', left: 'center' },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              data: PIE_DATA,
              emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.2)' } },
            },
          ],
        },
        true
      );
    } else {
      chart.setOption(
        {
          tooltip: { trigger: 'axis' },
          legend: { data: ['Serie 1'], top: '0%' },
          xAxis: { type: 'category', data: SAMPLE_CATEGORIES },
          yAxis: { type: 'value' },
          series: [
            type === 'bar'
              ? { name: 'Serie 1', type: 'bar', data: SAMPLE_VALUES, itemStyle: { color: '#2563eb' } }
              : { name: 'Serie 1', type: 'line', data: SAMPLE_VALUES, smooth: true, lineStyle: { color: '#2563eb' }, itemStyle: { color: '#2563eb' } },
          ],
          grid: { left: '3%', right: '4%', bottom: '15%', top: '15%', containLabel: true },
        },
        true
      );
    }
  }

  toolbar.querySelectorAll('.chart-type-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      toolbar.querySelectorAll('.chart-type-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const type = (btn as HTMLElement).dataset.type as 'bar' | 'line' | 'pie';
      initChart(type);
    });
  });

  initChart('bar');

  w.disposed.connect(() => {
    chart?.dispose();
  });

  const observer = new ResizeObserver(() => chart?.resize());
  observer.observe(chartDiv);

  return w;
}
