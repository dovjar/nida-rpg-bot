import { ICommand } from '../../interfaces';
import { SocialRollResult } from '../../commandResults/SocialRollResult';
import { SocialRollCommand } from './SocialRollCommand';
export class SocialRollAggregateCommand implements ICommand {
  constructor(originalRoll:SocialRollCommand,  luckRoll:SocialRollCommand, rerollDices:number[]) {
      this.originalRoll = originalRoll;
      this.luckRoll = luckRoll;
      this.rerollDices = rerollDices;
  }
  originalRoll:SocialRollCommand;
  luckRoll:SocialRollCommand;
  rerollDices:number[];
  result: SocialRollResult;
}
