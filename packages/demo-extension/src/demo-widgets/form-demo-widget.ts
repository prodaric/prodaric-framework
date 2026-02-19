/**
 * Widget de ejemplo: formularios.
 * Formulario de ejemplo con tipos de campo (texto, fecha, select, checkbox) al estilo LayoutSchema.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

export function createFormDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-form-demo-${UUID.uuid4()}`;
  w.title.label = 'Formularios (ejemplo)';
  w.title.closable = true;
  w.addClass('prodaric-demo-form');

  const root = document.createElement('div');
  root.className = 'prodaric-demo-form-root';

  const header = document.createElement('div');
  header.className = 'prodaric-demo-form-header';
  header.innerHTML = '<h2>Formulario de ejemplo</h2><p>Campos típicos que puedes representar con LayoutSchema y el Form Engine de Prodaric.</p>';

  const form = document.createElement('form');
  form.className = 'prodaric-demo-form-fields';
  form.innerHTML = `
    <div class="field">
      <label for="demo-nombre">Nombre <span class="required">*</span></label>
      <input id="demo-nombre" name="nombre" type="text" required placeholder="Nombre completo">
    </div>
    <div class="field">
      <label for="demo-email">Email <span class="required">*</span></label>
      <input id="demo-email" name="email" type="email" required placeholder="correo@ejemplo.com">
    </div>
    <div class="field">
      <label for="demo-fecha">Fecha</label>
      <input id="demo-fecha" name="fecha" type="date">
    </div>
    <div class="field">
      <label for="demo-select">Tipo</label>
      <select id="demo-select" name="tipo">
        <option value="">Seleccione...</option>
        <option value="a">Opción A</option>
        <option value="b">Opción B</option>
      </select>
    </div>
    <div class="field field-checkbox">
      <label><input name="activo" type="checkbox" checked> Activo</label>
    </div>
    <div class="form-actions">
      <button type="submit">Guardar (simulado)</button>
      <button type="button" class="secondary">Cancelar</button>
    </div>
  `;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const obj: Record<string, string | boolean> = {};
    data.forEach((value, key) => { obj[key] = value as string; });
    const check = form.querySelector<HTMLInputElement>('input[name="activo"]');
    if (check) obj.activo = check.checked;
    alert('Datos del formulario (simulado): ' + JSON.stringify(obj, null, 2));
  });
  form.querySelector('button.secondary')?.addEventListener('click', () => form.reset());

  const styles = document.createElement('style');
  styles.textContent = `
    .prodaric-demo-form-root { padding: 1rem; font-family: inherit; max-width: 32rem; }
    .prodaric-demo-form-header h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-demo-form-header p { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .prodaric-demo-form-fields .field { margin-bottom: 1rem; }
    .prodaric-demo-form-fields label { display: block; margin-bottom: 0.25rem; font-weight: 500; font-size: 0.875rem; }
    .prodaric-demo-form-fields .required { color: var(--prodaric-error, #dc2626); }
    .prodaric-demo-form-fields input[type="text"],
    .prodaric-demo-form-fields input[type="email"],
    .prodaric-demo-form-fields input[type="date"],
    .prodaric-demo-form-fields select { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 6px; background: var(--prodaric-bg, #fff); color: var(--prodaric-text, #0f172a); }
    .prodaric-demo-form-fields .field-checkbox label { display: flex; align-items: center; gap: 0.5rem; }
    .prodaric-demo-form-fields .form-actions { margin-top: 1.25rem; display: flex; gap: 0.5rem; }
    .prodaric-demo-form-fields .form-actions button { padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }
    .prodaric-demo-form-fields .form-actions button[type="submit"] { background: var(--prodaric-color-primary, #2563eb); color: #fff; border: none; }
    .prodaric-demo-form-fields .form-actions button.secondary { background: var(--prodaric-bg-elevated, #f8fafc); border: 1px solid var(--prodaric-border, #e2e8f0); }
  `;
  root.appendChild(styles);
  root.appendChild(header);
  root.appendChild(form);
  w.node.appendChild(root);
  return w;
}
