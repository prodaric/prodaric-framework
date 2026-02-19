/**
 * Contribución de menú y comandos para la extensión de demostración Prodaric.
 * Ofrece al desarrollador ejemplos claros de lo que puede construir: reportes, formularios, CRUD, gráficos, docking.
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
import { createReportDemoWidget } from './demo-widgets/report-demo-widget';
import { createFormDemoWidget } from './demo-widgets/form-demo-widget';
import { createChartDemoWidget } from './demo-widgets/chart-demo-widget';
import { createDashboardDemoWidget } from './demo-widgets/dashboard-demo-widget';
import { createTodoDemoWidget } from './demo-widgets/todo-demo-widget';
import { DemoCommands, DEMO_MENU_PATH } from './demo-commands';

@injectable()
export class DemoContribution implements CommandContribution, MenuContribution {
  constructor(
    @inject(ApplicationShell) private readonly shell: ApplicationShell
  ) {}

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(
      { id: DemoCommands.OPEN_DASHBOARD_DEMO, label: 'Abrir ejemplo Dashboard' },
      { execute: () => this.openDashboardDemo() }
    );
    registry.registerCommand(
      { id: DemoCommands.OPEN_TODO_DEMO, label: 'Abrir ejemplo Todo list' },
      { execute: () => this.openTodoDemo() }
    );
    registry.registerCommand(
      { id: DemoCommands.OPEN_REPORT_DEMO, label: 'Abrir ejemplo de reportes' },
      { execute: () => this.openReportDemo() }
    );
    registry.registerCommand(
      { id: DemoCommands.OPEN_FORM_DEMO, label: 'Abrir ejemplo de formularios' },
      { execute: () => this.openFormDemo() }
    );
    registry.registerCommand(
      { id: DemoCommands.OPEN_CRUD_DEMO, label: 'Abrir ejemplo CRUD' },
      { execute: () => this.openCrudDemo() }
    );
    registry.registerCommand(
      { id: DemoCommands.OPEN_CHART_DEMO, label: 'Abrir ejemplo de gráficos' },
      { execute: () => this.openChartDemo() }
    );
    registry.registerCommand(
      { id: DemoCommands.OPEN_DOCK_DEMO, label: 'Abrir ejemplo de docking' },
      { execute: () => this.openDockDemo() }
    );
    registry.registerCommand(
      { id: DemoCommands.OPEN_RETE_DEMO, label: 'Abrir ejemplo Rete.js Modelo' },
      { execute: () => this.openReteDemo() }
    );
    registry.registerCommand(
      { id: DemoCommands.OPEN_ABOUT, label: 'Acerca del framework Prodaric' },
      { execute: () => this.openAbout() }
    );
  }

  registerMenus(menus: MenuModelRegistry): void {
    const menuPath = [...MAIN_MENU_BAR, DEMO_MENU_PATH[1]];
    menus.registerSubmenu(menuPath, 'Prodaric', { sortString: '9' });

    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_DASHBOARD_DEMO,
      label: 'Dashboard (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_TODO_DEMO,
      label: 'Todo list (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_REPORT_DEMO,
      label: 'Reportes (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_FORM_DEMO,
      label: 'Formularios (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_CRUD_DEMO,
      label: 'CRUD (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_CHART_DEMO,
      label: 'Gráficos (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_DOCK_DEMO,
      label: 'Docking (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_RETE_DEMO,
      label: 'Rete.js Modelo (ejemplo)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_ABOUT,
      label: 'Acerca del framework',
    });
  }

  private async openDashboardDemo(): Promise<void> {
    const widget = createDashboardDemoWidget();
    widget.id = `prodaric-dashboard-${UUID.uuid4()}`;
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openTodoDemo(): Promise<void> {
    const widget = createTodoDemoWidget();
    widget.id = `prodaric-todo-${UUID.uuid4()}`;
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openReportDemo(): Promise<void> {
    const widget = createReportDemoWidget();
    widget.id = `prodaric-report-${UUID.uuid4()}`;
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openFormDemo(): Promise<void> {
    const widget = createFormDemoWidget();
    widget.id = `prodaric-form-${UUID.uuid4()}`;
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
    widget.id = `prodaric-chart-${UUID.uuid4()}`;
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

  private async openAbout(): Promise<void> {
    const widget = this.createAboutWidget();
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
      <h2>Prodaric Framework</h2>
      <p>Extensión de demostración: ejemplos de lo que puedes desarrollar con el framework.</p>
      <ul>
        <li><strong>Dashboard / Todo list:</strong> vistas sencillas con composición, estado e interacción.</li>
        <li><strong>Reportes (BIRT):</strong> reporte con tabla, vista previa y <strong>descarga en PDF</strong>.</li>
        <li><strong>Formularios:</strong> LayoutSchema, Form Engine, validación.</li>
        <li><strong>CRUD:</strong> listado con añadir, <strong>editar</strong> y eliminar (Lumino).</li>
        <li><strong>Rete.js Modelo:</strong> editor de nodos (Entidad + Campo) integrado en widget Lumino.</li>
        <li><strong>Gráficos:</strong> Apache ECharts en paneles.</li>
        <li><strong>Docking:</strong> paneles con pestañas (Lumino DockPanel).</li>
        <li><strong>Shell:</strong> Eclipse Theia, Inversify, L10n español.</li>
      </ul>
      <p>Menú <em>Prodaric</em> → cada ítem abre un ejemplo ejecutable. En <em>Reportes</em> puedes descargar el PDF del reporte.</p>
    `;
    w.node.appendChild(content);
    return w;
  }
}
