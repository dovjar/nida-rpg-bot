import { IMessageParser, ICommand } from '../../interfaces';
import { DebugSetAutofailComand } from '../../commands/context/DebugSetAutofailComand';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/env\s+autofail\s*([0-9]+)/i);
    if (args){
        return [new DebugSetAutofailComand(parseInt(args[1], 10))];
    }
    return null;
  }
}

