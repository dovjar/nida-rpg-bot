import { ICommandParser, ICommand } from '../../interfaces';
import { Message } from 'discord.js';

export const commandParser:ICommandParser = {
  priority:10,
  createCommand(message:Message, cut:string):ICommand{
    const args = cut.match(/char\s+(str|sta|dex|ref|per|will)\s*(\d+)/i);
    if (args)
      return new CharAttributeCommand(message.member.user.id,message.member.displayName, args[1], parseInt(args[2], 10));
    return null;
  }
}
export class CharAttributeCommand implements ICommand{

  constructor(playerId:string, userName:string, attr:string, lvl:number) {
    this.attr = attr;
    this.lvl = lvl;
    this.playerId = playerId;
    this.userName = userName;
  }
  playerId:string;
  attr: string;
  lvl: number;
  userName: string;
}
