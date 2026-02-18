/**
 * Contrato: respuesta de /api/resource/acl (Coderic IDE).
 */

export interface AclSchema {
  resource: string;
  permissions: {
    read: string[];
    write: string[];
    actions: string[];
  };
}
