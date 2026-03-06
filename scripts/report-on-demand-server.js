#!/usr/bin/env node
/**
 * Servidor "report on demand": al recibir una petición, ejecuta BIRT (one-shot)
 * y devuelve el PDF. Sin servidor persistente de reportes; solo el proceso
 * que genera el informe cuando se pide.
 *
 * Si el runtime BIRT no existe, ejecuta automáticamente ensure (report-server.sh ensure).
 *
 * Uso: node scripts/report-on-demand-server.js [puerto]
 *   o: npx prodaric-report-on-demand [puerto]
 * Default: puerto 8082. El IDE puede llamar a http://localhost:8082/generate?name=productos
 */

const http = require('http');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const PORT = parseInt(process.env.REPORT_SERVER_PORT || process.argv[2] || '8082', 10);
const REPO_ROOT = path.resolve(__dirname, '..');
const SCRIPT = path.join(REPO_ROOT, 'scripts', 'report-on-demand.sh');
const RUNTIME_DIR = process.env.REPORT_SERVER_RUNTIME || path.join(REPO_ROOT, '.report-server');
const BIRT_EXTRACT = 'birt-runtime-4.14.0-202312020807';
const REPORT_ENGINE_CANONICAL = path.join(RUNTIME_DIR, BIRT_EXTRACT, 'ReportEngine');
const REPORT_ENGINE_LEGACY = path.join(RUNTIME_DIR, 'ReportEngine');

function runtimeReady() {
  try {
    const engine = fs.existsSync(REPORT_ENGINE_CANONICAL)
      ? REPORT_ENGINE_CANONICAL
      : fs.existsSync(REPORT_ENGINE_LEGACY)
        ? REPORT_ENGINE_LEGACY
        : null;
    return engine !== null && fs.existsSync(path.join(engine, 'lib'));
  } catch {
    return false;
  }
}

function ensureRuntime() {
  return new Promise((resolve, reject) => {
    const ensureScript = path.join(REPO_ROOT, 'scripts', 'report-server.sh');
    const child = spawn('bash', [ensureScript, 'ensure'], {
      cwd: REPO_ROOT,
      stdio: ['ignore', 'inherit', 'inherit'],
    });
    child.on('close', (code) => {
      if (code === 0 && runtimeReady()) resolve();
      else reject(new Error(`ensure falló con código ${code}`));
    });
    child.on('error', reject);
  });
}

function runReport(name) {
  return new Promise((resolve, reject) => {
    const outFile = path.join(os.tmpdir(), `prodaric-report-${Date.now()}-${name}.pdf`);
    const child = spawn(
      'bash',
      [SCRIPT, '--output', outFile, '--report', name],
      { cwd: REPO_ROOT, stdio: ['ignore', 'pipe', 'pipe'] }
    );
    let stderr = '';
    child.stderr.on('data', (d) => { stderr += d; });
    child.on('close', (code) => {
      if (code === 0 && fs.existsSync(outFile)) {
        resolve(outFile);
      } else {
        fs.unlink(outFile, () => {});
        reject(new Error(stderr || `Exit code ${code}`));
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS para que el IDE (localhost:3000) pueda llamar
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || '', `http://localhost:${PORT}`);
  if (url.pathname === '/generate' && req.method === 'GET') {
    const name = url.searchParams.get('name') || 'productos';
    try {
      const filePath = await runReport(name);
      const stream = fs.createReadStream(filePath);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="reporte-${name}.pdf"`);
      stream.pipe(res);
      stream.on('end', () => fs.unlink(filePath, () => {}));
      stream.on('error', () => fs.unlink(filePath, () => {}));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error generando reporte: ' + (e.message || String(e)));
    }
    return;
  }

  if (url.pathname === '/health' || url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Report on demand OK. GET /generate?name=productos para generar PDF.');
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

async function start() {
  if (!runtimeReady()) {
    console.log('Runtime BIRT no encontrado. Ejecutando ensure (descarga/despliegue)...');
    await ensureRuntime();
    console.log('Runtime listo.');
  }
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`Report on demand: http://127.0.0.1:${PORT}/generate?name=productos`);
  });
}

start().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
