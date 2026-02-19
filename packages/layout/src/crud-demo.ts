/**
 * Demo CRUD con Lumino — hola mundo: lista de ítems, añadir y eliminar.
 * Solo de ejemplo para mostrar el stack Lumino.
 */

import { Widget, PanelLayout } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

const ITEM_CLASS = 'crud-demo-item';
const LIST_CLASS = 'crud-demo-list';

/** Crea y devuelve un widget Lumino con un CRUD mínimo (lista + añadir + eliminar). */
export function createCrudDemoWidget(): Widget {
  const items: string[] = ['Primer ítem', 'Segundo ítem'];
  const root = new Widget();
  root.id = `crud-demo-${UUID.uuid4()}`;
  root.addClass('crud-demo-root');
  root.title.label = 'CRUD Ejemplo (Lumino)';

  const layout = new PanelLayout();
  root.layout = layout;

  const listContainer = new Widget();
  listContainer.addClass(LIST_CLASS);

  const topBar = new Widget();
  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.placeholder = 'Nuevo ítem…';
  const addBtnEl = document.createElement('button');
  addBtnEl.type = 'button';
  addBtnEl.textContent = 'Añadir';
  topBar.node.appendChild(inputEl);
  topBar.node.appendChild(addBtnEl);

  function renderList(): void {
    listContainer.node.innerHTML = '';
    listContainer.node.setAttribute('role', 'list');
    for (let i = 0; i < items.length; i++) {
      const row = document.createElement('div');
      row.className = ITEM_CLASS;
      row.setAttribute('role', 'listitem');
      const label = document.createElement('span');
      label.textContent = items[i];
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.textContent = 'Eliminar';
      const idx = i;
      delBtn.addEventListener('click', () => {
        items.splice(idx, 1);
        renderList();
      });
      row.appendChild(label);
      row.appendChild(delBtn);
      listContainer.node.appendChild(row);
    }
  }

  addBtnEl.addEventListener('click', () => {
    const value = (inputEl.value || '').trim();
    if (value) {
      items.push(value);
      inputEl.value = '';
      renderList();
    }
  });

  renderList();

  layout.addWidget(topBar);
  layout.addWidget(listContainer);

  return root;
}

/** Monta el widget CRUD en un contenedor DOM y lo hace visible. */
export function mountCrudDemo(container: HTMLElement): () => void {
  const w = createCrudDemoWidget();
  Widget.attach(w, container);
  w.disposed.connect(() => {});
  return () => {
    w.dispose();
  };
}
