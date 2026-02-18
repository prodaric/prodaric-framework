import { ContainerModule } from 'inversify';
import { LocalizationContribution } from '@theia/core/lib/node/i18n/localization-contribution';
import { CodericL10nContribution } from './coderic-l10n-contribution';

export default new ContainerModule((bind) => {
  bind(CodericL10nContribution).toSelf().inSingletonScope();
  bind(LocalizationContribution).toService(CodericL10nContribution);
});
