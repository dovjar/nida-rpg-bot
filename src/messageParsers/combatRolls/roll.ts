import { IMessageParser, ICommand } from '../../interfaces';
import { CalcBonusForCombatRollCommand } from '../../commands/roll/CalcBonusForCombatRollCommand';
import { CombatRollCommand } from '../../commands/roll/CombatRollCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/c(?=\s+)\s+([a-zA-Z0-9_]+)?\s*(([+-])?(\d+))?/i);
    if (args){
        const mod = parseInt(args[4],10) * ((args[3] || '+') ==='+'? 1:-1) || 0;
        const cmd=new CombatRollCommand(mod);
        if (args[1]){
          // bonus specified
          return [new CalcBonusForCombatRollCommand(cmd, args[1])];

        }
        else{
          return [cmd];
        }
    }
    return null;
  }
}

