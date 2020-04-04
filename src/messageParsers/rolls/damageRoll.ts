import { IMessageParser, ICommand } from '../../interfaces';
import { DamageRollCommand } from '../../commands/roll/DamageRollCommand';
import { DamageEffectEnum } from '../../Rules';
import { HelpCommand, HelpTypeEnum } from '../../commands/HelpCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut.startsWith('d help'))
      return [new HelpCommand(HelpTypeEnum.Damage)];

    const args = cut.match(/^d\s*(\d+)\s*([BTC]{1,6})$/i);
    if (args){
        const ef=args[2].split("");
        const effect=ef.map((e)=>DamageEffectEnum[e.toUpperCase()]);
        const cmd=new DamageRollCommand(parseInt(args[1],10),effect);
        return [cmd]
    }
    return null;
  }
}

