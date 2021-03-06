import { IMessageParser, ICommand } from '../../interfaces';
import { DebugResetCommand } from '../../commands/context/DebugResetCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/debug\s+reset/i);
    if (args){
        return [new DebugResetCommand()];
    }
    return null;
  }
}

