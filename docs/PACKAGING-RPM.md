# Empaquetado RPM de Prodaric (Fedora / dnf)

Este documento describe cómo dejar el equipo listo para construir e instalar el RPM de Prodaric usando **rpmbuild** y **dnf**, sin depender del RPM generado por electron-builder (fpm), que en Fedora 43 puede fallar por desajuste de BUILDROOT.

## Requisitos en Fedora (dnf)

Instala las herramientas y dependencias necesarias:

```bash
# Herramientas de construcción RPM
sudo dnf install -y rpm-build rpm

# Dependencias de tiempo de ejecución (Electron / Chromium)
sudo dnf install -y libX11-devel libxkbfile-devel libsecret-devel libxcrypt-compat
```

Para **solo construir** el RPM basta con `rpm-build` y `rpm`. Las dependencias de desarrollo (`libX11-devel`, etc.) son necesarias para **generar** el binario Electron (`npm run package:electron:dir`); si ese paso ya se hizo en otro equipo, en uno que solo empaquete puedes necesitar solo `rpm-build` y `rpm`.

## Flujo recomendado: prodaric.spec

El proyecto usa un **spec propio** (`apps/browser-app/rpm/prodaric.spec`) y un script que prepara el árbol de construcción y llama a **rpmbuild**. Rutas sin espacios; instalación en `/opt/prodaric`.

1. Generar el directorio desempaquetado (Electron):
   ```bash
   cd apps/browser-app
   npm run package:electron:dir
   ```
   Esto deja `dist/linux-unpacked/` con el binario `prodaric` y el resto de la app.

2. Construir el RPM con el spec:
   ```bash
   cd apps/browser-app
   npm run package:electron:rpm:spec
   ```
   O en un solo paso desde la raíz del monorepo:
   ```bash
   npm run package:electron:rpm:spec -w @prodaric/browser-app
   ```

3. El RPM se genera en:
   `apps/browser-app/rpmbuild/RPMS/x86_64/prodaric-<version>-1.<dist>.x86_64.rpm`

4. Instalar con dnf:
   ```bash
   sudo dnf install --nogpgcheck ./apps/browser-app/rpmbuild/RPMS/x86_64/prodaric-*.rpm
   ```
   O copiar el `.rpm` a la máquina destino y:
   ```bash
   sudo dnf install --nogpgcheck prodaric-0.0.1-1.fc43.x86_64.rpm
   ```

## Estructura del spec

- **Nombre del paquete:** `prodaric`
- **Instalación:** `/opt/prodaric` (todo el contenido de `linux-unpacked`), más:
  - `/usr/share/applications/prodaric.desktop`
  - `/usr/share/icons/hicolor/256x256/apps/prodaric.png`
- **Versión:** Se toma de `package.json` y se pasa a rpmbuild con `--define "version X"`.

El script `apps/browser-app/scripts/build-rpm.sh` copia `dist/linux-unpacked` a un directorio de construcción, genera el `.desktop` y copia el icono (o un placeholder si no existe `build/icons/`), y luego ejecuta `rpmbuild -bb`.

## Icono oficial

El icono de Prodaric está en **https://github.com/Prodaric.png**. Para usarlo en el RPM (y mantener el build sin red):

1. Con red, descarga el PNG y colócalo en `apps/browser-app/build/icons/`, por ejemplo:
   ```bash
   mkdir -p apps/browser-app/build/icons
   curl -sL -o apps/browser-app/build/icons/256x256.png https://github.com/Prodaric.png
   ```
2. A partir de ahí, `build-rpm.sh` usará ese archivo y el empaquetado puede hacerse offline.

Si no hay ningún PNG en `build/icons/`, el script genera un icono placeholder mínimo (1×1 px).

## Script de preparación del equipo (opcional)

Para dejar el equipo listo con un solo comando (instalar paquetes dnf necesarios):

```bash
./scripts/setup-rpm-packages.sh
```

Véase el contenido del script para la lista exacta de paquetes.

## Nota sobre electron-builder y fpm

Si en el futuro se vuelve a usar el target RPM de electron-builder (fpm), en algunas distribuciones puede ser necesario un symlink de plataforma para `rpmbuild`, por ejemplo:

```bash
# Solo si fpm/rpmbuild falla por arquitectura "x86_64-unknown-linux"
sudo ln -s x86_64-linux /usr/lib/rpm/platform/x86_64-unknown-linux
```

El flujo con **prodaric.spec** no depende de fpm ni de ese symlink.

## Build e instalación sin red (integridad)

El empaquetado y la instalación del RPM están pensados para **no requerir internet**, de modo que la compilación y la instalación no fallen por red y se preserve la integridad (entornos offline o air-gapped).

### Build sin red

- **rpmbuild** solo usa archivos locales: el script `build-rpm.sh` copia `dist/linux-unpacked` y artefactos ya generados; no hace `npm install` ni descargas. Si tienes ya generado `dist/linux-unpacked` (p. ej. en otra máquina con red), puedes ejecutar solo `build-rpm.sh` en una máquina sin red y obtendrás el mismo RPM.
- Para un **ciclo completo offline**: en una máquina con red, ejecuta una vez `npm install` y `npm run package:electron:dir`; copia el monorepo (incluidos `node_modules` y `dist/linux-unpacked`) al equipo sin red y allí ejecuta solo `bash scripts/build-rpm.sh` desde `apps/browser-app`. No se requiere conexión durante `rpmbuild`.

### Instalación sin red

- El RPM **no incluye scriptlets** (`%pre`, `%post`, etc.) que usen red. La instalación solo descomprime archivos del paquete.
- Para instalar sin que dnf intente resolver dependencias por internet:
  - Opción 1: tener las dependencias ya instaladas (p. ej. librerías de tiempo de ejecución) y luego:
    ```bash
    sudo rpm -i prodaric-<version>-1.*.x86_64.rpm
    ```
  - Opción 2: usar un repo local (copiar el RPM y deps a un directorio y configurar `dnf`/`yum` con `baseurl` file://) y luego `dnf install` desde ese repo.

Así se evita que un fallo de red o un intermediario comprometa la compilación o la instalación.
