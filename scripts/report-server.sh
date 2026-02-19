#!/usr/bin/env bash
# Servidor de reportes BIRT = Tomcat binario local (solo reportes, FaaS interno del backend).
# Descarga Tomcat + BIRT a un directorio local del repo, despliega birt-viewer, arranca/para el proceso.
#
# Uso (desde la raíz del repo):
#   ./scripts/report-server.sh start   # arranca en segundo plano (puerto 8081)
#   ./scripts/report-server.sh stop   # para el proceso
#   ./scripts/report-server.sh run    # arranca en primer plano (Ctrl+C para parar)
#   ./scripts/report-server.sh ensure # solo prepara runtime (descarga/despliega); no arranca
#
# Requiere: Java 17+ (java -version), curl, unzip, tar

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
RUNTIME_DIR="${REPORT_SERVER_RUNTIME:-$REPO_ROOT/.report-server}"
PID_FILE="$RUNTIME_DIR/tomcat.pid"
PORT="${REPORT_SERVER_PORT:-8081}"

TOMCAT_VERSION="11.0.18"
TOMCAT_ARCHIVE="apache-tomcat-${TOMCAT_VERSION}.tar.gz"
TOMCAT_URL="https://dlcdn.apache.org/tomcat/tomcat-11/v${TOMCAT_VERSION}/bin/${TOMCAT_ARCHIVE}"
TOMCAT_DIR="apache-tomcat-${TOMCAT_VERSION}"

BIRT_VERSION="4.14.0-202312020807"
BIRT_ARCHIVE="birt-runtime-${BIRT_VERSION}.zip"
BIRT_URL="https://download.eclipse.org/birt/updates/release/4.14.0/downloads/${BIRT_ARCHIVE}"
BIRT_EXTRACT="birt-runtime-${BIRT_VERSION}"

CATALINA_HOME="$RUNTIME_DIR/$TOMCAT_DIR"

ensure_runtime() {
  mkdir -p "$RUNTIME_DIR"
  cd "$RUNTIME_DIR"

  # 1. Tomcat (binario oficial, no fuente)
  if [[ ! -d "$TOMCAT_DIR" ]]; then
    if [[ ! -f "$TOMCAT_ARCHIVE" ]]; then
      echo "Descargando Apache Tomcat $TOMCAT_VERSION (binario)..."
      curl -sL -o "$TOMCAT_ARCHIVE" "$TOMCAT_URL"
    fi
    echo "Descomprimiendo Tomcat..."
    tar -xzf "$TOMCAT_ARCHIVE"
    # Puerto dedicado para reportes (no 8080)
    if [[ "$PORT" != "8080" ]]; then
      sed -i.bak "s/port=\"8080\"/port=\"$PORT\"/" "$TOMCAT_DIR/conf/server.xml"
    fi
  fi

  # 2. BIRT runtime
  if [[ ! -d "$BIRT_EXTRACT" ]]; then
    if [[ ! -f "$BIRT_ARCHIVE" ]]; then
      echo "Descargando BIRT Runtime $BIRT_VERSION (~328 MB)..."
      curl -sL -o "$BIRT_ARCHIVE" "$BIRT_URL"
    fi
    echo "Descomprimiendo BIRT runtime..."
    unzip -q -o "$BIRT_ARCHIVE"
  fi

  # 3. Desplegar WebViewerExample como birt-viewer
  WEBAPPS="$RUNTIME_DIR/$TOMCAT_DIR/webapps"
  VIEWER_SRC="$RUNTIME_DIR/$BIRT_EXTRACT/WebViewerExample"
  [[ -d "$VIEWER_SRC" ]] || VIEWER_SRC="$RUNTIME_DIR/$BIRT_EXTRACT/Web Viewer Example"
  if [[ ! -d "$VIEWER_SRC" ]]; then
    echo "No se encontró WebViewerExample en $BIRT_EXTRACT"
    ls -la "$RUNTIME_DIR/$BIRT_EXTRACT" 2>/dev/null || true
    exit 1
  fi
  if [[ ! -d "$WEBAPPS/birt-viewer" ]]; then
    echo "Desplegando BIRT Viewer en webapps/birt-viewer"
    cp -R "$VIEWER_SRC" "$WEBAPPS/birt-viewer"
  fi

  echo "Runtime listo: $CATALINA_HOME (puerto $PORT)"
}

start_server() {
  ensure_runtime
  if [[ -f "$PID_FILE" ]]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
      echo "Servidor de reportes ya en ejecución (PID $PID). URL: http://localhost:$PORT/birt-viewer/"
      return 0
    fi
    rm -f "$PID_FILE"
  fi
  export CATALINA_HOME
  export JAVA_HOME="${JAVA_HOME:-$(dirname "$(dirname "$(readlink -f "$(which java)" 2>/dev/null || which java)")")}"
  cd "$CATALINA_HOME"
  nohup ./bin/catalina.sh run > "$RUNTIME_DIR/tomcat.log" 2>&1 &
  echo $! > "$PID_FILE"
  echo "Servidor de reportes arrancado (PID $(cat "$PID_FILE")). URL: http://localhost:$PORT/birt-viewer/"
}

stop_server() {
  if [[ ! -f "$PID_FILE" ]]; then
    echo "No hay PID; servidor de reportes no estaba en ejecución."
    return 0
  fi
  PID=$(cat "$PID_FILE")
  if kill -0 "$PID" 2>/dev/null; then
    kill "$PID"
    echo "Servidor de reportes detenido (PID $PID)."
  else
    echo "Proceso $PID ya no existe."
  fi
  rm -f "$PID_FILE"
}

run_foreground() {
  ensure_runtime
  export CATALINA_HOME
  export JAVA_HOME="${JAVA_HOME:-$(dirname "$(dirname "$(readlink -f "$(which java)" 2>/dev/null || which java)")")}"
  cd "$CATALINA_HOME"
  echo "Servidor de reportes en primer plano. URL: http://localhost:$PORT/birt-viewer/ (Ctrl+C para parar)"
  exec ./bin/catalina.sh run
}

case "${1:-}" in
  start)  start_server ;;
  stop)   stop_server ;;
  run)    run_foreground ;;
  ensure) ensure_runtime ;;
  *)
    echo "Uso: $0 { start | stop | run | ensure }"
    echo "  start  - Arranca Tomcat+BIRT en segundo plano (puerto $PORT)"
    echo "  stop   - Para el servidor de reportes"
    echo "  run    - Arranca en primer plano"
    echo "  ensure - Solo prepara runtime (descarga/despliega), no arranca"
    exit 1
    ;;
esac
