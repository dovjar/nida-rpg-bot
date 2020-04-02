import { IMessageParser, ICommand } from '../../interfaces';
import { DebugResetComand } from '../../commands/context/DebugResetComand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/debug\s+reset/i);
    if (args){
        return [new DebugResetComand()];
    }
    return null;
  }
}

