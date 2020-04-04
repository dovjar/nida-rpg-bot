import { ICommand, ICommandResult } from '../../interfaces';
import { CombatModeEnum } from '../../models/char';
export class CharAddCombatSkillCommand implements ICommand {
  constructor(name: string, lvl: number, attack: string, mode: CombatModeEnum) {
    this.skillName = name;
    this.lvl = lvl;
    this.attack = attack;
    this.mode = mode;
  }
  skillName: string;
  lvl: number;
  attack: string;
  mode: CombatModeEnum;
  result: ICommandResult;
}
