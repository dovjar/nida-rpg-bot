import { ICommand, ICommandResult } from '../../interfaces';
export class GenericRollCommand implements ICommand {
  result: ICommandResult;
  dices: number;
  sides: number;
  constructor(dices: number,sides: number) {
    this.dices=dices;
    this.sides = sides;
  }
}
