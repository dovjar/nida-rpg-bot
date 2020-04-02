import { ICommand } from '../../interfaces';
import { CombatRollResult } from '../../commandResults/CombatRollResult';
// tslint:disable-next-line: max-classes-per-file
export class CombatRollCommand implements ICommand {
  constructor(mod: number) {
    this.mod = mod;
  }
  mod: number;
  userName: string;
  result: CombatRollResult;
}
