import { IMessageParser, ICommand } from '../../interfaces';
import { SpellRollCommand } from '../../commands/roll/SpellRollCommand';
import { HelpCommand, HelpTypeEnum } from '../../commands/HelpCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut.startsWith('spell help'))
      return [new HelpCommand(HelpTypeEnum.Spell)];

    const args = cut.match(/^spell/i);
    if (args){
        const cmd=new SpellRollCommand();
        return [cmd]
    }
    return null;
  }
}

