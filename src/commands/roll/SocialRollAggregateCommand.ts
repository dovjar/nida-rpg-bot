import { ICommand } from '../../interfaces';
import { SocialRollResult } from '../../commandResults/SocialRollResult';
import { SocialRollCommand } from './SocialRollCommand';
import { SocialReRollCommand } from './SocialReRollCommand';
export class SocialRollAggregateCommand implements ICommand {
  constructor(originalRoll:SocialRollCommand,  luckRoll:SocialReRollCommand, rerollDices:number[]) {
      this.originalRoll = originalRoll;
      this.luckRoll = luckRoll;
      this.rerollDices = rerollDices;
  }
  originalRoll:SocialRollCommand;
  luckRoll:SocialReRollCommand;
  rerollDices:number[];
  result: SocialRollResult;
}
