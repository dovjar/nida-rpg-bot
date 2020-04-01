import { IMessageParser, ICommand } from '../../interfaces';
import { Message } from 'discord.js';
import { playersManager } from '../../playersManager';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/c\s*([a=zA-Z_0-9]*)?\s*(([+-])?(\d+))?/i);
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
export class CalcBonusForCombatRollCommand implements ICommand{
  combatRollCommand:CombatRollCommand;
  name:string;
  constructor(combatRollCommand:CombatRollCommand, name:string){
    this.combatRollCommand = combatRollCommand;
    this.name = name;
  }

}
// tslint:disable-next-line: max-classes-per-file
export class CombatRollCommand implements ICommand{

  constructor( mod:number) {
    this.mod = mod;
  }
  mod: number;userName: string;
}
