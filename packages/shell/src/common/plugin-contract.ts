/**
 * Contrato de plugin por dominio (Prodaric Framework).
 */

// Placeholder: tipos Rete y rutas se definirán cuando se integre node-canvas y api-client.
export interface ReteNodeDefinition {
  type: string;
  label: string;
}

export interface PluginRoute {
  path: string;
  method: string;
}

export interface CodericApp {
  readonly id: string;
}

export interface CodericPlugin {
  id: 'cloud' | 'net' | 'com' | 'dev';
  activate(app: CodericApp): void;
  deactivate(): void;
  getNodes(): ReteNodeDefinition[];
  getRoutes(): PluginRoute[];
}
