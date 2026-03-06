/**
 * Registro de Web Components: Shoelace, FAST y Vaadin.
 * Se ejecuta al cargar el frontend para que los custom elements estén definidos.
 */

// Shoelace: importar componentes para que se auto-registren (prefijo sl-)
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
// Tema Shoelace: se puede cargar en el widget si el bundler no procesa CSS desde módulos.

// FAST: registrar componentes (prefijo fast-)
import { provideFASTDesignSystem } from '@microsoft/fast-components';
import { fastButton, fastCard, fastTextField, fastCheckbox } from '@microsoft/fast-components';

provideFASTDesignSystem().register(fastButton());
provideFASTDesignSystem().register(fastCard());
provideFASTDesignSystem().register(fastTextField());
provideFASTDesignSystem().register(fastCheckbox());

// Vaadin: al importar se auto-registran (prefijo vaadin-)
import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/checkbox';
import '@vaadin/card';
import '@vaadin/grid';
import '@vaadin/dialog';
