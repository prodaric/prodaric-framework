# Servidor de reportes (BIRT + Tomcat + Java)

Stack recomendado para el servidor de reportes tipo BIRT que sirve PDF y vistas previa. **Solo se considera válido cuando la verificación al final de este documento se ha ejecutado y pasado.**

---

## Report on demand (recomendado)

Los reportes se pueden generar **bajo demanda**: un proceso por petición, sin servidor persistente (tipo FaaS interno).

1. **Preparar runtime** (una vez): `./scripts/report-server.sh ensure` (descarga Tomcat + BIRT a `.report-server`).
2. **Servidor on-demand** (cuando quieras generar PDFs): `npm run report-on-demand` (o `node scripts/report-on-demand-server.js`). Escucha en **http://127.0.0.1:8082**. Al recibir `GET /generate?name=productos`, ejecuta BIRT (ReportRunner) y devuelve el PDF.
3. En el IDE, menú **Prodaric → Reportes**: el botón **Descargar PDF** llama a ese servidor. Si no está arrancado, se indica cómo iniciarlo.

**Demos de reportes:** en `report-templates/` hay tres plantillas de demo: `productos.rptdesign`, `resumen.rptdesign`, `ventas.rptdesign`. En el IDE (Prodaric → Reportes) se listan los tres con botón "Descargar PDF" por cada uno. Generar a mano: `./scripts/report-on-demand.sh --output /tmp/informe.pdf --report productos` (o `resumen`, `ventas`).

---

## Versiones objetivo (máximas compatibles)

| Componente | Versión | Notas |
|------------|---------|--------|
| **Java** | **25** (la del equipo) | Tomcat 11 requiere Java 17+. En este equipo: OpenJDK 25.0.2. |
| **Apache Tomcat** | **11.0.18** | Última estable en la serie 11.0.x. [Which version](https://tomcat.apache.org/whichversion.html). |
| **BIRT Runtime** | **4.14.x** | Runtime con Web Viewer Example para desplegar en Tomcat. [BIRT 4.14](https://download.eclipse.org/birt/updates/release/4.14.0/). |

No se usan Java 11 ni 17 por defecto: se usa la versión instalada en el equipo (25), que es compatible con Tomcat 11.

---

## Requisitos

- **Java**: 17 o superior (probado con OpenJDK 25).
- **Tomcat**: 11.0.x (estable). Descarga: [Apache Tomcat 11](https://tomcat.apache.org/download-11.cgi).
- **BIRT**: Runtime con “Web Viewer Example”. Descarga desde [BIRT 4.14 downloads](https://download.eclipse.org/birt/updates/release/4.14.0/downloads/) el zip `birt-runtime-*.zip`.

---

## Despliegue rápido (Tomcat + BIRT)

1. Instalar/descomprimir Tomcat 11 en un directorio (ej. `~/apache-tomcat-11.0.18`).
2. Descargar y descomprimir el BIRT runtime. Dentro, localizar la carpeta **Web Viewer Example**.
3. Copiar esa carpeta en `tomcat/webapps/` y renombrarla a `birt-viewer`.
4. Reiniciar Tomcat.
5. Comprobar: `http://localhost:8080/birt-viewer/` (y “View Example” si aplica).

Controladores JDBC: en BIRT 3.7+ van en `birt-viewer/WEB-INF/lib/`. Ver [Viewer Setup](https://eclipse-birt.github.io/birt-website/docs/integrating/viewer-setup/).

---

## Verificación (obligatoria antes de dar por bueno el stack)

Solo se considera que este stack “nos sirve” si se cumple lo siguiente.

Puedes ejecutar el script de verificación (comprueba Java y, si está definido `CATALINA_HOME`, Tomcat):

```bash
./scripts/verify-report-server.sh
```

Pasos detallados:

1. **Java del equipo**
   - En la máquina donde se ejecutará el servidor de reportes:
     ```bash
     java -version
     ```
   - Debe ser 17 o superior (ej. OpenJDK 25.0.2).

2. **Tomcat arranca con esa Java**
   - Desde el directorio de Tomcat:
     ```bash
     export JAVA_HOME=/usr/lib/jvm/java-25-openjdk   # o la ruta correcta en tu sistema
     ./bin/catalina.sh run
     ```
   - Sin errores en la consola; `http://localhost:8080` responde.

3. **BIRT viewer desplegado**
   - Tras desplegar el “Web Viewer Example” como `birt-viewer`:
   - Abrir `http://localhost:8080/birt-viewer/`.
   - Debe cargar la página de confirmación del viewer y “View Example” debe funcionar.

4. **Generación de PDF**
   - Ejecutar un reporte de ejemplo que exporte a PDF (por ejemplo el enlace de ejemplo del viewer o un `.rptdesign` de prueba).
   - Confirmar que se genera y descarga o se muestra el PDF correctamente.

Cuando todos los pasos se cumplan, el stack (Java 25 + Tomcat 11.0.18 + BIRT 4.14.x) queda **verificado** para uso en este proyecto.

---

*Prodaric Framework · Servidor de reportes · Java 25 + Tomcat 11.0.18 + BIRT*
