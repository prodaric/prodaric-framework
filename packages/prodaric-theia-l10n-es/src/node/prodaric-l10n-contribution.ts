/**
 * Marca el idioma español como language pack para que el frontend de Theia
 * acepte las traducciones y muestre la UI en español cuando defaultLocale es "es".
 * Las traducciones las aporta @theia/core (TheiaLocalizationContribution); esta
 * contribución solo añade languagePack: true para el locale "es".
 */

import { injectable } from 'inversify';
import type { LocalizationContribution, LocalizationRegistry } from '@theia/core/lib/node/i18n/localization-contribution';

@injectable()
export class ProdaricL10nContribution implements LocalizationContribution {
  async registerLocalizations(registry: LocalizationRegistry): Promise<void> {
    registry.registerLocalization({
      languageId: 'es',
      languagePack: true,
      languageName: 'Español',
      localizedLanguageName: 'Español',
      getTranslations: () => Promise.resolve({}),
    });
  }
}
