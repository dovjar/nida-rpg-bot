import { ICommand, ICommandResult } from '../../interfaces';
import { CombatRollCommand } from "./CombatRollCommand";
export class CalcBonusForCombatRollCommand implements ICommand {
  combatRollCommand: CombatRollCommand;
  name: string;
  constructor(combatRollCommand: CombatRollCommand, name: string) {
    this.combatRollCommand = combatRollCommand;
    this.name = name;
  }
  result: ICommandResult;
}
