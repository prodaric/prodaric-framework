/**
 * Widget Lumino que envuelve el editor Rete.js v2.
 * Permite usar el canvas de nodos dentro del docking (paneles, pestañas).
 */

import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';
import { mountModelEditorDemo } from './model-editor-demo';

const WIDGET_CLASS = 'prodaric-rete-canvas-widget';

/**
 * Widget que monta el editor Rete.js en onAfterAttach y lo desmonta en onBeforeDetach.
 */
class ReteCanvasWidget extends Widget {
  private _unmount: (() => void) | null = null;

  constructor() {
    super();
    this.id = `rete-canvas-${UUID.uuid4()}`;
    this.title.label = 'Rete.js Modelo';
    this.title.closable = true;
    this.addClass(WIDGET_CLASS);
    this.node.style.minHeight = '300px';
    this.node.style.width = '100%';
  }

  protected onAfterAttach(): void {
    mountModelEditorDemo(this.node)
      .then((fn) => {
        this._unmount = fn;
      })
      .catch((err) => {
        console.error('[prodaric/node-canvas] Error mounting Rete editor:', err);
      });
  }

  protected onBeforeDetach(): void {
    if (this._unmount) {
      this._unmount();
      this._unmount = null;
    }
  }

  dispose(): void {
    if (this._unmount) {
      this._unmount();
      this._unmount = null;
    }
    super.dispose();
  }
}

/**
 * Crea un widget Lumino que muestra el editor de modelos Rete.js (Entidad + Campo).
 * Se puede añadir al dock como cualquier otro panel (p. ej. desde el menú Prodaric).
 */
export function createReteCanvasWidget(): Widget {
  return new ReteCanvasWidget();
}
