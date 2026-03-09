/**
 * Persistencia de estado de layout en localStorage (stateless).
 * Contrato para que shell/layout puedan guardar/restaurar disposición de paneles.
 * Clave: prodaric:layout:{scope}
 */

const STORAGE_PREFIX = "prodaric:layout:";

export function saveLayoutState(scope: string, state: unknown): void {
  try {
    const key = `${STORAGE_PREFIX}${scope}`;
    const value = JSON.stringify(state);
    localStorage.setItem(key, value);
  } catch {
    // localStorage puede estar deshabilitado o lleno
  }
}

export function restoreLayoutState<T = unknown>(scope: string): T | null {
  try {
    const key = `${STORAGE_PREFIX}${scope}`;
    const value = localStorage.getItem(key);
    if (value == null) return null;
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function clearLayoutState(scope: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${scope}`);
  } catch {
    // ignore
  }
}
