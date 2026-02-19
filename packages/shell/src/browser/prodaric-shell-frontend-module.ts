/**
 * Módulo frontend del shell Prodaric para Theia.
 * Se carga en la aplicación Theia (browser-app) y registra contribuciones mínimas.
 */

import { ContainerModule } from 'inversify';
import { CommandContribution } from '@theia/core/lib/common/command';
import { ProdaricShellContribution } from './prodaric-shell-contribution';

export default new ContainerModule((bind) => {
  bind(ProdaricShellContribution).toSelf().inSingletonScope();
  bind(CommandContribution).toService(ProdaricShellContribution);
});
