/**
 * Contribución mínima del shell Prodaric al IDE Theia.
 * Registra un comando para confirmar que el shell está cargado (customización mínima).
 */

import { injectable } from 'inversify';
import type { CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';

export const ProdaricShellCommands = {
  READY: 'prodaric.shell.ready',
} as const;

@injectable()
export class ProdaricShellContribution implements CommandContribution {
  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(
      {
        id: ProdaricShellCommands.READY,
        label: 'Prodaric: Shell listo',
      },
      {
        execute: () => {
          // Sin acción; solo confirma que el shell está integrado.
        },
      }
    );
  }
}
