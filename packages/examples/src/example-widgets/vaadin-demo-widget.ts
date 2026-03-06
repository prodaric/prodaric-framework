/**
 * Widget de ejemplo: Vaadin (vaadin-*).
 * Demuestra botón, text-field, checkbox, card y tema Lumo.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

export function createVaadinDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-examples-vaadin-${UUID.uuid4()}`;
  w.title.label = 'Ejemplo Vaadin';
  w.title.closable = true;
  w.addClass('prodaric-examples-vaadin');

  const root = document.createElement('div');
  root.className = 'prodaric-examples-root';

  const title = document.createElement('h2');
  title.textContent = 'Vaadin — Web Components (vaadin-*)';
  root.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'prodaric-examples-desc';
  desc.textContent =
    'Componentes Vaadin con tema Lumo. Integrables en cualquier stack. Aquí: botón (primary/secundario), text-field, checkbox y card. Más componentes en @vaadin/*.';
  root.appendChild(desc);

  const card = document.createElement('vaadin-card');
  (card as HTMLElement).style.setProperty('max-width', '24rem');
  (card as HTMLElement).style.setProperty('margin-bottom', '1rem');
  const cardTitle = document.createElement('strong');
  cardTitle.textContent = 'Tarjeta Vaadin';
  const cardP = document.createElement('p');
  cardP.textContent = 'Contenido del bloque (vaadin-card). Tema Lumo aplicado.';
  card.appendChild(cardTitle);
  card.appendChild(cardP);

  const btn = document.createElement('vaadin-button');
  btn.setAttribute('theme', 'primary');
  btn.textContent = 'Botón Vaadin (primary)';
  const btnSec = document.createElement('vaadin-button');
  btnSec.textContent = 'Secundario';

  const textField = document.createElement('vaadin-text-field');
  textField.setAttribute('label', 'Campo de texto');
  textField.setAttribute('placeholder', 'Vaadin text field');
  (textField as HTMLElement).style.setProperty('display', 'block');
  (textField as HTMLElement).style.setProperty('margin', '0.5rem 0');

  const checkbox = document.createElement('vaadin-checkbox');
  checkbox.textContent = ' Checkbox Vaadin';

  const style = document.createElement('style');
  style.textContent = `
    .prodaric-examples-root { padding: 1rem; font-family: inherit; }
    .prodaric-examples-root h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-examples-desc { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; max-width: 42rem; }
    .prodaric-examples-root vaadin-button { margin-right: 0.5rem; }
  `;
  root.appendChild(style);
  root.appendChild(card);
  root.appendChild(btn);
  root.appendChild(btnSec);
  root.appendChild(textField);
  root.appendChild(checkbox);

  w.node.appendChild(root);
  return w;
}
