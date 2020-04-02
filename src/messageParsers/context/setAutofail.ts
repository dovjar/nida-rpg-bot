import { IMessageParser, ICommand } from '../../interfaces';
import { DebugSetAutoFailCommand } from '../../commands/context/DebugSetAutofailCommand';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/env\s+autofail\s*([0-9]+)/i);
    if (args){
        return [new DebugSetAutoFailCommand(parseInt(args[1], 10))];
    }
    return null;
  }
}

