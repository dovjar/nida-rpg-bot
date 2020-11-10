import { IMessageParser, ICommand } from '../../interfaces';
import { ChangeRulesCommand } from '../../commands/context/ChangeRulesCommand';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/env\s+rules\s*(default|d10)/i);
    if (args){
        return [new ChangeRulesCommand(args[1])];
    }
    return null;
  }
}

