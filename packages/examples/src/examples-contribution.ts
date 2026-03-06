/**
 * Contribución de menú y comandos para todos los ejemplos Prodaric.
 * Framework: Dashboard, Todo, Reportes, Formularios, CRUD, Gráficos, Docking, Rete.js, JSON Schema, Acerca.
 * Web Components: Shoelace, FAST, Vaadin.
 */

import { injectable, inject } from 'inversify';
import { Widget } from '@lumino/widgets';
import { UUID } from '@lumino/coreutils';
import {
  CommandContribution,
  CommandRegistry,
  MenuContribution,
  MenuModelRegistry,
} from '@theia/core/lib/common';
import { MAIN_MENU_BAR } from '@theia/core/lib/common/menu/menu-types';
import { ApplicationShell } from '@theia/core/lib/browser/shell/application-shell';
import { createCrudDemoWidget, createDockPanel, addWidgetToDock } from '@prodaric/layout';
import { createReteCanvasWidget } from '@prodaric/node-canvas';
import { ExampleCommands, EXAMPLES_MENU_PATH } from './example-commands';
import { createDashboardDemoWidget } from './example-widgets/dashboard-demo-widget';
import { createTodoDemoWidget } from './example-widgets/todo-demo-widget';
import { createReportDemoWidget } from './example-widgets/report-demo-widget';
import { createFormDemoWidget } from './example-widgets/form-demo-widget';
import { createChartDemoWidget } from './example-widgets/chart-demo-widget';
import { createJsonSchemaDemoWidget } from './example-widgets/json-schema-demo-widget';
import { createShoelaceDemoWidget } from './example-widgets/shoelace-demo-widget';
import { createFastDemoWidget } from './example-widgets/fast-demo-widget';
import { createVaadinDemoWidget } from './example-widgets/vaadin-demo-widget';
import { createShowcaseDemoWidget } from './example-widgets/showcase-demo-widget';

@injectable()
export class ExamplesContribution implements CommandContribution, MenuContribution {
  constructor(
    @inject(ApplicationShell) private readonly shell: ApplicationShell
  ) {}

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(
      { id: ExampleCommands.OPEN_SHOWCASE_DEMO, label: 'Showcase — Todo lo que puedes usar' },
      { execute: () => this.openShowcaseDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_DASHBOARD_DEMO, label: 'Abrir ejemplo Dashboard' },
      { execute: () => this.openDashboardDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_TODO_DEMO, label: 'Abrir ejemplo Todo list' },
      { execute: () => this.openTodoDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_REPORT_DEMO, label: 'Abrir ejemplo de reportes' },
      { execute: () => this.openReportDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_FORM_DEMO, label: 'Abrir ejemplo de formularios' },
      { execute: () => this.openFormDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_CRUD_DEMO, label: 'Abrir ejemplo CRUD' },
      { execute: () => this.openCrudDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_CHART_DEMO, label: 'Abrir ejemplo de gráficos' },
      { execute: () => this.openChartDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_DOCK_DEMO, label: 'Abrir ejemplo de docking' },
      { execute: () => this.openDockDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_RETE_DEMO, label: 'Abrir ejemplo Rete.js Modelo' },
      { execute: () => this.openReteDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_JSON_SCHEMA_DEMO, label: 'Abrir ejemplo JSON Schema' },
      { execute: () => this.openJsonSchemaDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_ABOUT, label: 'Acerca del framework Prodaric' },
      { execute: () => this.openAbout() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_SHOELACE_DEMO, label: 'Abrir ejemplo Shoelace' },
      { execute: () => this.openShoelaceDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_FAST_DEMO, label: 'Abrir ejemplo FAST' },
      { execute: () => this.openFastDemo() }
    );
    registry.registerCommand(
      { id: ExampleCommands.OPEN_VAADIN_DEMO, label: 'Abrir ejemplo Vaadin' },
      { execute: () => this.openVaadinDemo() }
    );
  }

  registerMenus(menus: MenuModelRegistry): void {
    const menuPath = [...MAIN_MENU_BAR, EXAMPLES_MENU_PATH[1]];
    menus.registerSubmenu(menuPath, 'Prodaric', { sortString: '9' });

    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_SHOWCASE_DEMO,
      label: 'Showcase — Todo lo que puedes usar',
      order: '0',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_DASHBOARD_DEMO,
      label: 'Dashboard (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_TODO_DEMO,
      label: 'Todo list (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_REPORT_DEMO,
      label: 'Reportes (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_FORM_DEMO,
      label: 'Formularios (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_CRUD_DEMO,
      label: 'CRUD (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_CHART_DEMO,
      label: 'Gráficos (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_DOCK_DEMO,
      label: 'Docking (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_RETE_DEMO,
      label: 'Rete.js Modelo (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_JSON_SCHEMA_DEMO,
      label: 'JSON Schema (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_SHOELACE_DEMO,
      label: 'Shoelace (sl-*)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_FAST_DEMO,
      label: 'FAST (fast-*)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_VAADIN_DEMO,
      label: 'Vaadin (vaadin-*)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: ExampleCommands.OPEN_ABOUT,
      label: 'Acerca del framework',
    });
  }

  private async openShowcaseDemo(): Promise<void> {
    const widget = createShowcaseDemoWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openDashboardDemo(): Promise<void> {
    const widget = createDashboardDemoWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openTodoDemo(): Promise<void> {
    const widget = createTodoDemoWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openReportDemo(): Promise<void> {
    const widget = createReportDemoWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openFormDemo(): Promise<void> {
    const widget = createFormDemoWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openCrudDemo(): Promise<void> {
    const widget = createCrudDemoWidget();
    widget.id = `prodaric-crud-${UUID.uuid4()}`;
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openChartDemo(): Promise<void> {
    const widget = createChartDemoWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openDockDemo(): Promise<void> {
    const dock = createDockPanel({ spacing: 4, tabsMovable: true });
    dock.id = `prodaric-dock-demo-${UUID.uuid4()}`;
    dock.title.label = 'Docking (ejemplo)';
    dock.title.closable = true;
    const crud = createCrudDemoWidget();
    crud.title.closable = true;
    addWidgetToDock(dock, crud);
    await this.shell.addWidget(dock, { area: 'main' });
    await this.shell.activateWidget(dock.id);
  }

  private async openReteDemo(): Promise<void> {
    const widget = createReteCanvasWidget();
    widget.id = `prodaric-rete-${UUID.uuid4()}`;
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openJsonSchemaDemo(): Promise<void> {
    const widget = createJsonSchemaDemoWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openAbout(): Promise<void> {
    const widget = this.createAboutWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openShoelaceDemo(): Promise<void> {
    const widget = createShoelaceDemoWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openFastDemo(): Promise<void> {
    const widget = createFastDemoWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openVaadinDemo(): Promise<void> {
    const widget = createVaadinDemoWidget();
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private createAboutWidget(): Widget {
    const w = new Widget();
    w.id = `prodaric-about-${UUID.uuid4()}`;
    w.title.label = 'Acerca del framework Prodaric';
    w.title.closable = true;
    w.addClass('prodaric-about-widget');
    const content = document.createElement('div');
    content.className = 'prodaric-about-content';
    content.innerHTML = `
      <h2>Prodaric Framework — Capacidades</h2>
      <p>Todos los ejemplos están en <code>@prodaric/examples</code>. Menú <strong>Prodaric</strong> → cada ítem abre un ejemplo que muestra una capacidad concreta.</p>
      <h3>Vistas y estado</h3>
      <ul>
        <li><strong>Dashboard:</strong> KPIs, tabla resumen, filtro de período, actividad reciente (variables CSS del tema).</li>
        <li><strong>Todo list:</strong> estado local, filtros (Todas / Pendientes / Hechas), contador, borrar hechas.</li>
      </ul>
      <h3>Datos y formularios</h3>
      <ul>
        <li><strong>Reportes (BIRT):</strong> generación bajo demanda, vista previa en tabla, descarga PDF (servidor report-on-demand).</li>
        <li><strong>Formularios:</strong> validación con JSON Schema (ajv), mensajes de error por campo.</li>
        <li><strong>JSON Schema:</strong> validar JSON contra esquema; errores por ruta.</li>
      </ul>
      <h3>Layout y edición</h3>
      <ul>
        <li><strong>CRUD:</strong> listado Lumino con añadir, editar y eliminar.</li>
        <li><strong>Docking:</strong> Lumino DockPanel con pestañas movibles.</li>
        <li><strong>Rete.js Modelo:</strong> editor de nodos (Entidad + Campo) en widget Lumino.</li>
      </ul>
      <h3>Visualización</h3>
      <ul>
        <li><strong>Gráficos:</strong> Apache ECharts — barras, líneas, torta; tooltips y leyenda; redimensionable.</li>
      </ul>
      <h3>Web Components</h3>
      <ul>
        <li><strong>Shoelace (sl-*):</strong> botones, card, input, textarea, select, checkbox, badge.</li>
        <li><strong>FAST (fast-*):</strong> design system Microsoft; botón, card, text-field, checkbox.</li>
        <li><strong>Vaadin (vaadin-*):</strong> tema Lumo; botón, text-field, checkbox, card.</li>
      </ul>
      <h3>Base</h3>
      <ul>
        <li><strong>Shell:</strong> Eclipse Theia, Inversify, L10n español, Electron opcional.</li>
      </ul>
    `;
    w.node.appendChild(content);
    return w;
  }
}
