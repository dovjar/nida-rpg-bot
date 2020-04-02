import { IMessageParser, ICommand } from '../../interfaces';
import { DebugCheatDicesCommand } from '../../commands/context/DebugCheatDicesCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/debug\s+([0-9]+)/i);
    if (args){
        return [new DebugCheatDicesCommand(Array.from(args[1]).map((d) => parseInt(d, 10)))];
    }
    return null;
  }
}

