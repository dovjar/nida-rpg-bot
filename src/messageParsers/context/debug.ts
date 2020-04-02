import { IMessageParser, ICommand } from '../../interfaces';
import { DebugCheatDicesComand } from '../../commands/context/DebugCheatDicesComand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/debug\s+([0-9]+)/i);
    if (args){
        return [new DebugCheatDicesComand(Array.from(args[1]).map((d) => parseInt(d, 10)))];
    }
    return null;
  }
}

