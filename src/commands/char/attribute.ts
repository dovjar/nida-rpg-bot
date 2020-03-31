import { ICommandParser, ICommand } from '../../interfaces';
import { Message } from 'discord.js';

export const commandParser:ICommandParser = {
  priority:10,
  createCommand(message:Message, cut:string):ICommand{
    const args = cut.match(/char\s+(str|sta|dex|ref|per|will)\s*(\d+)/i);
    if (args)
      return new CharAttributeCommand(message, args[1], parseInt(args[2], 10));
    return null;
  }
}
export class CharAttributeCommand implements ICommand{

  constructor(message: Message, attr:string, lvl:number) {
    this.message = message;
    this.attr = attr;
    this.lvl = lvl;
    this.playerId = message.member.user.id;
    this.userName = message.member.displayName;
  }
  playerId:string;
  message: Message;
  attr: string;
  lvl: number;
  userName: string;
}
