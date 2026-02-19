/**
 * Módulo frontend de la extensión Hello World Prodaric.
 * Registra contribuciones de menú y comandos en el contenedor Theia.
 */

import { ContainerModule } from 'inversify';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { DemoContribution } from '../demo-contribution';

export default new ContainerModule((bind) => {
  bind(DemoContribution).toSelf().inSingletonScope();
  bind(CommandContribution).toService(DemoContribution);
  bind(MenuContribution).toService(DemoContribution);
});
