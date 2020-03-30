import { ICommandParser, ICommand } from '../interfaces';
import { Message } from 'discord.js';

export const commandParser:ICommandParser = {
  priority:0,
  createCommand(message:Message, cut:string):ICommand{
    return new HelpCommand(message);
  }
}
export class HelpCommand implements ICommand{
  constructor(message: Message) {
    this.message = message;
  }
  type: string = 'helpCommand';
  message: Message;
}
