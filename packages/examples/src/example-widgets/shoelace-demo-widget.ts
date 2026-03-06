/**
 * Widget de ejemplo: Shoelace (sl-*).
 * Demuestra capacidades: botones, card, input, checkbox, badge, textarea, select.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

export function createShoelaceDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-examples-shoelace-${UUID.uuid4()}`;
  w.title.label = 'Ejemplo Shoelace';
  w.title.closable = true;
  w.addClass('prodaric-examples-shoelace');

  const root = document.createElement('div');
  root.className = 'prodaric-examples-root';

  const title = document.createElement('h2');
  title.textContent = 'Shoelace — Web Components (sl-*)';
  root.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'prodaric-examples-desc';
  desc.textContent =
    'Librería de componentes con tema claro/oscuro, accesibilidad y personalización CSS. Aquí: botones, tarjeta, inputs, checkbox, badge, textarea y select. Sin dependencia de React ni Tailwind.';
  root.appendChild(desc);

  const card = document.createElement('sl-card');
  (card as HTMLElement).className = 'prodaric-examples-card';
  const cardSlot = document.createElement('div');
  cardSlot.setAttribute('slot', 'header');
  cardSlot.style.display = 'flex';
  cardSlot.style.alignItems = 'center';
  cardSlot.style.gap = '0.5rem';
  cardSlot.appendChild(document.createTextNode('Tarjeta Shoelace '));
  const badge = document.createElement('sl-badge');
  badge.setAttribute('variant', 'primary');
  badge.textContent = 'Nuevo';
  cardSlot.appendChild(badge);
  card.appendChild(cardSlot);
  const cardBody = document.createElement('p');
  cardBody.textContent = 'Contenido de la tarjeta. Incluye badge; debajo hay botones, campos y controles.';
  card.appendChild(cardBody);

  const btnPrimary = document.createElement('sl-button');
  btnPrimary.setAttribute('variant', 'primary');
  btnPrimary.textContent = 'Principal';
  const btnDefault = document.createElement('sl-button');
  btnDefault.textContent = 'Por defecto';
  const btnOutline = document.createElement('sl-button');
  btnOutline.setAttribute('variant', 'default');
  btnOutline.setAttribute('outline', 'true');
  btnOutline.textContent = 'Outline';
  const btnDanger = document.createElement('sl-button');
  btnDanger.setAttribute('variant', 'danger');
  btnDanger.textContent = 'Peligro';

  const inputWrap = document.createElement('div');
  inputWrap.className = 'prodaric-examples-row';
  const slInput = document.createElement('sl-input');
  slInput.setAttribute('label', 'Campo de texto');
  slInput.setAttribute('placeholder', 'Escribe aquí…');
  slInput.setAttribute('clearable', 'true');
  inputWrap.appendChild(slInput);

  const textareaWrap = document.createElement('div');
  textareaWrap.className = 'prodaric-examples-row';
  const slTextarea = document.createElement('sl-textarea');
  slTextarea.setAttribute('label', 'Área de texto');
  slTextarea.setAttribute('placeholder', 'Varias líneas…');
  slTextarea.setAttribute('rows', '3');
  textareaWrap.appendChild(slTextarea);

  const selectWrap = document.createElement('div');
  selectWrap.className = 'prodaric-examples-row';
  const slSelect = document.createElement('sl-select');
  slSelect.setAttribute('label', 'Selección');
  const opt1 = document.createElement('sl-option');
  opt1.setAttribute('value', 'a');
  opt1.textContent = 'Opción A';
  const opt2 = document.createElement('sl-option');
  opt2.setAttribute('value', 'b');
  opt2.textContent = 'Opción B';
  slSelect.appendChild(opt1);
  slSelect.appendChild(opt2);
  selectWrap.appendChild(slSelect);

  const checkWrap = document.createElement('div');
  checkWrap.className = 'prodaric-examples-row';
  const slCheck = document.createElement('sl-checkbox');
  slCheck.textContent = ' Aceptar términos (Shoelace checkbox)';
  checkWrap.appendChild(slCheck);

  const style = document.createElement('style');
  style.textContent = `
    .prodaric-examples-root { padding: 1rem; font-family: inherit; }
    .prodaric-examples-root h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-examples-desc { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; max-width: 42rem; }
    .prodaric-examples-card { margin-bottom: 1rem; max-width: 28rem; }
    .prodaric-examples-card [slot="header"] { display: flex; align-items: center; gap: 0.5rem; }
    .prodaric-examples-row { margin: 0.5rem 0; }
    .prodaric-examples-root sl-button { margin-right: 0.5rem; margin-bottom: 0.25rem; }
    .prodaric-examples-root sl-input, .prodaric-examples-root sl-textarea, .prodaric-examples-root sl-select { max-width: 20rem; display: block; }
  `;
  root.appendChild(style);
  root.appendChild(card);
  root.appendChild(btnPrimary);
  root.appendChild(btnDefault);
  root.appendChild(btnOutline);
  root.appendChild(btnDanger);
  root.appendChild(inputWrap);
  root.appendChild(textareaWrap);
  root.appendChild(selectWrap);
  root.appendChild(checkWrap);

  w.node.appendChild(root);
  return w;
}
