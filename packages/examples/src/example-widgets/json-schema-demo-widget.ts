/**
 * Widget de ejemplo: validación con JSON Schema (ajv).
 * El usuario escribe JSON y un esquema; se valida y se muestran errores.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';
import Ajv, { type JSONSchemaType } from 'ajv';

const SAMPLE_SCHEMA: JSONSchemaType<{ nombre: string; edad: number; email?: string }> = {
  type: 'object',
  properties: {
    nombre: { type: 'string', minLength: 1 },
    edad: { type: 'number', minimum: 0, maximum: 150 },
    email: { type: 'string', nullable: true },
  },
  required: ['nombre', 'edad'],
  additionalProperties: false,
};

const SAMPLE_DATA = `{
  "nombre": "María",
  "edad": 28,
  "email": "maria@ejemplo.com"
}`;

export function createJsonSchemaDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-json-schema-demo-${UUID.uuid4()}`;
  w.title.label = 'JSON Schema (ejemplo)';
  w.title.closable = true;
  w.addClass('prodaric-demo-json-schema');

  const root = document.createElement('div');
  root.className = 'prodaric-json-schema-root';

  const header = document.createElement('div');
  header.className = 'prodaric-json-schema-header';
  header.innerHTML = `
    <h2>Validación JSON Schema (ajv)</h2>
    <p>Capacidad del framework: validar datos contra esquemas JSON Schema. Elige un esquema de ejemplo, edita el JSON y pulsa "Validar". Errores detallados por ruta.</p>
  `;

  const container = document.createElement('div');
  container.className = 'prodaric-json-schema-split';
  container.innerHTML = `
    <div class="prodaric-json-schema-panel">
      <label for="prodaric-json-input"><strong>JSON</strong></label>
      <textarea id="prodaric-json-input" class="prodaric-json-schema-textarea" rows="12" spellcheck="false">${SAMPLE_DATA.replace(/</g, '&lt;')}</textarea>
      <button type="button" class="prodaric-json-schema-btn" id="prodaric-validate-btn">Validar</button>
    </div>
    <div class="prodaric-json-schema-panel">
      <strong>Resultado</strong>
      <div id="prodaric-json-schema-result" class="prodaric-json-schema-result" aria-live="polite"></div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .prodaric-json-schema-root { padding: 1rem; font-family: inherit; }
    .prodaric-json-schema-header h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-json-schema-header p { margin: 0 0 1rem 0; color: var(--theia-descriptionForeground, #6b7280); font-size: 0.875rem; }
    .prodaric-json-schema-split { display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; }
    .prodaric-json-schema-panel { flex: 1; min-width: 220px; display: flex; flex-direction: column; gap: 0.5rem; }
    .prodaric-json-schema-textarea { width: 100%; font-family: var(--theia-editorFontFamily, monospace); font-size: 0.875rem; padding: 0.5rem; border: 1px solid var(--theia-inputBorder, #ccc); border-radius: 6px; resize: vertical; }
    .prodaric-json-schema-btn { padding: 0.5rem 1rem; cursor: pointer; border-radius: 6px; border: 1px solid var(--theia-buttonBorder, #0d9488); background: var(--theia-buttonBackground, #0d9488); color: var(--theia-buttonForeground, #fff); font-size: 0.875rem; align-self: flex-start; }
    .prodaric-json-schema-btn:hover { opacity: 0.9; }
    .prodaric-json-schema-result { padding: 0.75rem; border-radius: 6px; border: 1px solid var(--theia-panelBorder, #e2e8f0); min-height: 4rem; font-size: 0.875rem; white-space: pre-wrap; }
    .prodaric-json-schema-result.valid { background: var(--theia-editorInfoBackground, #e0f2fe); color: var(--theia-editorInfoForeground, #0369a1); }
    .prodaric-json-schema-result.invalid { background: var(--theia-editorErrorBackground, #fee2e2); color: var(--theia-editorErrorForeground, #b91c1c); }
  `;

  const textarea = container.querySelector('#prodaric-json-input') as HTMLTextAreaElement;
  const resultEl = container.querySelector('#prodaric-json-schema-result') as HTMLElement;
  const btn = container.querySelector('#prodaric-validate-btn') as HTMLButtonElement;

  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(SAMPLE_SCHEMA);

  function doValidate(): void {
    let data: unknown;
    try {
      data = JSON.parse(textarea.value);
    } catch (e) {
      resultEl.textContent = `JSON inválido: ${(e as Error).message}`;
      resultEl.className = 'prodaric-json-schema-result invalid';
      return;
    }
    const valid = validate(data);
    if (valid) {
      resultEl.textContent = '✓ Válido según el esquema.';
      resultEl.className = 'prodaric-json-schema-result valid';
    } else {
      const lines = (validate.errors || []).map((err) => `${err.instancePath || '/'} ${err.message}`).join('\n');
      resultEl.textContent = `✗ Errores:\n${lines}`;
      resultEl.className = 'prodaric-json-schema-result invalid';
    }
  }

  btn.addEventListener('click', doValidate);
  doValidate();

  root.appendChild(style);
  root.appendChild(header);
  root.appendChild(container);
  w.node.appendChild(root);
  return w;
}
