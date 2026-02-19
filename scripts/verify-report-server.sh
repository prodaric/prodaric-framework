#!/usr/bin/env bash
# Verificación del stack de reportes (Java + Tomcat).
# Uso: ./scripts/verify-report-server.sh
# Opcional: CATALINA_HOME=/ruta/a/tomcat ./scripts/verify-report-server.sh

set -e

echo "=== 1. Java (requerido 17+) ==="
if ! command -v java &>/dev/null; then
  echo "ERROR: java no encontrado."
  exit 1
fi
java -version
JAVA_VER=$(java -version 2>&1 | head -1)
if [[ "$JAVA_VER" =~ version\ \"([0-9]+) ]]; then
  JV="${BASH_REMATCH[1]}"
  if [[ "$JV" -lt 17 ]]; then
    echo "ERROR: Se requiere Java 17 o superior. Detectado: $JV"
    exit 1
  fi
  echo "OK Java $JV (compatible con Tomcat 11)"
else
  echo "ADVERTENCIA: No se pudo parsear la versión de Java; comprueba manualmente que sea 17+"
fi

echo ""
echo "=== 2. Tomcat (opcional, si CATALINA_HOME está definido) ==="
if [[ -n "${CATALINA_HOME:-}" ]]; then
  if [[ -x "$CATALINA_HOME/bin/catalina.sh" ]]; then
    "$CATALINA_HOME/bin/catalina.sh" version || true
    echo "OK Tomcat encontrado en $CATALINA_HOME"
  else
    echo "ADVERTENCIA: CATALINA_HOME=$CATALINA_HOME pero no existe bin/catalina.sh"
  fi
else
  echo "Omitido. Para comprobar Tomcat: CATALINA_HOME=/ruta/a/tomcat $0"
fi

echo ""
echo "=== 3. BIRT viewer ==="
echo "Comprobación manual: desplegar Web Viewer Example en Tomcat y abrir http://localhost:8080/birt-viewer/"
echo "Ver docs/REPORTES-SERVIDOR.md para pasos completos de verificación."
