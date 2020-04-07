import { IMessageParser, ICommand } from '../interfaces';
import { RulesCommand } from '../commands/RulesCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/^rules\s*(\S+)?/i)
    if (args)
      return [new RulesCommand( args[1] || '')];
    return null;
  }
}
