/**
 * Módulo frontend de la extensión Ejemplos (Shoelace, FAST, Vaadin).
 * Registra los Web Components y las contribuciones de menú/comandos.
 */

import './../register-wc-libs';
import { ContainerModule } from 'inversify';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ExamplesContribution } from '../examples-contribution';

export default new ContainerModule((bind) => {
  bind(ExamplesContribution).toSelf().inSingletonScope();
  bind(CommandContribution).toService(ExamplesContribution);
  bind(MenuContribution).toService(ExamplesContribution);
});
