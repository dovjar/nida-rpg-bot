import { IMessageParser, ICommand } from '../../interfaces';
import { SpellRollCommand } from '../../commands/roll/SpellRollCommand';
import { HelpCommand, HelpTypeEnum } from '../../commands/HelpCommand';
import { GenericRollCommand } from '../../commands/roll/GenericRollCommand';

export const commandParser:IMessageParser = {
  priority:-5,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut.startsWith('spell help'))
      return [new HelpCommand(HelpTypeEnum.Spell)];

    const args = cut.match(/^(\d*)?[dD](\d*)?/i);
    if (args){
        const cmd=new GenericRollCommand(parseInt(args[1],10) || 1,parseInt(args[2],10) || 6);
        return [cmd]
    }
    return null;
  }
}

