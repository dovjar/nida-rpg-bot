import { IMessageParser, ICommand } from '../interfaces';
import { Message } from 'discord.js';
import { isNull } from 'util';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(message:Message, cut:string):Promise<ICommand[]>{
    if (cut === 'help')
      return [new HelpCommand()];
    return null;
  }
}
export class HelpCommand implements ICommand{

}
