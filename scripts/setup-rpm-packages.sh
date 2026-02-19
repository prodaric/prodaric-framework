#!/usr/bin/env bash
# Instala los paquetes necesarios en Fedora para construir el RPM de Prodaric
# (rpm-build, rpm y deps de Electron). Uso: ./scripts/setup-rpm-packages.sh

set -e

if ! command -v dnf &>/dev/null; then
  echo "Este script está pensado para Fedora (dnf). Si usas otra distro, instala manualmente: rpm-build, rpm, libX11-devel, libxkbfile-devel, libsecret-devel, libxcrypt-compat"
  exit 1
fi

echo "Instalando paquetes para empaquetado RPM y build de Electron..."
sudo dnf install -y \
  rpm-build \
  rpm \
  libX11-devel \
  libxkbfile-devel \
  libsecret-devel \
  libxcrypt-compat

echo "Listo. Puedes construir el RPM con: npm run package:electron:rpm:spec -w @prodaric/browser-app"
echo "Ver docs/PACKAGING-RPM.md para más detalles."
