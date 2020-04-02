import { IMessageParser, ICommand } from '../../interfaces';
import { CharAttributeCommand } from '../../commands/char/CharAttributeCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/char\s+(str|sta|dex|ref|per|will)\s*(\d+)/i);
    if (args)
      return [new CharAttributeCommand(args[1], parseInt(args[2], 10))];
    return null;
  }
}

