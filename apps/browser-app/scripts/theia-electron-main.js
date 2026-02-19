/**
 * Punto de entrada Electron para Prodaric Framework.
 * Theia genera lib/backend/main.js al ejecutar:
 *   theia rebuild:electron && theia build --app-target=electron
 */
'use strict';

const path = require('path');

// Ruta al backend generado por Theia (relativa a este script)
const backendMain = path.join(__dirname, '..', 'lib', 'backend', 'main.js');
require(backendMain);
