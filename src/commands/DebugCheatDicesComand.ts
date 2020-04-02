import { ICommand, ICommandResult } from "../interfaces";

export class DebugCheatDicesCommand implements ICommand {
  constructor(dices: number[]) {
    this.dices = dices;
  }
    result: ICommandResult;
  dices: number[];
}
