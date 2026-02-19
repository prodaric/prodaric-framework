/**
 * Contrato: respuesta de /api/resource/acl (Prodaric Framework).
 */

export interface AclSchema {
  resource: string;
  permissions: {
    read: string[];
    write: string[];
    actions: string[];
  };
}
