import { IMessageParser, ICommand } from '../interfaces';
import { Message } from 'discord.js';
import { isNull } from 'util';

export const commandParser:IMessageParser = {
  priority:0,
  createCommand(message:Message, cut:string):ICommand[]{
    if (cut === 'help')
      return [new HelpCommand()];
    return null;
  }
}
export class HelpCommand implements ICommand{

}
