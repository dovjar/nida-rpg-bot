import { ICommand } from '../../interfaces';
import { SocialRollResult } from '../../commandResults/SocialRollResult';
import { SocialRollCommand } from './SocialRollCommand';
export class ExplainSocialRollCommand implements ICommand {
  constructor(command: SocialRollCommand) {
    this.socialRollCommand = command;
  }
  socialRollCommand: SocialRollCommand;
  result: SocialRollResult;
}
