# RPM spec para Prodaric Framework (Electron/Theia).
# Fuente: tar.gz en SOURCES; %prep desempaqueta con %setup. Instalación en /opt/prodaric.
#
# Build e instalación sin red: solo archivos locales; sin scriptlets que usen red.

Name:           prodaric
Version:        %{version}
Release:        1%{?dist}
Summary:        Prodaric Framework — IDE tipo VS Code (Theia/Electron)
License:        MIT
URL:            https://coderic.org
Vendor:         Coderic
Packager:       Neftali Yagua <despacho@neftaliyagua.com>

Source0:        prodaric-%{version}.tar.gz

# Binarios preconstruidos (Electron); no generar -debuginfo
%global debug_package %{nil}

BuildRequires:  coreutils
Requires:       gtk3
Requires:       nss
Requires:       libXScrnSaver
Requires:       libXtst
Requires:       xdg-utils
Requires:       at-spi2-core
Requires:       libuuid

%description
Prodaric Framework: aplicación de escritorio tipo IDE (Theia/Electron) para desarrollo y productividad. Parte del ecosistema Coderic.

%prep
%setup -q

%build
# No compilación; el pack de fuentes trae los binarios ya construidos.

%install
rm -rf %{buildroot}
mkdir -p %{buildroot}/opt/prodaric
cp -a %{_builddir}/%{name}-%{version}/prodaric-install/* %{buildroot}/opt/prodaric/
mkdir -p %{buildroot}/usr/share/applications
install -m 644 %{_builddir}/%{name}-%{version}/prodaric.desktop %{buildroot}/usr/share/applications/prodaric.desktop
mkdir -p %{buildroot}/usr/share/icons/hicolor/256x256/apps
install -m 644 %{_builddir}/%{name}-%{version}/prodaric.png %{buildroot}/usr/share/icons/hicolor/256x256/apps/prodaric.png

%files
/opt/prodaric
/usr/share/applications/prodaric.desktop
/usr/share/icons/hicolor/256x256/apps/prodaric.png

%changelog
* Tue Feb 18 2025 Neftali Yagua <despacho@neftaliyagua.com> - 0.0.1-1
- Source0 tar.gz, %setup -q, %global debug_package %{nil}
