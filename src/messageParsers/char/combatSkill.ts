import { IMessageParser, ICommand } from '../../interfaces';
import { PrintCommandsEnum } from "../../commands/char/CharPrintCommand";
import { CharPrintCommand } from "../../commands/char/CharPrintCommand";
import { CharAddCombatSkillCommand } from '../../commands/char/CharAddCombatSkillCommand';
import { CharRemoveCombatSkillCommand } from '../../commands/char/CharRemoveCombatSkillCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/char\s+(combat|c)(\s+(add|a)*(remove|r)*\s*(\S+)\s*((\d+)?\s*(a=(\S+))*\s*(d=(\S+))*)*)*/i);
    if (args && (args[7] || args[3] || args[9] || args[11]) && (!args[4]))
      return [new CharAddCombatSkillCommand(args[5], parseInt(args[7], 10), args[9], args[11]),
              new CharPrintCommand(PrintCommandsEnum.combat)];
    else if (args && args[4] && !args[3])
      return [new CharRemoveCombatSkillCommand(args[5]),
              new CharPrintCommand(PrintCommandsEnum.combat)];
    return null;
  }
}

