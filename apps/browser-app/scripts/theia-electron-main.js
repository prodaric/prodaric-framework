/**
 * Punto de entrada Electron para Prodaric Framework.
 * Theia genera lib/backend/electron-main.js al ejecutar:
 *   theia rebuild:electron && theia build --app-target=electron
 */
'use strict';

const path = require('path');

// Ruta al main de Electron generado por Theia (relativa a este script)
const electronMain = path.join(__dirname, '..', 'lib', 'backend', 'electron-main.js');
require(electronMain);
