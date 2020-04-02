import { ICommand, ICommandResult } from '../../interfaces';
export class DebugCheatDicesCommand implements ICommand {
  constructor(dices: number[]) {
    this.dices = dices;
  }
  dices: number[];
  result: ICommandResult;
}
