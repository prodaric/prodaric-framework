#!/usr/bin/env bash
# Script único para desarrollo/CI: instala dependencias, compila y (opcional) arranca el IDE.
# Uso (desde la raíz del repo):
#   ./scripts/run.sh           # install + build
#   ./scripts/run.sh --start   # install + build + arrancar IDE (npm run ide)
#   ./scripts/run.sh --build   # solo build (asume dependencias instaladas)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

do_install=true
do_build=true
do_start=false

for arg in "$@"; do
  case "$arg" in
    --start) do_start=true ;;
    --build) do_install=false ;;
    --no-build) do_build=false ;;
  esac
done

if [[ "$do_install" == true ]]; then
  echo "=== npm install ==="
  npm install
fi

if [[ "$do_build" == true ]]; then
  echo "=== npm run build ==="
  npm run build
fi

if [[ "$do_start" == true ]]; then
  echo "=== Arrancando IDE (http://localhost:3000) ==="
  exec npm run ide
fi

echo "Listo. Para arrancar el IDE: npm run ide"
