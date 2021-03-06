import { IMessageParser, ICommand } from '../../interfaces';
import { CalcBonusForCombatRollCommand } from '../../commands/roll/CalcBonusForCombatRollCommand';
import { CombatRollCommand } from '../../commands/roll/CombatRollCommand';
import { HelpCommand, HelpTypeEnum } from '../../commands/HelpCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut.startsWith('c help'))
      return [new HelpCommand(HelpTypeEnum.Combat)];

    const args = cut.match(/^((c(?=\s+)\s+([a-zA-Z0-9_.]+)?)|(c)?)\s*(([+-])?\s*(\d+))?$/i);
    if (args){
        const mod = parseInt(args[7],10) * ((args[6] || '+') ==='+'? 1:-1) || 0;
        const bonus = args[3];
        const cmd=new CombatRollCommand(mod);
        if (bonus){
          // bonus specified
          return [new CalcBonusForCombatRollCommand(cmd, bonus)];
        }
        else{
          return [cmd];
        }
    }
    return null;
  }
}

