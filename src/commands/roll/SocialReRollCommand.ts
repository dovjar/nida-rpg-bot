import { ICommand } from '../../interfaces';
import { SocialReRollResult } from '../../commandResults/SocialReRollResult';
export class SocialReRollCommand implements ICommand {
  constructor(dices: number, effectiveness: number, explode:boolean) {
    this.dices = dices;
    this.effectiveness = effectiveness;
    this.explode = explode;
  }
  dices: number;
  effectiveness: number;
  result: SocialReRollResult;
  explode:boolean;
}
