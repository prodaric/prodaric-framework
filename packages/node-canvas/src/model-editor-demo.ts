/**
 * Demo editor de modelos de datos con Rete.js v2 — solo de ejemplo.
 * Nodos: Entidad (salida) y Campo (entrada); se pueden conectar para modelar datos.
 */

import { NodeEditor, GetSchemes, ClassicPreset } from 'rete';
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin';
import type { ReactArea2D } from 'rete-react-plugin';
import { ReactPlugin, Presets } from 'rete-react-plugin';
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { createRoot } from 'react-dom/client';

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = ReactArea2D<Schemes>;

const SOCKET = 'data';

/**
 * Monta un editor Rete.js mínimo (Entidad + Campo) en el contenedor dado.
 * Devuelve una función para desmontar.
 */
export async function mountModelEditorDemo(container: HTMLElement): Promise<() => void> {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();

  render.addPreset(Presets.classic.setup());
  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(render);
  area.use(connection);

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });
  AreaExtensions.simpleNodesOrder(area);

  const socket = new ClassicPreset.Socket(SOCKET);

  const entidad = new ClassicPreset.Node('Entidad');
  entidad.addOutput('out', new ClassicPreset.Output(socket));
  entidad.addControl('name', new ClassicPreset.InputControl('text', { initial: 'Usuario' }));

  const campo1 = new ClassicPreset.Node('Campo');
  campo1.addInput('in', new ClassicPreset.Input(socket));
  campo1.addControl('name', new ClassicPreset.InputControl('text', { initial: 'id' }));

  const campo2 = new ClassicPreset.Node('Campo');
  campo2.addInput('in', new ClassicPreset.Input(socket));
  campo2.addControl('name', new ClassicPreset.InputControl('text', { initial: 'nombre' }));

  await editor.addNode(entidad);
  await editor.addNode(campo1);
  await editor.addNode(campo2);

  await area.translate(entidad.id, { x: 0, y: 0 });
  await area.translate(campo1.id, { x: 280, y: 0 });
  await area.translate(campo2.id, { x: 280, y: 120 });

  await editor.addConnection(new ClassicPreset.Connection(entidad, 'out', campo1, 'in'));
  await editor.addConnection(new ClassicPreset.Connection(entidad, 'out', campo2, 'in'));

  AreaExtensions.zoomAt(area, editor.getNodes());

  return () => {
    area.destroy();
  };
}
