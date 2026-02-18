# @coderic/api-client

Cliente HTTP para el API de Coderic Engine (OpenAPI 3.0). Multi-tenant por dominio: el mismo Engine devuelve distintos endpoints según el host (coderic.org, coderic.dev, coderic.cloud, etc.).

## Uso

```ts
import {
  createCodericEngineClient,
  setApiOrigin,
  fetchOpenApiSpec,
} from "@coderic/api-client";

// Opcional: en desarrollo, fijar origen para evitar CORS (ej. conectar a coderic.org desde localhost)
setApiOrigin("https://coderic.org");

const client = createCodericEngineClient({ token: "JWT_OPCIONAL" });

const health = await client.getHealth();       // GET /api/health
const users = await client.listUsers();       // GET /api/users
const projects = await client.listProjects(); // GET /api/projects (por namespace del dominio)
const spec = await client.getOpenApiSpec();   // GET /api/openapi.json
```

## Producción vs desarrollo

- **Producción:** La consola se sirve en `https://coderic.org/console/` (o el dominio que corresponda). No se llama a `setApiOrigin`; el cliente usa `window.location.origin` y las peticiones son a `/api/*` en el mismo origen, sin CORS.
- **Desarrollo:** Si se ejecuta la app desde otro origen (ej. localhost), se puede llamar a `setApiOrigin("https://coderic.org")` para que todas las peticiones vayan a ese dominio. El Engine debe permitir CORS para ese origen si aplica.

## Multi-tenant

El namespace (organization, development, store, cloud, etc.) lo determina el **dominio** de la petición. El Engine no usa cabecera de tenant; el host ya identifica el tenant. Por tanto, cada despliegue de la consola (coderic.org/console/, coderic.dev/console/, coderic.cloud/console/) obtiene automáticamente la estructura de endpoints de su dominio al usar el mismo cliente sin override.
