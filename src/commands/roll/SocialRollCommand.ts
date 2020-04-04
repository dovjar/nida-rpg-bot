import { ICommand } from '../../interfaces';
import { SocialRollResult } from '../../commandResults/SocialRollResult';

export class SocialRollCommand implements ICommand {
  constructor(dices: number,effectiveness: number) {
    this.dices = dices;
    this.effectiveness = effectiveness;
  }
  dices: number;
  effectiveness: number;
  result: SocialRollResult;
}

