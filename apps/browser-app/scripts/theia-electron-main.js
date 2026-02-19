/**
 * Punto de entrada Electron para Prodaric Framework.
 * Delega al launcher que genera Theia (crea ventana y arranca el backend):
 *   lib/backend/electron-main.js
 */
'use strict';

const path = require('path');

const electronMain = path.join(__dirname, '..', 'lib', 'backend', 'electron-main.js');
require(electronMain);
