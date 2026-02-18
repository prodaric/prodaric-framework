/**
 * @coderic/plugin-cloud — Coderic IDE plugin para .cloud
 */
import type { CodericApp, CodericPlugin, PluginRoute, ReteNodeDefinition } from '@coderic/shell';

export const pluginId = 'cloud';

export function createCloudPlugin(): CodericPlugin {
  return {
    id: 'cloud',
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
