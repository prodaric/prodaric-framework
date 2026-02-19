/**
 * Módulo frontend del shell Prodaric para Theia.
 * Se carga en la aplicación Theia (browser-app) y registra contribuciones y tokens Inversify.
 */

import { ContainerModule } from 'inversify';
import { CommandContribution } from '@theia/core/lib/common/command';
import { ProdaricLayoutProvider, ProdaricPanelRegistry } from '../common/tokens';
import { ProdaricShellContribution } from './prodaric-shell-contribution';
import { NoopLayoutProvider } from './noop-layout-provider';
import { InMemoryPanelRegistry } from './in-memory-panel-registry';

export default new ContainerModule((bind) => {
  bind(ProdaricShellContribution).toSelf().inSingletonScope();
  bind(CommandContribution).toService(ProdaricShellContribution);

  bind(ProdaricLayoutProvider).to(NoopLayoutProvider).inSingletonScope();
  bind(ProdaricPanelRegistry).to(InMemoryPanelRegistry).inSingletonScope();
});
