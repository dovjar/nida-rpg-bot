import { IMessageParser, ICommand } from '../../interfaces';
import { FogOfWarCommand } from '../../commands/context/FogOfWarCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/^fogOfWar/i);
    if (args){
        return [new FogOfWarCommand()];
    }
    return null;
  }
}

