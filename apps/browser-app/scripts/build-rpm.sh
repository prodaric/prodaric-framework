#!/usr/bin/env bash
# Construye el RPM de Prodaric usando prodaric.spec.
# Crea el pack de fuentes (prodaric-<version>.tar.gz) y lo deja en SOURCES;
# rpmbuild desempaqueta en %prep con %setup y construye el RPM.
# Requiere: rpm-build, dist/linux-unpacked (p. ej. npm run package:electron:dir).
# Uso: desde apps/browser-app: ./scripts/build-rpm.sh
#      desde raíz: npm run package:electron:rpm:spec -w @prodaric/browser-app

set -e

SCRIPT_DIR="${SCRIPT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
BROWSER_APP="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$BROWSER_APP"

UNPACKED="$BROWSER_APP/dist/linux-unpacked"
SPEC_DIR="$BROWSER_APP/rpm"
TOPDIR="$BROWSER_APP/rpmbuild"
SOURCES="$TOPDIR/SOURCES"

if [ ! -d "$UNPACKED" ] || [ ! -x "$UNPACKED/prodaric" ]; then
  echo "No se encontró dist/linux-unpacked con binario prodaric. Ejecuta antes: npm run package:electron:dir"
  exit 1
fi

VERSION="$(node -p "require('./package.json').version")"
PACK_DIR="prodaric-$VERSION"
mkdir -p "$TOPDIR"/{BUILD,BUILDROOT,RPMS,SPECS,SOURCES}
cp "$SPEC_DIR/prodaric.spec" "$TOPDIR/SPECS/"

# Armar el árbol del pack de fuentes (lo que irá dentro del tar.gz)
STAGING="$(mktemp -d)"
trap "rm -rf '$STAGING'" EXIT
mkdir -p "$STAGING/$PACK_DIR/prodaric-install"
cp -a "$UNPACKED"/* "$STAGING/$PACK_DIR/prodaric-install/"

# Desktop entry
cat > "$STAGING/$PACK_DIR/prodaric.desktop" << 'DESKTOP'
[Desktop Entry]
Name=Prodaric
Comment=Prodaric Framework — IDE tipo VS Code (Theia/Electron)
Exec=/opt/prodaric/prodaric %U
Terminal=false
Type=Application
Icon=prodaric
StartupWMClass=Prodaric
Categories=Development;IDE;Productivity;
DESKTOP

# Icono
ICON_SRC=""
for size in 256 128 64 32; do
  if [ -f "$BROWSER_APP/build/icons/${size}x${size}.png" ]; then
    ICON_SRC="$BROWSER_APP/build/icons/${size}x${size}.png"
    break
  fi
done
if [ -z "$ICON_SRC" ]; then
  for f in "$BROWSER_APP/build/icons/"*.png; do
    [ -f "$f" ] && ICON_SRC="$f" && break
  done
fi
if [ -n "$ICON_SRC" ]; then
  cp "$ICON_SRC" "$STAGING/$PACK_DIR/prodaric.png"
else
  printf '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\x0f\x00\x00\x01\x01\x00\x05\x18\xd8N\x00\x00\x00\x00IEND\xaeB`\x82' > "$STAGING/$PACK_DIR/prodaric.png"
fi

# Crear el tar.gz en SOURCES (nombre que espera el spec: prodaric-%{version}.tar.gz)
(cd "$STAGING" && tar czf "$SOURCES/prodaric-$VERSION.tar.gz" "$PACK_DIR")

# Construir el RPM; %prep desempaqueta Source0 en BUILD/prodaric-<version>/
rpmbuild -bb \
  --define "_topdir $TOPDIR" \
  --define "version $VERSION" \
  "$TOPDIR/SPECS/prodaric.spec"

RPM="$(echo "$TOPDIR/RPMS/"*/*.rpm)"
echo "RPM generado: $RPM"
ls -la "$RPM"
