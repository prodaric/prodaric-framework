import { ContainerModule } from 'inversify';
import { LocalizationContribution } from '@theia/core/lib/node/i18n/localization-contribution';
import { ProdaricL10nContribution } from './prodaric-l10n-contribution';

export default new ContainerModule((bind) => {
  bind(ProdaricL10nContribution).toSelf().inSingletonScope();
  bind(LocalizationContribution).toService(ProdaricL10nContribution);
});
