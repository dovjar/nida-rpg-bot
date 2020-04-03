import { IMessageParser, ICommand } from '../../interfaces';
import { SpellRollCommand } from '../../commands/roll/SpellRollCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/^spell/i);
    if (args){
        const cmd=new SpellRollCommand();
        return [cmd]
    }
    return null;
  }
}

