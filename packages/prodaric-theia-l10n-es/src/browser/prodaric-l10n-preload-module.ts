import { ContainerModule } from 'inversify';
import { TextReplacementContribution } from '@theia/core/lib/browser/preload/text-replacement-contribution';
import { ProdaricTextReplacementContribution } from './prodaric-text-replacement';

export default new ContainerModule((bind) => {
  bind(ProdaricTextReplacementContribution).toSelf().inSingletonScope();
  bind(TextReplacementContribution).toService(ProdaricTextReplacementContribution);
});
