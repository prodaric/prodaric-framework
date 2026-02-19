/**
 * Contribución de menú y comandos para la extensión de demostración Prodaric.
 * Registra el menú "Prodaric" y comandos que abren widgets de ejemplo en el shell.
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
import { createCrudDemoWidget } from '@prodaric/layout';
import {
  createDockPanel,
  addWidgetToDock,
} from '@prodaric/layout';
import { DemoCommands, DEMO_MENU_PATH } from './demo-commands';

@injectable()
export class DemoContribution implements CommandContribution, MenuContribution {
  constructor(
    @inject(ApplicationShell) private readonly shell: ApplicationShell
  ) {}

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(
      {
        id: DemoCommands.OPEN_CRUD_DEMO,
        label: 'Abrir demo CRUD (Lumino)',
      },
      { execute: () => this.openCrudDemo() }
    );
    registry.registerCommand(
      {
        id: DemoCommands.OPEN_DOCK_DEMO,
        label: 'Abrir demo Docking',
      },
      { execute: () => this.openDockDemo() }
    );
    registry.registerCommand(
      {
        id: DemoCommands.OPEN_ABOUT,
        label: 'Acerca del framework Prodaric',
      },
      { execute: () => this.openAbout() }
    );
  }

  registerMenus(menus: MenuModelRegistry): void {
    const menuPath = [...MAIN_MENU_BAR, DEMO_MENU_PATH[1]];
    menus.registerSubmenu(menuPath, 'Prodaric', { sortString: '9' });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_CRUD_DEMO,
      label: 'Demo CRUD (Lumino)',
    });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_DOCK_DEMO,
      label: 'Demo Docking',
    });
    menus.registerMenuAction(menuPath, {
      commandId: DemoCommands.OPEN_ABOUT,
      label: 'Acerca del framework',
    });
  }

  private async openCrudDemo(): Promise<void> {
    const widget = createCrudDemoWidget();
    widget.id = `prodaric-crud-${UUID.uuid4()}`;
    await this.shell.addWidget(widget, { area: 'main' });
    await this.shell.activateWidget(widget.id);
  }

  private async openDockDemo(): Promise<void> {
    const dock = createDockPanel({ spacing: 4, tabsMovable: true });
    dock.id = `prodaric-dock-demo-${UUID.uuid4()}`;
    dock.title.label = 'Demo Docking (Prodaric)';
    dock.title.closable = true;

    const crud = createCrudDemoWidget();
    crud.title.closable = true;
    addWidgetToDock(dock, crud);

    await this.shell.addWidget(dock, { area: 'main' });
    await this.shell.activateWidget(dock.id);
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
      <p>Extensión de demostración del ecosistema Prodaric.</p>
      <ul>
        <li><strong>Shell:</strong> Eclipse Theia, tokens Inversify (LayoutProvider, PanelRegistry).</li>
        <li><strong>Layout:</strong> Lumino (DockPanel, Widget, TabPanel, SplitPanel).</li>
        <li><strong>L10n:</strong> Español (@prodaric/theia-l10n-es).</li>
      </ul>
      <p>Menú <em>Prodaric</em> → Demos para probar widgets y docking.</p>
    `;
    w.node.appendChild(content);
    return w;
  }
}
