#!/usr/bin/env bash
# Report on demand: genera un PDF con BIRT (un proceso por petición, sin servidor persistente).
# Usa el mismo runtime que report-server.sh (BIRT ReportEngine, sin Tomcat).
#
# Uso: ./scripts/report-on-demand.sh [--output /path/out.pdf] [--report nombre] [rptdesign_path]
#   --output   Fichero PDF de salida (default: temporal, se imprime la ruta por stdout)
#   --report   Nombre de reporte (productos -> report-templates/productos.rptdesign)
#   Si se pasa rptdesign_path, se usa ese .rptdesign.
#
# Requiere: Java 17+, mismo runtime que report-server (./scripts/report-server.sh ensure).

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
RUNTIME_DIR="${REPORT_SERVER_RUNTIME:-$REPO_ROOT/.report-server}"
BIRT_VERSION="4.14.0-202312020807"
BIRT_EXTRACT="birt-runtime-${BIRT_VERSION}"
REPORT_ENGINE="$RUNTIME_DIR/$BIRT_EXTRACT/ReportEngine"
TEMPLATES_DIR="$REPO_ROOT/report-templates"

OUTPUT_FILE=""
REPORT_NAME=""
DESIGN_PATH=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --output|-o) OUTPUT_FILE="$2"; shift 2 ;;
    --report)    REPORT_NAME="$2"; shift 2 ;;
    *)          DESIGN_PATH="$1"; shift ;;
  esac
done

if [[ -z "$DESIGN_PATH" && -n "$REPORT_NAME" ]]; then
  DESIGN_PATH="$TEMPLATES_DIR/${REPORT_NAME}.rptdesign"
fi

if [[ -z "$DESIGN_PATH" ]]; then
  echo "Uso: $0 [--output out.pdf] [--report productos] | <ruta.rptdesign>" >&2
  echo "  Ejemplo: $0 --output /tmp/informe.pdf --report productos" >&2
  exit 1
fi

if [[ ! -f "$DESIGN_PATH" ]]; then
  echo "No se encontró el diseño de reporte: $DESIGN_PATH" >&2
  echo "Crea report-templates/productos.rptdesign o pasa la ruta a un .rptdesign" >&2
  exit 1
fi

if [[ ! -d "$REPORT_ENGINE" || ! -d "$REPORT_ENGINE/lib" ]]; then
  echo "Runtime BIRT no encontrado. Ejecuta primero: ./scripts/report-server.sh ensure" >&2
  exit 1
fi

if [[ -z "$OUTPUT_FILE" ]]; then
  OUTPUT_FILE=$(mktemp -t prodaric-report-XXXXXX.pdf)
  trap "rm -f '$OUTPUT_FILE'" EXIT
  echo "OUTPUT=$OUTPUT_FILE"
fi

cd "$REPORT_ENGINE"
export java_io_tmpdir="${REPORT_SERVER_TMP:-$RUNTIME_DIR/tmp}"
mkdir -p "$java_io_tmpdir"
export org_eclipse_datatools_workspacepath="$java_io_tmpdir/workspace_dtp"
mkdir -p "$org_eclipse_datatools_workspacepath"

# ReportRunner (BIRT): run and render to PDF in one shot (report on demand)
java -Djava.awt.headless=true \
  -Dorg.eclipse.birt.report.engine.home="$REPORT_ENGINE" \
  -cp "lib/*" \
  org.eclipse.birt.report.engine.api.ReportRunner \
  -f PDF \
  -o "$OUTPUT_FILE" \
  "$DESIGN_PATH"

echo "Generado: $OUTPUT_FILE"
