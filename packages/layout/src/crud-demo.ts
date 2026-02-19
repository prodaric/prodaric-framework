/**
 * Demo CRUD con Lumino: lista de ítems con añadir, editar y eliminar.
 */

import { Widget, PanelLayout } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

const ITEM_CLASS = 'crud-demo-item';
const LIST_CLASS = 'crud-demo-list';

/** Crea y devuelve un widget Lumino con CRUD (lista + añadir + editar + eliminar). */
export function createCrudDemoWidget(): Widget {
  const items: string[] = ['Primer ítem', 'Segundo ítem'];
  const root = new Widget();
  root.id = `crud-demo-${UUID.uuid4()}`;
  root.addClass('crud-demo-root');
  root.title.label = 'CRUD Ejemplo (Lumino)';

  const layout = new PanelLayout();
  root.layout = layout;

  const style = document.createElement('style');
  style.textContent = `
    .crud-demo-root .crud-demo-list { margin: 0.5rem 0; }
    .crud-demo-item { display: flex; align-items: center; gap: 0.5rem; margin: 0.25rem 0; flex-wrap: wrap; }
    .crud-demo-item .crud-demo-item-label { flex: 1; min-width: 0; }
    .crud-demo-item button { padding: 0.25rem 0.5rem; cursor: pointer; border-radius: 4px; border: 1px solid var(--prodaric-border, #e2e8f0); background: var(--prodaric-bg-elevated, #f8fafc); font-size: 0.875rem; }
    .crud-demo-item button:hover { background: var(--prodaric-bg-hover, #e2e8f0); }
    .crud-demo-edit-input { padding: 0.25rem 0.5rem; flex: 1; min-width: 8rem; border-radius: 4px; border: 1px solid var(--prodaric-border, #e2e8f0); font-size: 0.875rem; }
  `;
  root.node.appendChild(style);

  const listContainer = new Widget();
  listContainer.addClass(LIST_CLASS);

  const topBar = new Widget();
  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.placeholder = 'Nuevo ítem…';
  inputEl.className = 'crud-demo-edit-input';
  inputEl.style.cssText = 'margin-right: 0.5rem;';
  const addBtnEl = document.createElement('button');
  addBtnEl.type = 'button';
  addBtnEl.textContent = 'Añadir';
  topBar.node.appendChild(inputEl);
  topBar.node.appendChild(addBtnEl);

  let editingIndex: number | null = null;

  function renderList(): void {
    listContainer.node.innerHTML = '';
    listContainer.node.setAttribute('role', 'list');
    for (let i = 0; i < items.length; i++) {
      const row = document.createElement('div');
      row.className = ITEM_CLASS;
      row.setAttribute('role', 'listitem');

      if (editingIndex === i) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = items[i];
        input.className = 'crud-demo-edit-input';
        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.textContent = 'Guardar';
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.textContent = 'Cancelar';
        saveBtn.addEventListener('click', () => {
          const v = input.value.trim();
          if (v) {
            items[i] = v;
            editingIndex = null;
            renderList();
          }
        });
        cancelBtn.addEventListener('click', () => {
          editingIndex = null;
          renderList();
        });
        row.appendChild(input);
        row.appendChild(saveBtn);
        row.appendChild(cancelBtn);
      } else {
        const label = document.createElement('span');
        label.className = 'crud-demo-item-label';
        label.textContent = items[i];
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.textContent = 'Editar';
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.textContent = 'Eliminar';
        const idx = i;
        editBtn.addEventListener('click', () => {
          editingIndex = idx;
          renderList();
        });
        delBtn.addEventListener('click', () => {
          items.splice(idx, 1);
          if (editingIndex === idx) editingIndex = null;
          else if (editingIndex !== null && editingIndex > idx) editingIndex--;
          renderList();
        });
        row.appendChild(label);
        row.appendChild(editBtn);
        row.appendChild(delBtn);
      }
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

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addBtnEl.click();
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
