import { IMessageParser, ICommand } from '../../interfaces';

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
export class DebugResetComand implements ICommand{
}
