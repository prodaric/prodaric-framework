/**
 * Widget de ejemplo: FAST (fast-*), Microsoft.
 * Demuestra botón, card, text-field, checkbox y capacidades del design system.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

export function createFastDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-examples-fast-${UUID.uuid4()}`;
  w.title.label = 'Ejemplo FAST';
  w.title.closable = true;
  w.addClass('prodaric-examples-fast');

  const root = document.createElement('div');
  root.className = 'prodaric-examples-root';

  const title = document.createElement('h2');
  title.textContent = 'FAST — Microsoft (fast-*)';
  root.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'prodaric-examples-desc';
  desc.textContent =
    'Design system y Web Components de Microsoft. Accesibilidad, theming por design tokens y composición. Aquí: botones (accent/neutral), tarjeta, text-field y checkbox.';
  root.appendChild(desc);

  const card = document.createElement('fast-card');
  (card as HTMLElement).innerHTML =
    '<strong>Tarjeta FAST</strong><p>Contenido del design system. Botones debajo con variantes accent y neutral.</p>';

  const btn = document.createElement('fast-button');
  btn.setAttribute('appearance', 'accent');
  btn.textContent = 'Botón FAST (accent)';
  const btnNeutral = document.createElement('fast-button');
  btnNeutral.textContent = 'Neutral';
  const btnOutline = document.createElement('fast-button');
  btnOutline.setAttribute('appearance', 'outline');
  btnOutline.textContent = 'Outline';

  const textField = document.createElement('fast-text-field');
  textField.setAttribute('placeholder', 'Campo de texto FAST');
  (textField as HTMLElement).style.setProperty('margin-right', '0.5rem');
  (textField as HTMLElement).style.setProperty('display', 'block');
  (textField as HTMLElement).style.setProperty('margin-top', '0.5rem');

  const checkbox = document.createElement('fast-checkbox');
  checkbox.textContent = ' Checkbox FAST (design tokens)';

  const style = document.createElement('style');
  style.textContent = `
    .prodaric-examples-root { padding: 1rem; font-family: inherit; }
    .prodaric-examples-root h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-examples-desc { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; max-width: 42rem; }
    .prodaric-examples-root fast-card { display: block; margin-bottom: 1rem; max-width: 24rem; padding: 1rem; border: 1px solid var(--neutral-stroke-rest, #ccc); border-radius: 4px; }
    .prodaric-examples-root fast-button { margin-right: 0.5rem; margin-bottom: 0.25rem; }
  `;
  root.appendChild(style);
  root.appendChild(card);
  root.appendChild(btn);
  root.appendChild(btnNeutral);
  root.appendChild(btnOutline);
  root.appendChild(document.createElement('br'));
  root.appendChild(textField);
  root.appendChild(checkbox);

  w.node.appendChild(root);
  return w;
}
