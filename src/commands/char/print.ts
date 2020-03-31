import { ICommandParser, ICommand } from '../../interfaces';
import { Message } from 'discord.js';

export const commandParser:ICommandParser = {
  priority:10,
  createCommand(message:Message, cut:string):ICommand{
    const args = cut.match(/char\s+print\s*(\S+)?\s*/i);
    if (args)
      return new CharPrintCommand(message.member.user.id,message.member.displayName, args[1]);
    return null;
  }
}
export class CharPrintCommand implements ICommand{

  constructor(playerId:string, userName:string, subcommand:string) {
    this.subcommand = subcommand;
    this.playerId = playerId;
    this.userName = userName;
  }
  playerId:string;
  subcommand: string;
  userName: string;
}
