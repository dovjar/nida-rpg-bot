import { ICommand } from '../../interfaces';
import { CombatRollResult } from '../../commandResults/CombatRollResult';
import { CombatModeEnum } from '../../models/char';
// tslint:disable-next-line: max-classes-per-file
export class CombatRollCommand implements ICommand {
  constructor(mod: number) {
    this.mod = mod;
  }
  mod: number;
  mode: CombatModeEnum = CombatModeEnum.unknown;
  userName: string;
  result: CombatRollResult;
}
