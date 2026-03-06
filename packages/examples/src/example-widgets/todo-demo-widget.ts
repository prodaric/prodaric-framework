/**
 * Widget de ejemplo: Todo list.
 * Demuestra estado local, filtros (All/Active/Done), contador y "Clear completed".
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

type Filter = 'all' | 'active' | 'done';

export function createTodoDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-todo-demo-${UUID.uuid4()}`;
  w.title.label = 'Todo list (ejemplo)';
  w.title.closable = true;
  w.addClass('prodaric-demo-todo');

  const items: TodoItem[] = [
    { id: UUID.uuid4(), text: 'Revisar documentación del framework', done: false },
    { id: UUID.uuid4(), text: 'Probar formularios (JSON Schema)', done: true },
    { id: UUID.uuid4(), text: 'Abrir ejemplo de gráficos ECharts', done: false },
    { id: UUID.uuid4(), text: 'Probar reportes y descarga PDF', done: false },
  ];

  let currentFilter: Filter = 'all';

  const root = document.createElement('div');
  root.className = 'prodaric-todo-root';

  const header = document.createElement('div');
  header.className = 'prodaric-todo-header';
  header.innerHTML = `
    <h2>Todo list</h2>
    <p>Demuestra estado local en un panel: añadir, marcar completado, eliminar, filtrar (All/Active/Done) y limpiar completadas. Sin backend — todo en memoria.</p>
  `;

  const form = document.createElement('div');
  form.className = 'prodaric-todo-form';
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Nueva tarea…';
  input.className = 'prodaric-todo-input';
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = 'Añadir';
  addBtn.className = 'prodaric-todo-add';
  form.appendChild(input);
  form.appendChild(addBtn);

  const toolbar = document.createElement('div');
  toolbar.className = 'prodaric-todo-toolbar';
  const countEl = document.createElement('span');
  countEl.className = 'prodaric-todo-count';
  const filterAll = document.createElement('button');
  filterAll.type = 'button';
  filterAll.textContent = 'Todas';
  filterAll.className = 'filter-btn active';
  filterAll.dataset.filter = 'all';
  const filterActive = document.createElement('button');
  filterActive.type = 'button';
  filterActive.textContent = 'Pendientes';
  filterActive.className = 'filter-btn';
  filterActive.dataset.filter = 'active';
  const filterDone = document.createElement('button');
  filterDone.type = 'button';
  filterDone.textContent = 'Hechas';
  filterDone.className = 'filter-btn';
  filterDone.dataset.filter = 'done';
  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.textContent = 'Borrar hechas';
  clearBtn.className = 'prodaric-todo-clear';
  toolbar.appendChild(countEl);
  toolbar.appendChild(filterAll);
  toolbar.appendChild(filterActive);
  toolbar.appendChild(filterDone);
  toolbar.appendChild(clearBtn);

  const list = document.createElement('ul');
  list.className = 'prodaric-todo-list';
  list.setAttribute('role', 'list');

  function getFiltered(): TodoItem[] {
    if (currentFilter === 'active') return items.filter((i) => !i.done);
    if (currentFilter === 'done') return items.filter((i) => i.done);
    return items;
  }

  function updateCount(): void {
    const active = items.filter((i) => !i.done).length;
    const done = items.filter((i) => i.done).length;
    countEl.textContent = `${active} pendiente(s), ${done} hecha(s)`;
  }

  function renderList(): void {
    list.innerHTML = '';
    const filtered = getFiltered();
    filtered.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'prodaric-todo-item' + (item.done ? ' is-done' : '');
      li.setAttribute('role', 'listitem');
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = item.done;
      check.setAttribute('aria-label', 'Marcar como ' + (item.done ? 'pendiente' : 'hecha'));
      check.addEventListener('change', () => {
        item.done = check.checked;
        li.classList.toggle('is-done', item.done);
        updateCount();
        renderList();
      });
      const label = document.createElement('span');
      label.className = 'prodaric-todo-label';
      label.textContent = item.text;
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.textContent = 'Eliminar';
      delBtn.className = 'prodaric-todo-del';
      delBtn.addEventListener('click', () => {
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx !== -1) {
          items.splice(idx, 1);
          updateCount();
          renderList();
        }
      });
      li.appendChild(check);
      li.appendChild(label);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      items.push({ id: UUID.uuid4(), text, done: false });
      input.value = '';
      updateCount();
      renderList();
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addBtn.click();
  });

  [filterAll, filterActive, filterDone].forEach((btn) => {
    btn.addEventListener('click', () => {
      currentFilter = (btn.dataset.filter as Filter) || 'all';
      toolbar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderList();
    });
  });

  clearBtn.addEventListener('click', () => {
    const toRemove = items.filter((i) => i.done);
    toRemove.forEach((i) => {
      const idx = items.indexOf(i);
      if (idx !== -1) items.splice(idx, 1);
    });
    updateCount();
    renderList();
  });

  updateCount();
  renderList();

  const styles = document.createElement('style');
  styles.textContent = `
    .prodaric-todo-root { padding: 1rem; font-family: inherit; max-width: 32rem; }
    .prodaric-todo-header h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-todo-header p { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .prodaric-todo-form { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
    .prodaric-todo-input { flex: 1; padding: 0.5rem 0.75rem; border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 6px; }
    .prodaric-todo-add { padding: 0.5rem 1rem; background: var(--prodaric-color-primary, #2563eb); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }
    .prodaric-todo-add:hover { background: var(--prodaric-color-primary-hover, #1d4ed8); }
    .prodaric-todo-toolbar { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
    .prodaric-todo-count { font-size: 0.8125rem; color: var(--prodaric-text-muted, #64748b); margin-right: 0.5rem; }
    .prodaric-todo-toolbar .filter-btn { padding: 0.25rem 0.5rem; font-size: 0.8125rem; border-radius: 4px; border: 1px solid var(--prodaric-border, #e2e8f0); background: var(--prodaric-bg-elevated, #f8fafc); cursor: pointer; }
    .prodaric-todo-toolbar .filter-btn.active { background: var(--prodaric-color-primary, #2563eb); color: #fff; border-color: transparent; }
    .prodaric-todo-clear { padding: 0.25rem 0.5rem; font-size: 0.8125rem; border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 4px; background: transparent; cursor: pointer; color: var(--prodaric-text-muted, #64748b); }
    .prodaric-todo-clear:hover { color: var(--prodaric-error, #dc2626); border-color: var(--prodaric-error, #dc2626); }
    .prodaric-todo-list { list-style: none; margin: 0; padding: 0; }
    .prodaric-todo-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; border-bottom: 1px solid var(--prodaric-border, #e2e8f0); }
    .prodaric-todo-item.is-done .prodaric-todo-label { text-decoration: line-through; color: var(--prodaric-text-muted, #64748b); }
    .prodaric-todo-label { flex: 1; }
    .prodaric-todo-del { padding: 0.25rem 0.5rem; font-size: 0.75rem; background: transparent; border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 4px; cursor: pointer; color: var(--prodaric-text-muted, #64748b); }
    .prodaric-todo-del:hover { border-color: var(--prodaric-error, #dc2626); color: var(--prodaric-error, #dc2626); }
  `;

  root.appendChild(styles);
  root.appendChild(header);
  root.appendChild(form);
  root.appendChild(toolbar);
  root.appendChild(list);
  w.node.appendChild(root);
  return w;
}
