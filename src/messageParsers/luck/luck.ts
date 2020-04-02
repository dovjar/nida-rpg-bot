import { IMessageParser, ICommand } from '../../interfaces';
import { LuckCommand } from '../../commands/luck/LuckCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut === 'luck')
      return [new LuckCommand()];
    return null;
  }
}
