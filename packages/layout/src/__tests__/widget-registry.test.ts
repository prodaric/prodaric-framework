/**
 * Tests unitarios del registro de widgets.
 * Usamos un mock en lugar de Lumino Widget para no depender de DOM/DragEvent en Jest.
 */
import type { Widget } from '@lumino/widgets';
import { WidgetRegistry } from '../widget-registry';

/** Mock de widget (solo id) para tests. */
function mockWidget(id: string): Widget {
  return { id } as unknown as Widget;
}

describe('WidgetRegistry', () => {
  it('registra un widget y lo crea por id', () => {
    const registry = new WidgetRegistry();
    registry.register('test-1', 'Test Widget', () => mockWidget('test-widget-1'));

    expect(registry.getIds()).toEqual(['test-1']);
    expect(registry.has('test-1')).toBe(true);
    expect(registry.getDescriptor('test-1')).toEqual({ id: 'test-1', label: 'Test Widget' });

    const instance = registry.createWidget('test-1');
    expect(instance).toBeDefined();
    expect(instance?.id).toBe('test-widget-1');
  });

  it('createWidget devuelve undefined para id no registrado', () => {
    const registry = new WidgetRegistry();
    expect(registry.createWidget('no-existe')).toBeUndefined();
    expect(registry.has('no-existe')).toBe(false);
  });

  it('soporta varios registros', () => {
    const registry = new WidgetRegistry();
    registry.register('a', 'Label A', () => mockWidget('w-a'));
    registry.register('b', 'Label B', () => mockWidget('w-b'));
    expect(registry.getIds()).toHaveLength(2);
    expect(registry.getIds().sort()).toEqual(['a', 'b']);
    expect(registry.createWidget('b')?.id).toBe('w-b');
  });
});
