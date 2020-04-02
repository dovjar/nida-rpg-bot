import { ICommand } from '../../interfaces';
export class DebugCheatDicesComand implements ICommand {
  constructor(dices: number[]) {
    this.dices = dices;
  }
  dices: number[];
}
