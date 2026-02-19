/**
 * Widget de ejemplo: Todo list.
 * Lista de tareas con añadir, marcar completado y eliminar. Muestra estado e interacción.
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';

interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

export function createTodoDemoWidget(): Widget {
  const w = new Widget();
  w.id = `prodaric-todo-demo-${UUID.uuid4()}`;
  w.title.label = 'Todo list (ejemplo)';
  w.title.closable = true;
  w.addClass('prodaric-demo-todo');

  const items: TodoItem[] = [
    { id: UUID.uuid4(), text: 'Revisar documentación', done: false },
    { id: UUID.uuid4(), text: 'Probar formularios del framework', done: true },
    { id: UUID.uuid4(), text: 'Abrir ejemplo de gráficos', done: false },
  ];

  const root = document.createElement('div');
  root.className = 'prodaric-todo-root';

  const header = document.createElement('div');
  header.className = 'prodaric-todo-header';
  header.innerHTML = '<h2>Todo list</h2><p>Añade tareas, márcalas hechas o elimínalas. Ejemplo de estado e interacción en un panel.</p>';

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

  const list = document.createElement('ul');
  list.className = 'prodaric-todo-list';
  list.setAttribute('role', 'list');

  function renderList(): void {
    list.innerHTML = '';
    items.forEach((item) => {
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
      renderList();
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addBtn.click();
  });

  renderList();

  const styles = document.createElement('style');
  styles.textContent = `
    .prodaric-todo-root { padding: 1rem; font-family: inherit; max-width: 28rem; }
    .prodaric-todo-header h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
    .prodaric-todo-header p { margin: 0 0 1rem 0; color: var(--prodaric-text-muted, #64748b); font-size: 0.875rem; }
    .prodaric-todo-form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    .prodaric-todo-input { flex: 1; padding: 0.5rem 0.75rem; border: 1px solid var(--prodaric-border, #e2e8f0); border-radius: 6px; }
    .prodaric-todo-add { padding: 0.5rem 1rem; background: var(--prodaric-color-primary, #2563eb); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }
    .prodaric-todo-add:hover { background: var(--prodaric-color-primary-hover, #1d4ed8); }
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
  root.appendChild(list);
  w.node.appendChild(root);
  return w;
}
