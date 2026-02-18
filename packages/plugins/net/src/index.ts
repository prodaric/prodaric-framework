/**
 * @coderic/plugin-net — Coderic IDE plugin para .net
 */
import type { CodericApp, CodericPlugin, PluginRoute, ReteNodeDefinition } from '@coderic/shell';

export function createNetPlugin(): CodericPlugin {
  return {
    id: 'net',
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
