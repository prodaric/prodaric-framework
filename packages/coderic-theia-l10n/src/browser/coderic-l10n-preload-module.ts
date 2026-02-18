import { ContainerModule } from 'inversify';
import { TextReplacementContribution } from '@theia/core/lib/browser/preload/text-replacement-contribution';
import { CodericTextReplacementContribution } from './coderic-text-replacement';

export default new ContainerModule((bind) => {
  bind(CodericTextReplacementContribution).toSelf().inSingletonScope();
  bind(TextReplacementContribution).toService(CodericTextReplacementContribution);
});
