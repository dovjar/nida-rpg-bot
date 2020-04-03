import { ICommand, ICommandResult } from '../../interfaces';

export class SocialRollCommand implements ICommand {
  constructor(dices: number,effectiveness: number) {
    this.dices = dices;
    this.effectiveness = effectiveness;
  }
  dices: number;
  effectiveness: number;
  result: ICommandResult;
}
