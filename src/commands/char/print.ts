import { ICommandParser, ICommand } from '../../interfaces';
import { Message } from 'discord.js';

export const commandParser:ICommandParser = {
  priority:10,
  createCommand(message:Message, cut:string):ICommand{
    const args = cut.match(/char\s+print\s*(\S+)?\s*/i);
    if (args)
      return new CharPrintCommand(message, args[1]);
    return null;
  }
}
export class CharPrintCommand implements ICommand{

  constructor(message: Message, subcommand:string) {
    this.message = message;
    this.subcommand = subcommand;
    this.playerId = message.member.user.id;
    this.userName = message.member.displayName;
  }
  playerId:string;
  message: Message;
  subcommand: string;
  userName: string;
}
