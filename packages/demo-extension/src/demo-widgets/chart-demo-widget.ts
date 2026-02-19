/**
 * Widget de ejemplo: gráficos (ECharts).
 * Gráfico de barras y selector para cambiar a línea.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';
import * as echarts from 'echarts';

const SAMPLE_CATEGORIES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
const SAMPLE_VALUES = [120, 200, 150, 80, 70, 110];

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
  header.innerHTML = '<h2>Gráfico de ejemplo</h2><p>Con Apache ECharts puedes añadir gráficos interactivos en paneles (barras, líneas, tortas, etc.).</p>';

  const toolbar = document.createElement('div');
  toolbar.className = 'prodaric-demo-chart-toolbar';
  const barBtn = document.createElement('button');
  barBtn.type = 'button';
  barBtn.textContent = 'Barras';
  const lineBtn = document.createElement('button');
  lineBtn.textContent = 'Líneas';
  toolbar.appendChild(barBtn);
  toolbar.appendChild(lineBtn);

  const chartDiv = document.createElement('div');
  chartDiv.className = 'prodaric-demo-chart-container';
  chartDiv.style.width = '100%';
  chartDiv.style.height = '280px';

  root.appendChild(header);
  root.appendChild(toolbar);
  root.appendChild(chartDiv);

  const styles = document.createElement('style');
  styles.textContent = `
    .prodaric-demo-chart-root { padding: 1rem; font-family: inherit; }
    .prodaric-demo-chart-header h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-demo-chart-header p { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .prodaric-demo-chart-toolbar { margin-bottom: 0.75rem; display: flex; gap: 0.5rem; }
    .prodaric-demo-chart-toolbar button { padding: 0.35rem 0.75rem; cursor: pointer; border-radius: 6px; border: 1px solid var(--prodaric-border, #e2e8f0); background: var(--prodaric-bg-elevated, #f8fafc); }
    .prodaric-demo-chart-toolbar button.active { background: var(--prodaric-color-primary, #2563eb); color: #fff; border-color: transparent; }
  `;
  root.appendChild(styles);
  w.node.appendChild(root);

  let chart: echarts.ECharts | null = null;

  function initChart(type: 'bar' | 'line'): void {
    if (!chart) {
      chart = echarts.init(chartDiv);
    }
    const option: echarts.EChartsOption = {
      xAxis: { type: 'category', data: SAMPLE_CATEGORIES },
      yAxis: { type: 'value' },
      series: [
        type === 'bar'
          ? { type: 'bar', data: SAMPLE_VALUES, itemStyle: { color: '#2563eb' } }
          : { type: 'line', data: SAMPLE_VALUES, smooth: true, lineStyle: { color: '#2563eb' }, itemStyle: { color: '#2563eb' } },
      ],
      grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    };
    chart.setOption(option, true);
  }

  barBtn.classList.add('active');
  initChart('bar');

  barBtn.addEventListener('click', () => {
    barBtn.classList.add('active');
    lineBtn.classList.remove('active');
    initChart('bar');
  });
  lineBtn.addEventListener('click', () => {
    lineBtn.classList.add('active');
    barBtn.classList.remove('active');
    initChart('line');
  });

  w.disposed.connect(() => {
    chart?.dispose();
  });

  // ECharts necesita un tamaño explícito; actualizar al mostrar
  const observer = new ResizeObserver(() => chart?.resize());
  observer.observe(chartDiv);

  return w;
}
