/**
 * @coderic/plugin-dev — Prodaric Framework plugin para .dev
 */
import type { CodericApp, CodericPlugin, PluginRoute, ReteNodeDefinition } from '@coderic/shell';

export function createDevPlugin(): CodericPlugin {
  return {
    id: 'dev',
    activate(_app: CodericApp): void {},
    deactivate(): void {},
    getNodes(): ReteNodeDefinition[] {
      return [];
    },
    getRoutes(): PluginRoute[] {
      return [];
    },
  };
}
