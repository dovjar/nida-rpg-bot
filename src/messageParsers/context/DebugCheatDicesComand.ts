import { ICommand } from '../../interfaces';
export class DebugCheatDicesCommand implements ICommand {
  constructor(dices: number[]) {
    this.dices = dices;
  }
    result: import("../../interfaces").ICommandResult;
  dices: number[];
}
