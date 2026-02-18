/**
 * @coderic/plugin-com — Coderic IDE plugin para .com
 */
import type { CodericApp, CodericPlugin, PluginRoute, ReteNodeDefinition } from '@coderic/shell';

export function createComPlugin(): CodericPlugin {
  return {
    id: 'com',
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
